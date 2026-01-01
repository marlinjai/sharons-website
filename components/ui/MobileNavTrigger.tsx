// components/ui/MobileNavTrigger.tsx
'use client';

import { motion } from 'framer-motion';
import { useNavigation } from './NavigationContext';

// Mobile navigation trigger button with animated hamburger/close transformation
export function MobileNavTrigger() {
  const { isMobileMenuOpen, toggleMobileMenu, isOnHero } = useNavigation();

  return (
    <button
      onClick={toggleMobileMenu}
      className={`p-3 rounded-full transition-colors duration-200 relative ${isOnHero ? 'text-white' : 'text-black'}`}
      title={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isMobileMenuOpen}
    >
      <div className="w-6 h-6 sm:w-6 sm:h-6 relative">
        {/* Top line */}
        <motion.span
          className="absolute left-0 h-0.5 w-full bg-current transform origin-center"
          initial={{
            rotate: 0,
            y: -8,
          }}
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 0 : -8,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ top: '50%' }}
        />

        {/* Middle line */}
        <motion.span
          className="absolute left-0 top-1/2 h-0.5 w-full bg-current transform -translate-y-1/2"
          initial={{
            opacity: 1,
            x: 0,
          }}
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
            x: isMobileMenuOpen ? 20 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />

        {/* Bottom line */}
        <motion.span
          className="absolute left-0 h-0.5 w-full bg-current transform origin-center"
          initial={{
            rotate: 0,
            y: 8,
          }}
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? 0 : 8,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ top: '50%' }}
        />
      </div>
    </button>
  );
}
