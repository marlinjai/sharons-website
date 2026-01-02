// app/api/webhooks/calcom/route.ts
// Webhook endpoint for Cal.com booking events
//
// SETUP INSTRUCTIONS:
// 1. Go to your Cal.com dashboard: https://app.cal.com/settings/developer/webhooks
// 2. Create a new webhook pointing to: https://yoursite.com/api/webhooks/calcom
// 3. Select events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
// 4. (Optional) Set a webhook secret and add CALCOM_WEBHOOK_SECRET to your .env

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import {
  CalcomWebhookPayload,
  formatBookingDateTime,
  getSessionDuration,
  getWebhookSecret
} from '@/lib/calcom';
import { getEmailSettingsByType } from '@/lib/db';
import crypto from 'crypto';

// Initialize Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Verify webhook signature (if secret is configured)
function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  const secret = getWebhookSecret();

  // If no secret configured, skip verification (not recommended for production)
  if (!secret) {
    console.warn('CALCOM_WEBHOOK_SECRET not set - skipping signature verification');
    return true;
  }

  if (!signature) {
    console.error('No signature provided in webhook request');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// POST /api/webhooks/calcom - Handle Cal.com webhook events
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-cal-signature-256');

    // Verify signature
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse payload
    const webhookPayload: CalcomWebhookPayload = JSON.parse(rawBody);
    const { triggerEvent, payload } = webhookPayload;

    console.log('Cal.com webhook received:', triggerEvent, payload.uid);

    // Handle different events
    switch (triggerEvent) {
      case 'BOOKING_CREATED':
        await handleBookingCreated(payload);
        break;

      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(payload);
        break;

      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(payload);
        break;

      default:
        console.log('Unhandled webhook event:', triggerEvent);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle new booking - send confirmation email
async function handleBookingCreated(payload: CalcomWebhookPayload['payload']) {
  const attendee = payload.attendees[0];
  if (!attendee) {
    console.error('No attendee found in booking');
    return;
  }

  // Check if booking confirmation emails are enabled
  const settings = getEmailSettingsByType('booking_confirmation');
  if (settings && !settings.enabled) {
    console.log('Booking confirmation emails are disabled');
    return;
  }

  const resend = getResend();
  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);
  const duration = getSessionDuration(payload.startTime, payload.endTime);

  // Render email using newsletter template with booking details
  const emailHtml = await render(
    NewsletterTemplate({
      subject: `Your ${payload.title} Session is Confirmed`,
      previewText: `Your session with Sharon Di Salvo is scheduled for ${formattedDate}`,
      sections: [
        {
          type: 'text',
          title: `Hello ${attendee.name},`,
          content: `Thank you for booking a session with me! I'm looking forward to our time together.\n\nHere are your session details:`,
        },
        {
          type: 'text',
          content: `📅 **Date & Time:** ${formattedDate}\n⏱️ **Duration:** ${duration}\n📍 **Location:** ${payload.location || 'To be confirmed'}`,
        },
        {
          type: 'text',
          title: 'Before Your Session',
          content: `To make the most of our time together:\n\n• Find a quiet, comfortable space where you won't be disturbed\n• Have a glass of water nearby\n• Set an intention for what you'd like to explore or heal\n• Come with an open mind and heart`,
        },
      ],
    })
  );

  // Send confirmation email
  await resend.emails.send({
    from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject: `✨ Your ${payload.title} Session is Confirmed`,
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-confirmation-${payload.uid}`,
    },
    html: emailHtml,
  });

  console.log('Booking confirmation email sent to:', attendee.email);

  // TODO: Schedule reminder email for 24 hours before session
  // This would require a job queue (e.g., Vercel Cron, BullMQ, or similar)
}

// Handle booking cancellation
async function handleBookingCancelled(payload: CalcomWebhookPayload['payload']) {
  const attendee = payload.attendees[0];
  if (!attendee) return;

  const resend = getResend();
  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);

  const emailHtml = await render(
    NewsletterTemplate({
      subject: 'Your Session Has Been Cancelled',
      previewText: 'Your session with Sharon Di Salvo has been cancelled',
      sections: [
        {
          type: 'text',
          title: `Hello ${attendee.name},`,
          content: `Your ${payload.title} session originally scheduled for ${formattedDate} has been cancelled.\n\nIf you'd like to reschedule, please visit my booking page at any time.\n\nI hope to see you soon on your healing journey.`,
        },
      ],
    })
  );

  await resend.emails.send({
    from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject: 'Your Session Has Been Cancelled',
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-cancelled-${payload.uid}`,
    },
    html: emailHtml,
  });

  console.log('Cancellation email sent to:', attendee.email);
}

// Handle booking rescheduled
async function handleBookingRescheduled(payload: CalcomWebhookPayload['payload']) {
  const attendee = payload.attendees[0];
  if (!attendee) return;

  const resend = getResend();
  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);
  const duration = getSessionDuration(payload.startTime, payload.endTime);

  const emailHtml = await render(
    NewsletterTemplate({
      subject: 'Your Session Has Been Rescheduled',
      previewText: `Your session has been rescheduled to ${formattedDate}`,
      sections: [
        {
          type: 'text',
          title: `Hello ${attendee.name},`,
          content: `Your session has been rescheduled. Here are the updated details:`,
        },
        {
          type: 'text',
          content: `📅 **New Date & Time:** ${formattedDate}\n⏱️ **Duration:** ${duration}\n📍 **Location:** ${payload.location || 'To be confirmed'}`,
        },
        {
          type: 'text',
          content: `If you have any questions or need to make further changes, please don't hesitate to reach out.\n\nI look forward to our session together.`,
        },
      ],
    })
  );

  await resend.emails.send({
    from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject: '📅 Your Session Has Been Rescheduled',
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-rescheduled-${payload.uid}`,
    },
    html: emailHtml,
  });

  console.log('Reschedule email sent to:', attendee.email);
}

