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

  // Create email_settings table for configurable email templates
  // Supports: welcome, newsletter, booking_confirmation, booking_reminder
  database.exec(`
    CREATE TABLE IF NOT EXISTS email_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT UNIQUE NOT NULL,
      subject TEXT NOT NULL,
      greeting TEXT DEFAULT '',
      body_sections TEXT DEFAULT '[]',
      cta_text TEXT DEFAULT '',
      cta_url TEXT DEFAULT '',
      quote_text TEXT DEFAULT '',
      quote_author TEXT DEFAULT '',
      featured_post_id INTEGER,
      enabled INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (featured_post_id) REFERENCES posts(id) ON DELETE SET NULL
    )
  `);

  // Create index on email type for fast lookups
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_email_settings_type ON email_settings(type)
  `);

  // Insert default welcome email settings if not exists
  const welcomeExists = database.prepare(
    "SELECT COUNT(*) as count FROM email_settings WHERE type = 'welcome'"
  ).get() as { count: number };

  if (welcomeExists.count === 0) {
    database.prepare(`
      INSERT INTO email_settings (type, subject, greeting, body_sections, cta_text, cta_url, quote_text, quote_author)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'welcome',
      "Welcome {{name}}! Your ReTurn Newsletter Subscription",
      "Hello {{name}}, and welcome! 👋",
      JSON.stringify([
        { type: 'text', content: "Thank you for joining our community of seekers and healers. You've just taken a beautiful step toward personal transformation through regression hypnosis." },
        { type: 'benefits', items: [
          { icon: '🧠', title: 'Brain food & breakthrough insights', desc: 'Deep wisdom for your personal growth' },
          { icon: '✨', title: 'Client transformation stories', desc: 'Real journeys of healing and discovery' },
          { icon: '🌱', title: 'Tips for personal growth', desc: 'Practical tools for your healing journey' },
          { icon: '🔮', title: 'Regression hypnosis updates', desc: 'Latest techniques and insights' }
        ]}
      ]),
      'Have Questions? Reply Here',
      'mailto:hello@returnhypnosis.com',
      'The curious paradox is that when I accept myself just as I am, then I can change.',
      'Carl Rogers'
    );
  }
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

// Get adjacent posts (previous and next) for navigation
export function getAdjacentPosts(slug: string): { prev: Pick<Post, 'slug' | 'title'> | null; next: Pick<Post, 'slug' | 'title'> | null } {
  const database = getDb();

  // Get current post's id and created_at
  const currentPost = database.prepare('SELECT id, created_at FROM posts WHERE slug = ? AND published = 1').get(slug) as { id: number; created_at: string } | undefined;

  if (!currentPost) {
    return { prev: null, next: null };
  }

  // Previous post: older than current, using created_at DESC then id DESC for consistent ordering
  const prevRow = database.prepare(`
    SELECT slug, title FROM posts
    WHERE published = 1
      AND (created_at < ? OR (created_at = ? AND id < ?))
    ORDER BY created_at DESC, id DESC
    LIMIT 1
  `).get(currentPost.created_at, currentPost.created_at, currentPost.id) as { slug: string; title: string } | undefined;

  // Next post: newer than current, using created_at ASC then id ASC for consistent ordering
  const nextRow = database.prepare(`
    SELECT slug, title FROM posts
    WHERE published = 1
      AND (created_at > ? OR (created_at = ? AND id > ?))
    ORDER BY created_at ASC, id ASC
    LIMIT 1
  `).get(currentPost.created_at, currentPost.created_at, currentPost.id) as { slug: string; title: string } | undefined;

  return {
    prev: prevRow ? { slug: prevRow.slug, title: prevRow.title } : null,
    next: nextRow ? { slug: nextRow.slug, title: nextRow.title } : null,
  };
}

// ============================================================================
// EMAIL SETTINGS
// ============================================================================

// Email settings type definition
export interface EmailSettings {
  id: number;
  type: 'welcome' | 'newsletter' | 'booking_confirmation' | 'booking_reminder';
  subject: string;
  greeting: string;
  body_sections: string; // JSON string of content sections
  cta_text: string;
  cta_url: string;
  quote_text: string;
  quote_author: string;
  featured_post_id: number | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Database row type for email settings
interface EmailSettingsRow {
  id: number;
  type: string;
  subject: string;
  greeting: string;
  body_sections: string;
  cta_text: string;
  cta_url: string;
  quote_text: string;
  quote_author: string;
  featured_post_id: number | null;
  enabled: number;
  created_at: string;
  updated_at: string;
}

// Convert database row to EmailSettings object
function rowToEmailSettings(row: EmailSettingsRow): EmailSettings {
  return {
    ...row,
    type: row.type as EmailSettings['type'],
    enabled: row.enabled === 1,
  };
}

// Get email settings by type
export function getEmailSettingsByType(type: EmailSettings['type']): EmailSettings | null {
  const database = getDb();
  const row = database.prepare('SELECT * FROM email_settings WHERE type = ?').get(type) as EmailSettingsRow | undefined;
  return row ? rowToEmailSettings(row) : null;
}

// Get all email settings
export function getAllEmailSettings(): EmailSettings[] {
  const database = getDb();
  const rows = database.prepare('SELECT * FROM email_settings ORDER BY type').all() as EmailSettingsRow[];
  return rows.map(rowToEmailSettings);
}

// Update email settings
export function updateEmailSettings(
  type: EmailSettings['type'],
  updates: Partial<Omit<EmailSettings, 'id' | 'type' | 'created_at' | 'updated_at'>>
): EmailSettings | null {
  const database = getDb();
  const existing = getEmailSettingsByType(type);

  // If doesn't exist, create it
  if (!existing) {
    const stmt = database.prepare(`
      INSERT INTO email_settings (type, subject, greeting, body_sections, cta_text, cta_url, quote_text, quote_author, featured_post_id, enabled)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      type,
      updates.subject || '',
      updates.greeting || '',
      updates.body_sections || '[]',
      updates.cta_text || '',
      updates.cta_url || '',
      updates.quote_text || '',
      updates.quote_author || '',
      updates.featured_post_id || null,
      updates.enabled !== false ? 1 : 0
    );
    return getEmailSettingsByType(type);
  }

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (updates.subject !== undefined) {
    fields.push('subject = ?');
    values.push(updates.subject);
  }
  if (updates.greeting !== undefined) {
    fields.push('greeting = ?');
    values.push(updates.greeting);
  }
  if (updates.body_sections !== undefined) {
    fields.push('body_sections = ?');
    values.push(updates.body_sections);
  }
  if (updates.cta_text !== undefined) {
    fields.push('cta_text = ?');
    values.push(updates.cta_text);
  }
  if (updates.cta_url !== undefined) {
    fields.push('cta_url = ?');
    values.push(updates.cta_url);
  }
  if (updates.quote_text !== undefined) {
    fields.push('quote_text = ?');
    values.push(updates.quote_text);
  }
  if (updates.quote_author !== undefined) {
    fields.push('quote_author = ?');
    values.push(updates.quote_author);
  }
  if (updates.featured_post_id !== undefined) {
    fields.push('featured_post_id = ?');
    values.push(updates.featured_post_id);
  }
  if (updates.enabled !== undefined) {
    fields.push('enabled = ?');
    values.push(updates.enabled ? 1 : 0);
  }

  if (fields.length === 0) return existing;

  fields.push("updated_at = datetime('now')");
  values.push(type);

  const query = `UPDATE email_settings SET ${fields.join(', ')} WHERE type = ?`;
  database.prepare(query).run(...values);

  return getEmailSettingsByType(type);
}

