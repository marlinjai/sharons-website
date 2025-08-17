'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is QHHT (Quantum Healing Hypnosis Technique)?',
    answer:
      'QHHT (Quantum Healing Hypnosis Technique), developed by Dolores Cannon, is a gentle regression method that facilitates access to the subconscious mind. If you believe in reincarnation, you easily access past lives that offer insight and relevance to your current life. If not, the process helps surface meaningful memories from your present life that support clarity, healing, and transformation.',
  },
  {
    question: 'How long does a session last?',
    answer:
      "Each session is a comprehensive 5-hour journey. This includes 2 hours of conversation to explore your story, 2 hours of guided regression hypnosis, and 1 hour of integration and reflection. You'll also receive a full audio recording of your session.",
  },
  {
    question: 'Do I need to believe in past lives for this to work?',
    answer:
      "No, you don't need to believe in past lives. QHHT works regardless of your beliefs. The technique accesses your subconscious mind, which holds all your memories, patterns, and wisdom. Whether we explore current life experiences or past lives, the insights you receive are real and transformative.",
  },
  {
    question: 'Is hypnosis safe?',
    answer:
      "Yes, hypnosis is entirely safe. You're not asleep, and you're definitely not under anyone's control. Think of it more like that floaty, in-between state right before falling asleep. The difference? In a session, I´ll be asking questions while you stay in that calm, open space. You’re relaxed, aware, and always in control, just tuned in deeper.",
  },
  {
    question: 'What should I prepare for my session?',
    answer:
      "Come with an open mind and a few questions you'd like to explore. Most importantly, trust the process and allow yourself to stay curious about what emerges. The session is designed to be gentle, supportive, yet effective. You'll receive detailed instructions right after booking, so you can prepare in the best way possible.",
  },
  {
    question: 'What languages do you work in?',
    answer:
      "I conduct sessions in both English and Italian, so you can choose the language you're most comfortable with for this deeply personal experience.",
  },
  {
    question: 'What´s the difference between a Hypnotist and a Hypnotherapist?',
    answer:
      "A Hypnotist focuses on inducing the hypnotic state, mainly for entertainment purposes (like the ones you might see in TV shows or stage performances), but doesn't typically offer therapeutic guidance. A hypnotherapist, on the other hand, uses hypnosis as a tool for emotional healing, behavior change, and personal growth. Want to explore the difference in more depth? there is a dedicated article in the blog section.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-32 flex flex-col items-center bg-white">
      <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-secondary text-2xl sm:text-4xl md:text-5xl font-semibold mb-4">
            <span style={{ color: '#A32015' }}>Frequently Asked Questions</span>
          </h2>
          <p className="font-primary text-lg sm:text-xl text-gray-600">Common questions about Hypnosis</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="font-secondary text-lg sm:text-xl font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <span className="text-gray-500 text-xl font-light">{openIndex === index ? '−' : '+'}</span>
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="font-primary text-gray-700 leading-relaxed text-base sm:text-lg">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
