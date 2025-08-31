// components/BlogPost.tsx - Blog post card component with Ken Burns effect
import Link from 'next/link';
import Image from 'next/image';
import BlogMetadata from './BlogMetadata';
import { BlogPostType } from '@/blogPosts/BlogData';

export default function BlogPost({ slug, title, image, subtitle, category, readTime, date }: BlogPostType) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="rounded-lg overflow-hidden hover:shadow-lg min-h-[300px] transition-all duration-300">
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
