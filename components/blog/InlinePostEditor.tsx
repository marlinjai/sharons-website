// components/blog/InlinePostEditor.tsx
// Inline rich text editor for editing posts directly on the blog listing page using Tiptap

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

interface PostData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  content: string;
  published: boolean;
}

interface InlinePostEditorProps {
  postId: number;
  onSave: (updatedPost: PostData) => void;
  onCancel: () => void;
}

const CATEGORIES = ['Education', 'Guide', 'Personal', 'News', 'General'];

// Inline AI actions for selected text
const AI_ACTIONS = [
  { id: 'improve', label: 'Improve', icon: '✨', prompt: 'Improve this text, making it more engaging and professional. Return only the improved text:' },
  { id: 'shorter', label: 'Shorter', icon: '📝', prompt: 'Make this text more concise while keeping the key message. Return only the shortened text:' },
  { id: 'longer', label: 'Expand', icon: '📖', prompt: 'Expand this text with more detail and depth. Return only the expanded text:' },
  { id: 'grammar', label: 'Fix', icon: '🔧', prompt: 'Fix any grammar, spelling, and punctuation errors. Return only the corrected text:' },
];

// Compact toolbar button
function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
        isActive ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

// Compact toolbar for inline editor
function CompactToolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
      {/* Headings */}
      <select
        value={
          editor.isActive('heading', { level: 2 }) ? '2' :
          editor.isActive('heading', { level: 3 }) ? '3' : '0'
        }
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: level as 2 | 3 }).run();
          }
        }}
        className="px-1.5 py-1 text-xs border border-gray-300 rounded bg-white text-gray-600 focus:outline-none"
      >
        <option value="0">Normal</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Add Link">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/></svg>
      </ToolbarButton>
    </div>
  );
}

export default function InlinePostEditor({ postId, onSave, onCancel }: InlinePostEditorProps) {
  // Loading state for fetching post data
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('General');
  const [readTime, setReadTime] = useState('5 min read');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [slug, setSlug] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showMetadata, setShowMetadata] = useState(false);

  // AI toolbar state
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ from: number; to: number } | null>(null);
  const [aiToolbarPos, setAiToolbarPos] = useState<{ top: number; left: number } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Refs
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<{ text: string; from: number; to: number } | null>(null);
  const toolbarInteractingRef = useRef(false);

  // Hide AI toolbar
  const hideAiToolbar = useCallback(() => {
    setSelectedText('');
    setSelectionRange(null);
    setAiToolbarPos(null);
    setShowCustomPrompt(false);
    setCustomPrompt('');
    toolbarInteractingRef.current = false;
    savedSelectionRef.current = null;
  }, []);

  // Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[#A32015] underline font-medium hover:text-[#7f1810]' },
      }),
      Placeholder.configure({
        placeholder: 'Write your post content...',
      }),
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      if (toolbarInteractingRef.current || aiLoading) return;

      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ').trim();

      if (text.length > 2) {
        setSelectedText(text);
        setSelectionRange({ from, to });
        savedSelectionRef.current = { text, from, to };

        const containerRect = editorContainerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const coords = editor.view.coordsAtPos(from);
          const endCoords = editor.view.coordsAtPos(to);
          const centerX = (coords.left + endCoords.left) / 2;

          setAiToolbarPos({
            top: coords.top + window.scrollY - 55,
            left: centerX,
          });
        }
      } else if (!showCustomPrompt) {
        hideAiToolbar();
      }
    },
    editorProps: {
      attributes: {
        class: 'blog-content outline-none',
      },
    },
  });

  // Fetch full post data on mount
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/posts/${postId}`);
        if (!res.ok) throw new Error('Failed to load post');
        const post = await res.json();

        setTitle(post.title || '');
        setSubtitle(post.subtitle || '');
        setCategory(post.category || 'General');
        setReadTime(post.read_time || '5 min read');
        setFeaturedImage(post.featured_image || '');
        setContent(post.content || '');
        setPublished(post.published || false);
        setSlug(post.slug || '');

        // Set editor content after fetching
        if (editor) {
          editor.commands.setContent(post.content || '');
        }
      } catch (err: any) {
        setLoadError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId, editor]);

  // Scroll into view when editor opens
  useEffect(() => {
    if (!loading && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading]);

  // Apply AI transformation using Tiptap's chain API
  const applyAiAction = async (action: { prompt: string }) => {
    const saved = savedSelectionRef.current;

    if (!saved || !editor) {
      alert('Please select some text first');
      toolbarInteractingRef.current = false;
      return;
    }

    const textToTransform = saved.text;
    const { from, to } = saved;

    setAiLoading(true);
    setShowCustomPrompt(false);

    try {
      const res = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: action.prompt,
          selectedText: textToTransform,
          articleContext: {
            title,
            subtitle,
            category,
            fullContent: content,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'AI request failed');
      }

      const data = await res.json();
      const result = data.result?.trim();

      if (result) {
        // Use Tiptap's chain API - this works reliably!
        editor.chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, result)
          .run();

        setContent(editor.getHTML());
      }

      savedSelectionRef.current = null;
      hideAiToolbar();
    } catch (err: any) {
      console.error('AI error:', err);
      alert(err.message || 'AI transformation failed');
    } finally {
      setAiLoading(false);
      toolbarInteractingRef.current = false;
    }
  };

  const handleCustomPrompt = () => {
    if (!customPrompt.trim()) return;
    applyAiAction({ prompt: `${customPrompt.trim()} Return only the transformed text:` });
    setCustomPrompt('');
  };

  // Save handler
  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          category,
          read_time: readTime,
          featured_image: featuredImage || null,
          content,
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      const updatedPost = await res.json();
      onSave(updatedPost);
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-gray-100 rounded"></div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8">
        <p className="text-red-600 mb-4">{loadError}</p>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    );
  }

  // Loading state for editor
  if (!editor) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 animate-pulse">
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-gray-400">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300">
      {/* Floating AI Toolbar */}
      {aiToolbarPos && (selectedText || showCustomPrompt || aiLoading) && (
        <div
          className="fixed z-[9999] transform -translate-x-1/2"
          style={{ top: aiToolbarPos.top, left: aiToolbarPos.left }}
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150">
            {aiLoading ? (
              <div className="px-4 py-2 text-white text-sm flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Transforming...
              </div>
            ) : showCustomPrompt ? (
              <div
                className="flex items-center gap-2 p-1"
                onMouseEnter={() => { toolbarInteractingRef.current = true; }}
              >
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onFocus={() => { toolbarInteractingRef.current = true; }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomPrompt();
                    } else if (e.key === 'Escape') {
                      setShowCustomPrompt(false);
                      setCustomPrompt('');
                    }
                  }}
                  placeholder="What should AI do?"
                  className="w-52 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toolbarInteractingRef.current = true;
                  }}
                  onClick={handleCustomPrompt}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                >
                  Apply
                </button>
                <button
                  onClick={() => hideAiToolbar()}
                  className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                className="flex items-center gap-1"
                onMouseEnter={() => { toolbarInteractingRef.current = true; }}
              >
                <span className="px-2 text-gray-400 text-xs font-medium">AI:</span>
                {AI_ACTIONS.map(action => (
                  <button
                    key={action.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toolbarInteractingRef.current = true;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      applyAiAction(action);
                    }}
                    className="px-2 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1"
                    title={action.label}
                  >
                    <span>{action.icon}</span>
                    <span className="hidden sm:inline text-xs">{action.label}</span>
                  </button>
                ))}
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toolbarInteractingRef.current = true;
                  }}
                  onClick={() => setShowCustomPrompt(true)}
                  className="px-2 py-1.5 text-sm text-purple-400 hover:text-purple-300 hover:bg-gray-800 rounded-lg border-l border-gray-700 ml-1 pl-2"
                  title="Custom"
                >
                  <span>💬</span>
                </button>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => hideAiToolbar()}
                  className="ml-1 p-1.5 text-gray-500 hover:text-gray-300 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 rotate-45" />
        </div>
      )}

      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Editing Post</span>
          {!published && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
              Draft
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#A32015] text-white text-sm font-medium rounded-lg hover:bg-[#8a1b12] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Editor Content */}
      <div className="p-6">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-semibold text-gray-900 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0 mb-2"
          placeholder="Post title..."
        />

        {/* Subtitle */}
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full text-base text-gray-600 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0 mb-4"
          placeholder="Subtitle or excerpt..."
        />

        {/* Collapsible Metadata */}
        <div className="mb-4">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className={`w-3 h-3 transition-transform ${showMetadata ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Post Settings
          </button>

          {showMetadata && (
            <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                    placeholder="5 min read"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`relative w-9 h-5 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-4' : ''}`} />
                    </div>
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-xs text-gray-600">
                      {published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div ref={editorContainerRef} className="inline-editor-container border border-gray-200 rounded-xl overflow-hidden">
          <CompactToolbar editor={editor} />

          <style jsx global>{`
            /* Editor-specific styles (layout & interactive elements) */
            .inline-editor-container .blog-content {
              max-width: 768px;
              margin: 0 auto;
              padding: 32px 24px;
              min-height: 350px;
            }
          `}</style>

          <EditorContent editor={editor} />
        </div>

        {/* AI Hint */}
        <div className="mt-3 text-center text-xs text-gray-400">
          Select text for AI assistance
        </div>
      </div>
    </div>
  );
}
