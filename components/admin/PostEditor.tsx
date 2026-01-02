// components/admin/PostEditor.tsx
// Rich text editor for blog posts using Quill

'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface PostEditorProps {
  initialData?: {
    id?: number;
    title: string;
    subtitle: string;
    category: string;
    read_time: string;
    featured_image: string | null;
    content: string;
    published: boolean;
  };
  onSave: (data: {
    title: string;
    subtitle: string;
    category: string;
    read_time: string;
    featured_image: string | null;
    content: string;
    published: boolean;
  }) => Promise<void>;
  isNew?: boolean;
}

const CATEGORIES = ['Education', 'Guide', 'Personal', 'News', 'General'];

export default function PostEditor({ initialData, onSave, isNew = false }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [category, setCategory] = useState(initialData?.category || 'General');
  const [readTime, setReadTime] = useState(initialData?.read_time || '5 min read');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [published, setPublished] = useState(initialData?.published || false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      },
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'blockquote',
    'code-block',
    'link',
    'image',
    'color',
    'background',
  ];

  const handleSave = async (publish: boolean = published) => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave({
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
        read_time: readTime,
        featured_image: featuredImage || null,
        content,
        published: publish,
      });
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? 'Create New Post' : 'Edit Post'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2 bg-[#A32015] text-white rounded-lg hover:bg-[#8a1b12] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="Enter post title"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="Optional subtitle or excerpt"
          />
        </div>

        {/* Category and Read Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
            <input
              type="text"
              value={readTime}
              onChange={e => setReadTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
              placeholder="e.g., 5 min read"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featuredImage}
              onChange={e => setFeaturedImage(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          {featuredImage && (
            <div className="mt-2">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="h-32 w-auto object-cover rounded-lg"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="h-96"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="w-4 h-4 text-[#A32015] border-gray-300 rounded focus:ring-[#A32015]"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            Published (visible on blog)
          </label>
        </div>
      </div>
    </div>
  );
}

