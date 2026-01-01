// components/Reviews.tsx - Client reviews section with parallax scrolling and real testimonials
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Reviews() {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      if (leftColumnRef.current && rightColumnRef.current && centerColumnRef.current) {
        const sectionTop = (leftColumnRef.current.offsetParent as HTMLElement)?.offsetTop || 0;
        const relativeScroll = scrollY - sectionTop + windowHeight;

        // Reduce parallax intensity to prevent scrolling issues
        const leftTransform = relativeScroll * 0.05;
        const rightTransform = relativeScroll * 0.05;
        const centerTransform = relativeScroll * 0.02;

        leftColumnRef.current.style.transform = `translateY(${leftTransform}px)`;
        rightColumnRef.current.style.transform = `translateY(${rightTransform}px)`;
        centerColumnRef.current.style.transform = `translateY(${centerTransform}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial transform to prevent jump
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real reviews data
  const reviews = [
    {
      name: 'Francesca Borelli',
      title: 'Global Head of People',
      image: '/images/reviews/francesca_I.png',
      text: `Sharon helped me connect with a deep, inner part of myself through her hypnotherapy guidance. From the beginning, she showed sensitivity and empathy, which helped me trust her completely.\nShe clearly explained what would happen during the session and encouraged me to experience it without judgment, Which helped me relax and flow with my emotions. I felt fully supported before, during, and after the session.\nSharon radiates a calm, welcoming energy and possesses a natural gift of deep perception and emotional intelligence. I recommend her to anyone who wants to explore deeply but feels afraid - she will be your perfect Virgilio.`,
    },
    {
      name: 'Katie Barbaro',
      title: 'Community Director',
      image: '/images/reviews/kathi.png',
      text: `My session with Sharon was deeply relaxing and illuminating. I appreciated the invitation to generate questions for my higher self and felt grateful for the safe space she created, which allowed higher guidance to come through. Sharon was very thorough in explaining how to prepare for the session, so I felt able to fully surrender to the experience. It was especially helpful in uncovering subconscious motivations that may be influencing my life decisions. Thank you for such an amazing experience!`,
    },
    {
      name: 'Alessandro Gentile',
      title: 'Designer at BMW',
      image: '/images/reviews/alessandro_II.png',
      text: `I had one hypnotherapy session with Sharon, and I wholeheartedly recommend it to anyone. The process she guided me through felt natural and yet full of surprises. She helped me identify and explore emotions that were already within me but had remained unclear until that point. Acknowledging and accepting these feelings has made my life better.\nI also want to highlight how gracefully Sharon addressed my initial skepticism about hypnotherapy. She never judged or pressured me, which allowed me to fully relax and enjoy a session that far exceeded my expectations.`,
    },
    {
      name: 'Marco Tidu',
      title: 'Software Engineer',
      image: null,
      text: `From the first moments of our introductory chat, Sharon made me feel completely at ease. She embraced every aspect of who I am with warmth and respect. Even within a short time, the session was incredibly deep and insightful.\nAfter many years of trying different types of sessions, I can confidently say that my session with Sharon ranks among the top three most beautiful and intense experiences of my life. Thank you, thank you, thank you.`,
    },
    {
      name: 'Cristina Soler',
      title: '',
      //image: '/images/reviews/christina.png',
      image: null,
      text: `I had the pleasure of experiencing my first QHHT session with Sharon, and it was truly positive. I felt a bit nervous at first, but she was incredibly caring and explained everything so clearly that I felt comfortable right from the start. During the session, Sharon guided me into a deep state of relaxation and regression, allowing me to explore the depths of my consciousness. Her intuitive and compassionate approach made me feel safe and supported.\nA few weeks after the session, I noticed a greater sense of peace within myself. It felt like a newfound calm and clarity had emerged. I'm deeply grateful - thank you, Sharon!`,
    },
    {
      name: 'Daniela',
      title: '',
      image: null,
      text: `My experience with Sharon was simply outstanding. I usually find it difficult to relax around others, but from the start, she made me feel safe, comfortable, and cared for.\nHer guidance and patience made the session deeply transformative. I accessed new parts of myself that connected me to a wellspring of wisdom and love, as if I had finally met my own heart and the heart of the universe.\nI recommend this to anyone who wants to connect with the depth of their soul or simply receive loving support. I'm forever grateful to Sharon for creating such a nurturing and transformative space.`,
    },

    {
      name: 'Diana W.',
      title: 'hypnotherapist',
      image: null,
      text: `I recently had the pleasure of working with Sharon for a regression hypnosis session, and it was truly transformative.\nFrom the moment I arrived, I felt welcomed and at ease. Sharon is kind, patient, and made me feel completely comfortable sharing my thoughts and emotions. She was an exceptional listener and guided me with genuine compassion and understanding.\nDuring the session, she offered deep and insightful guidance, making me feel safe and supported throughout. I left feeling relaxed and empowered.\nI would gladly work with her again and wholeheartedly recommend her to anyone seeking healing and transformation through QHHT.`,
    },
    {
      name: 'Olivia Meyer',
      title: 'Designer',
      image: null,
      text: `Sharon was a wonderful guide during my quantum healing session. She made me feel safe and truly heard during our initial conversation and asked thoughtful questions that brought new awareness to areas I hadn't previously considered.\nDuring the session, she guided me through a life on another planet as a humanoid bird being, where I experienced feelings of community, telepathy, peace, and organic purpose. I also journeyed through a past life where I learned an important lesson about staying committed to my purpose, regardless of outside circumstances. These insights were exactly what I needed to take the next steps in my life.\nSharon asked clear, direct questions that brought structure to the session, and her genuine care was evident throughout. I highly recommend working with her; she uses every tool she has to help you receive the greatest healing and clarity.`,
    },
    {
      name: 'Carola Voss',
      title: 'Lawyer',
      image: null,
      text: `We had our session at the beginning of 2023. At the time, I was dealing with a lot of anxiety due to several life circumstances. Having Sharon as a guide was incredible; she made me feel protected and calm throughout the session.\nIn December, a lot of questions and memories resurfaced, and the session helped me sort through them. It gave me clarity and showed me where I needed to place boundaries and stop justifying certain behaviors. It allowed me to see things in a new light - not as overwhelming as before, but more manageable. I began to recognize the subtle blocks that were hindering my growth. The session helped me filter through everything and see the path to healing more clearly.`,
    },
  ];

  // Filter reviews with images for mobile (only first 3)
  const reviewsWithImages = reviews.filter(review => review.image).slice(0, 3);

  // Distribute all reviews evenly across 3 columns for desktop
  const leftReviews = reviews.filter((_, i) => i % 3 === 0);
  const centerReviews = reviews.filter((_, i) => i % 3 === 1);
  const rightReviews = reviews.filter((_, i) => i % 3 === 2);

  // Custom image scaling/positioning logic
  const getImageClass = (idx: number) => {
    if (idx === 1) return 'object-cover w-full h-full scale-[135%] -translate-x-[7%]';
    if (idx === 2) return 'object-cover w-full h-full scale-[129%] -translate-y-[15%]';
    if (idx === 4) return 'object-cover w-full h-full scale-[118%] translate-x-[3%]';
    return 'object-cover w-full h-full';
  };

  // ReviewCard component with mobile/desktop aware truncation
  const ReviewCard = ({ review, idx, isMobile = false, isFirstInColumn = false }: { review: any; idx: number; isMobile?: boolean; isFirstInColumn?: boolean }) => {
    // Track if this review is expanded
    const [expanded, setExpanded] = useState(false);

    // Different truncation logic for mobile vs desktop
    const shouldTruncate = () => {
      if (isMobile) {
        return review.text.split(' ').length > 25; // Shorter truncation for mobile
      }
      // On desktop, don't truncate the first review in each column
      if (!isMobile && isFirstInColumn) {
        return false; // Never truncate first review in each column
      }
      return review.text.split(' ').length > 30; // Longer truncation for desktop
    };

    const getTruncatedText = () => {
      const wordLimit = isMobile ? 25 : 30;
      return review.text.split(' ').slice(0, wordLimit).join(' ');
    };

    const isLong = shouldTruncate();

    return (
      <div className="bg-white rounded-2xl p-6 lg:p-8 xl:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center w-full">
        {review.image && (
          <div className="w-20 h-20 lg:w-28 lg:h-28 mb-4 rounded-full overflow-hidden flex items-center justify-center">
            <Image src={review.image} alt={review.name} width={112} height={112} className={getImageClass(idx)} />
          </div>
        )}
        <div className="text-center w-full">
          <h3 className="font-secondary font-semibold text-[#212121] text-lg lg:text-xl mb-2 leading-tight">{review.name}</h3>
          {review.title && <div className="text-base text-[#c5441f] mb-2 font-primary">{review.title}</div>}
          <div className="text-gray-700 leading-relaxed whitespace-pre-line font-primary text-base">
            {!expanded && isLong ? (
              <>
                <span>{getTruncatedText()}...</span>
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
          </div>
          {/* Show 'read less' when review is expanded */}
          {isLong && expanded && (
            <button
              className="mt-2 text-[#c5441f] font-primary text-sm hover:text-[#A32015] transition-colors duration-200"
              onClick={() => setExpanded(false)}
              aria-label="Show less of review"
            >
              read less
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-32 md:pb-[420px] md:pt-0 overflow-hidden" style={{ backgroundColor: '#f7f6f2' }}>
        <div id="reviews" className="sm:pt-[155px]"></div>
        <div className="max-w-[--content-max-width-reviews] mx-auto px-[--content-padding] xl:px-8 2xl:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-secondary text-3xl md:text-4xl font-semibold text-[#212121] mb-6">
              Celebrating Hypnotherapy Success
            </h2>
            <p className="text-2xl text-[#374152] font-primary">
              Hear what clients have to say
            </p>
          </div>

          {/* Mobile Layout - Single column, 3 reviews with images only */}
          <div className="lg:hidden">
            <div className="space-y-8">
              {reviewsWithImages.map((review, index) => (
                <ReviewCard key={index} review={review} idx={index} isMobile={true} />
              ))}
            </div>
            {!showAllMobile && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllMobile(true)}
                  className="bg-[#c5441f] text-white px-8 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[#e15023]"
                >
                  Read More Reviews
                </button>
              </div>
            )}
            {showAllMobile && (
              <>
                <div className="space-y-8 mt-8">
                  {reviews.slice(3).map((review, index) => (
                    <ReviewCard key={index + 3} review={review} idx={index + 3} isMobile={true} />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button
                    onClick={() => {
                      // Calculate current scroll position relative to reviews section
                      const reviewsSection = document.getElementById('reviews');
                      if (reviewsSection) {
                        const reviewsTop = reviewsSection.offsetTop;
                        const currentScroll = window.scrollY;
                        const targetScroll = Math.max(reviewsTop - 140, 0); // 140px offset from top

                        // Collapse content first
                        setShowAllMobile(false);

                        // Use a smooth custom scroll animation
                        setTimeout(() => {
                          window.scrollTo({
                            top: targetScroll,
                            behavior: 'smooth'
                          });
                        }, 50); // Shorter delay for smoother experience
                      } else {
                        setShowAllMobile(false);
                      }
                    }}
                    className="bg-[#c5441f] text-white px-8 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[#e15023]"
                  >
                    Show Less Reviews
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Desktop Layout - Three Column Layout with Parallax */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 -mt-32">
            {/* Left Column */}
            <div ref={leftColumnRef} className="space-y-8">
              {leftReviews.map((review, index) => (
                <ReviewCard key={index} review={review} idx={index * 3} isFirstInColumn={index === 0} />
              ))}
            </div>
            {/* Center Column */}
            <div ref={centerColumnRef} className="space-y-8 lg:mt-16">
              {centerReviews.map((review, index) => (
                <ReviewCard key={index} review={review} idx={index * 3 + 1} isFirstInColumn={index === 0} />
              ))}
            </div>
            {/* Right Column */}
            <div ref={rightColumnRef} className="space-y-8 lg:mt-8">
              {rightReviews.map((review, index) => (
                <ReviewCard key={index} review={review} idx={index * 3 + 2} isFirstInColumn={index === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
