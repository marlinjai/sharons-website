// app/api/newsletter/route.ts
// Newsletter subscription API endpoint using Resend with DB-stored welcome email settings

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { getEmailSettingsByType, getPostById, getAllPosts } from '@/lib/db';

// Initialize Resend only when needed
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the name and email
    const { name, email } = await request.json();

    // Validate inputs
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID is not set in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    console.log('Adding contact to audience:', { name: name.trim(), email });

    // Add contact to Resend audience with name and email
    const resend = getResend();
    const contactResult = await resend.contacts.create({
      email: email,
      firstName: name.trim(),
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    console.log('Contact created successfully:', contactResult);

    // Get welcome email settings from database
    const welcomeSettings = getEmailSettingsByType('welcome');

    // Check if welcome emails are enabled (default to true if no settings)
    if (welcomeSettings && !welcomeSettings.enabled) {
      console.log('Welcome email is disabled in settings');
      return NextResponse.json(
        {
          message: 'Successfully subscribed to newsletter',
          contactId: contactResult.data?.id,
        },
        { status: 200 }
      );
    }

    console.log('Sending welcome email to:', { name: name.trim(), email });

    // Get featured blog post - either from settings or latest published
    const latestBlogPost = getLatestBlogPostForEmail(welcomeSettings?.featured_post_id);
    const welcomeEmailData = {
      name: name.trim(),
      latestBlogPost: latestBlogPost || undefined,
    };

    // Render the React Email template to HTML
    const emailHtml = await render(WelcomeEmail(welcomeEmailData));

    // Use subject from settings or default
    const emailSubject = welcomeSettings?.subject
      ? welcomeSettings.subject.replace('{{name}}', name.trim())
      : `Welcome ${name.trim()}! Your ReTurn Newsletter Subscription`;

    // Send a personalized welcome email to the subscriber
    const emailResult = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [email],
      subject: emailSubject,
      // Add reply-to for better deliverability
      replyTo: 'hello@returnhypnosis.com',
      // Add headers for better deliverability
      headers: {
        'X-Entity-Ref-ID': `newsletter-welcome-${Date.now()}`,
        'List-Unsubscribe': '<mailto:hello@returnhypnosis.com?subject=unsubscribe>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      html: emailHtml,
      // Add plain text version for better deliverability
      text: generateWelcomeEmailText(name.trim(), latestBlogPost || undefined, welcomeSettings),
    });

    console.log('Welcome email sent successfully:', emailResult);

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        contactId: contactResult.data?.id,
        emailId: emailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json({ error: 'Failed to subscribe to newsletter. Please try again.' }, { status: 500 });
  }
}

// Helper function to get the blog post for welcome email
// Uses configured post ID from settings, or falls back to latest published post
function getLatestBlogPostForEmail(configuredPostId?: number | null) {
  try {
    // If a specific post is configured, use that
    if (configuredPostId) {
      const post = getPostById(configuredPostId);
      if (post && post.published) {
        return {
          id: post.id,
          title: post.title,
          excerpt: post.subtitle || 'Explore this insightful article on personal transformation through regression hypnosis.',
          url: `https://returnhypnosis.com/blog/${post.slug}`,
          category: post.category,
          readTime: post.read_time,
        };
      }
    }

    // Otherwise, get the latest published post from database
    const posts = getAllPosts(true); // Get published posts only
    if (!posts || posts.length === 0) {
      return null;
    }

    // Posts are already sorted by created_at DESC, so first is newest
    const latestPost = posts[0];

    return {
      id: latestPost.id,
      title: latestPost.title,
      excerpt: latestPost.subtitle || 'Explore this insightful article on personal transformation through regression hypnosis.',
      url: `https://returnhypnosis.com/blog/${latestPost.slug}`,
      category: latestPost.category,
      readTime: latestPost.read_time,
    };
  } catch (error) {
    console.error('Error getting blog post for welcome email:', error);
    return null;
  }
}

// Helper function to generate plain text version of welcome email
// Uses settings from database when available
function generateWelcomeEmailText(
  name: string,
  latestBlogPost?: { id: number; title: string; excerpt: string; url: string; category: string; readTime: string },
  settings?: { greeting?: string; quote_text?: string; quote_author?: string } | null
): string {
  let text = `Welcome to the ReTurn Newsletter!\n\n`;

  // Use greeting from settings or default
  const greeting = settings?.greeting
    ? settings.greeting.replace('{{name}}', name)
    : `Hello ${name}, and welcome!`;
  text += `${greeting}\n\n`;

  text += `Thank you for subscribing to the ReTurn Newsletter. You've just joined a community of people interested in personal transformation through regression hypnosis.\n\n`;
  text += `What to expect:\n`;
  text += `- Brain food and breakthrough insights\n`;
  text += `- Client transformation stories\n`;
  text += `- Tips for personal growth and healing\n`;
  text += `- Updates on regression hypnosis techniques\n\n`;

  if (latestBlogPost) {
    text += `Latest from the Blog:\n`;
    text += `${latestBlogPost.title}\n`;
    text += `${latestBlogPost.category} • ${latestBlogPost.readTime}\n`;
    text += `${latestBlogPost.excerpt}\n`;
    text += `Read full article: ${latestBlogPost.url}\n\n`;
  }

  text += `I'll be sending you valuable content every other week - no spam, just meaningful insights to support your journey.\n\n`;

  // Use quote from settings or default
  const quoteText = settings?.quote_text || 'The curious paradox is that when I accept myself just as I am, then I can change.';
  const quoteAuthor = settings?.quote_author || 'Carl Rogers';
  text += `"${quoteText}" - ${quoteAuthor}\n\n`;

  text += `If you have any questions or would like to learn more about my services, feel free to reply to this email.\n\n`;
  text += `With gratitude,\nSharon Di Salvo\nCertified Regression Hypnotherapist\n\n`;
  text += `---\n`;
  text += `You received this email because you subscribed to Sharon Di Salvo's newsletter.\n`;
  text += `If you no longer wish to receive these emails, reply with "unsubscribe" in the subject line.`;

  return text;
}
