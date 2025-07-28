'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newsletter || !newsletter.includes('@')) {
      setSubmitStatus('error')
      setStatusMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletter }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('Successfully subscribed! Check your email for confirmation.')
        setNewsletter('') // Clear the form
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="py-20" style={{ backgroundColor: '#f7f6f2' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center flex-col gap-4 justify-center mb-6">
          <h2 className="font-secondary text-4xl md:text-5xl font-semibold" style={{ color: '#A32015' }}>
            Subscribe to the ReTurn Newsletter
          </h2>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#fcd8b3' }}>
            <svg className="w-12 h-12" style={{ color: '#A32015' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
        <p className="font-primary text-xl text-gray-600 mb-8 leading-relaxed">
          Brain food, subconscious breakthroughs, and the occasional "wait, what?!" moment
          <br />
          delivered fresh to your inbox every other week.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary text-lg"
            required
          />
          <input
            type="email"
            placeholder="Enter your email address"
            value={newsletter}
            onChange={(e) => setNewsletter(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary text-lg"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className={`w-full px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#C5441E] hover:bg-[rgb(245,124,0)]'
            } text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </button>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-primary">{statusMessage}</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-primary">{statusMessage}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
} 