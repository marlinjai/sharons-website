'use client'

import React from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "Hypnosis, Explained",
    subtitle: "Simple. Nerdy. Surprisingly Fun.",
    excerpt: "Let's start from the top. Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.",
    readTime: "8 min read",
    category: "Education",
    color: "#fcd8b3",
    date: "March 20, 2024",
    featured: true
  },
  {
    id: 2,
    title: "Client Stories: From Fear to Freedom",
    excerpt: "Real transformations and the healing power of regression therapy through authentic client experiences.",
    readTime: "7 min read",
    category: "Stories",
    color: "#f7f6f2",
    date: "March 10, 2024"
  },
  {
    id: 3,
    title: "Preparing for Your First Session",
    excerpt: "What to expect and how to make the most of your journey into the depths of consciousness.",
    readTime: "4 min read",
    category: "Guide",
    color: "#fcd8b3",
    date: "March 5, 2024"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-[#fcd8b3] to-[#f7f6f2] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold hover:text-[#C5441E] transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="font-secondary text-5xl md:text-6xl font-semibold mb-8" style={{ color: '#A32015' }}>
              Blog
            </h1>
            <p className="font-primary text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Deep dives into consciousness, client transformations, and the science behind regression hypnosis through thoughtful articles and personal insights.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].id}`} className="group">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-[#fcd8b3] text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded-full">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-xs font-primary text-gray-500">•</span>
                    <span className="text-xs font-primary text-gray-500">{blogPosts[0].readTime}</span>
                    <span className="text-xs font-primary text-gray-500">•</span>
                    <span className="text-xs font-primary text-gray-500">{blogPosts[0].date}</span>
                  </div>
                  
                  <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-gray-900 mb-2 leading-tight group-hover:text-[#A32015] transition-colors duration-200">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="font-primary text-lg text-gray-600 mb-4 italic">
                    {blogPosts[0].subtitle}
                  </p>
                  
                  <p className="font-primary text-lg text-gray-700 leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                    Read more 
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Recent Posts */}
          <div className="space-y-12">
            <h3 className="font-secondary text-2xl font-semibold text-gray-900 mb-8">
              Recent Articles
            </h3>
            
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <article className="border-b border-gray-200 pb-8 last:border-b-0">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-2 py-1 bg-[#f7f6f2] text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded">
                          {post.category}
                        </span>
                        <span className="text-xs font-primary text-gray-500">•</span>
                        <span className="text-xs font-primary text-gray-500">{post.readTime}</span>
                        <span className="text-xs font-primary text-gray-500">•</span>
                        <span className="text-xs font-primary text-gray-500">{post.date}</span>
                      </div>
                      
                      <h3 className="font-secondary text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-[#A32015] transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="font-primary text-gray-700 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                        Read more 
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#fcd8b3] to-[#f7f6f2] rounded-2xl p-8 text-center">
              <h3 className="font-secondary text-2xl font-semibold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="font-primary text-gray-700 mb-6 max-w-2xl mx-auto">
                Get new articles and insights delivered to your inbox
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                />
                <button className="px-6 py-3 bg-[#C5441E] text-white rounded-full font-primary font-medium hover:bg-[rgb(245,124,0)] transition-colors duration-200 shadow-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 