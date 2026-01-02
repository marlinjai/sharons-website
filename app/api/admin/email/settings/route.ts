// app/api/admin/email/settings/route.ts
// API endpoints for managing email settings/templates

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import {
  getAllEmailSettings,
  getEmailSettingsByType,
  updateEmailSettings,
  EmailSettings
} from '@/lib/db';

// GET /api/admin/email/settings - Get all email settings or specific type
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as EmailSettings['type'] | null;

    if (type) {
      // Get specific email settings by type
      const settings = getEmailSettingsByType(type);
      if (!settings) {
        return NextResponse.json({ error: 'Email settings not found' }, { status: 404 });
      }
      return NextResponse.json(settings);
    }

    // Get all email settings
    const allSettings = getAllEmailSettings();
    return NextResponse.json(allSettings);
  } catch (error) {
    console.error('Error fetching email settings:', error);
    return NextResponse.json({ error: 'Failed to fetch email settings' }, { status: 500 });
  }
}

// PUT /api/admin/email/settings - Update email settings
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      type,
      subject,
      greeting,
      body_sections,
      cta_text,
      cta_url,
      quote_text,
      quote_author,
      featured_post_id,
      enabled
    } = body;

    // Validate type
    const validTypes = ['welcome', 'newsletter', 'booking_confirmation', 'booking_reminder'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Valid type is required (welcome, newsletter, booking_confirmation, booking_reminder)' },
        { status: 400 }
      );
    }

    // Validate required fields for welcome and newsletter
    if ((type === 'welcome' || type === 'newsletter') && !subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }

    // Prepare body_sections as JSON string if it's an object
    const bodySectionsStr = typeof body_sections === 'object'
      ? JSON.stringify(body_sections)
      : body_sections;

    const updated = updateEmailSettings(type, {
      subject,
      greeting,
      body_sections: bodySectionsStr,
      cta_text,
      cta_url,
      quote_text,
      quote_author,
      featured_post_id,
      enabled,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update email settings' }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating email settings:', error);
    return NextResponse.json({ error: 'Failed to update email settings' }, { status: 500 });
  }
}

