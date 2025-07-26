// components/Reviews.tsx - Client reviews section with parallax scrolling and real testimonials
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image';

export default function Reviews() {
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const centerColumnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      if (leftColumnRef.current && rightColumnRef.current && centerColumnRef.current) {
        const sectionTop = (leftColumnRef.current.offsetParent as HTMLElement)?.offsetTop || 0
        const relativeScroll = scrollY - sectionTop + windowHeight
        
        // Reduce parallax intensity to prevent scrolling issues
        const leftTransform = relativeScroll * 0.05
        const rightTransform = relativeScroll * 0.05
        const centerTransform = relativeScroll * 0.02
        
        leftColumnRef.current.style.transform = `translateY(${leftTransform}px)`
        rightColumnRef.current.style.transform = `translateY(${rightTransform}px)`
        centerColumnRef.current.style.transform = `translateY(${centerTransform}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll(); // Set initial transform to prevent jump
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Real reviews data
  const reviews = [
    {
      name: 'Francesca Borelli',
      title: 'Global Head of People',
      image: '/images/reviews/francesca_I.png',
      text: `Sharon helped me connect with a deep, inner part of myself through her hypnosis guidance. From the beginning, she showed sensitivity and empathy, which helped me trust her completely.\nShe clearly explained what would happen during the session and encouraged me to experience it without judgment, Which helped me relax and flow with my emotions. I felt fully supported before, during, and after the session.\nSharon radiates a calm, welcoming energy and possesses a natural gift of deep perception and emotional intelligence. I recommend her to anyone who wants to explore deeply but feels afraid - she will be your perfect Virgilio.`
    },
    {
      name: 'Katie Barbaro',
      title: 'Community Director',
      image: '/images/reviews/kathi.png',
      text: `My session with Sharon was deeply relaxing and illuminating. I appreciated the invitation to generate questions for my higher self and felt grateful for the safe space she created, which allowed higher guidance to come through. Sharon was very thorough in explaining how to prepare for the session, so I felt able to fully surrender to the experience. It was especially helpful in uncovering subconscious motivations that may be influencing my life decisions. Thank you for such an amazing experience!`
    },
    {
      name: 'Alessandro Gentile',
      title: 'Designer at BMW',
      image: '/images/reviews/alessandro_II.png',
      text: `I had one hypnosis session with Sharon, and I wholeheartedly recommend it to anyone. The process she guided me through felt natural and yet full of surprises. She helped me identify and explore emotions that were already within me but had remained unclear until that point. Acknowledging and accepting these feelings has made my life better.\nI also want to highlight how gracefully Sharon addressed my initial skepticism about hypnosis. She never judged or pressured me, which allowed me to fully relax and enjoy a session that far exceeded my expectations.`
    },
    {
      name: 'Marco Tidu',
      title: 'Software Engineer',
      image: null,
      text: `From the first moments of our introductory chat, Sharon made me feel completely at ease. She embraced every aspect of who I am with warmth and respect. Even within a short time, the session was incredibly deep and insightful.\nAfter many years of trying different types of sessions, I can confidently say that my session with Sharon ranks among the top three most beautiful and intense experiences of my life. Thank you, thank you, thank you.`
    },
    {
      name: 'Cristina Soler',
      title: '',
      image: '/images/reviews/christina.png',
      text: `I had the pleasure of experiencing my first QHHT session with Sharon, and it was truly positive. I felt a bit nervous at first, but she was incredibly caring and explained everything so clearly that I felt comfortable right from the start. During the session, Sharon guided me into a deep state of relaxation and regression, allowing me to explore the depths of my consciousness. Her intuitive and compassionate approach made me feel safe and supported.\nA few weeks after the session, I noticed a greater sense of peace within myself. It felt like a newfound calm and clarity had emerged. I'm deeply grateful - thank you, Sharon!`
    },
    {
      name: 'Daniela',
      title: '',
      image: null,
      text: `My experience with Sharon was simply outstanding. I usually find it difficult to relax around others, but from the start, she made me feel safe, comfortable, and cared for.\nHer guidance and patience made the session deeply transformative. I accessed new parts of myself that connected me to a wellspring of wisdom and love, as if I had finally met my own heart and the heart of the universe.\nI recommend this to anyone who wants to connect with the depth of their soul or simply receive loving support. I'm forever grateful to Sharon for creating such a nurturing and transformative space.`
    },
    {
      name: 'Carlo Bortolini',
      title: 'Founder and Lead Coach',
      image: null,
      text: `My experience with Sharon in brief: relaxing, deep, and magical - with a touch of laughter, connection, and a healthy detachment from past experiences.`
    },
    {
      name: 'Diana W.',
      title: 'hypnotherapist',
      image: null,
      text: `I recently had the pleasure of working with Sharon for a regression hypnosis session, and it was truly transformative.\nFrom the moment I arrived, I felt welcomed and at ease. Sharon is kind, patient, and made me feel completely comfortable sharing my thoughts and emotions. She was an exceptional listener and guided me with genuine compassion and understanding.\nDuring the session, she offered deep and insightful guidance, making me feel safe and supported throughout. I left feeling relaxed and empowered.\nI would gladly work with her again and wholeheartedly recommend her to anyone seeking healing and transformation through QHHT.`
    },
    {
      name: 'Olivia Meyer',
      title: 'Designer',
      image: null,
      text: `Sharon was a wonderful guide during my quantum healing session. She made me feel safe and truly heard during our initial conversation and asked thoughtful questions that brought new awareness to areas I hadn't previously considered.\nDuring the session, she guided me through a life on another planet as a humanoid bird being, where I experienced feelings of community, telepathy, peace, and organic purpose. I also journeyed through a past life where I learned an important lesson about staying committed to my purpose, regardless of outside circumstances. These insights were exactly what I needed to take the next steps in my life.\nSharon asked clear, direct questions that brought structure to the session, and her genuine care was evident throughout. I highly recommend working with her; she uses every tool she has to help you receive the greatest healing and clarity.`
    },
    {
      name: 'Carola Voss',
      title: 'Lawyer',
      image: null,
      text: `We had our session at the beginning of 2023. At the time, I was dealing with a lot of anxiety due to several life circumstances. Having Sharon as a guide was incredible; she made me feel protected and calm throughout the session.\nIn December, a lot of questions and memories resurfaced, and the session helped me sort through them. It gave me clarity and showed me where I needed to place boundaries and stop justifying certain behaviors. It allowed me to see things in a new light - not as overwhelming as before, but more manageable. I began to recognize the subtle blocks that were hindering my growth. The session helped me filter through everything and see the path to healing more clearly.`
    },
  ];

  // Distribute reviews evenly across 3 columns
  const leftReviews = reviews.filter((_, i) => i % 3 === 0)
  const centerReviews = reviews.filter((_, i) => i % 3 === 1)
  const rightReviews = reviews.filter((_, i) => i % 3 === 2)

  // Custom image scaling/positioning logic
  const getImageClass = (idx: number) => {
    if (idx === 1) return 'object-cover w-full h-full scale-[135%] -translate-x-[7%]';
    if (idx === 2) return 'object-cover w-full h-full scale-[129%] -translate-y-[15%]';
    if (idx === 4) return 'object-cover w-full h-full scale-[118%] translate-x-[3%]';
    return 'object-cover w-full h-full';
  }

  const ReviewCard = ({ review, idx }: { review: any, idx: number }) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center">
      {review.image && (
        <div className="w-28 h-28 mb-4 rounded-full overflow-hidden flex items-center justify-center">
          <Image src={review.image} alt={review.name} width={112} height={112} className={getImageClass(idx)} />
        </div>
      )}
      <div className="text-center">
        <h3 className="font-secondary font-semibold text-gray-900 text-xl mb-1 leading-tight">{review.name}</h3>
        {review.title && <div className="text-sm text-[#c93e2e] mb-2 font-primary">{review.title}</div>}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line font-primary">{review.text}</p>
      </div>
    </div>
  )

  return (
    <>
    
    <section  className="py-16 md:pb-[420px] overflow-hidden" style={{ backgroundColor: '#f7f6f2' }}>
       <div id="reviews" className='pt-[185px]'></div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
         <div className="text-center -mb-8">
           <h2 className="font-secondary text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
             Celebrating Regression Hypnosis <em className="italic">success.</em>
           </h2>
           <p className="text-2xl text-gray-600 font-primary">
             Hear what <em className="italic">clients</em> have to say
           </p>
         </div>
        {/* Three Column Layout with Parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-8">
            {leftReviews.map((review, index) => (
              <ReviewCard key={index} review={review} idx={index * 3} />
            ))}
          </div>
          {/* Center Column */}
          <div ref={centerColumnRef} className="space-y-8 lg:mt-16">
            {centerReviews.map((review, index) => (
              <ReviewCard key={index} review={review} idx={index * 3 + 1} />
            ))}
          </div>
          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-8 lg:mt-8">
            {rightReviews.map((review, index) => (
              <ReviewCard key={index} review={review} idx={index * 3 + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
    )
} 