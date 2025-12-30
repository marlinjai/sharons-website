// components/ui/DesktopNav.tsx
'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from './NavigationContext';
import { NavLink } from './NavLink';
import BookSession from '../BookSession';

// Desktop navigation with dropdown menus
export function DesktopNav() {
  const { isSessionDropdownOpen, isBlogDropdownOpen, setSessionDropdownOpen, setBlogDropdownOpen, isOnHero } = useNavigation();

  // Define CSS variable classes based on context
  const navLinkBaseClass = isOnHero
    ? 'text-[--nav-link-color-hero]'
    : 'text-[--nav-link-color]';

  const navLinkHoverClass = isOnHero
    ? 'hover:text-[--nav-link-hover-color-hero]'
    : 'hover:text-[--nav-link-hover-color]';

  const dropdownLinkClass = isOnHero
    ? 'text-[--nav-link-dropdown-color-hero]'
    : 'text-[--nav-link-dropdown-color]';

  const dropdownLinkHoverClass = isOnHero
    ? 'hover:text-[--nav-link-dropdown-hover-color-hero]'
    : 'hover:text-[--nav-link-dropdown-hover-color]';

  const dropdownBgClass = isOnHero
    ? 'bg-[--nav-link-dropdown-background-color-hero]'
    : 'bg-[--nav-link-dropdown-background-color]';

  const dropdownBgHoverClass = isOnHero
    ? 'hover:bg-[--nav-link-dropdown-background-hover-color-hero]'
    : 'hover:bg-[--nav-link-dropdown-background-hover-color]';

  // Helper functions to combine classes
  const getNavLinkColor = () => {
    return `${navLinkBaseClass} ${navLinkHoverClass}`;
  };

  const getNavLinkDropdownColor = () => {
    return `${dropdownLinkClass} ${dropdownLinkHoverClass}`;
  };

  const getNavLinkDropdownBackground = () => {
    return `${dropdownBgClass} ${dropdownBgHoverClass}`;
  };

  // Dropdown animation variants
  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`hidden lg:flex items-center space-x-4 ${getNavLinkColor()} text-base lg:text-lg tracking-wider font-primary`}>
      {/* Home Link */}
      <NavLink href="/">home</NavLink>

      {/* The Session Dropdown */}
      <div
        className="relative"
        data-dropdown-id="session"
        onMouseEnter={() => setSessionDropdownOpen(true)}
        onMouseLeave={() => setSessionDropdownOpen(false)}
      >
        <div
          className={`transition-colors duration-200 flex items-center gap-1 font-primary cursor-pointer ${navLinkBaseClass} ${navLinkHoverClass}`}
          onClick={() => setSessionDropdownOpen(!isSessionDropdownOpen)}
          role="button"
          aria-expanded={isSessionDropdownOpen}
          aria-haspopup="true"
        >
          <span className={isSessionDropdownOpen ? (isOnHero ? 'text-[--nav-link-hover-color-hero]' : 'text-[--nav-link-hover-color]') : ''}>
            the session
          </span>
          <motion.svg
            className={`w-4 h-4 ml-1 ${isSessionDropdownOpen ? (isOnHero ? 'text-[--nav-link-hover-color-hero]' : 'text-[--nav-link-hover-color]') : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ rotate: isSessionDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>

        <AnimatePresence>
          {isSessionDropdownOpen && (
            <motion.div
              className="absolute left-0 top-full w-auto py-2 z-50"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="menu"
            >
              <div className={`${getNavLinkDropdownBackground()} rounded-xl shadow-lg border border-gray-100 overflow-hidden`}>
                <NavLink
                  href="#reviews"
                  variant="dropdown"
                  className={`font-primary transition-colors duration-200 ${getNavLinkDropdownColor()}`}
                  role="menuitem"
                >
                  reviews
                </NavLink>
                <NavLink
                  href="#faq"
                  variant="dropdown"
                  className={`font-primary transition-colors duration-200 ${getNavLinkDropdownColor()}`}
                  role="menuitem"
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

      {/* FAQ Link */}
      <NavLink href="#faq">FAQ</NavLink>

      {/* Blog Dropdown */}
      <div
        className="relative"
        data-dropdown-id="blog"
        onMouseEnter={() => setBlogDropdownOpen(true)}
        onMouseLeave={() => setBlogDropdownOpen(false)}
      >
        <div
          className={`transition-colors duration-200 flex items-center gap-1 font-primary cursor-pointer ${navLinkBaseClass} ${navLinkHoverClass}`}
          onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)}
          role="button"
          aria-expanded={isBlogDropdownOpen}
          aria-haspopup="true"
        >
          <span className={isBlogDropdownOpen ? (isOnHero ? 'text-[--nav-link-hover-color-hero]' : 'text-[--nav-link-hover-color]') : ''}>
            blog
          </span>
          <motion.svg
            className={`w-4 h-4 ml-1 ${isBlogDropdownOpen ? (isOnHero ? 'text-[--nav-link-hover-color-hero]' : 'text-[--nav-link-hover-color]') : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ rotate: isBlogDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>

        <AnimatePresence>
          {isBlogDropdownOpen && (
            <motion.div
              className="absolute left-0 top-full w-auto py-2 z-50"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="menu"
            >
              <div className={`${getNavLinkDropdownBackground()} rounded-xl shadow-lg border border-gray-100 overflow-hidden`}>
                <NavLink
                  href="/blog"
                  variant="dropdown"
                  className={`font-primary transition-colors duration-200 ${getNavLinkDropdownColor()}`}
                  role="menuitem"
                >
                  all posts
                </NavLink>
                <NavLink
                  href="#newsletter"
                  variant="dropdown"
                  className={`font-primary transition-colors duration-200 ${getNavLinkDropdownColor()}`}
                  role="menuitem"
                >
                  newsletter
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Let's Talk CTA Button */}
      <NavLink href="#contact" variant="cta">
        let's talk
      </NavLink>
    </div>
  );
}
