// components/admin/PostEditor.tsx
// Modern rich text editor with inline AI assistance using Tiptap

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
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

// Inline AI actions for selected text
const AI_ACTIONS = [
  { id: 'improve', label: 'Improve', icon: '✨', prompt: 'Improve this text, making it more engaging and professional. Return only the improved text:' },
  { id: 'shorter', label: 'Shorter', icon: '📝', prompt: 'Make this text more concise while keeping the key message. Return only the shortened text:' },
  { id: 'longer', label: 'Expand', icon: '📖', prompt: 'Expand this text with more detail and depth. Return only the expanded text:' },
  { id: 'grammar', label: 'Fix', icon: '🔧', prompt: 'Fix any grammar, spelling, and punctuation errors. Return only the corrected text:' },
  { id: 'friendly', label: 'Friendly', icon: '😊', prompt: 'Rewrite this in a warmer, more friendly tone. Return only the rewritten text:' },
  { id: 'professional', label: 'Professional', icon: '💼', prompt: 'Rewrite this in a more professional tone. Return only the rewritten text:' },
];

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

// Editor toolbar component
function EditorToolbar({ editor }: { editor: Editor }) {
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

  // Inline AI state
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ from: number; to: number } | null>(null);
  const [aiToolbarPos, setAiToolbarPos] = useState<{ top: number; left: number } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  // Refs
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<{ text: string; from: number; to: number } | null>(null);
  const toolbarInteractingRef = useRef(false);

  // Hide AI toolbar helper
  const hideAiToolbar = useCallback(() => {
    setSelectedText('');
    setSelectionRange(null);
    setAiToolbarPos(null);
    setShowCustomPrompt(false);
    setCustomPrompt('');
    toolbarInteractingRef.current = false;
    savedSelectionRef.current = null;
  }, []);

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
        placeholder: 'Start writing your post... Select any text to use AI assistance.',
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
    onSelectionUpdate: ({ editor }) => {
      // Don't process if toolbar is being interacted with
      if (toolbarInteractingRef.current || aiLoading) return;

      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ').trim();

      if (text.length > 2) {
        setSelectedText(text);
        setSelectionRange({ from, to });
        savedSelectionRef.current = { text, from, to };

        // Position the AI toolbar above the selection
        const containerRect = editorContainerRef.current?.getBoundingClientRect();
        if (containerRect) {
          // Get coordinates from the editor view
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
        class: 'tiptap-editor outline-none',
      },
    },
  });

  // Apply AI transformation using Tiptap's chain API
  const applyAiAction = async (action: typeof AI_ACTIONS[0] | { prompt: string }) => {
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
        // Use Tiptap's chain API to replace text - this is the key improvement!
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

  // Handle custom prompt submission
  const handleCustomPrompt = () => {
    if (!customPrompt.trim()) return;
    applyAiAction({ prompt: `${customPrompt.trim()} Return only the transformed text:` });
    setCustomPrompt('');
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
      {/* Floating AI Toolbar */}
      {aiToolbarPos && (selectedText || showCustomPrompt || aiLoading) && (
        <div
          id="ai-toolbar"
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
                  placeholder="What should AI do with this text?"
                  className="w-64 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none placeholder:text-gray-500"
                  autoFocus
                />
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toolbarInteractingRef.current = true;
                  }}
                  onClick={handleCustomPrompt}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => hideAiToolbar()}
                  className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg transition-colors"
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
                    className="px-2.5 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1.5"
                    title={action.label}
                  >
                    <span>{action.icon}</span>
                    <span className="hidden sm:inline">{action.label}</span>
                  </button>
                ))}
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toolbarInteractingRef.current = true;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowCustomPrompt(true);
                  }}
                  className="px-2.5 py-1.5 text-sm text-purple-400 hover:text-purple-300 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1.5 border-l border-gray-700 ml-1 pl-3"
                  title="Custom prompt"
                >
                  <span>💬</span>
                  <span className="hidden sm:inline">Custom</span>
                </button>
                <button
                  onMouseDown={(e) => e.preventDefault()}
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
              </div>
            )}
          </div>
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
          <div ref={editorContainerRef} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <EditorToolbar editor={editor} />

            <style jsx global>{`
              /* Editor container */
              .tiptap-editor {
                max-width: 768px;
                margin: 0 auto;
                padding: 48px 24px;
                min-height: 500px;
                font-size: 1.125rem;
                line-height: 1.778;
                color: #374151;
              }

              /* Headings */
              .tiptap-editor h1 {
                font-size: 2.25em;
                font-weight: 700;
                line-height: 1.1;
                margin-top: 0;
                margin-bottom: 0.889em;
                color: #111827;
              }
              .tiptap-editor h2 {
                font-size: 1.5em;
                font-weight: 700;
                line-height: 1.333;
                margin-top: 1.778em;
                margin-bottom: 0.889em;
                color: #111827;
              }
              .tiptap-editor h3 {
                font-size: 1.25em;
                font-weight: 600;
                line-height: 1.556;
                margin-top: 1.556em;
                margin-bottom: 0.444em;
                color: #111827;
              }
              .tiptap-editor h4 {
                font-weight: 600;
                line-height: 1.556;
                margin-top: 1.333em;
                margin-bottom: 0.444em;
                color: #111827;
              }

              /* Paragraphs */
              .tiptap-editor p {
                margin-top: 1.333em;
                margin-bottom: 1.333em;
              }
              .tiptap-editor p:first-child {
                margin-top: 0;
              }

              /* Lists */
              .tiptap-editor ul, .tiptap-editor ol {
                margin-top: 1.333em;
                margin-bottom: 1.333em;
                padding-left: 1.556em;
              }
              .tiptap-editor li {
                margin-top: 0.444em;
                margin-bottom: 0.444em;
              }
              .tiptap-editor ul { list-style-type: disc; }
              .tiptap-editor ol { list-style-type: decimal; }
              .tiptap-editor li > p { margin: 0; }

              /* Blockquote */
              .tiptap-editor blockquote {
                font-style: italic;
                font-weight: 500;
                color: #111827;
                border-left: 4px solid #e5e7eb;
                padding-left: 1em;
                margin: 1.778em 0;
              }
              .tiptap-editor blockquote p { margin: 0; }

              /* Code blocks */
              .tiptap-editor pre {
                background-color: #1f2937;
                color: #e5e7eb;
                border-radius: 0.375rem;
                padding: 1em;
                margin: 1.778em 0;
                overflow-x: auto;
                font-size: 0.889em;
                line-height: 1.75;
                font-family: ui-monospace, monospace;
              }
              .tiptap-editor code {
                font-size: 0.889em;
                font-family: ui-monospace, monospace;
              }
              .tiptap-editor :not(pre) > code {
                background-color: #f3f4f6;
                padding: 0.2em 0.4em;
                border-radius: 0.25rem;
                color: #111827;
              }

              /* Links */
              .tiptap-editor a {
                color: #A32015;
                text-decoration: underline;
                font-weight: 500;
              }
              .tiptap-editor a:hover {
                color: #7f1810;
              }

              /* Images */
              .tiptap-editor img {
                margin: 1.778em 0;
                border-radius: 0.375rem;
                max-width: 100%;
                height: auto;
              }

              /* Strong/Bold */
              .tiptap-editor strong {
                font-weight: 600;
                color: #111827;
              }

              /* Horizontal rule */
              .tiptap-editor hr {
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 3em 0;
              }

              /* Placeholder */
              .tiptap-editor p.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: #9ca3af;
                pointer-events: none;
                height: 0;
              }

              /* Selection highlight */
              .tiptap-editor ::selection {
                background: rgba(139, 92, 246, 0.3);
              }
            `}</style>

            <EditorContent editor={editor} />
          </div>

          {/* AI Hint */}
          <div className="mt-4 text-center text-sm text-gray-400">
            💡 <strong>Tip:</strong> Select any text in the editor to see AI options (improve, shorten, expand, fix grammar)
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
                className="prose prose-lg max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 text-center">No content yet. Switch to Edit mode to start writing.</p>' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
