// emails/BookingConfirmation.tsx
// Preview template for booking confirmation emails

import { NewsletterTemplate } from './NewsletterTemplate';

export const BookingConfirmation = () => {
  return (
    <NewsletterTemplate
      subject="Your Session is Confirmed"
      previewText="Welcome! Your session is scheduled for Saturday, March 15, 2025 at 10:00 AM"
      showUnsubscribe={false}
      bookingUrl="https://returnhypnosis.com/blog"
      bookingLabel="Blog"
      sections={[
        {
          type: 'text',
          title: 'Dear Sarah,',
          content:
            'Welcome. I am very much looking forward to meeting you.\n\nYour session is now reserved. Five full hours have been set aside exclusively for you, your story, and whatever is ready to be understood and brought into coherence.\n\nYou have created space for something meaningful.',
        },
        {
          type: 'text',
          content:
            '📅 Date & Time: Saturday, March 15, 2025 at 10:00 AM\n⏱️ Duration: 5 hours\n📍 Location: Online (Zoom)',
        },
        {
          type: 'text',
          content:
            'To help you arrive relaxed, present, and fully available for the experience, please take a moment to review the preparation below. Think of this as setting the conditions for a focused and insightful exploration.',
        },
        {
          type: 'text',
          title: 'Preparing for your session',
          content:
            'One of the most valuable aspects of the session is the opportunity to explore questions directly with the deeper layers of awareness.\n\nWhile the conscious mind tends to analyze, interpret, and revisit familiar data, the subconscious holds the broader pattern quietly, efficiently, and without effort. This session creates the conditions to access that perspective directly.\n\nPlease bring a list of up to 10 questions you would like to explore.',
        },
        {
          type: 'text',
          title: 'Here are examples of the kinds of inquiries clients often bring into a session:',
          content: '',
        },
        {
          type: 'tips',
          content:
            'What deeper truth is trying to come into focus now?\nWhy do my most meaningful relationships feel disproportionately complex?\nWhy has personal growth not yet translated into ease in intimacy?\nWhich internal narrative may no longer be serving my current life?',
        },
        {
          type: 'text',
          content:
            'There is no limit to the depth or precision of what you choose to explore. Shape your questions around what you most want to understand.',
        },
        {
          type: 'text',
          title: 'On the day of your session',
          content: '',
        },
        {
          type: 'tips',
          content:
            'Please have a light breakfast and bring a small snack for afterward, such as a banana.\nWear comfortable, breathable layers.\nAvoid alcohol or recreational substances.\nReduce coffee intake if possible. A small amount is fine if needed.',
        },
        {
          type: 'text',
          content:
            "Sessions last up to five hours. I recommend keeping the rest of your day clear to allow time for rest, reflection, and integration. Some insights can be powerful, and quiet time afterward helps them settle naturally.\n\nIf any questions come up before your session, feel free to reach out to me directly at this email address.\n\nI look forward to a deep and focused exploration and to working together.",
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

export default BookingConfirmation;
