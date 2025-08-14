'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextEffectProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function TextEffect({ words, className, duration = 2000 }: TextEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300); // Exit animation duration
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span
      className={cn(
        'inline-block transition-all duration-300',
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2',
        className
      )}
    >
      {words[currentWordIndex]}
    </span>
  );
}
