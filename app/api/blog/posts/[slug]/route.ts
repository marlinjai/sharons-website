// app/api/blog/posts/[slug]/route.ts
// Public API for fetching a single published blog post by slug

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/db';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/blog/posts/[slug] - Get a published post by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    // Only return if published
    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

