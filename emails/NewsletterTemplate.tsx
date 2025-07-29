// emails/NewsletterTemplate.tsx
// Reusable newsletter template for bi-weekly newsletters with dynamic content

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
} from '@react-email/components'
import * as React from 'react'

// Content section types for flexible newsletter structure
interface ContentSection {
  type: 'text' | 'quote' | 'story' | 'tips' | 'cta' | 'image'
  title?: string
  content: string
  author?: string
  imageUrl?: string
  imageAlt?: string
  ctaText?: string
  ctaUrl?: string
  backgroundColor?: string
}

interface NewsletterTemplateProps {
  // Basic newsletter info
  subject: string
  previewText: string
  issueNumber?: number
  date?: string
  
  // Content sections
  sections: ContentSection[]
  
  // Optional featured content
  featuredStory?: {
    title: string
    excerpt: string
    imageUrl?: string
    readMoreUrl?: string
  }
  
  // Newsletter metadata
  fromName?: string
  fromEmail?: string
  replyTo?: string
  
  // Footer links
  websiteUrl?: string
  bookingUrl?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

export const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({
  subject,
  previewText,
  issueNumber,
  date,
  sections,
  featuredStory,
  fromName = "Sharon Di Salvo",
  fromEmail = "hello@returnhypnosis.com",
  replyTo = "hello@returnhypnosis.com",
  websiteUrl = "https://returnhypnosis.com",
  bookingUrl = "https://returnhypnosis.com/booking",
  socialLinks = {}
}) => {
  const currentDate = date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo and Issue Info */}
          <Section style={header}>
            <div style={logoContainer}>
              <img 
                src="https://raw.githubusercontent.com/marlinjai/sharons-website/61e1bebf272ed90e88954e412c105b6ede1da47c/public/graphics/logo_return.svg?token=BUHXI6KZXXG36XRVGGNKFHLIQ62SO" 
                alt="ReTurn Hypnosis Logo" 
                style={logo}
              />
            </div>
            
            {issueNumber && (
              <Text style={issueInfo}>
                Issue #{issueNumber} • {currentDate}
              </Text>
            )}
            
            <Heading style={heading}>
              ReTurn Newsletter
            </Heading>
            <Text style={subheading}>
              Personal transformation through regression hypnosis
            </Text>
          </Section>
          
          {/* Featured Story Section (Optional) */}
          {featuredStory && (
            <Section style={featuredSection}>
              <div style={featuredBox}>
                <Text style={featuredLabel}>Featured Story</Text>
                <Heading style={featuredTitle}>{featuredStory.title}</Heading>
                {featuredStory.imageUrl && (
                  <img 
                    src={featuredStory.imageUrl} 
                    alt={featuredStory.title}
                    style={featuredImage}
                  />
                )}
                <Text style={featuredExcerpt}>{featuredStory.excerpt}</Text>
                {featuredStory.readMoreUrl && (
                  <div style={featuredCtaContainer}>
                    <Link href={featuredStory.readMoreUrl} style={featuredCtaButton}>
                      Read Full Story
                    </Link>
                  </div>
                )}
              </div>
            </Section>
          )}
          
          {/* Dynamic Content Sections */}
          {sections.map((section, index) => (
            <Section key={index} style={getSectionStyle(section)}>
              {renderContentSection(section)}
            </Section>
          ))}
          
          {/* Quote of the Week Section */}
          <Section style={quoteSection}>
            <div style={quoteBox}>
              <Text style={quoteText}>
                "The only journey is the one within."
              </Text>
              <Text style={quoteAuthor}>— Rainer Maria Rilke</Text>
            </div>
          </Section>
          
          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              Ready to begin your own transformation journey?
            </Text>
            <div style={ctaButtonContainer}>
              <Link href={bookingUrl} style={ctaButton}>
                Book Your Session
              </Link>
            </div>
            <Text style={ctaSubtext}>
              Or reply to this email with any questions about regression hypnosis.
            </Text>
          </Section>
          
          {/* Signature */}
          <Section style={signatureSection}>
            <Text style={signatureText}>
              With warmth and gratitude,<br />
              <strong style={signatureName}>{fromName}</strong><br />
              <span style={signatureTitle}>Certified Regression Hypnotherapist</span>
            </Text>
          </Section>
          
          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <div style={footerLinks}>
              <Link href={websiteUrl} style={footerLink}>Website</Link>
              <Link href={bookingUrl} style={footerLink}>Book Session</Link>
              <Link href={`mailto:${replyTo}`} style={footerLink}>Contact</Link>
            </div>
            
            {Object.keys(socialLinks).length > 0 && (
              <div style={socialLinksContainer}>
                {socialLinks.instagram && (
                  <Link href={socialLinks.instagram} style={socialLink}>Instagram</Link>
                )}
                {socialLinks.facebook && (
                  <Link href={socialLinks.facebook} style={socialLink}>Facebook</Link>
                )}
                {socialLinks.linkedin && (
                  <Link href={socialLinks.linkedin} style={socialLink}>LinkedIn</Link>
                )}
              </div>
            )}
            
            <Text style={footerText}>
              You received this email because you subscribed to Sharon Di Salvo's newsletter.
            </Text>
            <Text style={footerText}>
              If you no longer wish to receive these emails, you can{' '}
              <Link href={`mailto:${replyTo}?subject=unsubscribe`} style={link}>
                unsubscribe here
              </Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Helper function to render different content section types
const renderContentSection = (section: ContentSection) => {
  switch (section.type) {
    case 'text':
      return (
        <>
          {section.title && (
            <Heading style={sectionHeading}>{section.title}</Heading>
          )}
          <Text style={paragraph}>{section.content}</Text>
        </>
      )
    
    case 'quote':
      return (
        <div style={quoteBox}>
          <Text style={quoteText}>{section.content}</Text>
          {section.author && (
            <Text style={quoteAuthor}>— {section.author}</Text>
          )}
        </div>
      )
    
    case 'story':
      return (
        <>
          {section.title && (
            <Heading style={sectionHeading}>{section.title}</Heading>
          )}
          {section.imageUrl && (
            <img 
              src={section.imageUrl} 
              alt={section.imageAlt || section.title || 'Story image'}
              style={storyImage}
            />
          )}
          <Text style={paragraph}>{section.content}</Text>
        </>
      )
    
    case 'tips':
      return (
        <>
          {section.title && (
            <Heading style={sectionHeading}>{section.title}</Heading>
          )}
          <div style={tipsContainer}>
            {section.content.split('\n').map((tip, index) => (
              <div key={index} style={tipItem}>
                <div style={tipIcon}>💡</div>
                <Text style={tipText}>{tip}</Text>
              </div>
            ))}
          </div>
        </>
      )
    
    case 'cta':
      return (
        <div style={ctaBox}>
          <Text style={ctaBoxText}>{section.content}</Text>
          {section.ctaText && section.ctaUrl && (
            <div style={ctaButtonContainer}>
              <Link href={section.ctaUrl} style={ctaButton}>
                {section.ctaText}
              </Link>
            </div>
          )}
        </div>
      )
    
    case 'image':
      return (
        <div style={imageContainer}>
          <img 
            src={section.imageUrl!} 
            alt={section.imageAlt || 'Newsletter image'}
            style={newsletterImage}
          />
          {section.content && (
            <Text style={imageCaption}>{section.content}</Text>
          )}
        </div>
      )
    
    default:
      return <Text style={paragraph}>{section.content}</Text>
  }
}

// Helper function to get section styling based on content type
const getSectionStyle = (section: ContentSection) => {
  const baseStyle = { padding: '0 30px 30px' }
  
  if (section.backgroundColor) {
    return {
      ...baseStyle,
      backgroundColor: section.backgroundColor,
      margin: '0 30px',
      borderRadius: '12px',
      padding: '30px'
    }
  }
  
  return baseStyle
}

// Modern Styles aligned with brand identity
const main = {
  margin: 0,
  padding: 0,
  backgroundColor: '#f7f6f2',
  fontFamily: 'Georgia, serif',
  color: '#2f2e2c',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}

const header = {
  textAlign: 'center' as const,
  padding: '40px 30px 30px',
  backgroundColor: '#ffffff',
}

const logoContainer = {
  marginBottom: '24px',
  textAlign: 'center' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const logo = {
  height: '60px',
  width: 'auto',
  display: 'block',
  margin: '0 auto',
}

const issueInfo = {
  fontSize: '14px',
  color: '#713c1e',
  margin: '0 0 16px 0',
  fontStyle: 'italic',
  opacity: 0.8,
}

const heading = {
  color: '#944923',
  fontSize: '32px',
  margin: '0 0 8px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
  letterSpacing: '-0.02em',
}

const subheading = {
  color: '#713c1e',
  fontSize: '16px',
  margin: 0,
  fontStyle: 'italic',
  opacity: 0.8,
}

const featuredSection = {
  padding: '0 30px 30px',
}

const featuredBox = {
  backgroundColor: '#faf9f7',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #e8e6e0',
}

const featuredLabel = {
  fontSize: '12px',
  color: '#944923',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 12px 0',
}

const featuredTitle = {
  color: '#2f2e2c',
  fontSize: '24px',
  margin: '0 0 16px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
}

const featuredImage = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  margin: '0 0 16px 0',
}

const featuredExcerpt = {
  fontSize: '16px',
  lineHeight: 1.6,
  color: '#2f2e2c',
  margin: '0 0 20px 0',
}

const featuredCtaContainer = {
  textAlign: 'center' as const,
}

const featuredCtaButton = {
  display: 'inline-block',
  backgroundColor: '#944923',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
}

const sectionHeading = {
  color: '#944923',
  fontSize: '24px',
  margin: '0 0 20px 0',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: 1.7,
  color: '#2f2e2c',
  margin: '0 0 20px 0',
}

const quoteSection = {
  padding: '0 30px 30px',
}

const quoteBox = {
  backgroundColor: '#f7f6f2',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #e8e6e0',
  textAlign: 'center' as const,
}

const quoteText = {
  fontSize: '18px',
  fontStyle: 'italic',
  color: '#2f2e2c',
  margin: '0 0 12px 0',
  lineHeight: 1.6,
}

const quoteAuthor = {
  fontSize: '14px',
  color: '#713c1e',
  margin: 0,
  fontWeight: '500',
}

const tipsContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '16px',
}

const tipItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '16px',
  backgroundColor: '#faf9f7',
  borderRadius: '8px',
  border: '1px solid #e8e6e0',
}

const tipIcon = {
  fontSize: '20px',
  flexShrink: 0,
  marginTop: '2px',
}

const tipText = {
  fontSize: '16px',
  color: '#2f2e2c',
  margin: 0,
  lineHeight: 1.6,
}

const ctaBox = {
  backgroundColor: '#f7f6f2',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #e8e6e0',
  textAlign: 'center' as const,
}

const ctaBoxText = {
  fontSize: '18px',
  color: '#2f2e2c',
  margin: '0 0 20px 0',
  lineHeight: 1.6,
  fontWeight: '500',
}

const imageContainer = {
  textAlign: 'center' as const,
  marginBottom: '20px',
}

const newsletterImage = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  margin: '0 0 12px 0',
}

const imageCaption = {
  fontSize: '14px',
  color: '#713c1e',
  margin: 0,
  fontStyle: 'italic',
  opacity: 0.8,
}

const storyImage = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  margin: '0 0 20px 0',
}

const ctaSection = {
  padding: '0 30px 30px',
  textAlign: 'center' as const,
}

const ctaText = {
  fontSize: '18px',
  color: '#2f2e2c',
  margin: '0 0 24px 0',
  lineHeight: 1.6,
  fontWeight: '500',
}

const ctaButtonContainer = {
  marginBottom: '20px',
}

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
}

const ctaSubtext = {
  fontSize: '14px',
  color: '#713c1e',
  margin: 0,
  opacity: 0.8,
}

const signatureSection = {
  padding: '0 30px 30px',
  textAlign: 'center' as const,
}

const signatureText = {
  fontSize: '16px',
  color: '#2f2e2c',
  margin: 0,
  lineHeight: 1.6,
}

const signatureName = {
  color: '#944923',
  fontSize: '18px',
}

const signatureTitle = {
  color: '#713c1e',
  fontSize: '14px',
  fontStyle: 'italic',
}

const hr = {
  margin: '0 30px',
  borderTop: '1px solid #e8e6e0',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
}

const footer = {
  padding: '20px 30px 30px',
  textAlign: 'center' as const,
}

const footerLinks = {
  marginBottom: '16px',
}

const footerLink = {
  color: '#944923',
  textDecoration: 'underline',
  margin: '0 12px',
  fontSize: '14px',
}

const socialLinksContainer = {
  marginBottom: '16px',
}

const socialLink = {
  color: '#944923',
  textDecoration: 'underline',
  margin: '0 8px',
  fontSize: '14px',
}

const footerText = {
  fontSize: '12px',
  color: '#713c1e',
  margin: '0 0 8px 0',
  opacity: 0.7,
}

const link = {
  color: '#944923',
  textDecoration: 'underline',
}

export default NewsletterTemplate
