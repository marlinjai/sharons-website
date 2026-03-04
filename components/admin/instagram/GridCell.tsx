'use client';

import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

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

interface GridCellProps {
  position: number;
  post: InstagramPost | null;
  isSelected: boolean;
  onSelect: (post: InstagramPost | null) => void;
  onRemove: (postId: number) => void;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-400',
  planned: 'bg-yellow-400',
  published: 'bg-green-400',
};

function EmptyCell({ position }: { position: number }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `grid-${position}`,
    data: { type: 'grid-cell', position },
  });

  return (
    <div
      ref={setNodeRef}
      className={`aspect-square rounded border-2 border-dashed flex items-center justify-center transition-colors duration-200 ${
        isOver
          ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
      }`}
    >
      <FiPlus className={`w-5 h-5 ${isOver ? 'text-blue-400' : 'text-gray-500'}`} />
    </div>
  );
}

function FilledCell({
  post,
  position,
  isSelected,
  onSelect,
  onRemove,
}: {
  post: InstagramPost;
  position: number;
  isSelected: boolean;
  onSelect: (post: InstagramPost) => void;
  onRemove: (postId: number) => void;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `sortable-${post.id}`,
    data: { type: 'grid-post', post },
  });

  const { isOver } = useDroppable({
    id: `grid-${position}`,
    data: { type: 'grid-cell', position },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(post)}
      className={`aspect-square rounded overflow-hidden cursor-pointer group relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
        isOver ? 'ring-2 ring-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]' : ''
      }`}
    >
      <img
        src={`/api/admin/instagram/media/${post.media.id}/thumbnail`}
        alt={post.media.alt_text || post.media.filename}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center">
        <span className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {position + 1}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(post.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200"
        >
          <FiTrash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Status dot */}
      <div
        className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ${STATUS_COLORS[post.status] || STATUS_COLORS.draft}`}
      />
    </div>
  );
}

export default function GridCell({ position, post, isSelected, onSelect, onRemove }: GridCellProps) {
  if (!post) {
    return <EmptyCell position={position} />;
  }

  return (
    <FilledCell
      post={post}
      position={position}
      isSelected={isSelected}
      onSelect={onSelect}
      onRemove={onRemove}
    />
  );
}
