// app/admin/posts/[id]/page.tsx
// Edit blog post page

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import PostEditor from '@/components/admin/PostEditor';

interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditPostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  // Check auth and fetch post
  useEffect(() => {
    async function init() {
      try {
        // Check auth
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin');
          return;
        }

        // Fetch post
        const postRes = await fetch(`/api/admin/posts/${postId}`);
        if (postRes.ok) {
          const postData = await postRes.json();
          setPost(postData);
        } else if (postRes.status === 404) {
          setError('Post not found');
        } else {
          setError('Failed to load post');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router, postId]);

  const handleSave = async (data: {
    title: string;
    subtitle: string;
    category: string;
    read_time: string;
    featured_image: string | null;
    content: string;
    published: boolean;
  }) => {
    const res = await fetch(`/api/admin/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      throw new Error('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
          {post && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View post →
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {post && <PostEditor initialData={post} onSave={handleSave} />}
      </main>
    </div>
  );
}

