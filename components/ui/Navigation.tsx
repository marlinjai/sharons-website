// components/ui/Navigation.tsx
'use client';

import Link from 'next/link';
import { DesktopNav } from './DesktopNav';
import { MobileNavTrigger } from './MobileNavTrigger';
import { MobileNavOverlay } from './MobileNavOverlay';

// Main navigation component that combines desktop and mobile navigation
export function Navigation() {
  return (
    <>
      {/* Main navigation header */}
      <header className="fixed top-8 left-0 right-0 z-50 flex justify-center">
        <nav className="w-full bg-stone-100/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo with orange circle */}
            <Link href="/" className="group">
              <div className="bg-white border-[rgb(245,124,0)] border-2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-10 sm:h-12 lg:h-16 w-auto" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Spacer for mobile trigger button positioning */}
            <div className="md:hidden w-10 h-10" />
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Trigger - positioned as sibling outside stacking context */}
      <div className="fixed top-[60px] right-8 z-[60] md:hidden">
        <div className="bg-stone-100/50 backdrop-blur-sm rounded-full p-2">
          <MobileNavTrigger />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay />
    </>
  );
}
