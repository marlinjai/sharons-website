// lib/media.ts
// Media file storage and database operations for Instagram planner

import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import crypto from 'crypto';
import { getDb } from './db';

// Base upload directory for Instagram media
const UPLOAD_BASE = path.join(process.cwd(), 'data', 'uploads', 'instagram');
const ORIGINALS_DIR = path.join(UPLOAD_BASE, 'originals');
const THUMBNAILS_DIR = path.join(UPLOAD_BASE, 'thumbnails');

// Ensure upload directories exist
function ensureUploadDirs() {
  if (!fs.existsSync(ORIGINALS_DIR)) {
    fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
  }
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }
}

// Media item type definition
export interface MediaItem {
  id: number;
  filename: string;
  stored_path: string;
  thumbnail_path: string | null;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  alt_text: string;
  created_at: string;
  updated_at: string;
}

// Input for creating a media record
export interface CreateMediaInput {
  filename: string;
  stored_path: string;
  thumbnail_path: string | null;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
}

// Save a media file: store original + thumbnail, insert DB record
export async function saveMediaFile(
  file: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<MediaItem> {
  ensureUploadDirs();

  const ext = path.extname(originalFilename).toLowerCase() || '.jpg';
  const uuid = crypto.randomUUID();
  const storedFilename = `${uuid}${ext}`;

  const originalPath = path.join(ORIGINALS_DIR, storedFilename);
  const thumbnailPath = path.join(THUMBNAILS_DIR, storedFilename);

  // Write original file to disk
  fs.writeFileSync(originalPath, file);

  // Generate 400x400 cover-cropped thumbnail using sharp
  await sharp(file)
    .resize(400, 400, { fit: 'cover' })
    .toFile(thumbnailPath);

  // Extract original dimensions
  const metadata = await sharp(file).metadata();
  const width = metadata.width ?? null;
  const height = metadata.height ?? null;

  // Store relative paths in DB (relative to process.cwd())
  const storedRelPath = path.join('data', 'uploads', 'instagram', 'originals', storedFilename);
  const thumbRelPath = path.join('data', 'uploads', 'instagram', 'thumbnails', storedFilename);

  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO media (filename, stored_path, thumbnail_path, mime_type, file_size, width, height)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    originalFilename,
    storedRelPath,
    thumbRelPath,
    mimeType,
    file.length,
    width,
    height
  );

  return getMediaById(result.lastInsertRowid as number)!;
}

// Get paginated list of media items
export function getMediaList(page: number = 1, limit: number = 50): MediaItem[] {
  const database = getDb();
  const offset = (page - 1) * limit;
  const rows = database.prepare(
    'SELECT * FROM media ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(limit, offset) as MediaItem[];
  return rows;
}

// Get a single media item by ID
export function getMediaById(id: number): MediaItem | undefined {
  const database = getDb();
  const row = database.prepare('SELECT * FROM media WHERE id = ?').get(id) as MediaItem | undefined;
  return row;
}

// Delete media: remove files from disk and database record
export function deleteMedia(id: number): boolean {
  const media = getMediaById(id);
  if (!media) return false;

  // Delete files from disk
  const originalAbsPath = path.join(process.cwd(), media.stored_path);
  const thumbnailAbsPath = media.thumbnail_path
    ? path.join(process.cwd(), media.thumbnail_path)
    : null;

  if (fs.existsSync(originalAbsPath)) {
    fs.unlinkSync(originalAbsPath);
  }
  if (thumbnailAbsPath && fs.existsSync(thumbnailAbsPath)) {
    fs.unlinkSync(thumbnailAbsPath);
  }

  // Delete database record
  const database = getDb();
  const result = database.prepare('DELETE FROM media WHERE id = ?').run(id);
  return result.changes > 0;
}

// Get the absolute file path for serving a media item
export function getMediaFilePath(id: number, type: 'original' | 'thumbnail'): string | null {
  const media = getMediaById(id);
  if (!media) return null;

  const relPath = type === 'original' ? media.stored_path : media.thumbnail_path;
  if (!relPath) return null;

  return path.join(process.cwd(), relPath);
}

// Get total count of media items
export function getTotalMediaCount(): number {
  const database = getDb();
  const row = database.prepare('SELECT COUNT(*) as count FROM media').get() as { count: number };
  return row.count;
}
