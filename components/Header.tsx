// components/Header.tsx - Pill-shaped header component
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <nav className="w-[80%] max-w-6xl bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg font-bold text-black" style={{ mixBlendMode: 'difference' }}>
            Hypnotherapy Berlin
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-black font-medium">
            <li>
              <Link href="#instructors" className="hover:opacity-70 transition-opacity duration-200" style={{ mixBlendMode: 'difference' }}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#reviews" className="hover:opacity-70 transition-opacity duration-200" style={{ mixBlendMode: 'difference' }}>
                Reviews
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:opacity-70 transition-opacity duration-200" style={{ mixBlendMode: 'difference' }}>
                About
              </Link>
            </li>
            <li>
              <Link href="#sessions" className="hover:opacity-70 transition-opacity duration-200" style={{ mixBlendMode: 'difference' }}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="#blog" className="hover:opacity-70 transition-opacity duration-200" style={{ mixBlendMode: 'difference' }}>
                Blog
              </Link>
            </li>
          </ul>

          {/* Contact Button */}
          <Link 
            href="#contact" 
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md"
          >
            Book a session
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
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
                href="#instructors"
                className="text-black hover:opacity-70 transition-opacity duration-200 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ mixBlendMode: 'difference' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#reviews"
                className="text-black hover:opacity-70 transition-opacity duration-200 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ mixBlendMode: 'difference' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="#pricing"
                className="text-black hover:opacity-70 transition-opacity duration-200 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ mixBlendMode: 'difference' }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#sessions"
                className="text-black hover:opacity-70 transition-opacity duration-200 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ mixBlendMode: 'difference' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="#blog"
                className="text-black hover:opacity-70 transition-opacity duration-200 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ mixBlendMode: 'difference' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
} 