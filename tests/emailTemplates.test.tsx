// The email templates are rendered on the server for every newsletter and
// one-time email. This renders them through the same render() the API routes
// use, so a change to the React Email packages that breaks a template fails here.
// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import { exampleNewsletterData } from '@/lib/newsletterUtils';

async function renderTemplates() {
  const welcome = await render(
    <WelcomeEmail
      name="Ada"
      latestBlogPost={{
        id: 1,
        title: 'Sleep better',
        excerpt: 'Three evening habits.',
        url: 'https://example.com/blog/sleep',
        category: 'Wellbeing',
        readTime: '4 min read',
      }}
    />,
  );
  const newsletter = await render(<NewsletterTemplate {...exampleNewsletterData} />);
  const newsletterText = await render(<NewsletterTemplate {...exampleNewsletterData} />, {
    plainText: true,
  });
  return { welcome, newsletter, newsletterText };
}

describe('email templates', () => {
  it('render to complete HTML and plain text', async () => {
    const { welcome, newsletter, newsletterText } = await renderTemplates();
    expect(welcome).toMatch(/^<!DOCTYPE html/);
    expect(welcome).toContain('Ada');
    expect(welcome).toContain('Sleep better');
    expect(welcome).toContain('href="https://example.com/blog/sleep"');
    expect(newsletter).toMatch(/^<!DOCTYPE html/);
    expect(newsletter).toContain(exampleNewsletterData.subject);
    expect(newsletterText).not.toContain('<');
    expect(newsletterText.length).toBeGreaterThan(100);
  });
});
