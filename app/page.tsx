// app/page.tsx - Main page for yoga studio website
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