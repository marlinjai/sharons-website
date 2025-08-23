// components/ui/NavLink.tsx'use client';

import Link from 'next/link';
import { useNavigation } from './NavigationContext';

// NavLink component props
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  role?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'cta' | 'mobile' | 'mobileCta' | 'dropdown';
}

// Reusable navigation link component with context-aware styling
export function NavLink({ href, children, className = '', onClick, variant = 'default', role = 'link' }: NavLinkProps) {
  const { isOnHero, closeMobileMenu, closeAllDropdowns } = useNavigation();

  // Handle link click - close menus and call custom onClick
  const handleClick = () => {
    closeMobileMenu();
    closeAllDropdowns();
    onClick?.();
  };

  // Get hover color based on hero section and variant
  const getColor = () => {
    if (variant === 'dropdown') {
      return isOnHero
        ? 'text-[--nav-link-dropdown-color-hero] hover:text-[--nav-link-dropdown-hover-color-hero]'
        : 'text-[--nav-link-dropdown-color] hover:text-[--nav-link-dropdown-hover-color]';
    }

    return isOnHero
      ? 'text-[--nav-link-color-hero] hover:text-[--nav-link-hover-color-hero]'
      : 'text-[--nav-link-color] hover:text-[--nav-link-hover-color]';
  };

  // Base styles for all variants - includes mobile tap highlight removal
  const baseStyles =
    'transition-colors duration-200 font-primary focus:outline-none -webkit-tap-highlight-color-transparent tap-highlight-transparent';

  // Variant-specific styles
  const variantStyles = {
    default: getColor(),
    dropdown: `block px-4 py-2`,
    cta: 'ml-4 px-6 py-2 rounded-full tracking-normal text-lg bg-white text-black shadow-md hover:bg-[rgb(245,124,0)] hover:text-white',
    mobile: `text-black px-4 py-2 rounded-full`,
    mobileCta: 'px-6 py-4 rounded-full tracking-normal shadow-md bg-[rgb(245,124,0)] text-white',
  };

  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <Link href={href} className={combinedClassName} role={role} onClick={handleClick}>
      {children}
    </Link>
  );
}
