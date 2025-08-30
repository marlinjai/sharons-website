'use client';

import React, { useState } from 'react';
import BookSession from './BookSession';

const phases = [
  {
    title: 'The Conversation (2h)',
    description: (
      <>
        At ReTurn, I implement QHHT
        (Quantum Healing Hypnosis Technique),
        developed by Dolores Cannon.
        It starts with a conversation,
        exploring your story and the people,
        events, and patterns
        that shaped you.
      </>
    ),
    image: '/images/_74A3513.jpg',
    align: 'left',
  },
  {
    title: 'Hypnosis & Theta (2h)',
    description: (
      <>
        In the second step, you lie down.
        I guide you into the Theta brainwave state -
        deeply relaxed, yet aware.
        We access your subconscious
        to explore what's most relevant -
        whether from this life or a past one.
        I ask the right questions to uncover the answers you seek.
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
      className="w-full pb-24 sm:py-32 px-6 md:px-8 flex flex-col items-center bg-[#FEFEFE]"
    >
      <div className="max-w-7xl w-full">
        <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-left mb-4 mt-24">
          <span className="text-[--color-primary]">The Session</span>
        </h2>
        <p className="font-primary text-xl text-left mb-2 text-[#374152]">
          Each session is a 5-hour journey, a deep dive into YOU.
        </p>

        <p className="font-primary text-xl text-left mb-12 text-[#374152]">Here's how it unfolds:</p>

        {/* Grid Layout - Mobile: 1 column, Desktop: 3 columns with 2 rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-x-12 xl:gap-x-32 lg:gap-y-16">
          {/* Phase Cards - Grid items 1, 2, 3 */}
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-[280px] h-[350px] lg:w-[260px] lg:h-[350px] xl:w-[320px] xl:h-[400px] rounded-full overflow-hidden mb-6 flex items-center justify-center mx-auto">
                <img src={phase.image} alt={phase.title} className="object-cover w-full h-full rounded-full" />
              </div>
              <div className={`px-2 flex flex-col items-center ${idx === 1 ? 'lg:justify-self-center w-[127%]' : ''}`}>
                <div
                  className="font-secondary text-2xl font-semibold mb-2 lg:mb-4 text-center mx-auto text-[--color-primary]"
                >
                  {phase.title}
                </div>
                <div className={`font-primary text-lg 2xl:text-xl text-[#374152] mb-4 text-center mx-auto leading-relaxed`}>
                  {phase.description}
                </div>
              </div>
            </div>
          ))}

          {/* CTA Button - Grid item 5 (spans entire second row) */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center mt-2 lg:gap-4">
            <div className="mb-8">
              <SessionInfo />
            </div>
            <div className="[&>button]:bg-[--color-primary] [&>button]:text-white [&>button]:hover:bg-[--color-primary-light] [&>button]:hover:text-white [&>button]:transition-colors [&>button]:duration-200">
              <BookSession />
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
    <div className="w-[--mobile-content-max-width] lg:w-[--content-max-width] flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start flex-row gap-2 text-[#374152] font-primary font-normal text-lg hover:text-[--color-primary] transition justify-center"
      >
        Investment & Session Info
      </button>

      {open && (
        <>
          <div className="mt-8 text-base text-[#374152] flex flex-col items-center justify-center w-full text-center">


            {/* Section: What's Included */}
            <div className="w-full">
              <p className="font-primary font-normal mb-12 text-lg md:text-xl text-[--color-primary]">A session is €450 - here are the details and what’s included:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-6 md:gap-x-12 lg:gap-x-16 w-full">
                {/* Left Column */}
                <div className="flex flex-col">
                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">• 5-hour in-person session</span><br />
                    <span className="text-sm md:text-base">time set aside only for you</span>
                  </p>

                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">• Sessions are held in person</span><br />
                    <span className="text-sm md:text-base">in a private and confidential setting</span>
                  </p>

                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">• A non-refundable €50 deposit</span><br />
                    <span className="text-sm md:text-base">(deducted from the fee) secures your spot</span>
                  </p>
                </div>

                {/* Right Column */}
                <div className="flex flex-col">
                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">• Recording of your session</span><br />
                    <span className="text-sm md:text-base">to revisit anytime</span>
                  </p>

                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">• Sessions are available</span><br />
                    <span className="text-sm md:text-base">in English or Italian</span>
                  </p>

                  <p className="mb-6 text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">• 30-minute online follow-up call</span><br />
                    <span className="text-sm md:text-base">to integrate your experience</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
