'use client';

import React from 'react';
import BookSession from './BookSession';
import SessionInfo from './SessionInfo';

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
    description: (idx: number) => (
      <>
        In the second step, you lie down. {idx === 1 ? <><br className="block xs:hidden" /> </> : ' '}
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

  return (
    <section
      id="the-session"
      className="w-full pb-24 sm:py-16 px-6 md:px-8 flex flex-col items-center bg-bg-off-white"
    >
      <div className="max-w-7xl w-full">
        <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-left mb-4 mt-24">
          <span className="text-text-primary">The Session</span>
        </h2>
        <p className="font-primary text-xl text-left mb-2 text-text-gray">
          Each session is a 5-hour journey, a deep dive into you.
        </p>

        <p className="font-primary text-xl text-left mb-12 text-text-gray">Here's how it unfolds:</p>

        {/* Grid Layout - Mobile: 1 column, Desktop: 3 columns with 2 rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-x-12 xl:gap-x-32 lg:gap-y-16">
          {/* Phase Cards - Grid items 1, 2, 3 */}
          {phases.map((phase, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-[280px] h-[350px] lg:w-[260px] lg:h-[350px] xl:w-[320px] xl:h-[400px] rounded-full overflow-hidden mb-6 flex items-center justify-center mx-auto">
                <img src={phase.image} alt={phase.title} className="object-cover w-full h-full rounded-full" />
              </div>
              <div className={`px-2 flex flex-col items-center ${idx === 1 ? 'lg:justify-self-center w-[112%]' : ''}`}>
                <div
                  className="font-secondary text-2xl font-semibold mb-2 lg:mb-4 text-center mx-auto text-text-primary"
                >
                  {phase.title}
                </div>
                <div className={`font-primary text-lg 2xl:text-xl text-text-gray mb-4 text-center mx-auto leading-relaxed w-72 sm:w-[32rem] lg:w-72 xl:w-96 whitespace-pre-line`}>
                  {typeof phase.description === 'function' ? phase.description(idx) : phase.description}
                </div>
              </div>
            </div>
          ))}

          {/* CTA Button - Grid item 5 (spans entire second row) */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center mt-2 lg:gap-4">
            <div className="mb-8">
              <SessionInfo />
            </div>
            <div className="[&>button]:bg-btn-primary-bg [&>button]:text-btn-primary-text [&>button]:hover:bg-btn-primary-bg-hover [&>button]:hover:text-btn-primary-text-hover [&>button]:transition-colors [&>button]:duration-200">
              <BookSession />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
