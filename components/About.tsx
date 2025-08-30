import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="sm:h-full py-32 md:py-24 flex items-center justify-center bg-gradient-to-br from-[#c5441f] to-[#e15023]"
      style={{
        background: 'linear-gradient(135deg, #c5441f, #756D6B)',
        backgroundImage: 'linear-gradient(135deg, #c5441f, #C9A89E)',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-[--content-max-width] mx-auto px-[--content-padding] w-full flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-24">
        <div className="text-left flex flex-col items-start md:text-left flex-1 max-w-2xl xl:max-w-none xl:flex-1 px-6 md:px-8 xl:px-0">
          <h4 className="text-3xl md:text-4xl leading-4 mb-4 font-secondary text-white">
            Hello,
          </h4>
          <br />
          <p className="text-white text-base md:text-lg 2xl:text-xl mb-6 font-primary">
            I'm Sharon - a certified Hypnotherapy Practitioner and full-time nerd when it comes to the mysteries of the human
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
            with a witty, fresh approach, because breakthroughs should feel energizing, like a zesty mental mic drop.
          </p>
        </div>
        <div className="w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[380px] lg:h-[475px] xl:w-[450px] xl:h-[550px] 2xl:w-[500px] 2xl:h-[600px] relative rounded-full overflow-hidden flex-shrink-0">
          <Image src="/images/_98A3529.jpg" alt="Sharon Di Salvo" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default About;
