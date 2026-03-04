// app/api/admin/instagram/media/route.ts
// Lists media items with pagination

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getMediaList, getTotalMediaCount } from '@/lib/media';

// GET /api/admin/instagram/media - List media items
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50', 10)));

    const items = getMediaList(page, limit);
    const total = getTotalMediaCount();

    return NextResponse.json({ items, total, page, limit });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}
