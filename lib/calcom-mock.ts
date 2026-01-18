// lib/calcom-mock.ts
// Mock data generator for testing Cal.com booking emails

import { CalcomBookingPayload } from '@/lib/calcom';

// Create a mock booking payload for testing
export function createMockBookingPayload(
  testEmail: string,
  clientName: string = 'Test Client'
): CalcomBookingPayload {
  // Set session to 7 days from now at 2 PM Europe/Berlin time
  const sessionDate = new Date();
  sessionDate.setDate(sessionDate.getDate() + 7);
  sessionDate.setHours(14, 0, 0, 0);

  // End time is 5 hours later
  const endDate = new Date(sessionDate);
  endDate.setHours(endDate.getHours() + 5);

  return {
    uid: `mock-booking-${Date.now()}`,
    eventTypeId: 12345,
    title: '5-hrs Regression Session',
    description: 'A deep healing regression session',
    startTime: sessionDate.toISOString(),
    endTime: endDate.toISOString(),
    location: 'In-person session',
    status: 'ACCEPTED',
    attendees: [
      {
        email: testEmail,
        name: clientName,
        timeZone: 'Europe/Berlin',
      },
    ],
    organizer: {
      email: 'hello@returnhypnosis.com',
      name: 'Sharon Di Salvo',
      timeZone: 'Europe/Berlin',
    },
    responses: {
      name: { value: clientName },
      email: { value: testEmail },
      notes: { value: 'Test booking for email preview' },
    },
    metadata: {},
  };
}

// Get formatted mock booking details for display
export function getMockBookingDetails(payload: CalcomBookingPayload): {
  session: string;
  dateTime: string;
  duration: string;
  location: string;
  timezone: string;
} {
  const attendee = payload.attendees[0];
  const startDate = new Date(payload.startTime);
  const endDate = new Date(payload.endTime);
  const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  return {
    session: payload.title,
    dateTime: startDate.toLocaleString('en-US', {
      timeZone: attendee?.timeZone || 'Europe/Berlin',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    duration: `${durationHours} hours`,
    location: payload.location || 'To be confirmed',
    timezone: attendee?.timeZone || 'Europe/Berlin',
  };
}
