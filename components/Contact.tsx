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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-secondary text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#A32015' }}>
              Get in Touch
            </h2>
            <p className="font-primary text-xl text-gray-600 mb-8 leading-relaxed">
              Curious? Stuck? Ready for something to shift?<br />
              Reach out.<br />
              I'm here to answer, clarify, or help you take the next step.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 resize-none font-primary"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-fit bg-[#C5441E] text-white px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)]">
                Send message
              </button>
            </form>
          </div>

          {/* Newsletter & Info */}
          <div className="space-y-12">
            {/* Newsletter */}
            <div>
              <h3 className="font-secondary text-3xl font-semibold text-gray-900 mb-4">
                Subscribe to the Newsletter
              </h3>
              <p className="font-primary text-lg text-gray-600 mb-4 leading-relaxed">
                Brain food, breakthrough tips, and the occasional "wait, what?!" moment delivered fresh to your inbox every other week.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C93F2F] focus:border-transparent outline-none transition-all duration-200 font-primary"
                  required
                />
                <button type="submit" className="w-fit bg-[#C5441E] text-white px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)]">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Instructor Image */}
            <div className="bg-gradient-to-br from-[#C93F2F]/10 to-[#C5441E]/10 rounded-xl h-64 flex items-center justify-center overflow-hidden">
              <img
                src="/images/6.jpg"
                alt="Corridor"
                className="object-cover w-full h-full rounded-xl object-[center_85%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 