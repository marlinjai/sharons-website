// app/(blog)/blog/page.tsx
// Blog listing page - fetches posts from database

'use client';

import React, { useState, useEffect } from 'react';
import BlogHeader from '@/components/BlogHeader';
import BlogPostComponent from '@/components/BlogPost';

interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  published: boolean;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Featured post is the most recent (first in array since sorted by created_at DESC)
  const featuredPost =
    posts.length > 0
      ? {
          id: posts[0].id,
          slug: posts[0].slug,
          title: posts[0].title,
          subtitle: posts[0].subtitle,
          category: posts[0].category,
          readTime: posts[0].read_time,
          image: posts[0].featured_image || '/images/envelope-seal-horizontal.jpg',
          date: new Date(posts[0].created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }
      : null;

  // Remaining posts for the grid
  const listPosts = posts.slice(1).map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    category: post.category,
    readTime: post.read_time,
    image: post.featured_image,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  return (
    <>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <BlogHeader
          backgroundImage="/images/6.jpg"
          title="Hypnotherapy, Explained."
          subtitle="Simple. Nerdy. Surprisingly Fun."
          backLink={{
            href: '/',
            text: 'Back to Home',
          }}
        />

        {/* Blog Posts */}
        <div className="py-16 ">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-500">
                No blog posts available yet. Check back soon!
              </p>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-16">
                    <BlogPostComponent {...featuredPost} />
                  </div>
                )}

                {/* List Posts in 2 columns */}
                {listPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {listPosts.map(post => (
                      <BlogPostComponent key={post.id} {...post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
