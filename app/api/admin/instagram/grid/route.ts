// app/api/admin/instagram/grid/route.ts
// Gets the current Instagram grid state

import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getGrid } from '@/lib/instagram';

// GET /api/admin/instagram/grid - Get the current grid
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = getGrid();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching grid:', error);
    return NextResponse.json({ error: 'Failed to fetch grid' }, { status: 500 });
  }
}
