// components/ui/MobileNavOverlay.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigation } from './NavigationContext';
import { NavLink } from './NavLink';

// Mobile navigation overlay with circle expansion animation
export function MobileNavOverlay() {
  const { isMobileMenuOpen, isBlogDropdownOpen, setBlogDropdownOpen, closeMobileMenu, overlayAnimation } =
    useNavigation();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before creating portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus management - trap focus within overlay when open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Get all focusable elements within overlay
    const focusableElements = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element when overlay opens
    firstElement?.focus();

    // Trap focus within overlay
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab - move focus to last element if currently on first
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab - move focus to first element if currently on last
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMobileMenuOpen]);

  // Don't render anything on server or before mount
  if (!mounted) return null;

  // Get animation variants based on type
  const getBackgroundAnimation = () => {
    if (overlayAnimation === 'fade') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      };
    }

    // Radial animation (default)
    return {
      initial: { clipPath: 'circle(0% at 100% 0%)' },
      animate: { clipPath: 'circle(150% at 100% 0%)' },
      exit: { clipPath: 'circle(0% at 100% 0%)' },
      transition: { duration: 0.6 },
    };
  };

  const backgroundAnimation = getBackgroundAnimation();

  // Content animation variants with stagger
  const contentVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  // Menu item animation variants
  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Container for staggered animations
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return createPortal(
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 lg:hidden"
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

          {/* Close button */}
          <motion.button
            onClick={closeMobileMenu}
            className="absolute top-8 right-8 z-10 p-3 rounded-full bg-stone-100/50 backdrop-blur-sm text-black hover:bg-stone-200/50 transition-colors duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            aria-label="Close navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Navigation content */}
          <motion.div
            className="relative h-full flex flex-col justify-center items-center p-8"
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.nav
              className="flex flex-col items-center mt-4"
              style={{
                fontSize: 'var(--mobile-nav-font-size)',
                gap: 'var(--mobile-nav-gap)'
              }}
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Home link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="/" variant="mobile">
                  home
                </NavLink>
              </motion.div>

              {/* The Session link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#the-session" variant="mobile">
                  the session
                </NavLink>
              </motion.div>

              {/* About link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#about" variant="mobile">
                  about
                </NavLink>
              </motion.div>

              {/* Blog dropdown */}
              <motion.div variants={menuItemVariants} className="flex flex-col items-center">
                <button
                  onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)}
                  className="text-nav-text transition-colors duration-200 px-4 py-2 rounded-full font-primary flex items-center gap-2 hover:text-nav-text-hover relative"
                  style={{ fontSize: 'var(--mobile-nav-font-size)' }}
                  aria-expanded={isBlogDropdownOpen}
                >
                  blog
                  <motion.svg
                    className="w-5 h-5 absolute -right-3"
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
                      <NavLink href="#newsletter" variant="mobile">
                        newsletter
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isBlogDropdownOpen && (
                    <motion.div
                      className="mt-4 flex flex-col items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <NavLink href="/blog" variant="mobile">
                        all posts
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* FAQ link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#faq" variant="mobile">
                  FAQ
                </NavLink>
              </motion.div>

              {/* Reviews link */}
              <motion.div variants={menuItemVariants}>
                <NavLink href="#reviews" variant="mobile">
                  reviews
                </NavLink>
              </motion.div>

              {/* Let's Talk CTA */}
              <motion.div variants={menuItemVariants} className="mt-8">
                <NavLink href="#contact" variant="mobileCta">
                  let's talk
                </NavLink>
              </motion.div>

            </motion.nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
