'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-screen bg-black text-white overflow-hidden">
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
       <div className="relative flex flex-col lg:flex-row items-end pb-44 justify-center h-full px-8 lg:px-24 z-20 pt-0 gap-24">
         <div className="max-w-2xl text-center lg:text-left space-y-6">
           <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
             Past Life Regressions  <br />
 for the  <span className="italic font-semibold">curious, brave </span>
           </h1>
                     <p className="text-lg text-white drop-shadow-md">
             We believe in the transformative power of yoga to nurture not just the body, but also the mind and soul.
           </p>
           <Link
             href="#"
             className="inline-block bg-white text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
           >
             Book a session
           </Link>
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
    </section>
  );
}