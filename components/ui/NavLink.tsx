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
    dropdown: `block px-4 py-2 active:text-[#e15023]`,
    cta: 'ml-4 bg-[#c5441f] text-white px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[#e15023] hover:text-white active:bg-[#e15023] active:text-white',
    mobile: `text-[var(--nav-link-color)] px-4 py-2 rounded-full hover:text-[var(--nav-link-hover-color)]`,
    mobileCta: 'px-6 py-4 rounded-full tracking-normal shadow-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] active:bg-[#e15023]',
  };

  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <Link href={href} className={combinedClassName} role={role} onClick={handleClick}>
      {children}
    </Link>
  );
}
