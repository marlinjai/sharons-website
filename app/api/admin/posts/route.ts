// app/api/admin/posts/route.ts
// API endpoints for listing and creating blog posts

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllPosts, createPost, generateSlug, isSlugUnique } from '@/lib/db';

// GET /api/admin/posts - List all posts
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = getAllPosts(false); // Get all posts including unpublished
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/admin/posts - Create a new post
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, subtitle, category, read_time, featured_image, content, published } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let counter = 1;
    while (!isSlugUnique(slug)) {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }

    const post = createPost({
      slug,
      title,
      subtitle: subtitle || '',
      category: category || 'General',
      read_time: read_time || '5 min read',
      featured_image: featured_image || null,
      content,
      published: published || false,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

