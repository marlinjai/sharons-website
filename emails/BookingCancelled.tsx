// emails/BookingCancelled.tsx
// Preview template for booking cancellation emails

import { NewsletterTemplate } from './NewsletterTemplate';

export const BookingCancelled = () => {
  return (
    <NewsletterTemplate
      subject="Your Session Has Been Cancelled"
      previewText="Your session with Sharon Di Salvo has been cancelled"
      showUnsubscribe={false}
      bookingUrl="https://returnhypnosis.com/blog"
      bookingLabel="Blog"
      sections={[
        {
          type: 'text',
          title: 'Hello Sarah,',
          content:
            "Your Regression Hypnosis Session originally scheduled for Saturday, March 15, 2025 at 10:00 AM has been cancelled.\n\nIf you'd like to reschedule, please visit my booking page at any time.\n\nI hope to see you soon on your incredible journey.\n\nHave a beautiful day.\n\nBest wishes,",
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

export default BookingCancelled;
