// emails/ExampleNewsletter.tsx
// Example newsletter using the NewsletterTemplate with sample data

import { NewsletterTemplate } from './NewsletterTemplate';
import { exampleNewsletterData } from '../lib/newsletterUtils';

export const ExampleNewsletter = () => {
  return <NewsletterTemplate {...exampleNewsletterData} />;
};

export default ExampleNewsletter;
