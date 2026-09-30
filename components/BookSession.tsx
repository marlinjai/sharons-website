"use client";

// Opens the demo booking calendar (no connection to Cal.com)
import { useState } from 'react';
import DemoBookingModal from './DemoBookingModal';

interface BookSessionProps {
  variant?: 'hero' | 'contact' | 'nav';
  className?: string;
}

export default function BookSession({ variant = 'hero', className }: BookSessionProps) {
  const [open, setOpen] = useState(false);

  // Button styles based on Hero and Contact sections
  const getButtonStyles = () => {
    if (variant === 'contact') {
      // Burgundy background with white text (like Contact section)
      return 'inline-block bg-btn-primary-bg text-btn-primary-text px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover text-lg md:text-lg 2xl:text-2xl';
    } else if (variant === 'nav') {
      // Burgundy background with off-white text (like nav section)
      return 'inline-block bg-btn-primary-bg text-brand-off-black px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover text-lg md:text-lg';
    } else {
      // Hero variant: White background with dark text, primary color on hover
      return 'inline-block bg-brand-off-black text-text-dark px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg hover:text-btn-primary-text-hover';
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={`${getButtonStyles()} ${className || ''} `}>
        {variant === 'nav' ? 'Let\'s Talk' : 'Demo: Book a Session'}
      </button>
      {open && <DemoBookingModal onClose={() => setOpen(false)} />}
    </>
  );
}
