// components/admin/PostEditor.tsx
// Modern rich text editor for blog posts with AI assistance

'use client';

import { useState, useMemo } from 'react';
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

// AI quick actions
const AI_PROMPTS = [
  { label: 'Improve writing', prompt: 'Improve this text, making it more engaging and professional:' },
  { label: 'Make concise', prompt: 'Make this text more concise while keeping the key points:' },
  { label: 'Expand', prompt: 'Expand on this text with more detail and examples:' },
  { label: 'Fix grammar', prompt: 'Fix any grammar and spelling errors in this text:' },
  { label: 'Add conclusion', prompt: 'Write a compelling conclusion for this blog post:' },
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

  // AI state
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiError, setAiError] = useState('');


  // Quill modules - enhanced toolbar
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
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'blockquote',
    'code-block',
    'link',
    'image',
    'color',
    'background',
    'align',
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

  // AI content generation
  const handleAIGenerate = async (customPrompt?: string) => {
    const prompt = customPrompt || aiPrompt;
    if (!prompt.trim()) return;

    setAiLoading(true);
    setAiError('');
    setAiResult('');

    try {
      const res = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          context: content ? `Current content:\n${content.replace(/<[^>]*>/g, '')}` : '',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'AI request failed');
      }

      const data = await res.json();
      setAiResult(data.result);
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate content');
    } finally {
      setAiLoading(false);
    }
  };

  const insertAIResult = () => {
    if (!aiResult) return;
    // Append AI result to content
    setContent(prev => prev + `<p>${aiResult}</p>`);
    setAiResult('');
    setAiPrompt('');
    setShowAI(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
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
              onClick={() => setShowAI(!showAI)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                showAI
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Assist
            </button>
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

      <div className="flex gap-6">
        {/* Main Editor */}
        <div className="flex-1 min-w-0">
          {/* Title Input - Large and prominent */}
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-3xl font-semibold text-gray-900 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0"
              placeholder="Post title..."
            />
          </div>

          {/* Subtitle - Secondary */}
          <div className="mb-6">
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full text-lg text-gray-600 bg-transparent border-0 outline-none placeholder:text-gray-300 focus:ring-0"
              placeholder="Add a subtitle or excerpt..."
            />
          </div>

          {/* Collapsible Metadata Section */}
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

          {/* Content Editor - Main focus area */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <style jsx global>{`
              .ql-container {
                font-family: inherit;
                font-size: 16px;
                min-height: 600px;
              }
              .ql-editor {
                min-height: 600px;
                padding: 24px 32px;
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
            `}</style>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Start writing your post..."
            />
          </div>
        </div>

        {/* AI Assistant Panel */}
        {showAI && (
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-xs text-gray-500">Powered by GPT</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Quick Actions */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_PROMPTS.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setAiPrompt(item.prompt);
                          handleAIGenerate(item.prompt);
                        }}
                        disabled={aiLoading}
                        className="px-3 py-1.5 text-xs bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-purple-700 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Prompt */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Custom Prompt</p>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="Ask AI to help with your content..."
                    className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-900 resize-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
                    rows={3}
                  />
                  <button
                    onClick={() => handleAIGenerate()}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {aiLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generating...
                      </>
                    ) : (
                      'Generate'
                    )}
                  </button>
                </div>

                {/* Error */}
                {aiError && (
                  <div className="p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                    {aiError}
                  </div>
                )}

                {/* Result */}
                {aiResult && (
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Result</p>
                    <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-700 max-h-64 overflow-y-auto">
                      {aiResult}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={insertAIResult}
                        className="flex-1 px-3 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-xl hover:bg-green-100 transition-colors"
                      >
                        Insert
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(aiResult);
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => setAiResult('')}
                        className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Setup hint */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500">
                  💡 Add <code className="bg-gray-200 px-1 rounded">OPENAI_API_KEY</code> to your environment variables to enable AI features.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
