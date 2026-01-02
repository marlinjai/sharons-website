// app/api/admin/email/test/route.ts
// API endpoint for sending test emails

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import { getPostById } from '@/lib/db';

// Initialize Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// POST /api/admin/email/test - Send a test email
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, testEmail, ...emailData } = body;

    // Validate test email
    if (!testEmail || !testEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid test email is required' }, { status: 400 });
    }

    const resend = getResend();
    let html: string;
    let subject: string;

    switch (type) {
      case 'welcome': {
        // Get featured post if specified
        let latestBlogPost = undefined;
        if (emailData.featured_post_id) {
          const post = getPostById(emailData.featured_post_id);
          if (post) {
            latestBlogPost = {
              id: post.id,
              title: post.title,
              excerpt: post.subtitle || 'Read the full article on our blog.',
              url: `https://returnhypnosis.com/blog/${post.slug}`,
              category: post.category,
              readTime: post.read_time,
            };
          }
        }

        html = await render(
          WelcomeEmail({
            name: emailData.name || 'Test User',
            latestBlogPost,
          })
        );
        subject = emailData.subject || '[TEST] Welcome to ReTurn Newsletter';
        break;
      }

      case 'newsletter': {
        // Get featured post if specified
        let featuredStory = undefined;
        if (emailData.selectedPostId) {
          const post = getPostById(emailData.selectedPostId);
          if (post) {
            featuredStory = {
              title: post.title,
              excerpt: post.subtitle || 'Read the full article on our blog.',
              url: `https://returnhypnosis.com/blog/${post.slug}`,
              category: post.category,
              readTime: post.read_time,
            };
          }
        }

        const sections = emailData.customContent
          ? [{ type: 'text' as const, content: emailData.customContent }]
          : [];

        html = await render(
          NewsletterTemplate({
            subject: emailData.subject || 'ReTurn Newsletter',
            previewText: emailData.previewText || 'Your latest update from ReTurn',
            issueNumber: emailData.issueNumber,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            sections,
            featuredStory,
          })
        );
        subject = `[TEST] ${emailData.subject || 'ReTurn Newsletter'}`;
        break;
      }

      case 'one-time': {
        html = await render(
          NewsletterTemplate({
            subject: emailData.subject || 'Message from Sharon Di Salvo',
            previewText: emailData.subject || 'A personal message',
            sections: emailData.content
              ? [{ type: 'text' as const, content: emailData.content }]
              : [],
          })
        );
        subject = `[TEST] ${emailData.subject || 'Message from Sharon Di Salvo'}`;
        break;
      }

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    // Send test email
    const result = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [testEmail],
      subject,
      replyTo: 'hello@returnhypnosis.com',
      headers: {
        'X-Entity-Ref-ID': `test-${type}-${Date.now()}`,
      },
      html,
    });

    console.log('Test email sent:', result);

    return NextResponse.json({
      success: true,
      emailId: result.data?.id,
      message: `Test email sent to ${testEmail}`,
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send test email' },
      { status: 500 }
    );
  }
}

