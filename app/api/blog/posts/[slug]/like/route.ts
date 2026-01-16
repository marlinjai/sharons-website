// app/api/blog/posts/[slug]/like/route.ts
// API endpoint for liking/unliking blog posts
// Updated: force rebuild

import { NextRequest, NextResponse } from 'next/server';
import { getPostLikes, likePost, unlikePost, getPostBySlug } from '@/lib/db';

// GET - Get current like count for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const likes = getPostLikes(slug);
    return NextResponse.json({ likes });
  } catch (error) {
    console.error('Error getting likes:', error);
    return NextResponse.json({ error: 'Failed to get likes' }, { status: 500 });
  }
}

// POST - Like a post (increment)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const likes = likePost(slug);
    return NextResponse.json({ likes, liked: true });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }
}

// DELETE - Unlike a post (decrement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const likes = unlikePost(slug);
    return NextResponse.json({ likes, liked: false });
  } catch (error) {
    console.error('Error unliking post:', error);
    return NextResponse.json({ error: 'Failed to unlike post' }, { status: 500 });
  }
}
