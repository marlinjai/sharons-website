// components/ui/Accordion.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Accordion item interface
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  titleColor?: string;
  arrowColor?: string;
}

// Individual accordion item component
export function AccordionItem({ title, children, defaultOpen = false, titleColor = 'text-gray-900', arrowColor = 'text-gray-600' }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-0 flex justify-between items-center text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className={`font-secondary font-semibold text-lg ${titleColor}`}>{title}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className={arrowColor}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main accordion container
interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className = '' }: AccordionProps) {
  return <div className={`divide-y divide-gray-200 ${className}`}>{children}</div>;
}
