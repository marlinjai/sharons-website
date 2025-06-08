import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section className="h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-24 px-6 py-16 md:py-24 bg-[#f8f7f4]">
      <div className="text-center flex flex-col items-center gap-3 md:text-center max-w-md">
        <h2 className="text-3xl md:text-4xl font-light italic text-gray-800">
        Sharon Di Salvo
        </h2>
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Hypnotherapy Practitioner
        </h3>
        <p className="text-gray-700 text-sm md:text-base mb-6">
        Sharon is a certified hypnotherapy practitioner. 
        She has been practicing hypnotherapy for over 3 years and has helped
         many people to resolve blockages and align with their highest self.
        </p>
        <button className="bg-[#8d9773] text-white px-6 py-2 rounded-full font-medium hover:bg-[#7a8464] transition">
          Book a session
        </button>
      </div>
      <div className="w-[400px] h-[500px] relative rounded-full overflow-hidden">
        <Image
          src="/images/sharon.jpg"
          alt="Yoga Instructor"
          fill
          className="object-cover object-[60%_1%]"
        />
      </div>
    </section>
  );
};

export default About;
