"use client";

/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface BookSessionProps {
  variant?: 'hero' | 'contact' | 'nav';
  className?: string;
}

export default function BookSession({ variant = 'hero', className }: BookSessionProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '5-hrs' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#c5441e',
            'cal-bg-emphasis': '#fcd8b3',
            'cal-brand-text': '#ffffff',
            'cal-bg': '#ffffff',
            'cal-bg-muted': '#f8f7f4',
            'cal-text': '#374151',
            'cal-text-emphasis': '#944923',
            'border-radius': '0px',
          },
          dark: {},
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  // Button styles based on Hero and Contact sections
  const getButtonStyles = () => {
    if (variant === 'contact') {
      // Orange background with white text (like Contact section)
      return 'inline-block bg-[#C5441E] text-white px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)] hover:text-white text-lg md:text-lg 2xl:text-2xl';
    } else if (variant === 'nav') {
      // Orange background with white text (like Contact section)
      return 'inline-block bg-[#C5441E] text-white px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)] hover:text-whitetext-lg md:text-lg';
    } else {
      // White background with black text (like Hero section)
      return 'inline-block bg-white text-black px-6 py-3 rounded-full text-lg shadow-lg transition-colors duration-200 hover:bg-[rgb(245,124,0)] hover:text-white';
    }
  };

  return (
    <button
      data-cal-namespace="5-hrs"
      data-cal-link="sharondisalvo/5-hrs"
      data-cal-config='{"layout":"month_view", "theme":"light"}'
      className={`${getButtonStyles()} ${className || ''} `}
    >
      {variant === 'nav' ? 'Let\'s Talk' : 'Book a Session'}
    </button>
  );
}
