'use client'

import React from 'react';
import { blogPostsData, type BlogPostType } from '@/blogPosts/BlogData';
import BlogHeader from '@/components/BlogHeader';
import BlogPostComponent from '@/components/BlogPost';
import Footer from '@/components/Footer';

export default function BlogPage() {

  const featuredPost = {
    ...blogPostsData[blogPostsData.length - 1],
    image: "/images/envelope-seal-horizontal.jpg"
  };

  const listPosts = blogPostsData.slice(0, -1).map(post => ({
    ...post,
  }));

  return (
    <>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <BlogHeader
          backgroundImage="/images/6.jpg"
          title="Hypnosis, Explained."
          subtitle="Simple. Nerdy. Surprisingly Fun."
          backLink={{
            href: "/",
            text: "Back to Home"
          }}
        />


        {/* Blog Posts */}
        <div className="py-16 bg-[url('/images/linnen-bg-seamless.jpg')] bg-contain bg-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Post */}
            <div className="mb-16">
              <BlogPostComponent
                {...featuredPost}
              />
            </div>

            {/* List Posts in 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {listPosts.map((post: BlogPostType) => (
                <BlogPostComponent
                  key={post.id}
                  {...post}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
