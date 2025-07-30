// components/Header.tsx
'use client'

import { NavigationProvider } from './ui/NavigationContext'
import { Navigation } from './ui/Navigation'

// Main header component using the new modular navigation system
export default function Header() {
  return (
    <NavigationProvider>
      <Navigation />
    </NavigationProvider>
  )
}
