// lib/booking-emails.ts
// Reusable email building functions for Cal.com booking emails

import { render } from '@react-email/render';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import {
  CalcomBookingPayload,
  formatBookingDateTime,
  getSessionDuration
} from '@/lib/calcom';

// Email build result type
export interface BookingEmailResult {
  html: string;
  subject: string;
}

// Helper to extract first name from full name
function getFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

// Build booking confirmation email
export async function buildBookingConfirmationEmail(
  payload: CalcomBookingPayload
): Promise<BookingEmailResult> {
  const attendee = payload.attendees[0];
  if (!attendee) {
    throw new Error('No attendee found in booking payload');
  }

  const firstName = getFirstName(attendee.name);
  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);
  const duration = getSessionDuration(payload.startTime, payload.endTime);

  const html = await render(
    NewsletterTemplate({
      subject: `Your Session is Confirmed`,
      previewText: `Welcome! Your session is scheduled for ${formattedDate}`,
      sections: [
        {
          type: 'text',
          title: `Dear ${firstName},`,
          content: `Welcome. I am very much looking forward to meeting you.\n\nYour session is now reserved. Five full hours have been set aside exclusively for you, your story, and whatever is ready to be understood and brought into coherence.\n\nYou have created space for something meaningful.`,
        },
        {
          type: 'text',
          content: `📅 Date & Time: ${formattedDate}\n⏱️ Duration: ${duration}\n📍 Location: ${payload.location || 'To be confirmed'}`,
        },
        {
          type: 'text',
          content: `To help you arrive relaxed, present, and fully available for the experience, please take a moment to review the preparation below. Think of this as setting the conditions for a focused and insightful exploration.`,
        },
        {
          type: 'text',
          title: 'Preparing for your session',
          content: `One of the most valuable aspects of the session is the opportunity to explore questions directly with the deeper layers of awareness.\n\nWhile the conscious mind tends to analyze, interpret, and revisit familiar data, the subconscious holds the broader pattern quietly, efficiently, and without effort. This session creates the conditions to access that perspective directly.\n\nPlease bring a list of up to 10 questions you would like to explore.`,
        },
        {
          type: 'text',
          title: 'Here are examples of the kinds of inquiries clients often bring into a session:',
          content: ``,
        },
        {
          type: 'tips',
          content: `What deeper truth is trying to come into focus now?\nWhy do my most meaningful relationships feel disproportionately complex?\nWhy has personal growth not yet translated into ease in intimacy?\nWhich internal narrative may no longer be serving my current life?`,
        },
        {
          type: 'text',
          content: `There is no limit to the depth or precision of what you choose to explore. Shape your questions around what you most want to understand.`,
        },
        {
          type: 'text',
          title: 'On the day of your session',
          content: ``,
        },
        {
          type: 'tips',
          content: `Please have a light breakfast and bring a small snack for afterward, such as a banana.\nWear comfortable, breathable layers.\nAvoid alcohol or recreational substances.\nReduce coffee intake if possible. A small amount is fine if needed.`,
        },
        {
          type: 'text',
          content: `Sessions last up to five hours. I recommend keeping the rest of your day clear to allow time for rest, reflection, and integration. Some insights can be powerful, and quiet time afterward helps them settle naturally.\n\nI look forward to a deep and focused exploration, and to working together.`,
        },
        {
          type: 'signature',
          content: `Sharon`,
          author: `Founder, ReTurn Hypnosis`,
          ctaText: `For the curious, the brave, and the ready`,
          ctaUrl: `hello@returnhypnosis.com`,
        },
      ],
    })
  );

  return {
    html,
    subject: `Your Session is Confirmed`,
  };
}

// Build booking cancelled email
export async function buildBookingCancelledEmail(
  payload: CalcomBookingPayload
): Promise<BookingEmailResult> {
  const attendee = payload.attendees[0];
  if (!attendee) {
    throw new Error('No attendee found in booking payload');
  }

  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);

  const html = await render(
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

  return {
    html,
    subject: 'Your Session Has Been Cancelled',
  };
}

// Build booking rescheduled email
export async function buildBookingRescheduledEmail(
  payload: CalcomBookingPayload
): Promise<BookingEmailResult> {
  const attendee = payload.attendees[0];
  if (!attendee) {
    throw new Error('No attendee found in booking payload');
  }

  const formattedDate = formatBookingDateTime(payload.startTime, attendee.timeZone);
  const duration = getSessionDuration(payload.startTime, payload.endTime);

  const html = await render(
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

  return {
    html,
    subject: '📅 Your Session Has Been Rescheduled',
  };
}
