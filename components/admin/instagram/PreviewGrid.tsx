'use client';

import { useState } from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FiGrid, FiPlus } from 'react-icons/fi';
import GridCell from './GridCell';

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

interface PreviewGridProps {
  posts: InstagramPost[];
  selectedPostId: number | null;
  onSelectPost: (post: InstagramPost | null) => void;
  onRemovePost: (postId: number) => void;
  totalCells?: number;
}

export default function PreviewGrid({
  posts,
  selectedPostId,
  onSelectPost,
  onRemovePost,
  totalCells: initialCells = 12,
}: PreviewGridProps) {
  const [cellCount, setCellCount] = useState(initialCells);

  // Build a map of position → post
  const postsByPosition = new Map<number, InstagramPost>();
  posts.forEach((p) => postsByPosition.set(p.grid_position, p));

  // IDs for SortableContext (only filled cells are sortable)
  const sortableItems = posts.map((p) => `sortable-${p.id}`);

  return (
    <div className="flex-1 bg-gray-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiGrid className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Instagram Preview</h3>
        </div>
        <span className="text-xs text-gray-400">
          {posts.length} / {cellCount} cells
        </span>
      </div>

      {/* Grid */}
      <div className="max-w-lg mx-auto">
        <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: cellCount }, (_, i) => {
              const post = postsByPosition.get(i) || null;
              return (
                <GridCell
                  key={i}
                  position={i}
                  post={post}
                  isSelected={post ? post.id === selectedPostId : false}
                  onSelect={onSelectPost}
                  onRemove={onRemovePost}
                />
              );
            })}
          </div>
        </SortableContext>

        {/* Show more button */}
        <button
          type="button"
          onClick={() => setCellCount((c) => c + 3)}
          className="mt-3 w-full flex items-center justify-center gap-1 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-colors duration-200"
        >
          <FiPlus className="w-4 h-4" />
          Show more
        </button>
      </div>
    </div>
  );
}
