// app/api/blog/posts/route.ts
// Public API for fetching published blog posts

import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/db';

// GET /api/blog/posts - Get all published posts
export async function GET() {
  try {
    const posts = getAllPosts(true); // Only published posts
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

