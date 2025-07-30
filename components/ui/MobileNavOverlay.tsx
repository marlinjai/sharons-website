// components/ui/MobileNavOverlay.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from './NavigationContext'
import { NavLink } from './NavLink'

// Mobile navigation overlay with circle expansion animation
export function MobileNavOverlay() {
  const { isMobileMenuOpen, isBlogDropdownOpen, setBlogDropdownOpen, closeMobileMenu, overlayAnimation } = useNavigation()
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before creating portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Focus management - trap focus within overlay when open
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const overlay = overlayRef.current
    if (!overlay) return

    // Get all focusable elements within overlay
    const focusableElements = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus first element when overlay opens
    firstElement?.focus()

    // Trap focus within overlay
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab - move focus to last element if currently on first
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        // Tab - move focus to first element if currently on last
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isMobileMenuOpen])

  // Don't render anything on server or before mount
  if (!mounted) return null

  // Get animation variants based on type
  const getBackgroundAnimation = () => {
    if (overlayAnimation === 'fade') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    }
    
    // Radial animation (default)
    return {
      initial: { clipPath: 'circle(0% at 100% 0%)' },
      animate: { clipPath: 'circle(150% at 100% 0%)' },
      exit: { clipPath: 'circle(0% at 100% 0%)' },
      transition: { duration: 0.6 }
    }
  }

  const backgroundAnimation = getBackgroundAnimation()

  // Content animation variants with stagger
  const contentVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2
      }
    }
  }

  // Menu item animation variants
  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  // Container for staggered animations
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  return createPortal(
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Background with configurable animation */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={backgroundAnimation.initial}
            animate={backgroundAnimation.animate}
            exit={backgroundAnimation.exit}
            transition={backgroundAnimation.transition as any}
          />

          {/* Backdrop blur overlay */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Navigation content */}
          <motion.div
            className="relative h-full flex flex-col justify-center items-center p-8"
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.nav
              className="flex flex-col items-center space-y-8 text-2xl"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Home link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="/" variant="mobile" className="text-2xl">
                  home
                </NavLink>
              </motion.div>

              {/* The Session link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#the-session" variant="mobile" className="text-2xl">
                  the session
                </NavLink>
              </motion.div>

              {/* About link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#about" variant="mobile" className="text-2xl">
                  about
                </NavLink>
              </motion.div>

              {/* Blog dropdown */}
              <motion.div variants={menuItemVariants} className="flex flex-col items-center">
                <button
                  onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)}
                  className="text-black transition-colors duration-200 px-4 py-2 rounded-full font-primary text-2xl flex items-center gap-2 hover:text-[#de640d]"
                  aria-expanded={isBlogDropdownOpen}
                >
                  blog
                  <motion.svg
                    className="w-5 h-5"
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
                      className="mt-4 flex flex-col items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <NavLink href="#newsletter" variant="mobile" className="text-xl">
                        newsletter
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#contact" variant="mobile" className="text-2xl">
                  contact
                </NavLink>
              </motion.div>

              {/* Reviews link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#reviews" variant="mobile" className="text-2xl">
                  reviews
                </NavLink>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={menuItemVariants} className="mt-8">
                <NavLink href="#contact" variant="mobileCta" className="text-xl">
                  Let's Talk
                </NavLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}