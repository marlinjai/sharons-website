'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  words: string[];
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export function TypingAnimation({
  words,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const wordDuration = duration + (currentWord.length * delayMultiple);

    // Show word, then hide it and move to next
    const timer = setTimeout(() => {
      setIsVisible(false);

      // After exit animation, move to next word
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setIsVisible(true);
      }, wordDuration * 1000); // Convert to ms and wait for exit animation

    }, 2000); // Show each word for 2 seconds

    return () => clearTimeout(timer);
  }, [currentWordIndex, words, duration, delayMultiple]);

  const currentWord = words[currentWordIndex];

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        {isVisible && currentWord.split("").map((char, i) => (
          <motion.span
            key={`${currentWordIndex}-${i}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{
              duration,
              delay: i * delayMultiple,
              ease: "easeOut"
            }}
            className={cn("drop-shadow-sm inline-block", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
