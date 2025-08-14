

export default function VideoSection() {
  return (
    <section className="relative min-h-screen h-full w-screen flex items-center justify-center bg-white text-black overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 h-full">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center h-full">
          <p className="font-primary text-xl md:text-2xl text-gray-700 leading-relaxed">
            A <span className="px-3 md:text-3xl italic text-gray-900 font-secondary">Regression Hypnosis</span> session is truly the adventure of a lifetime, through which you can access earlier moments in this life, or, if it aligns with your belief system, past lives.<br /><br />
            But no matter where you go, the destination is always the same:<br />
            <span className="block mt-4 text-2xl md:text-3xl font-secondary font-semibold" style={{ color: '#C93F2F' }}>
              Clarity. Resolution. Confidence in the Now.
            </span>
          </p>
        </div>
        {/* Right: Pill-shaped image */}
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="w-[300px] sm:w-[350px] md:w-[400px] h-[375px] sm:h-[437px] md:h-[500px] rounded-full overflow-hidden bg-gray-200 shadow-lg">
            <video
              src="/videos/mini video.webm"
              className="object-cover w-full h-full brightness-110"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
