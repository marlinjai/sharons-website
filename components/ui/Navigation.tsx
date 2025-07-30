// components/ui/Navigation.tsx
'use client'

import Link from 'next/link'
import { DesktopNav } from './DesktopNav'
import { MobileNavTrigger } from './MobileNavTrigger'
import { MobileNavOverlay } from './MobileNavOverlay'

// Main navigation component that combines desktop and mobile navigation
export function Navigation() {
  return (
    <>
      {/* Main navigation header */}
      <header className="fixed top-8 left-0 right-0 z-50 flex justify-center">
        <nav className="w-full max-w-6xl bg-stone-100/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo with orange circle */}
            <Link 
              href="/" 
              className="flex items-center bg-white border-[rgb(245,124,0)] border-2 rounded-full p-2 hover:shadow-md transition-shadow duration-200"
              aria-label="Hypnotherapy Berlin - Home"
            >
              <img 
                src="/graphics/logo_return.svg" 
                alt="Hypnotherapy Berlin Logo" 
                className="h-16 w-auto" 
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Mobile Navigation Trigger */}
            <MobileNavTrigger />
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay />
    </>
  )
}