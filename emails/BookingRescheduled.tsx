// emails/BookingRescheduled.tsx
// Preview template for booking rescheduled emails

import { NewsletterTemplate } from './NewsletterTemplate';

export const BookingRescheduled = () => {
  return (
    <NewsletterTemplate
      subject="Your Session Has Been Rescheduled"
      previewText="Your session has been rescheduled to Saturday, March 22, 2025 at 2:00 PM"
      showUnsubscribe={false}
      bookingUrl="https://returnhypnosis.com/blog"
      bookingLabel="Blog"
      sections={[
        {
          type: 'text',
          title: 'Hello Sarah,',
          content: 'Your session has been rescheduled. Here are the updated details:',
        },
        {
          type: 'text',
          content:
            '📅 **New Date & Time:** Saturday, March 22, 2025 at 2:00 PM\n⏱️ **Duration:** 5 hours\n📍 **Location:** Online (Zoom)',
        },
        {
          type: 'text',
          content:
            "If you have any questions or need to make further changes, please don't hesitate to reach out.\n\nI look forward to our session together.",
        },
        {
          type: 'signature',
          content: 'Sharon',
          author: 'Founder, ReTurn Hypnosis',
          ctaText: 'For the curious, the brave, and the ready',
          ctaUrl: 'hello@returnhypnosis.com',
        },
      ]}
    />
  );
};

export default BookingRescheduled;
