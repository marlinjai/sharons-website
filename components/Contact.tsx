// components/Contact.tsx
// Contact form (demo only - nothing is sent or stored)

'use client';
import { useState } from 'react';
import DemoNotice from './DemoNotice';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Demo only: nothing is sent or stored, the form is just cleared
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSubmitted(true);
  };

  return (
    <section className="pb-16 pt-2 md:py-16 bg-bg-secondary">
      <div id="contact" className="-mt-[140px] mb-[140px] h-16"></div>
      <div className="max-w-[--content-max-width] md:max-w-[90vw] mx-auto max-[380px]:px-[--content-padding] md:px-[--content-padding]">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-24">
          <h2 className="font-secondary text-3xl md:text-4xl font-semibold mb-4 text-text-primary">
            Get in Touch
          </h2>
          <p className="font-primary text-lg sm:text-xl text-text-gray max-w-3xl mx-auto leading-relaxed">
            Curious? Stuck? <br />Ready for something to shift?
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 lg:gap-12 items-stretch">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 ">
            <h3 className="font-secondary text-xl sm:text-2xl font-semibold mb-6 text-text-primary">
              Reach out.
              <br />
              I'm here to answer, clarify, or help you take the next step.
              <br />
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-2 justify-center">
              <div>
                <label htmlFor="name" className="block font-primary text-sm font-medium text-text-gray mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-primary focus:border-text-primary outline-none transition-all duration-200 font-primary placeholder-text-muted"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-primary text-sm font-medium text-text-gray mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-primary focus:border-text-primary outline-none transition-all duration-200 font-primary placeholder-text-muted"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-primary text-sm font-medium text-text-gray mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-primary focus:border-text-primary outline-none transition-all duration-200 font-primary placeholder-text-muted"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-primary text-sm font-medium text-text-gray mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-primary focus:border-text-primary outline-none transition-all duration-200 font-primary resize-none placeholder-text-muted"
                  placeholder={`Tell me about what you'd like to explore or any questions you might have...`}
                />
              </div>

              {submitted && <DemoNotice />}

              <button
                type="submit"
                className="bg-btn-primary-bg text-btn-primary-text px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg-hover mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Location Section */}
          <div className="flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h3 className="font-secondary text-2xl font-semibold mb-6 text-text-primary">
              Visit the Studio - Demo
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block font-primary text-base sm:text-lg font-medium text-text-gray mb-2">Location</label>
                <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <p className="font-primary text-text-gray mb-3">Example location (demo only):</p>
                  <p className="font-primary text-lg font-semibold text-text-gray mb-2">Example Studio</p>
                  <p className="font-primary text-text-gray">Musterstraße 1, 10115 Berlin</p>
                </div>
              </div>

              <div>
                <label className="block font-primary text-base sm:text-lg font-medium text-text-gray mb-2">Map</label>
                {/* Illustrative placeholder map - not a real location */}
                <div className="relative h-[350px] sm:h-[480px] rounded-lg overflow-hidden border border-gray-200 bg-[#f3f1ec]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <rect x="250" y="40" width="110" height="90" rx="8" fill="#dcebd6" />
                    <rect x="30" y="260" width="140" height="100" rx="8" fill="#dcebd6" />
                    <g stroke="#ffffff" strokeLinecap="round" fill="none">
                      <path d="M-20 120 L420 180" strokeWidth="18" />
                      <path d="M140 -20 L220 420" strokeWidth="18" />
                      <path d="M-20 320 L420 250" strokeWidth="12" />
                      <path d="M300 -20 L340 420" strokeWidth="10" />
                      <path d="M-20 40 L200 90" strokeWidth="8" />
                    </g>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg width="44" height="56" viewBox="0 0 24 30" aria-hidden="true">
                      <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.3 12 30 12 30s12-9.7 12-18.3C24 5.2 18.6 0 12 0z" fill="#c5441f" />
                      <circle cx="12" cy="11.5" r="4.5" fill="#ffffff" />
                    </svg>
                    <span className="mt-3 px-4 py-2 rounded-full bg-white/90 shadow font-primary text-sm text-text-gray">
                      Demo map - not a real location
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
