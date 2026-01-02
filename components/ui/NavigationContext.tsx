// components/ui/NavigationContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Animation types for mobile overlay
export type OverlayAnimationType = 'radial' | 'fade';

// Navigation state interface
interface NavigationState {
  isMobileMenuOpen: boolean;
  isSessionDropdownOpen: boolean;
  isBlogDropdownOpen: boolean;
  isOnHero: boolean;
  overlayAnimation: OverlayAnimationType;
}

// Navigation actions interface
interface NavigationActions {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setSessionDropdownOpen: (open: boolean) => void;
  setBlogDropdownOpen: (open: boolean) => void;
  closeAllDropdowns: () => void;
}

// Combined context interface
interface NavigationContextType extends NavigationState, NavigationActions { }

// Create context with undefined default (will throw if used outside provider)
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Navigation provider props
interface NavigationProviderProps {
  children: ReactNode;
  overlayAnimation?: OverlayAnimationType;
}

// Navigation provider component
export function NavigationProvider({ children, overlayAnimation = 'radial' }: NavigationProviderProps) {
  // Navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  // Hero section detection based on scroll position
  // Accounts for nav link position from top of viewport for accurate color switching
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero is full viewport height

      // Nav links are approximately 60-80px from top of viewport
      // Add offset so color switches when nav text actually exits the hero
      const navBottomOffset = 80; // Distance from top to bottom of nav links

      // Switch colors when the bottom of nav links exits the hero section
      const isOnHeroSection = scrollY + navBottomOffset < heroHeight;
      setIsOnHero(isOnHeroSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route changes (Next.js router events)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsSessionDropdownOpen(false);
      setIsBlogDropdownOpen(false);
    };

    // Listen for browser navigation (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      // Prevent scrolling on html element (for iOS Safari)
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSessionDropdownOpen(false);
        setIsBlogDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isSessionDropdownOpen || isBlogDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isSessionDropdownOpen, isBlogDropdownOpen]);

  // Navigation actions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      // Apply scroll lock immediately when opening
      if (newState) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
      return newState;
    });
  };

  const closeMobileMenu = () => {
    // Restore scrolling immediately when closing
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setIsMobileMenuOpen(false);
  };
  const closeAllDropdowns = () => {
    setIsSessionDropdownOpen(false);
    setIsBlogDropdownOpen(false);
  };

  // Context value
  const value: NavigationContextType = {
    // State
    isMobileMenuOpen,
    isSessionDropdownOpen,
    isBlogDropdownOpen,
    isOnHero,
    overlayAnimation,
    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    setSessionDropdownOpen: setIsSessionDropdownOpen,
    setBlogDropdownOpen: setIsBlogDropdownOpen,
    closeAllDropdowns,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

// Custom hook to use navigation context
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
