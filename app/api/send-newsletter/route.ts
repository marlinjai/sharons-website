// app/api/send-newsletter/route.ts
// API endpoint for sending bi-weekly newsletters using the NewsletterTemplate

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { NewsletterTemplate } from '@/emails/NewsletterTemplate'

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

// Newsletter content interface
interface NewsletterContent {
  subject: string
  previewText: string
  issueNumber: number
  date?: string
  featuredStory?: {
    title: string
    excerpt: string
    imageUrl?: string
    readMoreUrl?: string
  }
  sections: Array<{
    type: 'text' | 'quote' | 'story' | 'tips' | 'cta' | 'image'
    title?: string
    content: string
    author?: string
    imageUrl?: string
    imageAlt?: string
    ctaText?: string
    ctaUrl?: string
    backgroundColor?: string
  }>
  socialLinks?: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get newsletter content
    const newsletterData: NewsletterContent = await request.json()

    // Validate required fields
    if (!newsletterData.subject || !newsletterData.sections || newsletterData.sections.length === 0) {
      return NextResponse.json(
        { error: 'Subject and at least one content section are required' },
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

    console.log('Sending newsletter:', { subject: newsletterData.subject, issueNumber: newsletterData.issueNumber })

    // Render the React Email template to HTML
    const emailHtml = await render(NewsletterTemplate(newsletterData))

    // Generate plain text version for better deliverability
    const plainText = generatePlainTextVersion(newsletterData)

    // Send newsletter to all subscribers in the audience
    // Note: For production, you'll need to fetch the audience contacts first
    // and send to them individually, or use Resend's batch sending features
    const emailResult = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: ['subscriber@example.com'], // Replace with actual subscriber list
      subject: newsletterData.subject,
      replyTo: 'hello@returnhypnosis.com',
      headers: {
        'X-Entity-Ref-ID': `newsletter-issue-${newsletterData.issueNumber}-${Date.now()}`,
        'List-Unsubscribe': '<mailto:hello@returnhypnosis.com?subject=unsubscribe>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      },
      html: emailHtml,
      text: plainText
    })

    console.log('Newsletter sent successfully:', emailResult)

    return NextResponse.json(
      { 
        message: 'Newsletter sent successfully',
        emailId: emailResult.data?.id,
        issueNumber: newsletterData.issueNumber
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter sending error:', error)
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Failed to send newsletter. Please try again.' },
      { status: 500 }
    )
  }
}

// Helper function to generate plain text version of newsletter
function generatePlainTextVersion(data: NewsletterContent): string {
  let text = `${data.subject}\n\n`
  
  if (data.issueNumber) {
    text += `Issue #${data.issueNumber}`
    if (data.date) text += ` • ${data.date}`
    text += '\n\n'
  }
  
  text += `ReTurn Newsletter\n`
  text += `Personal transformation through regression hypnosis\n\n`
  
  if (data.featuredStory) {
    text += `FEATURED STORY: ${data.featuredStory.title}\n`
    text += `${data.featuredStory.excerpt}\n\n`
  }
  
  data.sections.forEach(section => {
    if (section.title) text += `${section.title}\n`
    
    switch (section.type) {
      case 'quote':
        text += `"${section.content}"`
        if (section.author) text += ` — ${section.author}`
        text += '\n\n'
        break
      
      case 'tips':
        const tips = section.content.split('\n')
        tips.forEach(tip => {
          if (tip.trim()) text += `• ${tip.trim()}\n`
        })
        text += '\n'
        break
      
      case 'cta':
        text += `${section.content}\n`
        if (section.ctaText && section.ctaUrl) {
          text += `${section.ctaText}: ${section.ctaUrl}\n`
        }
        text += '\n'
        break
      
      default:
        text += `${section.content}\n\n`
    }
  })
  
  text += `\n"The only journey is the one within." — Rainer Maria Rilke\n\n`
  text += `Ready to begin your own transformation journey?\n`
  text += `Book your session: https://returnhypnosis.com/booking\n\n`
  text += `Or reply to this email with any questions about regression hypnosis.\n\n`
  text += `With warmth and gratitude,\nSharon Di Salvo\nCertified Regression Hypnotherapist\n\n`
  text += `---\n`
  text += `Website: https://returnhypnosis.com\n`
  text += `Book Session: https://returnhypnosis.com/booking\n`
  text += `Contact: hello@returnhypnosis.com\n\n`
  text += `You received this email because you subscribed to Sharon Di Salvo's newsletter.\n`
  text += `If you no longer wish to receive these emails, reply with "unsubscribe" in the subject line.`
  
  return text
} 