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
        ? 'text-white hover:text-[--color-primary]'
        : 'text-gray-800 hover:text-[--color-primary]';
    }

    return isOnHero
      ? 'text-white hover:text-[--color-primary]'
      : 'text-gray-800 hover:text-[--color-primary]';
  };

  // Base styles for all variants - includes mobile tap highlight removal
  const baseStyles =
    'transition-colors duration-200 font-primary focus:outline-none -webkit-tap-highlight-color-transparent tap-highlight-transparent';

  // Variant-specific styles
  const variantStyles = {
    default: getColor(),
    dropdown: `block py-2 pr-4 text-base lg:text-lg active:text-brand-primary-light`,
    cta: 'ml-4  bg-btn-primary-bg text-btn-primary-text px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover ',
    mobile: `px-4 py-2 rounded-full text-gray-900 hover:text-[--color-primary]`,
    mobileCta: 'px-6 py-4 rounded-full tracking-normal shadow-md bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-bg-hover',
  };

  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <Link href={href} className={combinedClassName} role={role} onClick={handleClick}>
      {children}
    </Link>
  );
}
