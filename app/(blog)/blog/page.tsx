'use client';

import React from 'react';

import BlogHeader from '@/components/BlogHeader';
import BlogPostComponent from '@/components/BlogPost';
import { blogPostsData, BlogPostType } from '@/blogPosts/BlogData';

export default function BlogPage() {
  // Only show published posts
  const publishedPosts = blogPostsData.filter(post => post.published);

  // Featured post is the last published post
  const featuredPost = publishedPosts.length > 0
    ? { ...publishedPosts[publishedPosts.length - 1], image: '/images/envelope-seal-horizontal.jpg' }
    : null;

  // Remaining posts for the grid
  const listPosts = publishedPosts.slice(0, -1);

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
            {publishedPosts.length === 0 ? (
              <p className="text-center text-gray-500">No blog posts available yet. Check back soon!</p>
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
                    {listPosts.map((post: BlogPostType) => (
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
