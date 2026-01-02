// components/BlogPost.tsx - Blog post card component with Ken Burns effect
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogMetadata from './BlogMetadata';

// Props needed for blog post card display
interface BlogPostProps {
  id?: number;
  slug: string;
  title: string;
  image?: string | null;
  subtitle?: string;
  category: string;
  readTime: string;
  date: string;
  isDraft?: boolean;
  isAdmin?: boolean;
  onEdit?: (id: number) => void;
}

export default function BlogPost({ id, slug, title, image, subtitle, category, readTime, date, isDraft, isAdmin, onEdit }: BlogPostProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (id && onEdit) {
      onEdit(id);
    }
  };

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="rounded-lg overflow-hidden hover:shadow-lg min-h-[300px] transition-all duration-300 relative">
        {/* Admin Edit Button - appears on hover */}
        {isAdmin && onEdit && id && isHovered && (
          <button
            onClick={handleEditClick}
            className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-lg shadow-lg hover:bg-white hover:text-[#A32015] transition-all duration-200 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}

        {/* Draft Badge */}
        {isDraft && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wide rounded-full shadow-lg">
            Draft
          </div>
        )}
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 h-full">
            {image ? (
              <Image
                fill
                src={image}
                alt="Blog Post Background"
                className="absolute inset-0 w-full h-full object-cover opacity-85 scale-100 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                priority
              />
            ) : (
              <Image
                fill
                src="/images/envelope-seal-horizontal.jpg"
                alt="Blog Post Background"
                className="absolute inset-0 w-full h-full object-cover opacity-85 scale-100 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                priority
              />
            )}
            <div className="absolute inset-0 bg-[#000000]/30" />
          </div>
          <div className="relative z-10 p-8 h-full min-h-[310px] flex flex-col gap-4">
            <BlogMetadata category={category} readTime={readTime} date={date} textColor="text-gray-100" />

            <h2 className="font-secondary text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight">{title}</h2>

            {/*    <p className="font-primary text-lg text-white leading-relaxed mb-6">{subtitle}</p> */}

            <div className="inline-flex items-center gap-2 text-blog-color font-primary text-md hover:gap-3 transition-all duration-200 mt-auto pb-4">
              Read more
              <span className="text-lg">&gt;</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
