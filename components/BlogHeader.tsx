// components/BlogHeader.tsx
// Reusable blog header component for both index and detail pages

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface BlogHeaderProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  backLink: {
    href: string;
    text: string;
  };
  isPostHeader?: boolean;
  postMeta?: {
    category: string;
    readTime: string;
    date: string;
  };
}

export default function BlogHeader({
  backgroundImage,
  title,
  subtitle,
  backLink,
  isPostHeader = false,
  postMeta,
}: BlogHeaderProps) {
  return (
    <div className="relative overflow-hidden lg:min-h-[520px]">
      {/* Background image and overlay */}
      <div className="absolute inset-0">
        {isPostHeader ? (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover md:translate-x-1 md:translate-y-6 scale-110"
            priority
          />
        ) : (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover md:translate-x-4 scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-[#2F2F2F]/10" />
      </div>

      {/* Header content */}
      <div className="relative py-4 lg:py-12">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Decorative blur behind content */}
            <div
              aria-hidden
              className="pointer-events-none absolute lg:left-1/2 top-0 lg:-translate-x-1/2 bg-black/40 w-[100vw] h-[100vh] lg:w-[69vw] lg:h-[54vh] blur-[160px] md:blur-[216px] z-5"
            />

            <div className="px-4 sm:px-6 lg:px-10 relative z-10">
              {/* Back link */}
              <Link
                href={backLink.href}
                className="inline-flex items-center gap-2 font-primary text-base md:text-2xl font-semibold transition-colors duration-200 mb-8 text-white hover:text-gray-200"
              >
                <FaArrowLeftLong className="size-4 md:size-6" />
              </Link>

              {/* Logo + content */}
              <div className="flex flex-col items-center gap-12 md:gap-16 justify-center -mt-[2%]">
                <Link href="/" className="group">
                  <div className="bg-white border-[rgb(245,124,0)] border-2 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-12 sm:h-16 lg:h-20 w-auto" />
                  </div>
                </Link>

                <div className="flex flex-col items-center gap-0 justify-center">
                  {/* Post meta (only for individual posts) */}
                  {isPostHeader && postMeta && (
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 mb-6 justify-center text-xs sm:text-sm md:text-base">
                      <span className="flex items-center justify-center px-3 py-[6px] bg-white text-[#2F2F2F] font-primary font-semibold uppercase tracking-wide rounded-full leading-none">
                        <p className="translate-y-[0.09rem]">{postMeta.category}</p>
                      </span>
                      <span className=" font-primary text-gray-100 leading-none">|</span>
                      <span className=" font-primary text-gray-100 leading-none">{postMeta.readTime}</span>
                      <span className=" font-primary text-gray-100 leading-none">|</span>
                      <span className=" font-primary text-gray-100 leading-none">{postMeta.date}</span>
                    </div>
                  )}

                  <h1 className="font-secondary text-xl sm:text-3xl md:text-5xl font-semibold text-white mb-5 md:mb-12 leading-tight">
                    {title}
                  </h1>

                  {subtitle && isPostHeader ? (
                    <p className="font-primary text-lg md:text-xl mb-6 italic" style={{ color: '#E9AAA4' }}>
                      {subtitle}
                    </p>
                  ) : (
                    <p className="font-primary text-lg md:text-xl mb-6 italic" style={{ color: '#E9C9C6' }}>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
