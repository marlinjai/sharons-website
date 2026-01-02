// app/api/admin/email/send-one/route.ts
// API endpoint for sending one-time emails to specific recipients

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';

// Initialize Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// POST /api/admin/email/send-one - Send one-time email to specific recipient
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { recipientEmail, recipientName, subject, content } = body;

    // Validate required fields
    if (!recipientEmail || !recipientEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid recipient email is required' }, { status: 400 });
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Email content is required' }, { status: 400 });
    }

    const resend = getResend();

    // Render email using newsletter template with custom content
    const html = await render(
      NewsletterTemplate({
        subject,
        previewText: subject,
        sections: [
          {
            type: 'text',
            title: recipientName ? `Dear ${recipientName},` : undefined,
            content,
          },
        ],
      })
    );

    // Generate plain text version
    const plainText = `${recipientName ? `Dear ${recipientName},\n\n` : ''}${content}\n\n---\nWith warmth,\nSharon Di Salvo\nCertified Regression Hypnotherapist\n\nReTurn Hypnosis\nhttps://returnhypnosis.com`;

    // Send email
    const result = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [recipientEmail],
      subject,
      replyTo: 'hello@returnhypnosis.com',
      headers: {
        'X-Entity-Ref-ID': `one-time-${Date.now()}`,
      },
      html,
      text: plainText,
    });

    console.log('One-time email sent:', result);

    return NextResponse.json({
      success: true,
      emailId: result.data?.id,
      message: `Email sent to ${recipientEmail}`,
    });
  } catch (error) {
    console.error('Error sending one-time email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}

