# Newsletter Template Guide

## Overview

The `NewsletterTemplate` is a flexible, reusable email template designed for bi-weekly newsletters. It supports multiple content types and maintains consistent branding while allowing for dynamic content.

## Features

- **Multiple Content Types**: text, quotes, stories, tips, CTAs, and images
- **Featured Stories**: Optional highlighted content with images and links
- **Responsive Design**: Works well on desktop and mobile
- **Brand Consistency**: Uses your existing color scheme and typography
- **Accessibility**: Proper alt text and semantic HTML
- **Deliverability**: Includes unsubscribe headers and plain text versions

## Content Types

### 1. Text Sections
Simple text content with optional titles.

```typescript
{
  type: 'text',
  title: "Welcome to Your Transformation Journey",
  content: "I'm so excited to share this first issue of the ReTurn Newsletter with you..."
}
```

### 2. Quote Sections
Inspiring quotes with attribution.

```typescript
{
  type: 'quote',
  content: "The past is not dead, it is living in us, and will be dead in us only so far as we ourselves have disposed of it.",
  author: "George Eliot"
}
```

### 3. Story Sections
Client stories or case studies with optional images.

```typescript
{
  type: 'story',
  title: "A Client's Breakthrough Moment",
  content: "Last week, I worked with a client who had been carrying unexplained grief...",
  imageUrl: "https://example.com/breakthrough.jpg",
  imageAlt: "Peaceful meditation scene"
}
```

### 4. Tips Sections
Bullet-pointed tips with icons.

```typescript
{
  type: 'tips',
  title: "3 Ways to Prepare for Your First Regression Session",
  content: "Set aside time for quiet reflection before your session\nBring an open mind and heart to the experience\nTrust your intuition and inner wisdom"
}
```

### 5. CTA Sections
Call-to-action sections with buttons.

```typescript
{
  type: 'cta',
  content: "Ready to explore your own past lives and unlock deep healing?",
  ctaText: "Book Your First Session",
  ctaUrl: "https://returnhypnosis.com/booking"
}
```

### 6. Image Sections
Images with optional captions.

```typescript
{
  type: 'image',
  imageUrl: "https://example.com/meditation-scene.jpg",
  imageAlt: "Peaceful meditation setting",
  content: "Creating a sacred space for transformation"
}
```

## Usage Examples

### Basic Newsletter

```typescript
import { NewsletterTemplate } from '@/emails/NewsletterTemplate'

const newsletterData = {
  subject: "Weekly Wisdom - Issue #1",
  previewText: "This week's insights on healing and transformation.",
  issueNumber: 1,
  sections: [
    {
      type: 'text',
      title: "The Healing Power of Acceptance",
      content: "One of the most profound lessons I've learned through regression hypnosis..."
    },
    {
      type: 'quote',
      content: "Healing is not about forgetting. It's about remembering without pain.",
      author: "Anonymous"
    }
  ]
}

// Render the template
const emailHtml = await render(NewsletterTemplate(newsletterData))
```

### Newsletter with Featured Story

```typescript
const newsletterData = {
  subject: "The Power of Past Life Regression - Issue #1",
  previewText: "Discover how past life regression can unlock deep healing.",
  issueNumber: 1,
  featuredStory: {
    title: "Sarah's Journey: From Anxiety to Inner Peace",
    excerpt: "Sarah came to me struggling with crippling anxiety...",
    imageUrl: "https://example.com/sarah-story.jpg",
    readMoreUrl: "https://returnhypnosis.com/blog/sarah-journey"
  },
  sections: [
    // Your content sections here
  ]
}
```

## API Endpoint Usage

### Sending a Newsletter

```bash
curl -X POST /api/send-newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Weekly Wisdom - Issue #1",
    "previewText": "This week's insights on healing and transformation.",
    "issueNumber": 1,
    "sections": [
      {
        "type": "text",
        "title": "The Healing Power of Acceptance",
        "content": "One of the most profound lessons..."
      }
    ]
  }'
```

## Best Practices

### 1. Content Structure
- Start with a welcoming text section
- Include at least one quote for inspiration
- Add practical tips or insights
- End with a clear call-to-action

### 2. Image Guidelines
- Use high-quality, relevant images
- Keep file sizes under 1MB for better deliverability
- Always include descriptive alt text
- Use consistent aspect ratios (16:9 or 4:3)

### 3. Writing Tips
- Keep paragraphs short (2-3 sentences max)
- Use personal, warm language
- Include specific examples and stories
- End with actionable next steps

### 4. Technical Considerations
- Test emails across different email clients
- Include plain text versions for better deliverability
- Use proper unsubscribe headers
- Monitor open rates and engagement

## Template Customization

### Colors and Branding
The template uses your existing brand colors:
- Primary: `#944923` (warm brown)
- Secondary: `#713c1e` (darker brown)
- Background: `#f7f6f2` (warm cream)
- Text: `#2f2e2c` (dark gray)

### Font and Typography
- Primary font: Georgia (serif)
- Clean, readable typography
- Proper hierarchy with different font sizes

### Layout
- Maximum width: 600px (email client friendly)
- Responsive design
- Consistent spacing and padding

## Testing Your Newsletter

### 1. Preview in Development
```typescript
// In your development environment
import { render } from '@react-email/render'
import { NewsletterTemplate } from '@/emails/NewsletterTemplate'

const html = await render(NewsletterTemplate(newsletterData))
console.log(html) // View the rendered HTML
```

### 2. Send Test Email
```typescript
// Use the API endpoint with test data
const response = await fetch('/api/send-newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testNewsletterData)
})
```

### 3. Email Client Testing
- Test in Gmail, Outlook, Apple Mail
- Check mobile responsiveness
- Verify images load correctly
- Test unsubscribe functionality

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure image URLs are publicly accessible
2. **Styling issues**: Some email clients strip CSS, so inline styles are used
3. **Deliverability problems**: Check spam score and authentication
4. **Rendering issues**: Test across multiple email clients

### Debug Tips

- Use email testing services like Email on Acid or Litmus
- Check browser developer tools for rendering issues
- Monitor email analytics for engagement patterns
- A/B test different content types and layouts

## Next Steps

1. **Set up your newsletter schedule** (bi-weekly recommended)
2. **Create content calendar** with themes and topics
3. **Build your subscriber list** using the existing signup form
4. **Monitor analytics** to optimize content and timing
5. **Iterate and improve** based on subscriber feedback

## Support

For questions about the newsletter template or help with content creation, contact:
- Email: hello@returnhypnosis.com
- Website: https://returnhypnosis.com

---

*This template is designed to grow with your business and can be easily customized as your needs evolve.* 