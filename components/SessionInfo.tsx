// components/SessionInfo.tsx - Session information and pricing details component

'use client';

import React, { useState } from 'react';

export default function SessionInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[--mobile-content-max-width] lg:w-[--content-max-width] flex flex-col items-center justify-center gap-4 mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start flex-row gap-2 text-text-primary lg:text-text-gray font-primary font-normal text-lg hover:text-text-primary transition justify-center"
      >
        Investment & Session Info
      </button>

      {open && (
        <>
          <div className="mt-8 text-base text-text-gray flex flex-col items-center justify-center w-full text-center">
            {/* Section: What's Included */}
            <div className="w-full">
              <p className="font-primary font-normal mb-12 text-lg md:text-xl text-text-primary">
                A session is €450 - here are the details and what's included:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] md:gap-y-6 md:gap-x-12 lg:gap-x-16 w-full">
                {/* Left Column whats included */}
                <div className="flex flex-col gap-6">
                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">5-hour in-person session</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">time set aside only for you</span>
                  </p>

                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">Recording of your session</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">to revisit anytime</span>
                  </p>

                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-right">
                    <span className="font-medium">30-minute online follow-up call</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">to integrate your experience</span>
                  </p>

                </div>

                {/* Divider Line - horizontal on mobile, vertical on desktop */}
                <div className="md:hidden w-full flex justify-center my-8">
                  <div className="w-24 h-px bg-text-gray-light"></div>
                </div>
                <div className="hidden md:flex justify-center items-center">
                  <div className="w-px h-[80%] bg-text-gray-light"></div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">

                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">Sessions are available</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">in English or Italian</span>
                  </p>

                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">Sessions are held in person</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">in a private and confidential setting</span>
                  </p>

                  <p className=" text-base md:text-lg font-light tracking-wide text-center md:text-left">
                    <span className="font-medium">A non-refundable €50 deposit</span><br />
                    <span className="text-sm md:text-base text-text-gray-light">(deducted from the fee) secures your spot</span>
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
