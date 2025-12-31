// components/ui/Navigation.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNavTrigger } from './MobileNavTrigger';
import { MobileNavOverlay } from './MobileNavOverlay';
import { useNavigation } from './NavigationContext';
import { NavLink } from './NavLink';
import { NavBlobShape } from './NavBlobShape';

// Main navigation with morphing pill - dropdown appears as separate bubble beneath trigger
export function Navigation() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {
    isSessionDropdownOpen,
    isBlogDropdownOpen,
    setSessionDropdownOpen,
    setBlogDropdownOpen,
    isOnHero
  } = useNavigation();

  // Refs for measuring trigger positions
  const sessionRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Track which dropdown is active and its position
  const [activeDropdown, setActiveDropdown] = useState<'session' | 'blog' | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, width: 120 });

  // Sync state with context
  useEffect(() => {
    if (isSessionDropdownOpen) {
      setActiveDropdown('session');
    } else if (isBlogDropdownOpen) {
      setActiveDropdown('blog');
    } else {
      setActiveDropdown(null);
    }
  }, [isSessionDropdownOpen, isBlogDropdownOpen]);

  // Calculate dropdown position when active
  useEffect(() => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();

    if (activeDropdown === 'session' && sessionRef.current) {
      const rect = sessionRef.current.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left - navRect.left,
        width: rect.width,
      });
    } else if (activeDropdown === 'blog' && blogRef.current) {
      const rect = blogRef.current.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left - navRect.left,
        width: rect.width,
      });
    }
  }, [activeDropdown]);

  // Keep dropdown open while moving pointer between trigger and dropdown.
  // This prevents flicker / re-trigger loops during the morph animation.
  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setSessionDropdownOpen(false);
      setBlogDropdownOpen(false);
    }, 120);
  };

  const openDropdown = (which: 'session' | 'blog') => {
    clearCloseTimer();
    if (which === 'session') {
      setBlogDropdownOpen(false);
      setSessionDropdownOpen(true);
      return;
    }
    setSessionDropdownOpen(false);
    setBlogDropdownOpen(true);
  };

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 2) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);

  // Nav link styling based on hero state
  const navLinkBaseClass = isOnHero ? 'text-white' : 'text-gray-800';
  const navLinkHoverClass = 'hover:text-[--color-primary]';
  const getNavLinkColor = () => `${navLinkBaseClass} ${navLinkHoverClass}`;
  const getNavLinkDropdownColor = () => 'text-[--nav-link-dropdown-color] hover:text-[--nav-link-dropdown-hover-color]';

  const hasActiveDropdown = activeDropdown !== null;
  const centerX = dropdownPosition.left + dropdownPosition.width / 2;
  // Dropdown content is always 2 links right now. Keep this fixed to avoid measuring loops.
  const dropdownHeight = activeDropdown === 'session' ? 46 : activeDropdown === 'blog' ? 92 : 0;

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-8' : '-translate-y-full'}`}
      >
        <nav
          ref={navRef}
          className="relative w-[--mobile-content-max-width] sm:w-[--content-max-width] mx-auto"
          onMouseLeave={scheduleClose}
        >
          {/* Single morphing shape - navbar + dropdown as one surface */}
          {/* IMPORTANT: background layer must be absolute so it doesn't push layout and cause ResizeObserver loops */}
          {/* Hidden on mobile (below lg) where hamburger menu is shown */}
          <div className="absolute inset-x-0 top-0 z-0 pointer-events-none hidden lg:block">
            <NavBlobShape
              isOpen={hasActiveDropdown}
              dropdownHeight={dropdownHeight}
              centerX={centerX}
              extensionWidth={dropdownPosition.width}
              isOnHero={isOnHero}
            >
            </NavBlobShape>
          </div>

          {/* Dropdown content sits in the same coordinate system, but doesn't affect layout */}
          {/* Hidden on mobile (below lg) where hamburger menu is shown */}
          <div className="absolute inset-x-0 top-[56px] z-10 hidden lg:block">
            <AnimatePresence>
              {hasActiveDropdown && (
                <motion.div
                  className="pt-8 pb-4"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    paddingLeft: `${dropdownPosition.left}px`,
                    paddingRight: '32px',
                    minHeight: `${dropdownHeight + 32}px`, // Ensure hover area matches blob height
                  }}
                >
                  {/* Session dropdown content */}
                  {activeDropdown === 'session' && (
                    <motion.div
                      className="flex flex-col items-start gap-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <NavLink
                        href="#reviews"
                        variant="dropdown"
                        className={`font-primary transition-colors duration-200 ${isOnHero ? 'text-white hover:text-[--color-primary]' : 'text-gray-800 hover:text-[--color-primary]'}`}
                      >
                        Reviews
                      </NavLink>

                    </motion.div>
                  )}

                  {/* Blog dropdown content */}
                  {activeDropdown === 'blog' && (
                    <motion.div
                      className="flex flex-col items-start gap-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <NavLink
                        href="/blog"
                        variant="dropdown"
                        className={`font-primary transition-colors duration-200 ${isOnHero ? 'text-white hover:text-[--color-primary]' : 'text-gray-800 hover:text-[--color-primary]'}`}
                      >
                        All Posts
                      </NavLink>
                      <NavLink
                        href="#newsletter"
                        variant="dropdown"
                        className={`font-primary transition-colors duration-200 ${isOnHero ? 'text-white hover:text-[--color-primary]' : 'text-gray-800 hover:text-[--color-primary]'}`}
                      >
                        Newsletter
                      </NavLink>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile-only simple pill background (no morphing) - matches NavBlobShape exactly */}
          <div
            className={`absolute inset-x-0 top-0 h-[104px] rounded-full lg:hidden pointer-events-none ${isOnHero
              ? 'bg-[rgba(255,255,255,0.35)] border-[1.5px] border-[rgba(255,255,255,0.5)]'
              : 'bg-[rgba(255,255,255,0.75)] border-[1.5px] border-[rgba(255,255,255,0.6)]'
              }`}
          />

          {/* Content layer - nav items on top of the glass */}
          <div className="relative z-10 px-4 lg:px-6 h-[104px] flex items-center">
            <div className="flex justify-between items-center w-full">
              {/* Logo - positioned to align with main content */}
              <Link href="/" className="group">
                <div className="bg-white border-[rgb(245,124,0)] border-2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-10 sm:h-12 lg:h-[3.5rem] w-auto" />
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className={`hidden lg:flex items-center space-x-4 ${getNavLinkColor()} text-base lg:text-lg tracking-wider font-primary`}>
                <NavLink href="/">Home</NavLink>

                {/* The Session Dropdown Trigger */}
                <div
                  ref={sessionRef}
                  className="relative"
                  onMouseEnter={() => openDropdown('session')}
                >
                  <Link
                    href="#session"
                    className={`transition-colors duration-200 flex items-center gap-1 font-primary cursor-pointer ${navLinkBaseClass} ${navLinkHoverClass}`}
                    aria-expanded={isSessionDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className={isSessionDropdownOpen ? 'text-[--color-primary]' : ''}>
                      The Session
                    </span>
                    <motion.svg
                      className={`w-4 h-4 ml-1 ${isSessionDropdownOpen ? 'text-[--color-primary]' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      animate={{ rotate: isSessionDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </Link>
                </div>

                <NavLink href="#about">About</NavLink>
                <NavLink href="#faq">FAQ</NavLink>

                {/* Blog Dropdown Trigger */}
                <div
                  ref={blogRef}
                  className="relative"
                  onMouseEnter={() => openDropdown('blog')}
                >
                  <Link
                    href="/blog"
                    className={`transition-colors duration-200 flex items-center gap-1 font-primary cursor-pointer ${navLinkBaseClass} ${navLinkHoverClass}`}
                    aria-expanded={isBlogDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className={isBlogDropdownOpen ? 'text-[--color-primary]' : ''}>
                      Blog
                    </span>
                    <motion.svg
                      className={`w-4 h-4 ml-1 ${isBlogDropdownOpen ? 'text-[--color-primary]' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      animate={{ rotate: isBlogDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </Link>
                </div>

                <NavLink href="#contact" variant="cta">Let's Talk</NavLink>
              </div>

              {/* Mobile Navigation Trigger */}
              <div className="lg:hidden">
                <div className="glassmorphism rounded-full p-2">
                  <MobileNavTrigger />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileNavOverlay />
    </>
  );
}
