// app/admin/newsletter/page.tsx
// Newsletter management page - compose and send newsletters

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  published: boolean;
}

export default function NewsletterPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [subject, setSubject] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [customContent, setCustomContent] = useState('');

  const router = useRouter();

  // Check auth and fetch posts
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin');
          return;
        }

        const postsRes = await fetch('/api/admin/posts');
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(postsData.filter((p: Post) => p.published));
        }
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  // Auto-fill when post is selected
  const handlePostSelect = (postId: number | null) => {
    setSelectedPostId(postId);
    if (postId) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSubject(`New from ReTurn: ${post.title}`);
      }
    }
  };

  const handleSend = async () => {
    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }

    setSending(true);
    setError('');
    setSuccess('');

    try {
      const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;

      const newsletterData = {
        subject,
        issueNumber: issueNumber || undefined,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        featuredStory: selectedPost
          ? {
              title: selectedPost.title,
              excerpt: selectedPost.subtitle || 'Read the full article on our blog.',
              url: `https://returnhypnosis.com/blog/${selectedPost.slug}`,
              category: selectedPost.category,
              readTime: selectedPost.read_time,
            }
          : undefined,
        sections: customContent
          ? [
              {
                type: 'text',
                content: customContent,
              },
            ]
          : [],
      };

      const res = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterData),
      });

      if (res.ok) {
        setSuccess('Newsletter sent successfully!');
        setSubject('');
        setIssueNumber('');
        setSelectedPostId(null);
        setCustomContent('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send newsletter');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">ReTurn Admin</h1>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Posts
            </Link>
            <span className="text-[#A32015] font-medium">Newsletter</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Newsletter</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Line *
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
                placeholder="e.g., New from ReTurn: Understanding Your Mind"
              />
            </div>

            {/* Issue Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Number (optional)
              </label>
              <input
                type="text"
                value={issueNumber}
                onChange={e => setIssueNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
                placeholder="e.g., 12"
              />
            </div>

            {/* Featured Post */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feature a Blog Post (optional)
              </label>
              <select
                value={selectedPostId || ''}
                onChange={e =>
                  handlePostSelect(e.target.value ? parseInt(e.target.value) : null)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
              >
                <option value="">-- Select a post --</option>
                {posts.map(post => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
              {selectedPostId && (
                <p className="mt-2 text-sm text-gray-500">
                  This post will be featured with a link to the full article.
                </p>
              )}
            </div>

            {/* Custom Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message (optional)
              </label>
              <textarea
                value={customContent}
                onChange={e => setCustomContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
                placeholder="Add a personal message to your subscribers..."
              />
            </div>

            {/* Send Button */}
            <div className="flex justify-end gap-3">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={handleSend}
                disabled={sending || !subject.trim()}
                className="px-6 py-3 bg-[#A32015] text-white rounded-lg hover:bg-[#8a1b12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Newsletter'}
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This will send the newsletter to all subscribers in your
              Resend audience. Make sure you're ready before clicking send!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

