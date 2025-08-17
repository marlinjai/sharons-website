import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="sm:h-screen py-32 md:py-24 bg-[url('/images/linnen-bg-seamless.jpg')] bg-contain bg-center  flex items-center justify-center"
    >
      <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full flex flex-col-reverse md:flex-row items-center justify-center gap-24">
        <div className="text-left flex flex-col items-start md:text-left">
          <h4 className="text-3xl md:text-4xl leading-4 mb-4 font-secondary" style={{ color: '#A32015' }}>
            Hello,
          </h4>
          <br />
          <p className="text-gray-700 text-base md:text-lg 2xl:text-xl mb-6 font-primary">
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
        <div className=" w-[280px] h-[350px] md:w-[1350px] md:h-[550px] xl:w-[80em] xl:h-[40em] relative rounded-full overflow-hidden">
          <Image src="/images/_98A3529.jpg" alt="Sharon Di Salvo" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default About;
