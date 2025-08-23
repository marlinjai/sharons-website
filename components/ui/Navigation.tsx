// components/ui/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DesktopNav } from './DesktopNav';
import { MobileNavTrigger } from './MobileNavTrigger';
import { MobileNavOverlay } from './MobileNavOverlay';

// Main navigation component that combines desktop and mobile navigation
export function Navigation() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide header at the very top of the page
      if (currentScrollY < 2) {
        setIsHeaderVisible(true);
      } else {
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false); // Scrolling down
        } else {
          setIsHeaderVisible(true); // Scrolling up
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
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

  return (
    <>
      {/* Main navigation header */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-8' : '-translate-y-full'
          }`}
      >
        {/* Logo */}
        <nav className="w-[--mobile-content-max-width] sm:w-[--content-max-width] mx-auto px-[--content-padding] bg-stone-100/50 backdrop-blur-sm rounded-full py-3 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo with orange circle */}
            <Link href="/" className="group">
              <div className="bg-white border-[rgb(245,124,0)] border-2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-10 sm:h-12 lg:h-[3.5rem] w-auto" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Spacer for mobile trigger button positioning */}
            <div className="lg:hidden w-10 h-10" />
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Trigger - positioned as sibling outside stacking context */}
      <div
        className={`fixed right-10 sm:right-32 md:right-40 z-[60] lg:hidden transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-[54px]' : '-translate-y-full'
          }`}
      >
        <div className="bg-stone-100/50 backdrop-blur-sm rounded-full p-2">
          <MobileNavTrigger />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay />
    </>
  );
}
