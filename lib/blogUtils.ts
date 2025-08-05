// lib/blogUtils.ts
// Utility functions for blog post management and URL generation

import { blogPostsData } from '../blogPosts/BlogData'

// Interface for blog post data
export interface BlogPost {
  title: string
  subtitle?: string
  category: string
  readTime: string
  date: string
  excerpt: string
  content: string
}

// Get the latest blog post (highest ID number)
export function getLatestBlogPost(): { id: number; post: BlogPost } | null {
  if (!blogPostsData) {
    return null
  }
  
  const postIds = Object.keys(blogPostsData).map(Number).sort((a, b) => b - a)
  
  if (postIds.length === 0) {
    return null
  }
  
  const latestId = postIds[0]
  const latestPost = blogPostsData[latestId as keyof typeof blogPostsData]
  
  return {
    id: latestId,
    post: latestPost as BlogPost
  }
}

// Generate the URL for a specific blog post
export function getBlogPostUrl(postId: number): string {
  return `/blog/${postId}`
}

// Get the latest blog post with its URL
export function getLatestBlogPostWithUrl(): { id: number; post: BlogPost; url: string } | null {
  const latest = getLatestBlogPost()
  
  if (!latest) {
    return null
  }
  
  return {
    ...latest,
    url: getBlogPostUrl(latest.id)
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
export function getAllBlogPostsSorted(): Array<{ id: number; post: BlogPost; url: string }> {
  if (!blogPostsData) {
    console.error('blogPostsData is null or undefined')
    return []
  }
  
  const posts = Object.entries(blogPostsData).map(([id, post]) => ({
    id: parseInt(id),
    post: post as BlogPost,
    url: getBlogPostUrl(parseInt(id))
  }))
  
  // Sort by date (assuming newer posts have higher IDs)
  return posts.sort((a, b) => b.id - a.id)
} 