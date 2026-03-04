// app/api/admin/instagram/grid/reorder/route.ts
// Reorders grid positions for Instagram posts

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { reorderGrid, getGrid } from '@/lib/instagram';

// PUT /api/admin/instagram/grid/reorder - Reorder grid positions
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { moves } = body;

    if (!Array.isArray(moves) || moves.length === 0) {
      return NextResponse.json(
        { error: 'moves array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate each move has id and newPosition
    for (const move of moves) {
      if (typeof move.id !== 'number' || typeof move.newPosition !== 'number') {
        return NextResponse.json(
          { error: 'Each move must have numeric id and newPosition' },
          { status: 400 }
        );
      }
    }

    reorderGrid(moves);
    const posts = getGrid();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error reordering grid:', error);
    return NextResponse.json({ error: 'Failed to reorder grid' }, { status: 500 });
  }
}
