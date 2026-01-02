// app/api/admin/upload/route.ts
// S3 image upload endpoint (placeholder - configure AWS credentials to enable)
// For now, users can paste external URLs (Unsplash, etc.)

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

// POST /api/admin/upload - Upload image to S3
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if S3 is configured
  const isS3Configured =
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_REGION;

  if (!isS3Configured) {
    return NextResponse.json(
      {
        error: 'S3 not configured',
        message:
          'Image upload to S3 is not configured. Please use external image URLs (e.g., Unsplash) instead, or configure AWS credentials.',
      },
      { status: 501 }
    );
  }

  try {
    // S3 upload logic would go here when AWS SDK is configured
    // For now, return a placeholder response
    return NextResponse.json(
      {
        error: 'S3 upload not implemented',
        message: 'Please use external image URLs for now.',
      },
      { status: 501 }
    );

    // Future implementation:
    // 1. Parse multipart form data
    // 2. Validate file type and size
    // 3. Generate unique filename
    // 4. Upload to S3 using @aws-sdk/client-s3
    // 5. Return the public URL
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// GET /api/admin/upload - Check upload status/configuration
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isS3Configured =
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_REGION;

  return NextResponse.json({
    s3Configured: isS3Configured,
    message: isS3Configured
      ? 'S3 is configured. You can upload images.'
      : 'S3 is not configured. Use external image URLs instead.',
  });
}

