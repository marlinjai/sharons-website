// components/admin/PostEditor.tsx
// Modern rich text editor with inline AI assistance

'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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

// Inline AI actions for selected text
const AI_ACTIONS = [
  { id: 'improve', label: 'Improve', icon: '✨', prompt: 'Improve this text, making it more engaging and professional. Return only the improved text:' },
  { id: 'shorter', label: 'Shorter', icon: '📝', prompt: 'Make this text more concise while keeping the key message. Return only the shortened text:' },
  { id: 'longer', label: 'Expand', icon: '📖', prompt: 'Expand this text with more detail and depth. Return only the expanded text:' },
  { id: 'grammar', label: 'Fix', icon: '🔧', prompt: 'Fix any grammar, spelling, and punctuation errors. Return only the corrected text:' },
  { id: 'friendly', label: 'Friendly', icon: '😊', prompt: 'Rewrite this in a warmer, more friendly tone. Return only the rewritten text:' },
  { id: 'professional', label: 'Professional', icon: '💼', prompt: 'Rewrite this in a more professional tone. Return only the rewritten text:' },
];

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
  const [showMetadata, setShowMetadata] = useState(true);

  // Inline AI state
  const [selectedText, setSelectedText] = useState('');
  const [aiToolbarPos, setAiToolbarPos] = useState<{ top: number; left: number } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Editor container reference
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Quill modules
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
    }),
    []
  );

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'blockquote', 'code-block',
    'link', 'image', 'color', 'background', 'align',
  ];

  // Handle mouse up to detect text selection
  useEffect(() => {
    const handleMouseUp = () => {
      // Small delay to let selection complete
      setTimeout(() => {
        const selection = window.getSelection();
        const selectedStr = selection?.toString().trim() || '';

        if (selectedStr.length > 2 && editorContainerRef.current) {
          // Check if selection is within our editor
          const editorEl = editorContainerRef.current.querySelector('.ql-editor');
          if (selection && editorEl && editorEl.contains(selection.anchorNode)) {
            setSelectedText(selectedStr);

            // Get selection bounds for positioning toolbar
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setAiToolbarPos({
              top: rect.top + window.scrollY - 55,
              left: rect.left + (rect.width / 2),
            });

          } else {
            hideAiToolbar();
          }
        } else {
          hideAiToolbar();
        }
      }, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Hide toolbar if clicking outside of it
      const toolbar = document.getElementById('ai-toolbar');
      if (toolbar && !toolbar.contains(e.target as Node)) {
        // Don't hide immediately - let mouseup handle selection
      }
    };

    const handleKeyDown = () => {
      // Hide on any key press
      hideAiToolbar();
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const hideAiToolbar = () => {
    setSelectedText('');
    setAiToolbarPos(null);
  };

  // Apply AI transformation to selected text
  const applyAiAction = async (action: typeof AI_ACTIONS[0]) => {
    if (!selectedText) return;

    // Store the current selection before async operation
    const textToReplace = selectedText;
    
    setAiLoading(true);
    try {
      const res = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: action.prompt,
          context: textToReplace,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'AI request failed');
      }

      const data = await res.json();
      const result = data.result?.trim();

      if (result) {
        // Replace in content using string replacement
        // This is simpler and works without needing Quill's internal state
        const newContent = content.replace(textToReplace, result);
        setContent(newContent);
      }

      hideAiToolbar();
    } catch (err: any) {
      console.error('AI error:', err);
      alert(err.message || 'AI transformation failed');
    } finally {
      setAiLoading(false);
    }
  };

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
    <div className="max-w-5xl mx-auto relative">
      {/* Floating AI Toolbar */}
      {aiToolbarPos && selectedText && (
        <div
          id="ai-toolbar"
          className="fixed z-50 transform -translate-x-1/2"
          style={{ top: aiToolbarPos.top, left: aiToolbarPos.left }}
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl p-1.5 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-150">
            {aiLoading ? (
              <div className="px-4 py-2 text-white text-sm flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Transforming...
              </div>
            ) : (
              <>
                <span className="px-2 text-gray-400 text-xs font-medium">AI:</span>
                {AI_ACTIONS.map(action => (
                  <button
                    key={action.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      applyAiAction(action);
                    }}
                    className="px-2.5 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1.5"
                    title={action.label}
                  >
                    <span>{action.icon}</span>
                    <span className="hidden sm:inline">{action.label}</span>
                  </button>
                ))}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    hideAiToolbar();
                  }}
                  className="ml-1 p-1.5 text-gray-500 hover:text-gray-300 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 rotate-45" />
        </div>
      )}

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-gray-100 -mx-4 px-4 py-4 mb-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {isNew ? 'New Post' : 'Edit Post'}
            </h1>
            {!isNew && (
              <p className="text-sm text-gray-500 mt-1">
                {published ? '● Published' : '○ Draft'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg text-purple-700 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Select text for AI
            </div>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-5 py-2.5 bg-[#A32015] text-white rounded-xl font-medium hover:bg-[#8a1b12] transition-all disabled:opacity-50 shadow-sm"
            >
              {saving ? 'Saving...' : published ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Title Input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-3xl font-semibold text-gray-900 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0"
          placeholder="Post title..."
        />
      </div>

      {/* Subtitle */}
      <div className="mb-6">
        <input
          type="text"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          className="w-full text-lg text-gray-600 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0"
          placeholder="Add a subtitle or excerpt..."
        />
      </div>

      {/* Collapsible Metadata */}
      <div className="mb-6">
        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-3"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showMetadata ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Post Settings
        </button>

        {showMetadata && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#A32015]/20 focus:bg-white transition-all"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={e => setReadTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#A32015]/20 focus:bg-white transition-all"
                  placeholder="5 min read"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-5' : ''}`} />
                  </div>
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {published ? 'Published' : 'Draft'}
                  </span>
                </label>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Featured Image
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={e => setFeaturedImage(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#A32015]/20 focus:bg-white transition-all text-sm"
                  placeholder="Paste image URL (Unsplash, etc.)"
                />
                {featuredImage && (
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {featuredImage && (
                <div className="mt-3">
                  <img
                    src={featuredImage}
                    alt="Featured preview"
                    className="h-24 w-auto object-cover rounded-xl"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Editor */}
      <div ref={editorContainerRef} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <style jsx global>{`
          .ql-container {
            font-family: inherit;
            font-size: 16px;
            min-height: 550px;
          }
          .ql-editor {
            min-height: 550px;
            padding: 28px 36px;
            line-height: 1.8;
          }
          .ql-editor h1 { font-size: 2em; font-weight: 600; margin-bottom: 0.5em; }
          .ql-editor h2 { font-size: 1.5em; font-weight: 600; margin-bottom: 0.5em; color: #A32015; }
          .ql-editor h3 { font-size: 1.25em; font-weight: 600; margin-bottom: 0.5em; }
          .ql-editor p { margin-bottom: 1em; }
          .ql-editor blockquote {
            border-left: 4px solid #A32015;
            padding-left: 16px;
            margin: 1.5em 0;
            color: #666;
            font-style: italic;
          }
          .ql-toolbar.ql-snow {
            border: none;
            border-bottom: 1px solid #f0f0f0;
            padding: 12px 16px;
            background: #fafafa;
          }
          .ql-container.ql-snow {
            border: none;
          }
          .ql-snow .ql-picker {
            color: #666;
          }
          .ql-snow .ql-stroke {
            stroke: #666;
          }
          .ql-snow .ql-fill {
            fill: #666;
          }
          .ql-snow.ql-toolbar button:hover,
          .ql-snow .ql-toolbar button:hover {
            color: #A32015;
          }
          .ql-snow.ql-toolbar button:hover .ql-stroke,
          .ql-snow .ql-toolbar button:hover .ql-stroke {
            stroke: #A32015;
          }
          .ql-snow.ql-toolbar button.ql-active .ql-stroke,
          .ql-snow .ql-toolbar button.ql-active .ql-stroke {
            stroke: #A32015;
          }
          .ql-editor::selection,
          .ql-editor *::selection {
            background: rgba(139, 92, 246, 0.3);
          }
        `}</style>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Start writing your post... Select any text to use AI assistance."
        />
      </div>

      {/* AI Hint */}
      <div className="mt-4 text-center text-sm text-gray-400">
        💡 <strong>Tip:</strong> Select any text in the editor to see AI options (improve, shorten, expand, fix grammar)
      </div>
    </div>
  );
}
