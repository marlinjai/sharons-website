'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';
import BookSession from './BookSession';

export default function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[600px] md:h-screen w-full bg-black text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Content */}

      <div className="relative h-full z-20 flex items-end justify-center sm:pb-[16vw] lg:pb-[9vh] pb-[20vh] pt-0">
        <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full flex flex-col lg:flex-row items-end gap-24 pl-8 min-[380px]:pl-0 md:pl-8">
          <div className="max-w-2xl 2xl:max-w-full text-left space-y-4 md:space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-white drop-shadow-lg">
                Hypnosis
              </h1>
              <div className="text-3xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-white drop-shadow-lg">
                For the <TypingAnimation words={['Curious', 'Brave', 'Ready']} duration={100} />
              </div>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-white drop-shadow-md font-primary">
              Irresistibly drawn to the unknown?
              <br />
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
