'use client';

import MediaItem from './MediaItem';

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

interface MediaGridProps {
  items: MediaItemData[];
  gridPosts: InstagramPost[];
  onDelete: (id: number) => void;
}

export default function MediaGrid({ items, gridPosts, onDelete }: MediaGridProps) {
  const usedMediaIds = new Set(gridPosts.map((p) => p.media_id));

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <MediaItem
          key={item.id}
          item={item}
          isInGrid={usedMediaIds.has(item.id)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
