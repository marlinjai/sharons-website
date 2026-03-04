'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import UploadDropZone from './UploadDropZone';
import MediaGrid from './MediaGrid';

interface MediaItemData {
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

interface InstagramPost {
  id: number;
  media_id: number;
  grid_position: number;
  caption: string;
  hashtags: string;
  status: 'draft' | 'planned' | 'published';
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
  media: MediaItemData;
}

interface MediaBrowserProps {
  mediaItems: MediaItemData[];
  gridPosts: InstagramPost[];
  onUploadComplete: () => void;
  onMediaDelete: (id: number) => void;
}

export default function MediaBrowser({
  mediaItems,
  gridPosts,
  onUploadComplete,
  onMediaDelete,
}: MediaBrowserProps) {
  const [search, setSearch] = useState('');

  const filtered = search
    ? mediaItems.filter((m) =>
        m.filename.toLowerCase().includes(search.toLowerCase())
      )
    : mediaItems;

  return (
    <div className="w-80 shrink-0 bg-gray-800 rounded-xl p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Media Library</h3>
        <span className="text-xs text-gray-400">{mediaItems.length} items</span>
      </div>

      {/* Upload Zone */}
      <div className="mb-3">
        <UploadDropZone onUploadComplete={onUploadComplete} />
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name..."
          className="w-full bg-gray-700 text-white text-sm rounded-lg pl-8 pr-3 py-1.5 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-gray-500 transition-colors duration-200"
        />
      </div>

      {/* Scrollable media grid */}
      <div className="overflow-y-auto max-h-[calc(100vh-12rem)] flex-1">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            {search ? 'No matching media' : 'No media uploaded yet'}
          </p>
        ) : (
          <MediaGrid items={filtered} gridPosts={gridPosts} onDelete={onMediaDelete} />
        )}
      </div>
    </div>
  );
}
