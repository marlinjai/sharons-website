// app/api/blog/posts/[slug]/route.ts
// Public API for fetching a blog post by slug (drafts visible to admins)

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/blog/posts/[slug] - Get a post by slug (admins can view drafts)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user is authenticated admin
    const isAdmin = await isAuthenticated();

    // Only return unpublished posts to admins
    if (!post.published && !isAdmin) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Include isAdmin flag for frontend to show draft indicator
    return NextResponse.json({ post, isAdmin });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

