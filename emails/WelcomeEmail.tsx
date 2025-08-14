// emails/WelcomeEmail.tsx
// Modern welcome email template for newsletter subscribers

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
  latestBlogPost?: {
    id: number;
    title: string;
    excerpt: string;
    url: string;
    category: string;
    readTime: string;
  };
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name, latestBlogPost }) => {
  return (
    <Html lang="en">
      <Head>
        <title>Welcome to Sharon Di Salvo's Newsletter</title>
      </Head>
      <Preview>Welcome {name}! Your ReTurn Newsletter Subscription</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <div style={logoContainer}>
              <img src="/graphics/logo_return.svg" alt="ReTurn Hypnosis Logo" style={logo} />
            </div>
            <Heading style={heading}>Welcome to the ReTurn Newsletter</Heading>
            <Text style={subheading}>Personal transformation through regression hypnosis</Text>
          </Section>

          {/* Welcome Message */}
          <Section style={welcomeSection}>
            <Text style={welcomeText}>Hello {name}, and welcome! 👋</Text>

            <Text style={paragraph}>
              Thank you for joining our community of seekers and healers. You've just taken a beautiful step toward
              personal transformation through regression hypnosis.
            </Text>
          </Section>

          {/* What to Expect Section */}
          <Section style={expectSection}>
            <Heading style={sectionHeading}>What to expect from your journey:</Heading>

            <div style={benefitsList}>
              <div style={benefitItem}>
                <div style={benefitIcon}>🧠</div>
                <div style={benefitContent}>
                  <Text style={benefitTitle}>Brain food & breakthrough insights</Text>
                  <Text style={benefitDesc}>Deep wisdom for your personal growth</Text>
                </div>
              </div>

              <div style={benefitItem}>
                <div style={benefitIcon}>✨</div>
                <div style={benefitContent}>
                  <Text style={benefitTitle}>Client transformation stories</Text>
                  <Text style={benefitDesc}>Real journeys of healing and discovery</Text>
                </div>
              </div>

              <div style={benefitItem}>
                <div style={benefitIcon}>🌱</div>
                <div style={benefitContent}>
                  <Text style={benefitTitle}>Tips for personal growth</Text>
                  <Text style={benefitDesc}>Practical tools for your healing journey</Text>
                </div>
              </div>

              <div style={benefitItem}>
                <div style={benefitIcon}>🔮</div>
                <div style={benefitContent}>
                  <Text style={benefitTitle}>Regression hypnosis updates</Text>
                  <Text style={benefitDesc}>Latest techniques and insights</Text>
                </div>
              </div>
            </div>
          </Section>

          {/* Quote Section */}
          <Section style={quoteSection}>
            <div style={quoteBox}>
              <Text style={quoteText}>
                "The curious paradox is that when I accept myself just as I am, then I can change."
              </Text>
              <Text style={quoteAuthor}>— Carl Rogers</Text>
            </div>
          </Section>

          {/* Latest Blog Post Section (Optional) */}
          {latestBlogPost && (
            <Section style={blogSection}>
              <div style={blogBox}>
                <Text style={blogLabel}>Latest from the Blog</Text>
                <Heading style={blogTitle}>{latestBlogPost.title}</Heading>
                <div style={blogMeta}>
                  <span style={blogCategory}>{latestBlogPost.category}</span>
                  <span style={blogMetaDot}>•</span>
                  <span style={blogReadTime}>{latestBlogPost.readTime}</span>
                </div>
                <Text style={blogExcerpt}>{latestBlogPost.excerpt}</Text>
                <div style={blogCtaContainer}>
                  <Link href={latestBlogPost.url} style={blogCtaButton}>
                    Read Full Article
                  </Link>
                </div>
              </div>
            </Section>
          )}

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              I'll be sending you valuable content every other week — no spam, just meaningful insights to support your
              journey.
            </Text>

            <div style={ctaButtonContainer}>
              <Link href="mailto:hello@returnhypnosis.com" style={ctaButton}>
                Have Questions? Reply Here
              </Link>
            </div>
          </Section>

          {/* Signature */}
          <Section style={signatureSection}>
            <Text style={signatureText}>
              With gratitude and warmth,
              <br />
              <strong style={signatureName}>Sharon Di Salvo</strong>
              <br />
              <span style={signatureTitle}>Certified Regression Hypnotherapist</span>
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you subscribed to Sharon Di Salvo's newsletter.
            </Text>
            <Text style={footerText}>
              If you no longer wish to receive these emails, you can{' '}
              <Link href="mailto:hello@returnhypnosis.com?subject=unsubscribe" style={link}>
                unsubscribe here
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Modern Styles aligned with brand identity
const main = {
  margin: 0,
  padding: 0,
  backgroundColor: '#f7f6f2',
  fontFamily: 'Georgia, serif',
  color: '#2f2e2c',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

const header = {
  textAlign: 'center' as const,
  padding: '40px 30px 30px',
  backgroundColor: '#ffffff',
};

const logoContainer = {
  marginBottom: '24px',
  textAlign: 'center' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const logo = {
  height: '60px',
  width: 'auto',
  display: 'block',
  margin: '0 auto',
};

const heading = {
  color: '#944923',
  fontSize: '32px',
  margin: '0 0 8px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
  letterSpacing: '-0.02em',
};

const subheading = {
  color: '#713c1e',
  fontSize: '16px',
  margin: 0,
  fontStyle: 'italic',
  opacity: 0.8,
};

const welcomeSection = {
  padding: '0 30px 30px',
};

const welcomeText = {
  fontSize: '20px',
  color: '#2f2e2c',
  margin: '0 0 20px 0',
  fontWeight: '500',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: 1.7,
  color: '#2f2e2c',
  margin: '0 0 20px 0',
};

const expectSection = {
  padding: '0 30px 30px',
};

const sectionHeading = {
  color: '#944923',
  fontSize: '24px',
  margin: '0 0 24px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
};

const benefitsList = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
};

const benefitItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  padding: '16px',
  backgroundColor: '#faf9f7',
  borderRadius: '12px',
  border: '1px solid #e8e6e0',
};

const benefitIcon = {
  fontSize: '24px',
  flexShrink: 0,
  marginTop: '2px',
};

const benefitContent = {
  flex: 1,
};

const benefitTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2f2e2c',
  margin: '0 0 4px 0',
};

const benefitDesc = {
  fontSize: '14px',
  color: '#713c1e',
  margin: 0,
  opacity: 0.8,
};

const quoteSection = {
  padding: '0 30px 30px',
};

const quoteBox = {
  backgroundColor: '#f7f6f2',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #e8e6e0',
  textAlign: 'center' as const,
};

const quoteText = {
  fontSize: '18px',
  fontStyle: 'italic',
  color: '#2f2e2c',
  margin: '0 0 12px 0',
  lineHeight: 1.6,
};

const quoteAuthor = {
  fontSize: '14px',
  color: '#713c1e',
  margin: 0,
  fontWeight: '500',
};

const blogSection = {
  padding: '0 30px 30px',
};

const blogBox = {
  backgroundColor: '#faf9f7',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #e8e6e0',
};

const blogLabel = {
  fontSize: '12px',
  color: '#944923',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 12px 0',
};

const blogTitle = {
  color: '#2f2e2c',
  fontSize: '24px',
  margin: '0 0 12px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
};

const blogMeta = {
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const blogCategory = {
  fontSize: '12px',
  color: '#944923',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const blogMetaDot = {
  fontSize: '12px',
  color: '#713c1e',
  opacity: 0.6,
};

const blogReadTime = {
  fontSize: '12px',
  color: '#713c1e',
  opacity: 0.8,
};

const blogExcerpt = {
  fontSize: '16px',
  lineHeight: 1.6,
  color: '#2f2e2c',
  margin: '0 0 20px 0',
};

const blogCtaContainer = {
  textAlign: 'center' as const,
};

const blogCtaButton = {
  display: 'inline-block',
  backgroundColor: '#944923',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
};

const ctaSection = {
  padding: '0 30px 30px',
  textAlign: 'center' as const,
};

const ctaText = {
  fontSize: '16px',
  color: '#2f2e2c',
  margin: '0 0 24px 0',
  lineHeight: 1.6,
};

const ctaButtonContainer = {
  marginBottom: '20px',
};

const ctaButton = {
  display: 'inline-block',
  backgroundColor: '#944923',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
  transition: 'all 0.2s ease',
};

const signatureSection = {
  padding: '0 30px 30px',
  textAlign: 'center' as const,
};

const signatureText = {
  fontSize: '16px',
  color: '#2f2e2c',
  margin: 0,
  lineHeight: 1.6,
};

const signatureName = {
  color: '#944923',
  fontSize: '18px',
};

const signatureTitle = {
  color: '#713c1e',
  fontSize: '14px',
  fontStyle: 'italic',
};

const hr = {
  margin: '0 30px',
  borderTop: '1px solid #e8e6e0',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
};

const footer = {
  padding: '20px 30px 30px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#713c1e',
  margin: '0 0 8px 0',
  opacity: 0.7,
};

const link = {
  color: '#944923',
  textDecoration: 'underline',
};

export default WelcomeEmail;
