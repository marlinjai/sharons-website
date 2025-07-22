'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSessionDropdownOpen(false)
      }
    }
    if (isSessionDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSessionDropdownOpen])

  return (
    <header className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <nav className="w-full max-w-6xl bg-stone-100/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo with orange circle */}
          <Link href="/" className="flex items-center bg-white border-[rgb(245,124,0)] border-2 rounded-full p-2">
            <img src="/graphics/logo_return.svg" alt="Hypnotherapy Berlin Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation + CTA aligned to the right */}
          <div className="hidden md:flex items-center space-x-6 text-stone-900 text-lg tracking-wider font-primary">
            <Link href="/" className="hover:text-[#E7E5D8] transition-colors duration-200">home</Link>
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsSessionDropdownOpen(true)}
              onMouseLeave={() => setIsSessionDropdownOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="#the-session"
                  className="hover:text-[#E7E5D8] transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isSessionDropdownOpen}
                  tabIndex={0}
                  onClick={() => setIsSessionDropdownOpen((open) => !open)}
                >
                  the session
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </Link>
              </div>
              {isSessionDropdownOpen && (
                <div className="absolute left-0 pt-12 w-auto py-2 z-50">
                  <div className='bg-white  rounded-xl shadow-lg  border border-gray-100'>
                  <Link href="#reviews" className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200 rounded-t-xl" onClick={() => setIsSessionDropdownOpen(false)}>reviews</Link>
                  <Link href="/not-found" className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200 rounded-b-xl" onClick={() => setIsSessionDropdownOpen(false)}>FAQ</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="#about" className="hover:text-[#E7E5D8] transition-colors duration-200">about</Link>
            <Link href="#contact" className="hover:text-[#E7E5D8] transition-colors duration-200">contact</Link>
            <Link href="#blog" className="hover:text-[#E7E5D8] transition-colors duration-200">blog</Link>
            <Link 
              href="#contact"
              className="ml-4 px-6 py-2 rounded-full tracking-normal text-lg bg-white text-black shadow-md transition-colors duration-200 hover:bg-[rgb(245,124,0)] hover:text-white font-primary"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-lg md:hidden p-2 rounded-full text-black hover:bg-white/10 transition-colors duration-200"
            title="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-black hover:text-[#E7E5D8] transition-colors duration-200 px-4 py-2 rounded-full font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </Link>
              <Link
                href="#the-session"
                className="text-black hover:text-[#E7E5D8] transition-colors duration-200 px-4 py-2 rounded-full font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                the session
              </Link>
              <Link
                href="#about"
                className="text-black hover:text-[#E7E5D8] transition-colors duration-200 px-4 py-2 rounded-full font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                about
              </Link>
              <Link
                href="#contact"
                className="text-black hover:text-[#E7E5D8] transition-colors duration-200 px-4 py-2 rounded-full font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                contact
              </Link>
              <Link
                href="#reviews"
                className="text-black hover:text-[#E7E5D8] transition-colors duration-200 px-4 py-2 rounded-full font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                reviews
              </Link>
              <Link
                href="#contact"
                className="text-black font-medium px-4 py-2 rounded-full border border-black text-center hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200 font-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Curious? Let's Talk
              </Link>
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
}
