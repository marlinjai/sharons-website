// app/admin/newsletter/page.tsx
// Newsletter management page - compose and send newsletters with live preview

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailPreview from '@/components/admin/EmailPreview';

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

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState('');
  const [testError, setTestError] = useState('');

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

  // Preview data for EmailPreview component
  const previewData = useMemo(() => ({
    subject,
    previewText: subject || 'Your latest update from ReTurn',
    issueNumber: issueNumber ? parseInt(issueNumber) : undefined,
    customContent,
    selectedPostId,
  }), [subject, issueNumber, customContent, selectedPostId]);

  // Send test email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestError('Please enter a valid test email address');
      return;
    }

    if (!subject.trim()) {
      setTestError('Please enter a subject line');
      return;
    }

    setSendingTest(true);
    setTestError('');
    setTestSuccess('');

    try {
      const res = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          testEmail,
          subject,
          previewText: subject,
          issueNumber: issueNumber ? parseInt(issueNumber) : undefined,
          customContent,
          selectedPostId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send test');
      }

      setTestSuccess(`Test email sent to ${testEmail}`);
      setTimeout(() => setTestSuccess(''), 5000);
    } catch (err) {
      setTestError(err instanceof Error ? err.message : 'Failed to send test email');
    } finally {
      setSendingTest(false);
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
        previewText: subject,
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
            <Link
              href="/admin/email-settings"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Email Settings
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Send Newsletter</h2>
          <p className="text-gray-600 mt-1">
            Compose and send a newsletter to all subscribers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="bg-white rounded-lg shadow p-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none resize-none"
                  placeholder="Add a personal message to your subscribers..."
                />
              </div>

              {/* Test Email Section */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Send Test Email First</h4>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Enter test email address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleSendTest}
                    disabled={sendingTest || !testEmail || !subject}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingTest ? 'Sending...' : 'Send Test'}
                  </button>
                </div>
                {testSuccess && (
                  <p className="mt-2 text-sm text-green-600">{testSuccess}</p>
                )}
                {testError && (
                  <p className="mt-2 text-sm text-red-600">{testError}</p>
                )}
              </div>

              {/* Send Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
                Resend audience. Always send a test email first!
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow overflow-hidden h-[800px]">
            <EmailPreview
              type="newsletter"
              previewData={previewData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
