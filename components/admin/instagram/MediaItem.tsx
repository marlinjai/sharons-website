'use client';

import { useDraggable } from '@dnd-kit/core';
import { FiTrash2, FiCheck } from 'react-icons/fi';

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

interface MediaItemProps {
  item: MediaItemData;
  isInGrid: boolean;
  onDelete: (id: number) => void;
}

export default function MediaItem({ item, isInGrid, onDelete }: MediaItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `media-${item.id}`,
    data: { type: 'media-item', item },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`relative aspect-square rounded-lg overflow-hidden cursor-grab active:cursor-grabbing group transition-opacity duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      title={item.filename}
    >
      <img
        src={`/api/admin/instagram/media/${item.id}/thumbnail`}
        alt={item.alt_text || item.filename}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
        {/* Delete button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(item.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200"
          title="Delete"
        >
          <FiTrash2 className="w-3 h-3" />
        </button>
      </div>

      {/* In-grid indicator */}
      {isInGrid && (
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <FiCheck className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
}
