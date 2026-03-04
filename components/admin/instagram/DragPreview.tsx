'use client';

interface MediaItem {
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

interface DragPreviewProps {
  item: MediaItem;
}

export default function DragPreview({ item }: DragPreviewProps) {
  return (
    <div
      className="w-[100px] h-[100px] rounded-lg shadow-xl overflow-hidden"
      style={{ transform: 'rotate(3deg)' }}
    >
      <img
        src={`/api/admin/instagram/media/${item.id}/thumbnail`}
        alt={item.alt_text || item.filename}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
