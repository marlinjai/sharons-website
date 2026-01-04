// app/api/contact/route.ts
// Contact form API endpoint - sends email via Resend to hello@returnhypnosis.com

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only when needed
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check environment
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = getResend();

    // Build email content
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name.trim()}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message.trim()}</p>
    `;

    const text = `
New Contact Form Submission

Name: ${name.trim()}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}
---
Message:
${message.trim()}
    `.trim();

    // Send email to Sharon
    const result = await resend.emails.send({
      from: 'ReTurn Website <hello@returnhypnosis.com>',
      to: ['hello@returnhypnosis.com'],
      subject: `Contact Form: ${name.trim()}`,
      replyTo: email,
      html,
      text,
    });

    console.log('Contact form email sent:', result);

    return NextResponse.json({ success: true, emailId: result.data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
