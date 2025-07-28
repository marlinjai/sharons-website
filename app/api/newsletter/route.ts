// app/api/newsletter/route.ts
// Newsletter subscription API endpoint using Resend

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the email
    const { email } = await request.json()

    // Validate email
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

    console.log('Adding email to audience:', email)

    // Add email to Resend audience (this creates a contact in your audience)
    const contactResult = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID
    })

    console.log('Contact created successfully:', contactResult)

    console.log('Sending welcome email to:', email)

    // Send a welcome email to the subscriber
    const emailResult = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [email],
      subject: 'Welcome to Sharon\'s Newsletter - Please Confirm Your Subscription',
      // Add reply-to for better deliverability
      replyTo: 'hello@returnhypnosis.com',
      // Add headers for better deliverability
      headers: {
        'X-Entity-Ref-ID': `newsletter-welcome-${Date.now()}`,
        'List-Unsubscribe': '<mailto:hello@returnhypnosis.com?subject=unsubscribe>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      },
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Sharon Di Salvo's Newsletter</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f6f2; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #A32015; font-size: 28px; margin: 0; font-weight: bold;">
                Welcome to Sharon Di Salvo's Newsletter!
              </h1>
            </div>
            
            <!-- Main Content -->
            <div style="color: #333333; line-height: 1.8; font-size: 16px;">
              <p style="margin-bottom: 20px;">
                Hello and welcome! 👋
              </p>
              
              <p style="margin-bottom: 20px;">
                Thank you for subscribing to my newsletter. You've just joined a community of people interested in personal transformation through regression hypnosis.
              </p>
              
              <p style="margin-bottom: 20px;">
                <strong>What to expect:</strong>
              </p>
              
              <ul style="margin-bottom: 25px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Brain food and breakthrough insights</li>
                <li style="margin-bottom: 8px;">Client transformation stories</li>
                <li style="margin-bottom: 8px;">Tips for personal growth and healing</li>
                <li style="margin-bottom: 8px;">Updates on regression hypnosis techniques</li>
              </ul>
              
              <p style="margin-bottom: 25px;">
                I'll be sending you valuable content every other week - no spam, just meaningful insights to support your journey.
              </p>
              
              <div style="background-color: #f7f6f2; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <p style="margin: 0; font-style: italic; color: #666;">
                  "The curious paradox is that when I accept myself just as I am, then I can change." - Carl Rogers
                </p>
              </div>
              
              <p style="margin-bottom: 30px;">
                If you have any questions or would like to learn more about my services, feel free to reply to this email.
              </p>
              
              <p style="margin-bottom: 0;">
                With gratitude,<br>
                <strong>Sharon Di Salvo</strong><br>
                <span style="color: #A32015;">Certified Regression Hypnotherapist</span>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666666; text-align: center;">
              <p style="margin-bottom: 10px;">
                You received this email because you subscribed to Sharon Di Salvo's newsletter.
              </p>
              <p style="margin: 0;">
                If you no longer wish to receive these emails, you can 
                <a href="mailto:hello@returnhypnosis.com?subject=unsubscribe" style="color: #A32015;">unsubscribe here</a>.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Add plain text version for better deliverability
      text: `
Welcome to Sharon Di Salvo's Newsletter!

Hello and welcome!

Thank you for subscribing to my newsletter. You've just joined a community of people interested in personal transformation through regression hypnosis.

What to expect:
- Brain food and breakthrough insights
- Client transformation stories  
- Tips for personal growth and healing
- Updates on regression hypnosis techniques

I'll be sending you valuable content every other week - no spam, just meaningful insights to support your journey.

"The curious paradox is that when I accept myself just as I am, then I can change." - Carl Rogers

If you have any questions or would like to learn more about my services, feel free to reply to this email.

With gratitude,
Sharon Di Salvo
Certified Regression Hypnotherapist

---
You received this email because you subscribed to Sharon Di Salvo's newsletter.
If you no longer wish to receive these emails, reply with "unsubscribe" in the subject line.
      `
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