// app/api/blog/posts/route.ts
// Public API for fetching blog posts (drafts visible to admins)

import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET /api/blog/posts - Get posts (admins see drafts too)
export async function GET() {
  try {
    // Check if user is authenticated admin
    const isAdmin = await isAuthenticated();

    // Admins see all posts, visitors see only published
    const posts = getAllPosts(!isAdmin);

    // Add isAdmin flag to response for frontend to show draft badges
    return NextResponse.json({ posts, isAdmin });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

