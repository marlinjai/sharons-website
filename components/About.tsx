import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-24 px-6 py-16 md:py-24 bg-white"
    >
      <div className="text-left flex flex-col items-start md:text-left max-w-md">
        <h4 className="text-3xl md:text-4xl leading-4 font-secondary" style={{ color: '#A32015' }}>
          Hello,
        </h4>
        <br />
        <p className="text-gray-700 text-sm md:text-base mb-6 font-primary">
          I'm <span className="italic">Sharon</span> - certified{' '}
          <span className="italic">hypnotherapy practitioner</span> and full-time nerd for the mysteries of the human
          mind (and everything in between, above, and beyond).
          <br />
          <br />
          I explore hypnosis from every angle: scientific, practical, energetic, spiritual… whatever gets people into
          that sweet spot where real change happens.
          <br />
          <br />
          I'm endlessly curious about what makes people tick, get stuck, and finally break through.
          <br />
          <br />
          I'm here to normalize hypnosis for what it truly is - a bold, effective tool for deep, lasting transformation
          with a witty, fresh approach, because breakthroughs should feel energizing like a zesty mental mic-drop.
        </p>
      </div>
      <div className="w-[300px] sm:w-[350px] md:w-[400px] h-[375px] sm:h-[437px] md:h-[500px] relative rounded-full overflow-hidden">
        <Image src="/images/_98A3529.jpg" alt="Yoga Instructor" fill className="object-cover object-[60%_1%]" />
      </div>
    </section>
  );
};

export default About;
