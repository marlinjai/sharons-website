// components/Reviews.tsx - Client reviews section (mockup: three sample testimonials, no photos)
'use client';
import { useState } from 'react';

type Review = { name: string; title: string; text: string };

// Reviews shown on the site
const reviews: Review[] = [
  {
    name: 'Marco Tidu',
    title: 'Software Engineer',
    text: `From the first moments of our introductory chat, Sharon made me feel completely at ease. She embraced every aspect of who I am with warmth and respect. Even within a short time, the session was incredibly deep and insightful.\nAfter many years of trying different types of sessions, I can confidently say that my session with Sharon ranks among the top three most beautiful and intense experiences of my life. Thank you, thank you, thank you.`,
  },
  {
    name: 'Diana W.',
    title: 'hypnotherapist',
    text: `I recently had the pleasure of working with Sharon for a regression hypnosis session, and it was truly transformative.\nFrom the moment I arrived, I felt welcomed and at ease. Sharon is kind, patient, and made me feel completely comfortable sharing my thoughts and emotions. She was an exceptional listener and guided me with genuine compassion and understanding.\nDuring the session, she offered deep and insightful guidance, making me feel safe and supported throughout. I left feeling relaxed and empowered.\nI would gladly work with her again and wholeheartedly recommend her to anyone seeking healing and transformation through QHHT.`,
  },
  {
    name: 'Olivia Meyer',
    title: 'Designer',
    text: `Sharon was a wonderful guide during my quantum healing session. She made me feel safe and truly heard during our initial conversation and asked thoughtful questions that brought new awareness to areas I hadn't previously considered.\nDuring the session, she guided me through a life on another planet as a humanoid bird being, where I experienced feelings of community, telepathy, peace, and organic purpose. I also journeyed through a past life where I learned an important lesson about staying committed to my purpose, regardless of outside circumstances. These insights were exactly what I needed to take the next steps in my life.\nSharon asked clear, direct questions that brought structure to the session, and her genuine care was evident throughout. I highly recommend working with her; she uses every tool she has to help you receive the greatest healing and clarity.`,
  },
];

const WORD_LIMIT = 40;

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const words = review.text.split(' ');
  const isLong = words.length > WORD_LIMIT;

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 xl:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center w-full h-full">
      <span aria-hidden="true" className="font-secondary text-6xl leading-none text-[#c5441f]/30 -mb-4">&ldquo;</span>
      <div className="text-center w-full flex flex-col flex-1">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line font-primary text-base flex-1">
          {!expanded && isLong ? (
            <>
              <span>{words.slice(0, WORD_LIMIT).join(' ')}...</span>
              <button
                className="text-[#c5441f] font-primary text-sm hover:text-[#A32015] transition-colors duration-200 ml-1"
                onClick={() => setExpanded(true)}
                aria-label="Read full review"
              >
                read more
              </button>
            </>
          ) : (
            <span>{review.text}</span>
          )}
          {isLong && expanded && (
            <button
              className="block mx-auto mt-2 text-[#c5441f] font-primary text-sm hover:text-[#A32015] transition-colors duration-200"
              onClick={() => setExpanded(false)}
              aria-label="Show less of review"
            >
              read less
            </button>
          )}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="font-secondary font-semibold text-[#212121] text-lg lg:text-xl mb-1 leading-tight">{review.name}</h3>
          {review.title && <div className="text-base text-[#c5441f] font-primary">{review.title}</div>}
        </div>
      </div>
    </div>
  );
}

function CarouselArrow({ direction, className = '' }: { direction: 'left' | 'right'; className?: string }) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous reviews' : 'Next reviews'}
      className={`flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md text-[#c5441f] transition-colors duration-200 hover:bg-[#c5441f] hover:text-white ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  );
}

export default function Reviews() {
  return (
    <>
      <section className="py-32 md:pt-0 overflow-hidden" style={{ backgroundColor: '#f7f6f2' }}>
        <div id="reviews" className="sm:pt-[155px]"></div>
        <div className="max-w-[--content-max-width-reviews] mx-auto px-[--content-padding] xl:px-8 2xl:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-[#212121] mb-6">
              Celebrating Hypnosis Success
            </h2>
            <p className="text-2xl text-[#374152] font-primary">
              Hear what clients have to say
            </p>
          </div>

          {/* Carousel arrows are visual only for now (mockup) */}
          <div className="flex items-center gap-4 xl:gap-6">
            <CarouselArrow direction="left" className="hidden lg:flex" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch flex-1">
              {reviews.map(review => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
            <CarouselArrow direction="right" className="hidden lg:flex" />
          </div>
          <div className="flex lg:hidden justify-center gap-4 mt-10">
            <CarouselArrow direction="left" />
            <CarouselArrow direction="right" />
          </div>
        </div>
      </section>
    </>
  );
}
