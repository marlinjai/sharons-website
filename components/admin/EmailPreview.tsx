// components/admin/EmailPreview.tsx
// Reusable email preview component with iframe rendering and viewport toggle

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface EmailPreviewProps {
  // Type of email to preview
  type: 'welcome' | 'newsletter' | 'one-time';
  // Data to pass to the preview endpoint
  previewData: Record<string, unknown>;
  // Optional custom class name
  className?: string;
}

export default function EmailPreview({ type, previewData, className = '' }: EmailPreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch preview HTML from API
  const fetchPreview = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/email/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...previewData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate preview');
      }

      const htmlContent = await response.text();
      setHtml(htmlContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Preview failed');
    } finally {
      setLoading(false);
    }
  }, [type, previewData]);

  // Debounced preview update (300ms delay)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchPreview();
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [fetchPreview]);

  // Viewport dimensions
  const viewportStyles = {
    desktop: { width: '600px', maxWidth: '100%' },
    mobile: { width: '375px', maxWidth: '100%' },
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header with viewport toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">Preview</h3>

        <div className="flex items-center gap-2">
          {/* Viewport toggle buttons */}
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewport === 'desktop'
                ? 'bg-[#A32015] text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewport === 'mobile'
                ? 'bg-[#A32015] text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div
          className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
          style={viewportStyles[viewport]}
        >
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading preview...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500 text-center">
                <p className="font-medium">Preview Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && html && (
            <iframe
              srcDoc={html}
              title="Email Preview"
              className="w-full border-0"
              style={{ minHeight: '600px', height: 'auto' }}
              sandbox="allow-same-origin"
              onLoad={(e) => {
                // Auto-adjust iframe height to content
                const iframe = e.target as HTMLIFrameElement;
                if (iframe.contentWindow?.document.body) {
                  const height = iframe.contentWindow.document.body.scrollHeight;
                  iframe.style.height = `${height + 20}px`;
                }
              }}
            />
          )}

          {!loading && !error && !html && (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>No preview available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

