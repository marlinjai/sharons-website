// lib/db.ts
// SQLite database setup for blog posts CMS

import Database from 'better-sqlite3';
import path from 'path';

// Database file location - stored in project root/data directory
const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'blog.db');

// Singleton database instance
let db: Database.Database | null = null;

// Get or create database connection
export function getDb(): Database.Database {
  if (!db) {
    // Ensure data directory exists
    const fs = require('fs');
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL'); // Better performance for concurrent reads
    initializeSchema();
  }
  return db;
}

// Initialize database schema
function initializeSchema() {
  const database = db!;

  // Create posts table
  database.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT DEFAULT '',
      category TEXT DEFAULT 'General',
      read_time TEXT DEFAULT '5 min read',
      featured_image TEXT,
      content TEXT NOT NULL,
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Create index on slug for fast lookups
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)
  `);

  // Create index on published status
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)
  `);
}

// Post type definition
export interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Database row type (SQLite stores booleans as integers)
interface PostRow {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  content: string;
  published: number;
  created_at: string;
  updated_at: string;
}

// Convert database row to Post object
function rowToPost(row: PostRow): Post {
  return {
    ...row,
    published: row.published === 1,
  };
}

// Get all posts (optionally filter by published status)
export function getAllPosts(publishedOnly: boolean = false): Post[] {
  const database = getDb();
  const query = publishedOnly
    ? 'SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC'
    : 'SELECT * FROM posts ORDER BY created_at DESC';
  const rows = database.prepare(query).all() as PostRow[];
  return rows.map(rowToPost);
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  const database = getDb();
  const row = database.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as PostRow | undefined;
  return row ? rowToPost(row) : null;
}

// Get a single post by ID
export function getPostById(id: number): Post | null {
  const database = getDb();
  const row = database.prepare('SELECT * FROM posts WHERE id = ?').get(id) as PostRow | undefined;
  return row ? rowToPost(row) : null;
}

// Create a new post
export function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Post {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO posts (slug, title, subtitle, category, read_time, featured_image, content, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    post.slug,
    post.title,
    post.subtitle,
    post.category,
    post.read_time,
    post.featured_image,
    post.content,
    post.published ? 1 : 0
  );
  return getPostById(result.lastInsertRowid as number)!;
}

// Update an existing post
export function updatePost(id: number, updates: Partial<Omit<Post, 'id' | 'created_at'>>): Post | null {
  const database = getDb();
  const existing = getPostById(id);
  if (!existing) return null;

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (updates.slug !== undefined) {
    fields.push('slug = ?');
    values.push(updates.slug);
  }
  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }
  if (updates.subtitle !== undefined) {
    fields.push('subtitle = ?');
    values.push(updates.subtitle);
  }
  if (updates.category !== undefined) {
    fields.push('category = ?');
    values.push(updates.category);
  }
  if (updates.read_time !== undefined) {
    fields.push('read_time = ?');
    values.push(updates.read_time);
  }
  if (updates.featured_image !== undefined) {
    fields.push('featured_image = ?');
    values.push(updates.featured_image);
  }
  if (updates.content !== undefined) {
    fields.push('content = ?');
    values.push(updates.content);
  }
  if (updates.published !== undefined) {
    fields.push('published = ?');
    values.push(updates.published ? 1 : 0);
  }

  if (fields.length === 0) return existing;

  fields.push("updated_at = datetime('now')");
  values.push(id);

  const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
  database.prepare(query).run(...values);

  return getPostById(id);
}

// Delete a post
export function deletePost(id: number): boolean {
  const database = getDb();
  const result = database.prepare('DELETE FROM posts WHERE id = ?').run(id);
  return result.changes > 0;
}

// Generate a URL-safe slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Check if a slug is unique (optionally exclude a specific post ID)
export function isSlugUnique(slug: string, excludeId?: number): boolean {
  const database = getDb();
  const query = excludeId
    ? 'SELECT COUNT(*) as count FROM posts WHERE slug = ? AND id != ?'
    : 'SELECT COUNT(*) as count FROM posts WHERE slug = ?';
  const params = excludeId ? [slug, excludeId] : [slug];
  const result = database.prepare(query).get(...params) as { count: number };
  return result.count === 0;
}

