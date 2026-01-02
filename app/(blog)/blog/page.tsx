// app/(blog)/blog/page.tsx
// Blog listing page - fetches posts from database (admins see drafts with inline editing)

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import BlogHeader from '@/components/BlogHeader';
import BlogPostComponent from '@/components/BlogPost';
import InlinePostEditor from '@/components/blog/InlinePostEditor';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const data = await res.json();
        setPosts(data.posts || []);
        setIsAdmin(data.isAdmin || false);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle edit button click
  const handleEdit = (postId: number) => {
    setEditingPostId(postId);
  };

  // Handle save from inline editor - merge updated data with existing post
  const handleSave = (updatedPost: { id: number; slug: string; title: string; subtitle: string; category: string; read_time: string; featured_image: string | null; content: string; published: boolean }) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
    );
    setEditingPostId(null);
  };

  // Handle cancel from inline editor
  const handleCancel = () => {
    setEditingPostId(null);
  };

  // Transform posts for display
  const transformPost = (post: Post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    category: post.category,
    readTime: post.read_time,
    image: post.featured_image || '/images/envelope-seal-horizontal.jpg',
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    isDraft: !post.published,
  });

  // Featured post is the most recent (first in array since sorted by created_at DESC)
  const featuredPost = posts.length > 0 ? transformPost(posts[0]) : null;

  // Remaining posts for the grid
  const listPosts = posts.slice(1).map(transformPost);

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
                    {editingPostId === featuredPost.id ? (
                      <InlinePostEditor
                        postId={featuredPost.id}
                        onSave={handleSave}
                        onCancel={handleCancel}
                      />
                    ) : (
                      <BlogPostComponent
                        {...featuredPost}
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                      />
                    )}
                  </div>
                )}

                {/* List Posts in 2 columns */}
                {listPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {listPosts.map(post =>
                      editingPostId === post.id ? (
                        <div key={post.id} className="md:col-span-2">
                          <InlinePostEditor
                            postId={post.id}
                            onSave={handleSave}
                            onCancel={handleCancel}
                          />
                        </div>
                      ) : (
                        <BlogPostComponent
                          key={post.id}
                          {...post}
                          isAdmin={isAdmin}
                          onEdit={handleEdit}
                        />
                      )
                    )}
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
