// components/Contact.tsx - Contact section component
'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [newsletter, setNewsletter] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', newsletter)
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in touch
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your input is valuable to us. Kindly complete the form, and we'll get back to you
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yoga-sage focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yoga-sage focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yoga-sage focus:border-transparent outline-none transition-all duration-200 resize-none"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send message
              </button>
            </form>
          </div>

          {/* Newsletter & Info */}
          <div className="space-y-12">
            {/* Newsletter */}
            <div>
              <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                Subscribe to news
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yoga-sage focus:border-transparent outline-none transition-all duration-200"
                  required
                />
                <button type="submit" className="btn-secondary w-full">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Instructor Image Placeholder */}
            <div className="bg-gradient-to-br from-yoga-sage/20 to-yoga-ocean/20 rounded-xl h-64 flex items-center justify-center">
              <span className="text-gray-600 font-medium text-lg">Instructor Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 