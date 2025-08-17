'use client';

import React, { useState } from 'react';
import BookSession from './BookSession';

const phases = [
  {
    title: 'The Conversation (2h)',
    description: (
      <>
        At ReTurn, I implement QHHT <br /> (Quantum Healing Hypnosis Technique), developed by Dolores Cannon. It starts
        with a conversation, exploring your story and the people, events, and patterns that shaped you.
      </>
    ),
    image: '/images/_74A3513.jpg',
    align: 'left',
  },
  {
    title: 'Hypnosis & Theta (2h)',
    description: (
      <>
        In the second step, you lie down. I guide you into the Theta brainwave state - deeply relaxed, yet aware. We
        access your subconscious to explore what's most relevant - whether from this life or a past one. I ask the right
        questions to uncover the answers you seek.
      </>
    ),
    image: '/images/_74A3551.jpg',
    align: 'left',
  },
  {
    title: 'Integration (1h)',
    description: (
      <>
        We return gently and reflect on the experience. This is where dots connect - insight becomes clarity. You'll
        receive a recording of your session, so you can revisit it anytime and continue uncovering insights.
      </>
    ),
    image: '/images/_98A3513.jpg',
    align: 'left',
  },
];

export default function TheSession() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="the-session"
      className="w-full  pb-24 sm:py-32 px-4 flex flex-col items-center bg-white"
    >
      <div className="max-w-6xl w-full">
        <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-left mb-4 mt-24">
          <span style={{ color: '#A32015' }}>The Session</span>
        </h2>
        <p className="font-primary text-xl text-left mb-2">
          Each session is a 5-hour journey, a deep dive into <span className="italic">you</span>.
        </p>

        <p className="font-primary text-xl text-left mb-12">Here's how it unfolds:</p>

        {/* Grid Layout - Mobile: 1 column, Desktop: 3 columns with 2 rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-24 lg:gap-y-16">
          {/* Phase Cards - Grid items 1, 2, 3 */}
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-[280px] sm:w-[320px] h-[350px] sm:h-[400px] rounded-full overflow-hidden mb-6 flex items-center justify-center mx-auto">
                <img src={phase.image} alt={phase.title} className="object-cover w-full h-full rounded-full" />
              </div>
              <div className="px-2 flex flex-col items-center">
                <div
                  className="font-secondary text-xl font-semibold mb-2 text-center mx-auto"
                  style={{ color: '#C93F2F' }}
                >
                  {phase.title}
                </div>
                <div className="font-primary text-base text-gray-700 mb-4 text-center mx-auto leading-relaxed">
                  {phase.description}
                </div>
              </div>
            </div>
          ))}

          {/* Investment Info - Grid item 4 (row 2, col 1) */}
          <div className="flex flex-col items-start gap-4 lg:items-start mt-8 lg:mt-0 justify-self-start">
            <p className="font-secondary text-xl font-semibold mb-2 sm:mb-4" style={{ color: '#A32015' }}>
              A session costs: 450 EUR
            </p>
            <div className="mt-2 sm:mt-6">
              <SessionInfo />
            </div>
          </div>

          {/* CTA Button - Grid item 5 (row 2, col 2 - centered under middle card) */}
          <div className="flex justify-center items-start mt-2 lg:mt-0 justify-self-start">
            <BookSession variant="contact" />
          </div>

          {/* Empty grid item 6 (row 2, col 3) for balance */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}

function SessionInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-700 font-medium text-base hover:text-black transition"
      >
        {open ? '◀' : '▶'} What's Included & Session Info
      </button>

      {open && (
        <div className="mt-4 space-y-4 text-[15px] text-gray-900">
          {/* Section: What's Included */}
          <div>
            <p className="font-semibold mb-3">Your session includes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>2h conversation to explore your story</li>
              <li>2h guided regression (theta hypnosis)</li>
              <li>1h integration & reflection</li>
              <li>Full session audio recording</li>
              <li>30 min follow-up session</li>
            </ul>
          </div>

          {/* Section: Languages */}
          <div className="pt-2">
            <p style={{ color: '#A32015' }}>Sessions are held in English or Italian.</p>
          </div>

          {/* Section: Note */}
          <div className="text-sm text-gray-600 leading-snug pt-2">
            <strong>Note:</strong> A €50 non-refundable deposit (deducted from the session fee) secures your spot.
          </div>
        </div>
      )}
    </div>
  );
}
