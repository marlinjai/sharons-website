// components/Header.tsx
'use client';

import { NavigationProvider, OverlayAnimationType } from './ui/NavigationContext';
import { Navigation } from './ui/Navigation';

// Header component props
interface HeaderProps {
  overlayAnimation?: OverlayAnimationType;
}

// Main header component using the new modular navigation system
export default function Header({ overlayAnimation = 'fade' }: HeaderProps) {
  return (
    <NavigationProvider overlayAnimation={overlayAnimation}>
      <Navigation />
    </NavigationProvider>
  );
}
