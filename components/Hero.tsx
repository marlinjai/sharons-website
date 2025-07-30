'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';
import BookSession from './BookSession';

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] md:h-screen w-screen bg-black text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          // src="/images/doors.avif"
          src="/images/6.jpg"
          //src="/images/bright-doors.png"
          alt="Yoga pose"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative h-full z-20 flex items-end md:pb-44 pb-24 pt-0">
        <div className="w-full max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-end gap-24">
          <div className="max-w-2xl text-left space-y-2 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-secondary font-semibold leading-tight text-white drop-shadow-lg">
              Regression Hypnosis
            </h1>
            <div className="text-3xl md:text-5xl font-secondary font-semibold leading-tight text-white drop-shadow-lg">
              For the{' '}
              <TypingAnimation
                words={['Curious', 'Brave', 'Ready']}
                className="italic"
                duration={150}
              />
            </div>
            <p className="text-lg text-white drop-shadow-md font-primary">
              Irresistibly drawn to the unknown?<br />
              This is more than a journey - it's the Adventure of a Lifetime.
            </p>
            <BookSession />
          </div>

          {/* Circular image */}
          {/* <div className="mt-10 lg:mt-0 relative w-64 h-64 lg:w-[300px] lg:h-[400px] rounded-full overflow-hidden border-0 border-white shadow-xl">
            <video
              src="/videos/mini video.webm"
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}