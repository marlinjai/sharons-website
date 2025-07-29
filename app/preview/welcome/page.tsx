// app/preview/welcome/page.tsx
// Preview page for the welcome email template

import { getLatestBlogPostWithUrl, getFormattedExcerpt } from '@/lib/blogUtils'

import EmailPreview from './email-preview'

export default function WelcomeEmailPreview() {
  // Get the latest blog post data directly for preview
  const latestBlogPost = getLatestBlogPostWithUrl()
  const blogPostData = latestBlogPost ? {
    id: latestBlogPost.id,
    title: latestBlogPost.post.title,
    excerpt: getFormattedExcerpt(latestBlogPost.post, 120),
    url: `http://localhost:3000${latestBlogPost.url}`,
    category: latestBlogPost.post.category,
    readTime: latestBlogPost.post.readTime
  } : undefined

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'dimgray',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#16AAD3',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Email Preview - Welcome Template
        </div>
        <EmailPreview name="Sharon" latestBlogPost={blogPostData} />
      </div>
    </div>
  )
} 