// app/preview/welcome/email-preview.tsx
// Email preview component that renders React Email templates safely in browser

import { render } from '@react-email/render'
import { WelcomeEmail } from '@/emails/WelcomeEmail'

interface EmailPreviewProps {
  name: string
  latestBlogPost?: {
    id: number
    title: string
    excerpt: string
    url: string
    category: string
    readTime: string
  }
}

export default async function EmailPreview({ name, latestBlogPost }: EmailPreviewProps) {
  // Render the email template to HTML string
  const emailHtml = await render(WelcomeEmail({ name, latestBlogPost }))

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: emailHtml }}
      style={{ 
        padding: '0',
        margin: '0',
        backgroundColor: '#f7f6f2',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  )
} 