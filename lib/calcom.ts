// lib/calcom.ts
// Cal.com integration utilities and webhook handling
//
// Cal.com Integration Documentation:
// -----------------------------------
// Your current setup uses @calcom/embed-react for booking display.
// Cal Link: sharondisalvo/5-hrs
//
// To enable automated booking emails, you need to:
// 1. Set up webhooks in Cal.com dashboard (Settings > Developer > Webhooks)
// 2. Configure the webhook to point to /api/webhooks/calcom
// 3. Subscribe to events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
//
// Cal.com webhook payload structure (BOOKING_CREATED):
// {
//   "triggerEvent": "BOOKING_CREATED",
//   "createdAt": "2024-01-15T10:30:00.000Z",
//   "payload": {
//     "uid": "booking-unique-id",
//     "eventTypeId": 12345,
//     "title": "5-hrs Session",
//     "description": "Session description",
//     "startTime": "2024-01-20T14:00:00.000Z",
//     "endTime": "2024-01-20T19:00:00.000Z",
//     "location": "Zoom or in-person",
//     "status": "ACCEPTED",
//     "attendees": [
//       {
//         "email": "client@example.com",
//         "name": "Client Name",
//         "timeZone": "Europe/Berlin"
//       }
//     ],
//     "organizer": {
//       "email": "sharon@returnhypnosis.com",
//       "name": "Sharon Di Salvo",
//       "timeZone": "Europe/Berlin"
//     },
//     "responses": {
//       "name": { "value": "Client Name" },
//       "email": { "value": "client@example.com" },
//       "notes": { "value": "Any notes from the client" }
//     },
//     "metadata": {}
//   }
// }

// Webhook event types
export type CalcomWebhookEvent =
  | 'BOOKING_CREATED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_RESCHEDULED'
  | 'BOOKING_REQUESTED'
  | 'BOOKING_PAYMENT_INITIATED'
  | 'BOOKING_REJECTED'
  | 'MEETING_ENDED';

// Booking payload type
export interface CalcomBookingPayload {
  uid: string;
  eventTypeId: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  status: string;
  attendees: Array<{
    email: string;
    name: string;
    timeZone: string;
  }>;
  organizer: {
    email: string;
    name: string;
    timeZone: string;
  };
  responses?: {
    name?: { value: string };
    email?: { value: string };
    notes?: { value: string };
  };
  metadata?: Record<string, unknown>;
}

// Full webhook payload
export interface CalcomWebhookPayload {
  triggerEvent: CalcomWebhookEvent;
  createdAt: string;
  payload: CalcomBookingPayload;
}

// Environment variable for webhook secret (optional but recommended)
// Set CALCOM_WEBHOOK_SECRET in your .env file
export function getWebhookSecret(): string | undefined {
  return process.env.CALCOM_WEBHOOK_SECRET;
}

// Helper to format booking date/time for emails
export function formatBookingDateTime(isoString: string, timeZone: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString;
  }
}

// Helper to calculate session duration
export function getSessionDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

// Calculate reminder time (e.g., 24 hours before session)
export function calculateReminderTime(sessionStartTime: string, hoursBefore: number = 24): Date {
  const sessionDate = new Date(sessionStartTime);
  return new Date(sessionDate.getTime() - hoursBefore * 60 * 60 * 1000);
}

// Check if a reminder should be sent (session is more than X hours away)
export function shouldSendReminder(sessionStartTime: string, hoursBefore: number = 24): boolean {
  const now = new Date();
  const reminderTime = calculateReminderTime(sessionStartTime, hoursBefore);
  return reminderTime > now;
}

