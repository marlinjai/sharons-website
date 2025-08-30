'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is QHHT (Quantum Healing Hypnosis Technique)?',
    answer:
      'QHHT (Quantum Healing Hypnosis Technique), developed by Dolores Cannon, is a gentle regression method that facilitates access to the subconscious mind. If you believe in reincarnation, you easily access past lives that offer insight and relevance to your current life. If not, the process helps surface meaningful memories from your present life that support clarity, healing, and transformation.',
  },
  {
    question: 'Why is the session so long?',
    answer:
      "Each session lasts around 5 hours because it’s designed as a full journey, not a quick dip. We spend about 2 hours in conversation to understand your story and intentions, 2 hours in deep regression hypnosis to explore and uncover what’s within, and 1 hour gently integrating and reflecting on what came up. You’ll also receive a complete audio recording of your session, so the journey doesn’t end when our time together does.",
  },
  {
    question: 'Do I need to believe in past lives for this to work?',
    answer:
      "Most definitely not, you don't need to believe in past lives. QHHT works regardless of your beliefs. The technique accesses your subconscious mind, which holds all your memories, patterns, and wisdom. Whether we explore current life experiences or past lives, the insights you receive are real and transformative.",
  },
  {
    question: 'Is hypnosis safe?',
    answer:
      "Yes, hypnosis is entirely safe. You're not asleep, and you're definitely not under anyone's control. Think of it more like that floaty, in-between state right before falling asleep. The difference? In a session, I´ll be asking questions while you stay in that calm, open space. You're relaxed, aware, and always in control, just tuned in deeper.",
  },
  {
    question: 'How should I prepare for my session?',
    answer:
      "Come with an open mind and some questions you'd like to explore. Most importantly, trust the process and allow yourself to stay curious about what emerges. The session is designed to be gentle, supportive, yet effective. You'll receive detailed instructions right after booking, so you can prepare in the best way possible.",
  },
  {
    question: 'What languages do you work in?',
    answer:
      "I guide sessions in English or Italian - your pick. And if you suddenly feel like switching to German, Spanish, or French during our chat (or even mid-hypnosis), that’s absolutely fine. I understand them quite well, and we can mix and match with ease.",
  },
  {
    question: 'What´s the difference between a hypnotist and a hypnotherapist?',
    answer:
      "A Hypnotist focuses on inducing the hypnotic state mainly for entertainment purposes, (like the ones you might see in TV shows or stage performances) but doesn't typically offer therapeutic guidance. A hypnotherapist or practitioner, on the other hand, uses hypnosis as a tool for emotional healing, behavior change, and personal growth. Want to explore the difference in more depth? there is a dedicated article in the blog section!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs for mobile (only first 3)
  const mobileFaqs = faqs.slice(0, 3);
  const remainingFaqs = faqs.slice(3);

  return (
    <section id="faq" className="w-full py-16 sm:py-32 flex flex-col items-center bg-white">
      <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-secondary text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#c5441f' }}>
            Frequently Asked Questions
          </h2>
          <p className="font-primary text-lg sm:text-xl text-[#374152]">Common questions about Hypnosis</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {/* Mobile Layout - Show only first 3 FAQs */}
          <div className="lg:hidden">
            <div className="space-y-4">
              {mobileFaqs.map((faq, index) => (
                <div key={index} data-faq-index={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="font-secondary text-lg sm:text-xl font-semibold text-[var(--color-black)] pr-4">{faq.question}</h3>
                    <span className="text-gray-500 text-xl font-light">{openIndex === index ? '−' : '+'}</span>
                  </button>

                  {openIndex === index && (
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="font-primary text-[#374152] leading-relaxed text-base sm:text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showAllMobile && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllMobile(true)}
                  className="bg-[#c5441f] text-white px-8 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[#e15023]"
                >
                  More FAQs
                </button>
              </div>
            )}

            {showAllMobile && (
              <>
                <div className="space-y-4 mt-8">
                  {remainingFaqs.map((faq, index) => (
                    <div key={index + 3} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index + 3)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="font-secondary text-lg sm:text-xl font-semibold text-[var(--color-black)] pr-4">{faq.question}</h3>
                        <span className="text-gray-500 text-xl font-light">{openIndex === index + 3 ? '−' : '+'}</span>
                      </button>

                      {openIndex === index + 3 && (
                        <div className="px-8 pb-6">
                          <div className="border-t border-gray-100 pt-6">
                            <p className="font-primary text-[#374152] leading-relaxed text-base sm:text-lg">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button
                    onClick={() => {
                      // Find the 3rd FAQ (index 2) - "Do I need to believe in past lives for this to work?"
                      const thirdFaqElement = document.querySelector('[data-faq-index="2"]');

                      setShowAllMobile(false);
                      setOpenIndex(null);

                      // After DOM updates, scroll to the 3rd FAQ
                      if (thirdFaqElement) {
                        setTimeout(() => {
                          const rect = thirdFaqElement.getBoundingClientRect();
                          const scrollTop = window.pageYOffset + rect.top - 120; // Offset for header

                          window.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                          });
                        }, 100); // Small delay to ensure DOM has updated
                      }
                    }}
                    className="bg-[#c5441f] text-white px-8 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[#e15023]"
                  >
                    Less FAQs
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Desktop Layout - Show all FAQs */}
          <div className="hidden lg:block space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-secondary text-lg sm:text-xl font-semibold text-[var(--color-black)] pr-4">{faq.question}</h3>
                  <span className="text-gray-500 text-xl font-light">{openIndex === index ? '−' : '+'}</span>
                </button>

                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="font-primary text-[#374152] leading-relaxed text-base sm:text-lg">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
