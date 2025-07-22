'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', newsletter)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-secondary text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#A32015' }}>
          Subscribe to the Newsletter
        </h2>
        <p className="font-primary text-xl text-gray-600 mb-8 leading-relaxed">
          Brain food, breakthrough tips, and the occasional "wait, what?!" moment delivered fresh to your inbox every other week.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={newsletter}
            onChange={(e) => setNewsletter(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary text-lg"
            required
          />
          <button type="submit" className="w-full bg-[#C5441E] text-white px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)]">
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  )
} 