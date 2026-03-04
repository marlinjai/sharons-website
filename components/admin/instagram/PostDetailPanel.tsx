'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2 } from 'react-icons/fi';
import CaptionEditor from './CaptionEditor';
import HashtagInput from './HashtagInput';
import ScheduleDatePicker from './ScheduleDatePicker';

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

interface PostDetailPanelProps {
  post: InstagramPost;
  onUpdate: (
    id: number,
    data: {
      caption?: string;
      hashtags?: string;
      status?: string;
      scheduled_date?: string | null;
    }
  ) => void;
  onRemove: (postId: number) => void;
  onClose: () => void;
}

export default function PostDetailPanel({
  post,
  onUpdate,
  onRemove,
  onClose,
}: PostDetailPanelProps) {
  const [caption, setCaption] = useState(post.caption);
  const [hashtags, setHashtags] = useState(post.hashtags);
  const [status, setStatus] = useState(post.status);
  const [scheduledDate, setScheduledDate] = useState(post.scheduled_date);

  // Reset local state when the selected post changes
  useEffect(() => {
    setCaption(post.caption);
    setHashtags(post.hashtags);
    setStatus(post.status);
    setScheduledDate(post.scheduled_date);
  }, [post.id, post.caption, post.hashtags, post.status, post.scheduled_date]);

  const handleSave = () => {
    onUpdate(post.id, {
      caption,
      hashtags,
      status,
      scheduled_date: scheduledDate,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="detail-panel"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-96 shrink-0 bg-gray-800 rounded-xl p-6 overflow-y-auto max-h-[calc(100vh-8rem)] hidden xl:block"
      >
        {/* Close button */}
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Image preview */}
        <div className="aspect-square rounded-lg overflow-hidden mb-4">
          <img
            src={`/api/admin/instagram/media/${post.media.id}/file`}
            alt={post.media.alt_text || post.media.filename}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <CaptionEditor value={caption} onChange={setCaption} />
          <HashtagInput value={hashtags} onChange={setHashtags} />
          <ScheduleDatePicker value={scheduledDate} onChange={setScheduledDate} />

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'planned' | 'published')}
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
            >
              <option value="draft">Draft</option>
              <option value="planned">Planned</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => onRemove(post.id)}
              className="flex items-center gap-1 border border-red-500 text-red-400 hover:bg-red-500/10 font-medium py-2 px-3 rounded-lg transition-colors duration-200"
            >
              <FiTrash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
