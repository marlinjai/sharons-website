// components/Reviews.tsx - Client reviews section with parallax scrolling
'use client'
import { useEffect, useRef } from 'react'

export default function ReviewsII() {
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const centerColumnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      if (leftColumnRef.current && rightColumnRef.current && centerColumnRef.current) {
        // Get section position
        const sectionTop = (leftColumnRef.current.offsetParent as HTMLElement)?.offsetTop || 0
        const relativeScroll = scrollY - sectionTop + windowHeight
        
        // Apply different scroll speeds for parallax effect
        leftColumnRef.current.style.transform = `translateY(${relativeScroll * 0.1}px)`
        rightColumnRef.current.style.transform = `translateY(${relativeScroll * 0.1}px)`
        centerColumnRef.current.style.transform = `translateY(${relativeScroll * 0.05}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const leftReviews = [
    {
      title: "The hypnotherapy sessions are a source of harmony and positive emotions!",
      content: "The [Studio Name] hypnotherapy studio is a source of harmony and positive emotions! I've been attending sessions for a year and a half now, and the results are astonishing. The therapists are fantastic at what they do and always help find the right level of relaxation. I've found not only mental healing but also friends among like-minded individuals. Thanks to the therapists, I've become more flexible and calm.",
      name: "John Smith",
      age: 26,
      rating: 5
    }
  ]

  const centerReviews = [
    {
      title: "I've found my sanctuary at this hypnotherapy studio.",
      content: "I've found my sanctuary at this hypnotherapy studio. The therapists are incredibly knowledgeable and create a welcoming atmosphere that makes each session a rejuvenating experience.",
      name: "Sophia Brown",
      age: 20,
      rating: 5
    },
    {
      title: "This hypnotherapy studio is a hidden gem!",
      content: "This hypnotherapy studio is a hidden gem! The variety of techniques suits all levels, and the peaceful ambiance instantly puts you in a zen state of mind. The therapists are fantastic at what they do and always help find the right level of challenge. I've found not only mental healing but also friends among like-minded individuals. Thanks to the therapists, I've become more flexible and calm.",
      name: "Daniel Wilson",
      age: 31,
      rating: 5
    }
  ]

  const rightReviews = [
    {
      title: "The hypnotherapy studio offers a perfect blend.",
      content: "The hypnotherapy studio offers a perfect blend of traditional and modern healing practices. The serene setting and expert guidance make it an ideal place to escape the daily hustle and find inner balance.",
      name: "Emma Taylor",
      age: 22,
      rating: 5
    },
    {
      title: "Attending sessions at this hypnotherapy studio has truly transformed my life.",
      content: "Attending sessions at this hypnotherapy studio has truly transformed my life. The skilled therapists encourage personal growth, and I leave each session feeling stronger, both mentally and emotionally. I cannot express how grateful I am for this hypnotherapy studio. The therapists' dedication to their craft is evident in every session, and the sense of harmony and mindfulness they cultivate is truly exceptional.",
      name: "Benjamin Walker",
      age: 34,
      rating: 5
    }
  ]

  const VideoCard = ({ name, age }: { name: string; age: number }) => (
    <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-[4/5] relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 z-20">
        <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
        <p className="text-white/80 text-sm">{age} years</p>
      </div>
    </div>
  )

  const ReviewCard = ({ review }: { review: any }) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <h3 className="font-bold text-gray-900 text-xl mb-4 leading-tight">{review.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{review.content}</p>
      <div className="text-sm">
        <p className="font-semibold text-gray-900">{review.name}, {review.age} years</p>
      </div>
    </div>
  )

  return (
    <section id="reviews" className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center -mb-32">
          <h2 className="font-serif text-5xl md:text-6xl font-normal text-gray-900 mb-6">
            Celebrating hypnotherapy <em className="italic">success.</em>
          </h2>
          <p className="text-2xl text-gray-600">
            Hear what <em className="italic">our</em> clients have to say
          </p>
        </div>

        {/* Three Column Layout with Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-8">
            {leftReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
            <VideoCard name="Emily Johnson" age={23} />
          </div>

          {/* Center Column */}
          <div ref={centerColumnRef} className="space-y-8 lg:mt-16">
            {centerReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-8 lg:mt-8">
            <VideoCard name="James Anderson" age={24} />
            {rightReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 