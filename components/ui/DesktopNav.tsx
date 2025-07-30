// components/ui/DesktopNav.tsx
'use client'

import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigation } from './NavigationContext'
import { NavLink } from './NavLink'

// Desktop navigation with dropdown menus
export function DesktopNav() {
  const {
    isSessionDropdownOpen,
    isBlogDropdownOpen,
    setSessionDropdownOpen,
    setBlogDropdownOpen,
  } = useNavigation()

  const sessionDropdownRef = useRef<HTMLDivElement>(null)
  const blogDropdownRef = useRef<HTMLDivElement>(null)

  // Dropdown animation variants
  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="hidden md:flex items-center space-x-6 text-stone-900 text-lg tracking-wider font-primary">
      {/* Home Link */}
      <NavLink href="/">home</NavLink>

      {/* The Session Dropdown */}
      <div
        className="relative"
        ref={sessionDropdownRef}
        onMouseEnter={() => setSessionDropdownOpen(true)}
        onMouseLeave={() => setSessionDropdownOpen(false)}
      >
        <button
          className="transition-colors duration-200 flex items-center gap-1 focus:outline-none hover:text-[#de640d] font-primary"
          aria-haspopup="true"
          aria-expanded={isSessionDropdownOpen}
          onClick={() => setSessionDropdownOpen(!isSessionDropdownOpen)}
        >
          the session
          <motion.svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ rotate: isSessionDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isSessionDropdownOpen && (
            <motion.div
              className="absolute left-0 top-full w-auto py-2 z-50"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <NavLink
                  href="#reviews"
                  className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200"
                >
                  reviews
                </NavLink>
                <NavLink
                  href="#faq"
                  className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200"
                >
                  FAQ
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Link */}
      <NavLink href="#about">about</NavLink>

      {/* Contact Link */}
      <NavLink href="#contact">contact</NavLink>

      {/* Blog Dropdown */}
      <div
        className="relative"
        ref={blogDropdownRef}
        onMouseEnter={() => setBlogDropdownOpen(true)}
        onMouseLeave={() => setBlogDropdownOpen(false)}
      >
        <button
          className="transition-colors duration-200 flex items-center gap-1 focus:outline-none hover:text-[#de640d] font-primary"
          aria-haspopup="true"
          aria-expanded={isBlogDropdownOpen}
          onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)}
        >
          blog
          <motion.svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ rotate: isBlogDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isBlogDropdownOpen && (
            <motion.div
              className="absolute left-0 top-full w-auto py-2 z-50"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <NavLink
                  href="/blog"
                  className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200"
                >
                  all posts
                </NavLink>
                <NavLink
                  href="#newsletter"
                  className="block px-4 py-2 text-stone-900 font-primary hover:bg-[rgb(245,124,0)] hover:text-white transition-colors duration-200"
                >
                  newsletter
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <NavLink href="#contact" variant="cta">
        Let's Talk
      </NavLink>
    </div>
  )
}