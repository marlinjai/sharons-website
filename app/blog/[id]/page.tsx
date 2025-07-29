'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPostsData } from '@/blogPosts/BlogData';


export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPostsData[postId as keyof typeof blogPostsData];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-secondary text-4xl font-semibold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#A32015] hover:text-[#C5441E] transition-colors duration-200">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fcd8b3] to-[#f7f6f2] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold hover:text-[#C5441E] transition-colors duration-200 mb-8"
          >
            ← Back to Blog
          </Link>
          
          {/* ReTurn Logo - Centered */}
          <div className="flex justify-center mb-12">
            <Link href="/" className="group">
              <div className="bg-white border-[rgb(245,124,0)] border-2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-20 w-auto" />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-white text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded-full">
              {post.category}
            </span>
            <span className="text-xs font-primary text-gray-500">•</span>
            <span className="text-xs font-primary text-gray-500">{post.readTime}</span>
            <span className="text-xs font-primary text-gray-500">•</span>
            <span className="text-xs font-primary text-gray-500">{post.date}</span>
          </div>
          
          <h1 className="font-secondary text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {('subtitle' in post && post.subtitle) && (
            <p className="font-primary text-xl mb-6 italic" style={{ color: '#A32015' }}>
              {post.subtitle}
            </p>
          )}
          
          <p className="font-primary text-xl text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gradient-to-r from-[#f7f6f2] to-[#fcd8b3] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-secondary text-2xl font-semibold text-gray-900 mb-8 text-center">
            More Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogPostsData).map(([id, postData]) => {
              if (parseInt(id) === postId) return null;
              return (
                <Link 
                  key={id} 
                  href={`/blog/${id}`}
                  className="block bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-primary text-gray-500 uppercase tracking-wide">
                      {postData.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-primary text-gray-500">
                      {postData.readTime}
                    </span>
                  </div>
                  <h4 className="font-secondary text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {postData.title}
                  </h4>
                  <p className="font-primary text-gray-600 text-sm leading-relaxed">
                    {postData.excerpt}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 