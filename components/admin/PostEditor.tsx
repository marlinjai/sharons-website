// components/admin/PostEditor.tsx
// Modern rich text editor with inline formatting using Tiptap

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

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

// Toolbar button component
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
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        isActive ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

// Preset colors for the color picker
const PRESET_COLORS = [
  { name: 'Brand Red', color: '#A32015' },
  { name: 'Dark Gray', color: '#374151' },
  { name: 'Black', color: '#111827' },
  { name: 'Blue', color: '#2563eb' },
  { name: 'Green', color: '#16a34a' },
  { name: 'Purple', color: '#7c3aed' },
  { name: 'Orange', color: '#ea580c' },
  { name: 'Teal', color: '#0d9488' },
];

// Editor toolbar component
function EditorToolbar({ editor }: { editor: Editor }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

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

  const currentColor = editor.getAttributes('textStyle').color || '#374151';

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
      {/* Headings */}
      <select
        value={
          editor.isActive('heading', { level: 1 }) ? '1' :
          editor.isActive('heading', { level: 2 }) ? '2' :
          editor.isActive('heading', { level: 3 }) ? '3' :
          editor.isActive('heading', { level: 4 }) ? '4' : '0'
        }
        onChange={(e) => {
          const level = parseInt(e.target.value);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 }).run();
          }
        }}
        className="px-2 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#A32015]"
      >
        <option value="0">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Basic formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold (Ctrl+B)">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic (Ctrl+I)">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline (Ctrl+U)">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>
      </ToolbarButton>

      {/* Text Color */}
      <div className="relative" ref={colorPickerRef}>
        <button
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          title="Text Color"
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"/>
          </svg>
          <div
            className="w-4 h-1 rounded-sm"
            style={{ backgroundColor: currentColor }}
          />
        </button>
        {showColorPicker && (
          <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-xl shadow-xl border border-gray-200 z-50 min-w-[160px]">
            <div className="text-xs font-medium text-gray-500 mb-3 text-center">Text Color</div>
            <div className="grid grid-cols-4 gap-3">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(preset.color).run();
                    setShowColorPicker(false);
                  }}
                  title={preset.name}
                  className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-gray-400 hover:scale-110 transition-all shadow-sm"
                  style={{ backgroundColor: preset.color }}
                />
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-3">
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                className="w-full text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-1.5 rounded-md transition-colors"
              >
                Remove color
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().sinkListItem('listItem').run()} disabled={!editor.can().sinkListItem('listItem')} title="Increase Indent">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().liftListItem('listItem').run()} disabled={!editor.can().liftListItem('listItem')} title="Decrease Indent">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Block elements */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Links and images */}
      <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Add Link">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={addImage} title="Add Image">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Clear formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/></svg>
      </ToolbarButton>
    </div>
  );
}

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

  // View mode: 'edit' or 'preview'
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Bubble menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  // Refs
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const bubbleColorMenuRef = useRef<HTMLDivElement>(null);

  // Tiptap editor instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[#A32015] underline font-medium hover:text-[#7f1810]' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-md my-8' },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post... Select text to format.',
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: initialData?.content || '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'blog-content outline-none',
      },
    },
  });

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('[DEBUG Global Click] Handler fired, target:', (event.target as HTMLElement)?.tagName);
      // Check if click is inside the color menu - if so, don't close
      if (bubbleColorMenuRef.current && bubbleColorMenuRef.current.contains(event.target as Node)) {
        console.log('[DEBUG Global Click] Click inside color menu, ignoring');
        return;
      }
      setShowColorMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Debug: Log showColorMenu state changes
  useEffect(() => {
    console.log('[DEBUG State] showColorMenu changed to:', showColorMenu);
  }, [showColorMenu]);

  // Debug: Log BubbleMenu dimensions when selection changes
  useEffect(() => {
    const bubbleMenu = document.querySelector('.bg-white.rounded-xl.shadow-xl');
    if (bubbleMenu) {
      const rect = bubbleMenu.getBoundingClientRect();
      console.log('[DEBUG BubbleMenu] Dimensions:', { width: rect.width, height: rect.height });
    }
  }, [editor?.state.selection]);

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

  // Loading state for editor
  if (!editor) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="animate-pulse bg-gray-100 rounded-2xl h-[600px] flex items-center justify-center">
          <span className="text-gray-400">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto relative">
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

      {/* Edit/Preview Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode('edit')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewMode === 'edit'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </span>
        </button>
        <button
          onClick={() => setViewMode('preview')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${viewMode === 'preview'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </span>
        </button>
      </div>

      {/* Content Editor - shown in edit mode */}
      {viewMode === 'edit' && (
        <>
          <div ref={editorContainerRef} className="post-editor-container bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <EditorToolbar editor={editor} />

            <style jsx global>{`
              /* Editor-specific styles (layout & interactive elements) */
              .post-editor-container .blog-content {
                max-width: 768px;
                margin: 0 auto;
                padding: 48px 24px;
                min-height: 500px;
              }

              /* Placeholder */
              .blog-content p.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: #9ca3af;
                pointer-events: none;
                height: 0;
              }

              /* Selection highlight */
              .blog-content ::selection {
                background: rgba(139, 92, 246, 0.3);
              }
            `}</style>

            {/* Bubble Menu for inline formatting */}
            <BubbleMenu
              editor={editor}
              tippyOptions={{
                duration: 100,
                placement: 'top',
                maxWidth: 'none',
                appendTo: () => document.body,
              }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 flex items-center gap-1 min-w-max"
            >
              {/* Heading/Paragraph dropdown */}
              <select
                value={
                  editor.isActive('heading', { level: 1 }) ? '1' :
                  editor.isActive('heading', { level: 2 }) ? '2' :
                  editor.isActive('heading', { level: 3 }) ? '3' : '0'
                }
                onChange={(e) => {
                  const level = parseInt(e.target.value);
                  if (level === 0) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
                  }
                }}
                className="px-1.5 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 focus:outline-none hover:bg-gray-100"
              >
                <option value="0">Normal</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>

              <div className="w-px h-5 bg-gray-200" />

              {/* Basic formatting */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Bold"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Italic"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Strikethrough"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>
              </button>

              <div className="w-px h-5 bg-gray-200" />

              {/* Text Color Dropdown */}
              <div className="relative" ref={bubbleColorMenuRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    console.log('[DEBUG Color Button] Clicked');
                    console.log('[DEBUG Color Button] showColorMenu before:', showColorMenu);
                    e.preventDefault();
                    e.stopPropagation();
                    setShowColorMenu(!showColorMenu);
                    console.log('[DEBUG Color Button] showColorMenu after toggle:', !showColorMenu);
                  }}
                  className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-1"
                  title="Text Color"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"/>
                  </svg>
                  <div
                    className="w-3 h-3 rounded-sm border border-gray-300"
                    style={{ backgroundColor: editor.getAttributes('textStyle').color || '#374151' }}
                  />
                </button>
                {showColorMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 min-w-[160px]">
                    {console.log('[DEBUG Color Menu] Rendering color picker dropdown')}
                    <div className="text-xs font-medium text-gray-500 mb-3 text-center">Text Color</div>
                    <div className="grid grid-cols-4 gap-3">
                      {PRESET_COLORS.map((preset) => (
                        <button
                          key={preset.color}
                          type="button"
                          onClick={(e) => {
                            console.log('[DEBUG Color Select] Color selected:', preset.color);
                            e.preventDefault();
                            e.stopPropagation();
                            const result = editor.chain().focus().setColor(preset.color).run();
                            console.log('[DEBUG Color Select] setColor result:', result);
                            setShowColorMenu(false);
                          }}
                          title={preset.name}
                          className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-gray-400 hover:scale-110 transition-all shadow-sm"
                          style={{ backgroundColor: preset.color }}
                        />
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-4 pt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          editor.chain().focus().unsetColor().run();
                          setShowColorMenu(false);
                        }}
                        className="w-full text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-1.5 rounded-md transition-colors"
                      >
                        Remove color
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-px h-5 bg-gray-200" />

              {/* Lists and Quote */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Bullet List"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Numbered List"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Quote"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
              </button>

              <div className="w-px h-5 bg-gray-200" />

              {/* Alignment */}
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Align Left"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Align Center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-[#A32015]' : 'text-gray-600'}`}
                title="Align Right"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>
              </button>
            </BubbleMenu>

            <EditorContent editor={editor} />
          </div>

          {/* Formatting Tip */}
          <div className="mt-4 text-center text-sm text-gray-400">
            Select text to see formatting options
          </div>
        </>
      )}

      {/* Preview Mode */}
      {viewMode === 'preview' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">Live Preview</span>
            {!published && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded">
                Draft
              </span>
            )}
          </div>

          <div
            className="relative h-[50vh] min-h-[400px] flex items-end"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${featuredImage || '/images/envelope-seal-horizontal.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 w-full px-8 pb-12">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-4 text-sm text-white/80">
                  <span className="uppercase tracking-wider font-medium">{category}</span>
                  <span>·</span>
                  <span>{readTime}</span>
                </div>
                <h1 className="font-secondary text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
                  {title || 'Untitled Post'}
                </h1>
                {subtitle && (
                  <p className="text-xl text-white/90 max-w-2xl">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          <div className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className="blog-content max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 text-center">No content yet. Switch to Edit mode to start writing.</p>' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
