'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPostsData, type BlogPost } from '@/blogPosts/BlogData';
import BlogHeader from '@/components/BlogHeader';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <Link href={`/blog/${blogPostsData[0].slug}`} className="group">
              <article className="bg-[#f7f6f2] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="absolute inset-0">
                    <Image
                      src="/images/envelope-seal.png"
                      alt="Envelope Background"
                      fill
                      className="object-cover opacity-20"
                      priority
                    />
                  </div>
                  <div className="relative z-10 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 bg-[#fcd8b3] text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded-full">
                        {blogPostsData[0].category}
                      </span>
                      <span className="text-xs font-primary text-gray-500">|</span>
                      <span className="text-xs font-primary text-gray-500">{blogPostsData[0].readTime}</span>
                      <span className="text-xs font-primary text-gray-500">|</span>
                      <span className="text-xs font-primary text-gray-500">{blogPostsData[0].date}</span>
                    </div>

                    <h2 className="font-secondary text-2xl md:text-3xl font-semibold text-gray-900 mb-2 leading-tight group-hover:text-[#A32015] transition-colors duration-200">
                      {blogPostsData[0].title}
                    </h2>

                    <p className="font-primary text-lg text-gray-700 leading-relaxed mb-6">
                      {blogPostsData[0].excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Read more
                      <span className="text-lg">&gt;</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          <div className="space-y-12">
            {blogPostsData.slice(1).map((post: BlogPost) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className={`pb-8 ${post.id % 2 === 0 ? 'bg-white' : 'bg-[#f7f6f2]'} p-8 rounded-lg mb-8`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-2 py-1 bg-[#f7f6f2] text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded">
                          {post.category}
                        </span>
                        <span className="text-xs font-primary text-gray-500">|</span>
                        <span className="text-xs font-primary text-gray-500">{post.readTime}</span>
                        <span className="text-xs font-primary text-gray-500">|</span>
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
                        <span className="text-lg">&gt;</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-black/10 py-24 mt-16 min-h-[50vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="space-y-8">
            <h3 className="font-secondary text-2xl font-semibold text-gray-900">
              Stay Updated
            </h3>
            <p className="font-primary text-gray-700 max-w-2xl mx-auto">
              Get new articles delivered to your inbox monthly!
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
  );
}
