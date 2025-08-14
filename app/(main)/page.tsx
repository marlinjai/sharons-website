// app/page.tsx - Main home page component
'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import TheSession from '@/components/TheSession'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import About from '@/components/About'
import Newsletter from '@/components/Newsletter'

// Component that handles search params - needs to be wrapped in Suspense
function ScrollHandler() {
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

  return null // This component only handles side effects
}

// Main page content component
function PageContent() {
  return (
    <>
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
    </>
  )
}

export default function Home() {
  return (
    <>
      {/* Wrap the search params handler in Suspense */}
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <PageContent />
    </>
  )
}
