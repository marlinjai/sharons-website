// app/api/admin/email/preview/route.ts
// API endpoint for rendering email previews

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import { getPostById } from '@/lib/db';

// Type for welcome email preview data
interface WelcomeEmailPreviewData {
  type: 'welcome';
  name?: string;
  greeting?: string;
  subject?: string;
  body_sections?: string;
  cta_text?: string;
  cta_url?: string;
  quote_text?: string;
  quote_author?: string;
  featured_post_id?: number;
}

// Type for newsletter preview data
interface NewsletterPreviewData {
  type: 'newsletter';
  subject?: string;
  previewText?: string;
  issueNumber?: number;
  customContent?: string;
  selectedPostId?: number;
}

// Type for one-time email preview data
interface OneTimeEmailPreviewData {
  type: 'one-time';
  subject?: string;
  recipientName?: string;
  content?: string;
}

type PreviewData = WelcomeEmailPreviewData | NewsletterPreviewData | OneTimeEmailPreviewData;

// POST /api/admin/email/preview - Render email HTML for preview
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: PreviewData = await request.json();
    const { type } = body;

    let html: string;

    switch (type) {
      case 'welcome': {
        const welcomeData = body as WelcomeEmailPreviewData;

        // Get featured post if specified
        let latestBlogPost = undefined;
        if (welcomeData.featured_post_id) {
          const post = getPostById(welcomeData.featured_post_id);
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
            name: welcomeData.name || 'Friend',
            latestBlogPost,
          })
        );
        break;
      }

      case 'newsletter': {
        const newsletterData = body as NewsletterPreviewData;

        // Get featured post if specified
        let featuredStory = undefined;
        if (newsletterData.selectedPostId) {
          const post = getPostById(newsletterData.selectedPostId);
          if (post) {
            featuredStory = {
              title: post.title,
              excerpt: post.subtitle || 'Read the full article on our blog.',
              readMoreUrl: `https://returnhypnosis.com/blog/${post.slug}`,
            };
          }
        }

        // Build sections from custom content
        const sections = newsletterData.customContent
          ? [{ type: 'text' as const, content: newsletterData.customContent }]
          : [];

        html = await render(
          NewsletterTemplate({
            subject: newsletterData.subject || 'ReTurn Newsletter',
            previewText: newsletterData.previewText || 'Your latest update from ReTurn',
            issueNumber: newsletterData.issueNumber,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            sections,
            featuredStory,
          })
        );
        break;
      }

      case 'one-time': {
        const oneTimeData = body as OneTimeEmailPreviewData;

        // Use newsletter template for one-time emails with custom content
        html = await render(
          NewsletterTemplate({
            subject: oneTimeData.subject || 'Message from Sharon Di Salvo',
            previewText: oneTimeData.subject || 'A personal message',
            sections: oneTimeData.content
              ? [{ type: 'text' as const, content: oneTimeData.content }]
              : [],
          })
        );
        break;
      }

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    // Return HTML for iframe rendering
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error rendering email preview:', error);
    return NextResponse.json({ error: 'Failed to render email preview' }, { status: 500 });
  }
}

