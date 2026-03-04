// app/api/admin/instagram/media/[id]/thumbnail/route.ts
// Serves the thumbnail image file

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { isAuthenticated } from '@/lib/auth';
import { getMediaById, getMediaFilePath } from '@/lib/media';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/instagram/media/[id]/thumbnail - Serve thumbnail image
export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const mediaId = parseInt(id, 10);
    if (isNaN(mediaId)) {
      return NextResponse.json({ error: 'Invalid media ID' }, { status: 400 });
    }

    const filePath = getMediaFilePath(mediaId, 'thumbnail');
    if (!filePath || !fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Thumbnail not found' }, { status: 404 });
    }

    const media = getMediaById(mediaId);
    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': media?.mime_type || 'application/octet-stream',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving thumbnail:', error);
    return NextResponse.json({ error: 'Failed to serve thumbnail' }, { status: 500 });
  }
}
