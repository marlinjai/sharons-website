'use client'

import React from 'react';
import BookSession from './BookSession';

const phases = [
  {
    title: 'The Conversation (2h)',
    description: (
      <>
At ReTurn, we use QHHT <br /> (Quantum Healing Hypnosis Technique), developed by Dolores Cannon. It starts with a conversation, exploring your story and the people, events, and patterns that shaped you.

      </>
    ),
    image: '/images/_74A3513.jpg',
    align: 'left',
  },
  {
    title: 'Hypnosis & Theta (2h)',
    description: (
      <>
In the second step, you lie down. I guide you into the Theta brainwave state - deeply relaxed, yet aware. We access your subconscious to explore what's most relevant - whether from this life or a past one. I ask the right questions to uncover the answers you seek.
      </>
    ),
    image: '/images/_74A3551.jpg',
    align: 'left',
  },
  {
    title: 'Integration (1h)',
    description: (
      <>
       We return gently and reflect on the experience. This is where dots connect - insight becomes clarity. You'll receive a recording of your session, so you can revisit it anytime and continue uncovering insights.
      </>
    ),
    image: '/images/_98A3513.jpg',
    align: 'left',
  },
];

export default function TheSession() {
  return (
    <section id="the-session" className="w-full bg-white py-32 px-4 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="font-secondary text-4xl md:text-5xl font-semibold text-left mb-4">
          <span style={{ color: '#A32015' }}>The Session</span>
        </h2>
        <p className="font-primary text-xl text-left mb-2">
          Each session is a 5-hour deep dive into <span className="italic">you</span>.
        </p>
        <div className="font-primary text-left text-base text-gray-700 mb-8">
          Sessions are done in English and Italian
        </div>
        <p className="font-primary text-xl text-left mb-16">
          Here's how it unfolds:
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-24 mb-12">
              {phases.map((phase, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-[320px] h-[400px] rounded-full overflow-hidden mb-6 flex items-center justify-center mx-auto">
                    <img
                      src={phase.image}
                      alt={phase.title}
                      className="object-cover w-full h-full rounded-full"
                      />
                  </div>
                  <div className="px-2 flex flex-col items-center">
                    <div className="font-secondary text-xl font-semibold mb-2 text-center mx-auto" style={{ color: '#C93F2F' }}>{phase.title}</div>
                    <div className="font-primary text-base text-gray-700 mb-4 text-center mx-auto leading-relaxed" >{phase.description}</div>
                  </div>
                </div>
              ))}
            </div>
          <BookSession variant="contact" />
        </div>
      </div>
    </section>
    
  );
}
