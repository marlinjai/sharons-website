// app/(blog)/blog/[slug]/page.tsx
// Single blog post page - fetches post from database

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import BlogHeader from '@/components/BlogHeader';

// Share and Like buttons component
function PostActions({ post, slug }: { post: { title: string; likes?: number }, slug: string }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Load user's like state from localStorage and fetch current count from API
  useEffect(() => {
    // Check if user has liked this post before (stored locally)
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    setLiked(!!likedPosts[slug]);

    // Fetch current like count from API
    fetch(`/api/blog/posts/${slug}/like`)
      .then((res) => res.json())
      .then((data) => {
        if (data.likes !== undefined) {
          setLikeCount(data.likes);
        }
      })
      .catch((err) => console.error('Failed to fetch likes:', err));
  }, [slug]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    const wasLiked = liked;

    try {
      // Optimistic update
      setLiked(!wasLiked);
      setLikeCount((prev) => wasLiked ? prev - 1 : prev + 1);

      // Call API
      const res = await fetch(`/api/blog/posts/${slug}/like`, {
        method: wasLiked ? 'DELETE' : 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likes);

        // Update localStorage
        if (wasLiked) {
          delete likedPosts[slug];
        } else {
          likedPosts[slug] = true;
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      } else {
        // Revert on error
        setLiked(wasLiked);
        setLikeCount((prev) => wasLiked ? prev + 1 : prev - 1);
      }
    } catch (err) {
      console.error('Failed to update like:', err);
      // Revert on error
      setLiked(wasLiked);
      setLikeCount((prev) => wasLiked ? prev + 1 : prev - 1);
    } finally {
      setIsLiking(false);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${post.title}`;

  // Check if native share is available (mobile devices)
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl,
      });
      setShowShareMenu(false);
    } catch (err) {
      // User cancelled or share failed - that's ok
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={isLiking}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-200 ${
          liked
            ? 'bg-red-50 border-red-200 text-red-500'
            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-red-500'
        } ${isLiking ? 'opacity-70 cursor-not-allowed' : ''}`}
        title={liked ? 'Unlike' : 'Like'}
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${liked ? 'scale-110' : ''} ${isLiking ? 'animate-pulse' : ''}`}
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-[#A32015] transition-all duration-200"
          title="Share"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          <span className="text-sm font-medium">Share</span>
        </button>

        {/* Share Dropdown */}
        {showShareMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              {/* Native Share - shows on mobile devices */}
              {canNativeShare && (
                <>
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#A32015] transition-colors w-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <span className="text-sm font-medium">Share via...</span>
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                </>
              )}

              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowShareMenu(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#A32015] transition-colors"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}

              {/* Instagram - copies link since IG doesn't support web sharing */}
              <button
                onClick={() => {
                  handleCopyLink();
                  setShowShareMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#A32015] transition-colors w-full"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs text-gray-400">{copied ? 'Copied!' : 'Copy link to share'}</span>
                </div>
              </button>

              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  handleCopyLink();
                  setShowShareMenu(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#A32015] transition-colors w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
                <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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

interface AdjacentPost {
  slug: string;
  title: string;
}

interface AdjacentPosts {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adjacentPosts, setAdjacentPosts] = useState<AdjacentPosts>({ prev: null, next: null });
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
          setAdjacentPosts(data.adjacentPosts || { prev: null, next: null });
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

          {/* Like and Share Actions */}
          <div className="max-w-3xl mx-auto mb-8 flex justify-end">
            <PostActions post={post} slug={slug} />
          </div>

          <div
            className="blog-content max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Post Navigation */}
          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Previous Post */}
              <div className="flex-1 w-full sm:w-auto">
                {adjacentPosts.prev ? (
                  <Link
                    href={`/blog/${adjacentPosts.prev.slug}`}
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#A32015] transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium line-clamp-1">{adjacentPosts.prev.title}</span>
                  </Link>
                ) : (
                  <div className="w-full sm:w-auto" />
                )}
              </div>

              {/* Back to Blog */}
              <Link
                href="/blog"
                className="px-6 py-2 bg-[#A32015] text-white text-sm font-medium rounded-full hover:bg-[#C5441E] transition-colors duration-200"
              >
                All Posts
              </Link>

              {/* Next Post */}
              <div className="flex-1 w-full sm:w-auto flex justify-end">
                {adjacentPosts.next ? (
                  <Link
                    href={`/blog/${adjacentPosts.next.slug}`}
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#A32015] transition-colors duration-200"
                  >
                    <span className="text-sm font-medium line-clamp-1">{adjacentPosts.next.title}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="w-full sm:w-auto" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
