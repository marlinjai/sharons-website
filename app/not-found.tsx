import React from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is hypnotherapy?',
    answer:
      'Hypnotherapy is a therapeutic technique that uses guided relaxation and focused attention to achieve a heightened state of awareness, helping you access your subconscious mind for positive change.',
  },
  {
    question: 'Is hypnotherapy safe?',
    answer:
      'Yes! Hypnotherapy is a natural state of mind and is completely safe when practiced by a certified professional. You are always in control during a session.',
  },
  {
    question: 'What can hypnotherapy help with?',
    answer:
      'Hypnotherapy can help with stress, anxiety, breaking unwanted habits, improving confidence, exploring past experiences, and much more.',
  },
  {
    question: 'How do I book a session?',
    answer: 'You can contact me through the contact form to book a session or ask any questions you may have.',
  },
  {
    question: 'Will I lose control during hypnotherapy?',
    answer: 'No, you remain in control at all times. Hypnotherapy is a state of focused attention, not mind control.',
  },
  {
    question: 'Can everyone be hypnotized?',
    answer: 'Most people can be hypnotized as long as they are willing and able to follow instructions.',
  },
];

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f7f4] to-[#f3ede7] px-4 py-16">
      <div className="flex flex-col items-center mb-8">
        {/* Friendly icon/illustration */}
        <div className="mb-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#F37C3B" />
            <path
              d="M24 28C24 25.7909 25.7909 24 28 24H36C38.2091 24 40 25.7909 40 28V36C40 38.2091 38.2091 40 36 40H28C25.7909 40 24 38.2091 24 36V28Z"
              fill="#fff"
            />
            <circle cx="28.5" cy="31.5" r="2.5" fill="#F37C3B" />
            <circle cx="35.5" cy="31.5" r="2.5" fill="#F37C3B" />
            <path
              d="M28 36C28.6667 37.3333 31.3333 37.3333 32 36"
              stroke="#F37C3B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-[#C5441E] font-playfair">
          Oops! Page Not Found
        </h1>
        <p className="text-center text-gray-700 mb-6 text-lg max-w-xl">
          We couldn't find the page you were looking for, but here are some answers to common questions about
          hypnotherapy and sessions.
        </p>
      </div>
      <div className="max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#D3531D] mb-8 text-center font-playfair">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-l-4 border-[#F37C3B] bg-[#f8f7f4] rounded-2xl shadow-sm p-6 transition hover:shadow-md"
            >
              <div className="text-lg md:text-xl font-semibold text-[#C5441E] mb-2 font-playfair">{faq.question}</div>
              <div className="text-gray-700 text-base md:text-lg leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-[#C5441E] text-white px-8 py-3 rounded-full font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)] font-josefin text-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
