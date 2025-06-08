'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">
                    {/* Background image */}
       <div className="absolute inset-0 z-0">
         <Image
           src="/images/hero-bg.jpg"
           alt="Yoga pose"
           fill
           className="object-cover"
           style={{ transform: 'rotate(-90deg) scale(1.4)' }}
           priority
         />
         <div className="absolute inset-0 bg-black/30" />
       </div>

       {/* Content */}
       <div className="relative flex flex-col lg:flex-row items-end pb-44 justify-center h-full px-8 lg:px-24 z-20 pt-20 gap-24">
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
         <div className="mt-10 lg:mt-0 relative w-64 h-64 lg:w-[300px] lg:h-[400px] rounded-full overflow-hidden border-0 border-white shadow-xl">
           <Image
             src="/images/hands_II.jpg"
             alt="Woman doing yoga"
             fill
             className="object-cover"
           />
         </div>
      </div>
    </section>
  );
}