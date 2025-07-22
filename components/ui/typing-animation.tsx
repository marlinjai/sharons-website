"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function TypingAnimation({
  words,
  duration = 100,
  className,
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const typingEffect = setInterval(() => {
      if (!isDeleting) {
        // Typing effect
        if (charIndex < currentWord.length) {
          setDisplayedText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting effect
        if (charIndex > 0) {
          setDisplayedText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          // For single word, just restart the cycle
          if (words.length === 1) {
            setCurrentWordIndex(0);
          } else {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [words, currentWordIndex, charIndex, isDeleting, duration]);

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
    </span>
  );
} 