// app/admin/posts/new/page.tsx
// Create new blog post page

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PostEditor from '@/components/admin/PostEditor';

export default function NewPostPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check auth
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/admin');
          return;
        }
      } catch (err) {
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSave = async (data: {
    title: string;
    subtitle: string;
    category: string;
    read_time: string;
    featured_image: string | null;
    content: string;
    published: boolean;
  }) => {
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const post = await res.json();
      router.push('/admin/dashboard');
    } else {
      throw new Error('Failed to create post');
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
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostEditor onSave={handleSave} isNew={true} />
      </main>
    </div>
  );
}

