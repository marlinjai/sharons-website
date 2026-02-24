// emails/OneTimeEmail.tsx
// Preview template for one-time custom emails

import { NewsletterTemplate } from './NewsletterTemplate';

export const OneTimeEmail = () => {
  return (
    <NewsletterTemplate
      subject="A Personal Note from Sharon"
      previewText="A Personal Note from Sharon"
      sections={[
        {
          type: 'text',
          title: 'Dear Sarah,',
          content:
            "I wanted to reach out personally to share something with you.\n\nThank you for being part of this community. Your openness to growth and self-discovery is truly inspiring, and it's a privilege to be part of your journey.\n\nIf there's ever anything I can help with, please don't hesitate to reach out.",
        },
      ]}
    />
  );
};

export default OneTimeEmail;
