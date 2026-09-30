'use client';
import { useState } from 'react';
import { FiMail } from "react-icons/fi";
import DemoNotice from './DemoNotice';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Demo only: nothing is sent or stored, the form is just cleared
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setNewsletter('');
    setSubmitted(true);
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
            />
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#c5441f] focus:border-[#c5441f] outline-none transition-all duration-200 font-primary text-lg placeholder-[#BCBCBC]"
              required
            />
          </div>

          <button
            type="submit"
            className="px-8 py-4 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 bg-[#c5441f] hover:bg-[#e15023] md:mt-8 text-white"
          >
            Subscribe
          </button>

          {submitted && <DemoNotice className="mt-4" />}
        </form>
      </div>
    </section>
  );
}
