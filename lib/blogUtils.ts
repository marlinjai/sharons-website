// lib/blogUtils.ts
// Utility functions for blog post management and URL generation

import { blogPostsData, type BlogPost } from '../blogPosts/BlogData'

// Get the latest blog post (highest ID number)
export function getLatestBlogPost(): BlogPost | null {
  if (!blogPostsData || blogPostsData.length === 0) {
    return null
  }

  // Sort by ID descending and take the first one
  return [...blogPostsData].sort((a, b) => b.id - a.id)[0]
}

// Generate the URL for a specific blog post
export function getBlogPostUrl(post: BlogPost): string {
  return `/blog/${post.slug}`
}

// Get the latest blog post with its URL
export function getLatestBlogPostWithUrl(): { post: BlogPost; url: string } | null {
  const latest = getLatestBlogPost()

  if (!latest) {
    return null
  }

  return {
    post: latest,
    url: getBlogPostUrl(latest)
  }
}

// Get a formatted excerpt for email display (truncated if needed)
export function getFormattedExcerpt(post: BlogPost, maxLength: number = 150): string {
  if (post.excerpt.length <= maxLength) {
    return post.excerpt
  }

  // Truncate and add ellipsis
  return post.excerpt.substring(0, maxLength).trim() + '...'
}

// Get all blog posts sorted by date (newest first)
export function getAllBlogPostsSorted(): Array<{ post: BlogPost; url: string }> {
  if (!blogPostsData || blogPostsData.length === 0) {
    return []
  }

  // Sort by ID descending (assuming newer posts have higher IDs)
  return [...blogPostsData]
    .sort((a, b) => b.id - a.id)
    .map(post => ({
      post,
      url: getBlogPostUrl(post)
    }))
}
