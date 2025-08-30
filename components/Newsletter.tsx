'use client';
import { useState } from 'react';
import { FiMail } from "react-icons/fi";
import Link from 'next/link';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Please enter your name');
      return;
    }

    if (!newsletter || !newsletter.includes('@')) {
      setSubmitStatus('error');
      setStatusMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: newsletter,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Successfully subscribed! Check your email for confirmation.');
        setName(''); // Clear the name field
        setNewsletter(''); // Clear the email field
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20" style={{ backgroundColor: '#f7f6f2' }}>
      <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] text-center">
        <div className="flex items-center flex-col gap-6 justify-center mb-6">
          <div
            className="sm:size-24 size-12 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <FiMail className="size-8 sm:size-12 stroke-[1.8px]" style={{ color: `var(--color-primary)` }} />
          </div>
          <h2 className="font-secondary text-3xl md:text-4xl font-semibold md:mb-6" style={{ color: '#c5441f' }}>
            Subscribe to the ReTurn Newsletter
          </h2>
        </div>
        <p className="font-primary text-lg sm:text-xl text-[#374152] mb-12 leading-relaxed">
          Brain food, breakthroughs, and the occasional "wait, what?!" moment.
          <br />
          Delivered fresh to your inbox every month.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-8">
          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#c5441f] focus:border-[#c5441f] outline-none transition-all duration-200 font-primary text-lg placeholder-[#BCBCBC]"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#c5441f] focus:border-[#c5441f] outline-none transition-all duration-200 font-primary text-lg placeholder-[#BCBCBC]"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className={`px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#c5441f] hover:bg-[#e15023] md:mt-8'
              } text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
  );
}
