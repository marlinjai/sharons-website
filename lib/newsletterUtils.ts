// lib/newsletterUtils.ts
// Utility functions for creating newsletter content

import { NewsletterTemplate } from '../emails/NewsletterTemplate';

// Content section types for flexible newsletter structure
export interface ContentSection {
  type: 'text' | 'quote' | 'story' | 'tips' | 'cta' | 'image';
  title?: string;
  content: string;
  author?: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
}

export interface NewsletterData {
  subject: string;
  previewText: string;
  issueNumber?: number;
  date?: string;
  sections: ContentSection[];
  featuredStory?: {
    title: string;
    excerpt: string;
    imageUrl?: string;
    readMoreUrl?: string;
  };
  fromName?: string;
  fromEmail?: string;
  replyTo?: string;
  websiteUrl?: string;
  bookingUrl?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// Helper function to create a text section
export const createTextSection = (content: string, title?: string, backgroundColor?: string): ContentSection => ({
  type: 'text',
  title,
  content,
  backgroundColor,
});

// Helper function to create a quote section
export const createQuoteSection = (content: string, author?: string, backgroundColor?: string): ContentSection => ({
  type: 'quote',
  content,
  author,
  backgroundColor,
});

// Helper function to create a story section
export const createStorySection = (
  title: string,
  content: string,
  imageUrl?: string,
  imageAlt?: string,
  backgroundColor?: string
): ContentSection => ({
  type: 'story',
  title,
  content,
  imageUrl,
  imageAlt,
  backgroundColor,
});

// Helper function to create a tips section
export const createTipsSection = (title: string, tips: string[], backgroundColor?: string): ContentSection => ({
  type: 'tips',
  title,
  content: tips.join('\n'),
  backgroundColor,
});

// Helper function to create a call-to-action section
export const createCtaSection = (
  content: string,
  ctaText: string,
  ctaUrl: string,
  backgroundColor?: string
): ContentSection => ({
  type: 'cta',
  content,
  ctaText,
  ctaUrl,
  backgroundColor,
});

// Helper function to create an image section
export const createImageSection = (
  imageUrl: string,
  imageAlt?: string,
  caption?: string,
  backgroundColor?: string
): ContentSection => ({
  type: 'image',
  content: caption || '',
  imageUrl,
  imageAlt,
  backgroundColor,
});

// Example newsletter data for testing
export const exampleNewsletterData: NewsletterData = {
  subject: 'ReTurn Newsletter - Issue #1',
  previewText: 'Discover the power of regression hypnosis and personal transformation',
  issueNumber: 1,
  sections: [
    createTextSection(
      "Welcome to the first issue of the ReTurn newsletter! I'm excited to share insights, stories, and wisdom about the transformative power of regression hypnosis.",
      'Welcome to Your Journey'
    ),
    createQuoteSection(
      'The greatest discovery of my generation is that human beings can alter their lives by altering their attitudes of mind.',
      'William James'
    ),
    createStorySection(
      "A Client's Breakthrough",
      'Recently, I worked with a client who had been carrying anxiety for years. Through regression hypnosis, we discovered the root cause was a childhood experience that had been buried deep in their subconscious. After just one session, they reported feeling lighter and more at peace than they had in decades.',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'Peaceful meditation scene'
    ),
    createTipsSection('3 Ways to Prepare for Your First Session', [
      'Set an intention for what you hope to discover or heal',
      'Keep an open mind and trust the process',
      'Journal your thoughts and feelings in the days leading up to your session',
    ]),
    createCtaSection(
      'Ready to begin your own transformation journey? Book your first session today.',
      'Book Your Session',
      'https://returnhypnosis.com/booking'
    ),
  ],
  featuredStory: {
    title: 'The Science Behind Regression Hypnosis',
    excerpt:
      'Recent studies show that regression hypnosis can access memories and emotions that are normally hidden from conscious awareness, leading to profound healing and personal growth.',
    readMoreUrl: 'https://returnhypnosis.com/blog/regression-hypnosis-science',
  },
};

// Function to validate newsletter data
export const validateNewsletterData = (data: NewsletterData): boolean => {
  if (!data.subject || !data.previewText) {
    return false;
  }

  if (!data.sections || data.sections.length === 0) {
    return false;
  }

  // Validate each section
  for (const section of data.sections) {
    if (!section.type || !section.content) {
      return false;
    }

    // Validate specific section types
    switch (section.type) {
      case 'cta':
        if (!section.ctaText || !section.ctaUrl) {
          return false;
        }
        break;
      case 'image':
        if (!section.imageUrl) {
          return false;
        }
        break;
    }
  }

  return true;
};

// Function to render newsletter template with data
export const renderNewsletter = (data: NewsletterData) => {
  if (!validateNewsletterData(data)) {
    throw new Error('Invalid newsletter data');
  }

  return NewsletterTemplate(data);
};
