import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section id="about" className="h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-24 px-6 py-16 md:py-24 bg-[#f8f7f4]">
      <div className="text-left flex flex-col items-start gap-3 md:text-left max-w-md">
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
          About
        </h2>
        <p className="text-gray-700 text-sm md:text-base mb-6">
          <span className="text-lg md:text-xl">Hello,</span><br />
          I’m <span className="italic">Sharon</span> - certified <span className="italic">hypnotherapy practitioner</span> and full-time nerd for the mysteries of the human mind (and everything in between, above, and beyond).<br /><br />
          I explore hypnosis from every angle: scientific, practical, energetic, spiritual… whatever gets people into that sweet spot where real change happens.<br /><br />
          I’m endlessly curious about what makes people tick, get stuck, and finally break through.<br /><br />
          I’m here to normalize hypnosis for what it truly is - a bold, effective tool for deep, lasting transformation with a witty, fresh approach, because breakthroughs should feel energizing like a zesty mental mic-drop.
        </p>
        <div className="mb-2 text-gray-800 text-base md:text-lg">Want to know more about hypnosis?</div>
        <div className='flex flex-row justify-center items-center gap-6'>

        <button className="bg-[#D3531D] text-white px-6 py-2 rounded-full font-medium hover:bg-[rgb(245,124,0)] transition">
          Let´s Talk
        </button>
        or
        <button className="bg-[#D3531D] text-white px-6 py-2 rounded-full font-medium hover:bg-[rgb(245,124,0)] transition">
          Book a Session
        </button>
        </div>
      </div>
      <div className="w-[400px] h-[500px] relative rounded-full overflow-hidden">
        <Image
          src="/images/_98A3529.jpg"
          alt="Yoga Instructor"
          fill
          className="object-cover object-[60%_1%]"
        />
      </div>
    </section>
  );
};

export default About;
