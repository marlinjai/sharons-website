// app/api/admin/instagram/grid/posts/route.ts
// Adds a media item to the Instagram grid

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { addPostToGrid } from '@/lib/instagram';

// POST /api/admin/instagram/grid/posts - Add a post to the grid
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { media_id, grid_position, caption, hashtags } = body;

    if (media_id === undefined || grid_position === undefined) {
      return NextResponse.json(
        { error: 'media_id and grid_position are required' },
        { status: 400 }
      );
    }

    const post = addPostToGrid({
      media_id,
      grid_position,
      caption,
      hashtags,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error adding post to grid:', error);

    // Handle unique constraint violation on grid_position
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'A post already exists at this grid position' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to add post to grid' }, { status: 500 });
  }
}
