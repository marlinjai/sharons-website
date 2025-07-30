// components/ui/MobileNavTrigger.tsx
'use client'

import { motion } from 'framer-motion'
import { useNavigation } from './NavigationContext'

// Mobile navigation trigger button with animated hamburger/close transformation
export function MobileNavTrigger() {
  const { isMobileMenuOpen, toggleMobileMenu } = useNavigation()

  return (
    <button
      onClick={toggleMobileMenu}
      className="md:hidden p-2 rounded-full text-black hover:bg-white/10 transition-colors duration-200 z-50 relative"
      title={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isMobileMenuOpen}
    >
      <div className="w-6 h-6 relative">
        {/* Top line */}
        <motion.span
          className="absolute left-0 h-0.5 w-6 bg-current transform origin-center"
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 0 : -8,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ top: '50%' }}
        />
        
        {/* Middle line */}
        <motion.span
          className="absolute left-0 top-1/2 h-0.5 w-6 bg-current transform -translate-y-1/2"
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
            x: isMobileMenuOpen ? 20 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        
        {/* Bottom line */}
        <motion.span
          className="absolute left-0 h-0.5 w-6 bg-current transform origin-center"
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? 0 : 8,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ top: '50%' }}
        />
      </div>
    </button>
  )
}