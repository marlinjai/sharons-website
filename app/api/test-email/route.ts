// app/api/test-email/route.ts
// Test endpoint to verify Resend email functionality

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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('Testing email send to:', email);
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('From domain:', 'hello@regressionhypnosis.com');

    const resend = getResend();
    const result = await resend.emails.send({
      from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
      to: [email],
      subject: 'Test Email from Sharon Di Salvo',
      replyTo: 'hello@returnhypnosis.com',
      headers: {
        'X-Entity-Ref-ID': `test-email-${Date.now()}`,
      },
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test Email</h2>
          <p>This is a test email to verify Resend configuration.</p>
          <p>If you receive this, email sending is working correctly!</p>
        </div>
      `,
      text: `
Test Email

This is a test email to verify Resend configuration.
If you receive this, email sending is working correctly!
      `,
    });

    console.log('Email sent successfully:', result);

    return NextResponse.json({
      success: true,
      emailId: result.data?.id,
      message: 'Test email sent successfully',
    });
  } catch (error) {
    console.error('Test email error:', error);

    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
