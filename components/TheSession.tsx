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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-x-24 lg:gap-y-16">
          {/* Phase Cards - Grid items 1, 2, 3 */}
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-[280px] sm:w-[320px] h-[350px] sm:h-[400px] rounded-full overflow-hidden mb-6 flex items-center justify-center mx-auto">
                <img src={phase.image} alt={phase.title} className="object-cover w-full h-full rounded-full" />
              </div>
              <div className="px-2 flex flex-col items-center">
                <div
                  className="font-secondary text-2xl font-semibold mb-2 text-center mx-auto"
                  style={{ color: '#C93F2F' }}
                >
                  {phase.title}
                </div>
                <div className="font-primary text-lg 2xl:text-xl text-gray-700 mb-4 text-center mx-auto leading-relaxed">
                  {phase.description}
                </div>
              </div>
            </div>
          ))}

          {/* CTA Button - Grid item 5 (spans entire second row) */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center mt-2 lg:gap-4">
            <BookSession variant="contact" />
            <div className="mt-2 sm:mt-6">
              <SessionInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SessionInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[--content-max-width] flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start flex-row gap-2 text-gray-700 font-medium text-lg hover:text-[#A32015] transition justify-center"
      >
        Session Cost & What's Included
      </button>

      {open && (
        <>
          <div className="mt-4 text-lg text-gray-900 flex flex-row items-center justify-between w-full text-center">
            {/* Section: What's Included */}
            <div className="flex-1">
              <p className="font-semibold mb-3">Your session includes:</p>
            </div>
            <div className="flex-1 flex items-start justify-center">
              <ul className="list-disc list-inside space-y-2 flex-1">
                <li>Full session audio recording</li>
                <li>30 min follow-up session</li>
              </ul>
            </div>

            {/* Section: Languages */}
            <div className="pt-2 flex-1">
              <p style={{ color: '#A32015' }}>Sessions are held in English or Italian.</p>
            </div>
          </div>
          {/* Section: Note */}
          <div className="text-base text-gray-600 leading-snug mt-8">
            <strong>Note:</strong> A €50 non-refundable deposit (deducted from the session fee) secures your spot.
          </div>
        </>
      )}
    </div>
  );
}
