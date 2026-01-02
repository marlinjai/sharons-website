// app/(blog)/blog/[slug]/page.tsx
// Single blog post page - fetches post from database

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import BlogHeader from '@/components/BlogHeader';

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
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post || null);
          setIsAdmin(data.isAdmin || false);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-secondary text-4xl font-semibold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-[#A32015] hover:text-[#C5441E] transition-colors duration-200"
          >
            &lt; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Sanitize HTML content
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'a',
      'img',
      'div',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style', 'target', 'rel'],
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <BlogHeader
        backgroundImage={post.featured_image || '/images/envelope-seal-horizontal.jpg'}
        title={post.title}
        subtitle={post.subtitle}
        backLink={{
          href: '/blog',
          text: 'Back to Blog',
        }}
        isPostHeader={true}
        postMeta={{
          category: post.category,
          readTime: post.read_time,
          date: formattedDate,
        }}
      />

      {/* Content */}
      <div className="py-20 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Draft Banner - only visible to admins viewing unpublished posts */}
          {!post.published && isAdmin && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wide rounded-full">
                Draft
              </span>
              <span className="text-amber-800 text-sm">
                This post is not published. Only admins can see this preview.
              </span>
              <a
                href={`/admin/posts/${post.id}`}
                className="ml-auto px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
              >
                Edit Post
              </a>
            </div>
          )}
          <div
            className="prose prose-lg max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>
    </div>
  );
}
