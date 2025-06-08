// app/page.tsx - Main page for yoga studio website
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import YogaSessions from '@/components/YogaSessions'
import Instructors from '@/components/Instructors'
import Reviews from '@/components/Reviews'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Timetable from '@/components/Timetable'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Booking from '@/components/Booking'

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <YogaSessions />
        <About />
        <Booking />
        <Reviews />
        {/* <Pricing /> */}
        {/* <Timetable /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
} 