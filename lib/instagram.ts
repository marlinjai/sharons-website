// lib/instagram.ts
// Instagram grid planner CRUD operations

import { getDb } from './db';
import type { MediaItem } from './media';

// Instagram post type definition
export interface InstagramPost {
  id: number;
  media_id: number;
  grid_position: number;
  caption: string;
  hashtags: string;
  status: 'draft' | 'planned' | 'published';
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
}

// Instagram post with joined media data
export interface InstagramPostWithMedia extends InstagramPost {
  media: MediaItem;
}

// Input for creating an Instagram post
export interface CreateInstagramPostInput {
  media_id: number;
  grid_position: number;
  caption?: string;
  hashtags?: string;
  scheduled_date?: string;
}

// Input for updating an Instagram post
export interface UpdateInstagramPostInput {
  caption?: string;
  hashtags?: string;
  status?: 'draft' | 'planned' | 'published';
  scheduled_date?: string | null;
}

// Get the full Instagram grid with media data
export function getGrid(): InstagramPostWithMedia[] {
  const database = getDb();
  const rows = database.prepare(`
    SELECT
      ip.id, ip.media_id, ip.grid_position, ip.caption, ip.hashtags,
      ip.status, ip.scheduled_date, ip.created_at, ip.updated_at,
      m.id AS m_id, m.filename AS m_filename, m.stored_path AS m_stored_path,
      m.thumbnail_path AS m_thumbnail_path, m.mime_type AS m_mime_type,
      m.file_size AS m_file_size, m.width AS m_width, m.height AS m_height,
      m.alt_text AS m_alt_text, m.created_at AS m_created_at,
      m.updated_at AS m_updated_at
    FROM instagram_posts ip
    JOIN media m ON ip.media_id = m.id
    ORDER BY ip.grid_position ASC
  `).all() as Array<Record<string, unknown>>;

  return rows.map(rowToPostWithMedia);
}

// Map a joined row to InstagramPostWithMedia
function rowToPostWithMedia(row: Record<string, unknown>): InstagramPostWithMedia {
  return {
    id: row.id as number,
    media_id: row.media_id as number,
    grid_position: row.grid_position as number,
    caption: row.caption as string,
    hashtags: row.hashtags as string,
    status: row.status as InstagramPost['status'],
    scheduled_date: row.scheduled_date as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    media: {
      id: row.m_id as number,
      filename: row.m_filename as string,
      stored_path: row.m_stored_path as string,
      thumbnail_path: row.m_thumbnail_path as string | null,
      mime_type: row.m_mime_type as string,
      file_size: row.m_file_size as number,
      width: row.m_width as number | null,
      height: row.m_height as number | null,
      alt_text: row.m_alt_text as string,
      created_at: row.m_created_at as string,
      updated_at: row.m_updated_at as string,
    },
  };
}

// Add a post to the grid
export function addPostToGrid(input: CreateInstagramPostInput): InstagramPost {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO instagram_posts (media_id, grid_position, caption, hashtags, scheduled_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.media_id,
    input.grid_position,
    input.caption ?? '',
    input.hashtags ?? '',
    input.scheduled_date ?? null
  );

  const row = database.prepare('SELECT * FROM instagram_posts WHERE id = ?')
    .get(result.lastInsertRowid as number) as InstagramPost;
  return row;
}

// Update an existing Instagram post
export function updatePost(id: number, input: UpdateInstagramPostInput): InstagramPost | undefined {
  const database = getDb();
  const existing = database.prepare('SELECT * FROM instagram_posts WHERE id = ?')
    .get(id) as InstagramPost | undefined;
  if (!existing) return undefined;

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (input.caption !== undefined) {
    fields.push('caption = ?');
    values.push(input.caption);
  }
  if (input.hashtags !== undefined) {
    fields.push('hashtags = ?');
    values.push(input.hashtags);
  }
  if (input.status !== undefined) {
    fields.push('status = ?');
    values.push(input.status);
  }
  if (input.scheduled_date !== undefined) {
    fields.push('scheduled_date = ?');
    values.push(input.scheduled_date);
  }

  if (fields.length === 0) return existing;

  fields.push("updated_at = datetime('now')");
  values.push(id);

  const query = `UPDATE instagram_posts SET ${fields.join(', ')} WHERE id = ?`;
  database.prepare(query).run(...values);

  return database.prepare('SELECT * FROM instagram_posts WHERE id = ?').get(id) as InstagramPost;
}

// Delete an Instagram post (media stays in library)
export function deletePost(id: number): boolean {
  const database = getDb();
  const result = database.prepare('DELETE FROM instagram_posts WHERE id = ?').run(id);
  return result.changes > 0;
}

// Reorder grid positions in a single transaction
export function reorderGrid(moves: Array<{ id: number; newPosition: number }>): void {
  const database = getDb();
  const transaction = database.transaction(() => {
    // First pass: move all to temporary negative positions to avoid unique constraint violations
    const setTemp = database.prepare('UPDATE instagram_posts SET grid_position = ? WHERE id = ?');
    for (const move of moves) {
      setTemp.run(-1 * move.id, move.id);
    }

    // Second pass: set final positions
    const setFinal = database.prepare(
      "UPDATE instagram_posts SET grid_position = ?, updated_at = datetime('now') WHERE id = ?"
    );
    for (const move of moves) {
      setFinal.run(move.newPosition, move.id);
    }
  });
  transaction();
}

// Get a single post by ID with media data
export function getPostById(id: number): InstagramPostWithMedia | undefined {
  const database = getDb();
  const row = database.prepare(`
    SELECT
      ip.id, ip.media_id, ip.grid_position, ip.caption, ip.hashtags,
      ip.status, ip.scheduled_date, ip.created_at, ip.updated_at,
      m.id AS m_id, m.filename AS m_filename, m.stored_path AS m_stored_path,
      m.thumbnail_path AS m_thumbnail_path, m.mime_type AS m_mime_type,
      m.file_size AS m_file_size, m.width AS m_width, m.height AS m_height,
      m.alt_text AS m_alt_text, m.created_at AS m_created_at,
      m.updated_at AS m_updated_at
    FROM instagram_posts ip
    JOIN media m ON ip.media_id = m.id
    WHERE ip.id = ?
  `).get(id) as Record<string, unknown> | undefined;

  return row ? rowToPostWithMedia(row) : undefined;
}

// Get the next available grid position
export function getNextAvailablePosition(): number {
  const database = getDb();
  const row = database.prepare(
    'SELECT MAX(grid_position) as max_pos FROM instagram_posts'
  ).get() as { max_pos: number | null };
  return row.max_pos !== null ? row.max_pos + 1 : 0;
}
