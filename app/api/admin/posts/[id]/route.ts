// app/api/admin/posts/[id]/route.ts
// API endpoints for single post operations (get, update, delete)

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPostById, updatePost, deletePost, generateSlug, isSlugUnique } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/posts/[id] - Get a single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = getPostById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT /api/admin/posts/[id] - Update a post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    // Only include fields that were provided
    if (body.title !== undefined) {
      updates.title = body.title;
      // Update slug if title changes
      if (body.title) {
        let newSlug = generateSlug(body.title);
        let counter = 1;
        while (!isSlugUnique(newSlug, postId)) {
          newSlug = `${generateSlug(body.title)}-${counter}`;
          counter++;
        }
        updates.slug = newSlug;
      }
    }
    if (body.subtitle !== undefined) updates.subtitle = body.subtitle;
    if (body.category !== undefined) updates.category = body.category;
    if (body.read_time !== undefined) updates.read_time = body.read_time;
    if (body.featured_image !== undefined) updates.featured_image = body.featured_image;
    if (body.content !== undefined) updates.content = body.content;
    if (body.published !== undefined) updates.published = body.published;

    const post = updatePost(postId, updates);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id] - Delete a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const deleted = deletePost(postId);
    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

