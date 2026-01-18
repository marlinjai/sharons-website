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
import {
  CalcomWebhookPayload,
  getWebhookSecret
} from '@/lib/calcom';
import {
  buildBookingConfirmationEmail,
  buildBookingCancelledEmail,
  buildBookingRescheduledEmail,
} from '@/lib/booking-emails';
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
  const { html, subject } = await buildBookingConfirmationEmail(payload);

  // Send confirmation email
  await resend.emails.send({
    from: 'ReTurn Hypnosis <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject,
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-confirmation-${payload.uid}`,
    },
    html,
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
  const { html, subject } = await buildBookingCancelledEmail(payload);

  await resend.emails.send({
    from: 'ReTurn Hypnosis <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject,
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-cancelled-${payload.uid}`,
    },
    html,
  });

  console.log('Cancellation email sent to:', attendee.email);
}

// Handle booking rescheduled
async function handleBookingRescheduled(payload: CalcomWebhookPayload['payload']) {
  const attendee = payload.attendees[0];
  if (!attendee) return;

  const resend = getResend();
  const { html, subject } = await buildBookingRescheduledEmail(payload);

  await resend.emails.send({
    from: 'ReTurn Hypnosis <hello@returnhypnosis.com>',
    to: [attendee.email],
    subject,
    replyTo: 'hello@returnhypnosis.com',
    headers: {
      'X-Entity-Ref-ID': `booking-rescheduled-${payload.uid}`,
    },
    html,
  });

  console.log('Reschedule email sent to:', attendee.email);
}

