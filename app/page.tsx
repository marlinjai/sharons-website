'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import TheSession from '@/components/TheSession'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Timetable from '@/components/Timetable'
import Contact from '@/components/Contact'

import Footer from '@/components/Footer'
import About from '@/components/About'
import Booking from '@/components/Booking'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if we should scroll to home section (from blog pages)
    const scrollToHome = searchParams.get('scrollToHome')
    if (scrollToHome === 'true') {
      const homeSection = document.getElementById('home')
      if (homeSection) {
        setTimeout(() => {
          homeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100) // Small delay to ensure page is fully loaded
      }
    }
  }, [searchParams])

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <TheSession />
        <About />
        <Reviews />
        <FAQ />
        <Newsletter />
        <Contact />
        {/* <Pricing /> */}
        {/* <Timetable /> */}
      </main>
      <Footer />
    </div>
  )
} 