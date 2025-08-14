// app/api/newsletter/route.ts
// Newsletter subscription API endpoint using Resend

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
// Import blog data directly for better reliability
import { blogPostsData } from '@/blogPosts/BlogData'

// Initialize Resend only when needed
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the name and email
    const { name, email } = await request.json()

    // Validate inputs
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    console.log('Adding contact to audience:', { name: name.trim(), email })

    // Add contact to Resend audience with name and email
    const resend = getResend()
    const contactResult = await resend.contacts.create({
      email: email,
      firstName: name.trim(),
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID
    })

    console.log('Contact created successfully:', contactResult)

    console.log('Sending welcome email to:', { name: name.trim(), email })

    // Get the latest blog post for the welcome email
    const latestBlogPost = getLatestBlogPostForEmail()
    const welcomeEmailData = {
      name: name.trim(),
      latestBlogPost: latestBlogPost || undefined
    }

    // Render the React Email template to HTML
    const emailHtml = await render(WelcomeEmail(welcomeEmailData))

    // Send a personalized welcome email to the subscriber
    const emailResult = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [email],
      subject: `Welcome ${name.trim()}! Your ReTurn Newsletter Subscription`,
      // Add reply-to for better deliverability
      replyTo: 'hello@returnhypnosis.com',
      // Add headers for better deliverability
      headers: {
        'X-Entity-Ref-ID': `newsletter-welcome-${Date.now()}`,
        'List-Unsubscribe': '<mailto:hello@returnhypnosis.com?subject=unsubscribe>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      },
      html: emailHtml,
      // Add plain text version for better deliverability
      text: generateWelcomeEmailText(name.trim(), latestBlogPost || undefined)
    })

    console.log('Welcome email sent successfully:', emailResult)

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        contactId: contactResult.data?.id,
        emailId: emailResult.data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter. Please try again.' },
      { status: 500 }
    )
  }
}

// Helper function to get the latest blog post for email
function getLatestBlogPostForEmail() {
  try {
    if (!blogPostsData || blogPostsData.length === 0) {
      return null
    }

    // Sort by ID descending and take the first one (newest post)
    const latestPost = [...blogPostsData].sort((a, b) => b.id - a.id)[0]

    if (!latestPost) {
      return null
    }

    // Format for email template
    return {
      id: latestPost.id,
      title: latestPost.title,
      excerpt: latestPost.subtitle || 'Explore this insightful article on personal transformation through regression hypnosis.',
      url: `https://returnhypnosis.com/blog/${latestPost.slug}`,
      category: latestPost.category,
      readTime: latestPost.readTime
    }
  } catch (error) {
    console.error('Error getting latest blog post:', error)
    return null
  }
}

// Helper function to format excerpt for plain text
function getFormattedExcerpt(post: any, maxLength: number = 150): string {
  if (post.excerpt.length <= maxLength) {
    return post.excerpt
  }

  // Truncate and add ellipsis
  return post.excerpt.substring(0, maxLength).trim() + '...'
}

// Helper function to generate plain text version of welcome email
function generateWelcomeEmailText(name: string, latestBlogPost?: { id: number; title: string; excerpt: string; url: string; category: string; readTime: string }): string {
  let text = `Welcome to the ReTurn Newsletter!\n\n`
  text += `Hello ${name}, and welcome!\n\n`
  text += `Thank you for subscribing to the ReTurn Newsletter. You've just joined a community of people interested in personal transformation through regression hypnosis.\n\n`
  text += `What to expect:\n`
  text += `- Brain food and breakthrough insights\n`
  text += `- Client transformation stories\n`
  text += `- Tips for personal growth and healing\n`
  text += `- Updates on regression hypnosis techniques\n\n`

  if (latestBlogPost) {
    text += `Latest from the Blog:\n`
    text += `${latestBlogPost.title}\n`
    text += `${latestBlogPost.category} • ${latestBlogPost.readTime}\n`
    text += `${latestBlogPost.excerpt}\n`
    text += `Read full article: ${latestBlogPost.url}\n\n`
  }

  text += `I'll be sending you valuable content every other week - no spam, just meaningful insights to support your journey.\n\n`
  text += `"The curious paradox is that when I accept myself just as I am, then I can change." - Carl Rogers\n\n`
  text += `If you have any questions or would like to learn more about my services, feel free to reply to this email.\n\n`
  text += `With gratitude,\nSharon Di Salvo\nCertified Regression Hypnotherapist\n\n`
  text += `---\n`
  text += `You received this email because you subscribed to Sharon Di Salvo's newsletter.\n`
  text += `If you no longer wish to receive these emails, reply with "unsubscribe" in the subject line.`

  return text
}
