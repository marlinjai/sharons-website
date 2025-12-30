'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
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

      <div className="relative h-full z-20 flex items-end justify-center sm:pb-[16vw] lg:pb-[15vh] pb-[20vh] pt-0">
        <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full flex flex-col lg:flex-row items-end gap-24 pl-8 min-[380px]:pl-0 md:pl-8">
          <div className="max-w-2xl 2xl:max-w-full text-left space-y-4 md:space-y-6">
            <div className="flex flex-col gap-2">
              {/* Line 1: Hypnosis */}
              <TextGenerateEffect
                words="Hypnotherapy"
                className="text-3xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-brand-off-black drop-shadow-lg"
                duration={0.6}
                filter={true}
                delay={0}
              />

              {/* Line 2: For the Curious, Brave & Ready - all on one line */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <TextGenerateEffect
                  words="For the Curious,"
                  className="text-2xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-brand-off-black drop-shadow-lg"
                  duration={0.6}
                  filter={true}
                  delay={1.2}
                />
                <TextGenerateEffect
                  words=" Brave,"
                  className="text-2xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-brand-off-black drop-shadow-lg"
                  duration={0.9}
                  filter={true}
                  delay={2.2}
                />
                <TextGenerateEffect
                  words="and Ready"
                  className="text-2xl sm:text-5xl 2xl:text-7xl font-secondary font-semibold leading-tight text-brand-off-black drop-shadow-lg"
                  duration={0.9}
                  filter={true}
                  delay={3.3}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Line 3: Irresistibly drawn to the unknown? */}
              <TextGenerateEffect
                words="Irresistibly drawn to the unknown?"
                className="text-md md:text-xl lg:text-2xl 2xl:text-3xl text-brand-off-black drop-shadow-md font-primary"
                duration={1.5}
                filter={true}
                delay={4.2}
              />

              {/* Line 4: This is more than a journey + delayed second part */}
              <TextGenerateEffect
                words="This is more than a journey"
                className="text-md md:text-xl lg:text-2xl 2xl:text-3xl text-brand-off-black drop-shadow-md font-primary"
                duration={0.9}
                filter={true}
                delay={6.5}
              />
              <TextGenerateEffect
                words="it's the Adventure of a Lifetime."
                className="text-md md:text-xl lg:text-2xl 2xl:text-3xl text-brand-off-black drop-shadow-md font-primary"
                duration={0.9}
                filter={true}
                delay={8.5}
              />
            </div>

            <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '12.5s', animationFillMode: 'forwards' }}>
              <BookSession />
            </div>
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
