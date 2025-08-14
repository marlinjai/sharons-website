'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPostsData, type BlogPostType } from '@/blogPosts/BlogData';
import BlogHeader from '@/components/BlogHeader';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post: BlogPostType | undefined = blogPostsData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-secondary text-4xl font-semibold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#A32015] hover:text-[#C5441E] transition-colors duration-200">
            &lt; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <BlogHeader
        backgroundImage={post.image ? post.image : '/images/envelope-seal-horizontal.jpg'}
        title={post.title}
        subtitle={post.subtitle}
        backLink={{
          href: '/blog',
          text: 'Back to Blog',
        }}
        isPostHeader={true}
        postMeta={{
          category: post.category,
          readTime: post.readTime,
          date: post.date,
        }}
      />

      {/* Content */}
      <div className="py-20 bg-[url('/images/linnen-bg-seamless.jpg')] bg-contain bg-center ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">{post.content}</div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="py-20  bg-cover bg-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-secondary text-xxl font-semibold text-gray-900 mb-8 text-center">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPostsData
              .filter(p => p.slug !== slug)
              .map(p => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="block bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-primary text-gray-500 uppercase tracking-wide">{p.category}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs font-primary text-gray-500">{p.readTime}</span>
                  </div>
                  <h4 className="font-secondary text-lg font-semibold text-gray-900 mb-2 leading-tight">{p.title}</h4>
                  <p className="font-primary text-gray-600 text-sm leading-relaxed">{p.subtitle}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
