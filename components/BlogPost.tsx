import Link from 'next/link';
import Image from 'next/image';
import BlogMetadata from './BlogMetadata';
import { BlogPostType } from '@/blogPosts/BlogData';


export default function BlogPost({
  slug,
  title,
  image,
  subtitle,
  category,
  readTime,
  date,
}: BlogPostType) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-0">
            {image ? (
              <Image
                fill
                src={image}
                alt="Blog Post Background"
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
            ) : (
              <Image
                fill
                src="/images/envelope-seal-horizontal.jpg"
                alt="Blog Post Background"
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-[#000000]/30" />
          </div>
          <div className="relative z-10 p-8">
            <BlogMetadata
              category={category}
              readTime={readTime}
              date={date}
              textColor="text-gray-100"
            />

            <h2 className="font-secondary text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight">
              {title}
            </h2>

            <p className="font-primary text-lg text-white leading-relaxed mb-6">
              {subtitle}
            </p>

            <div className="inline-flex items-center gap-2 text-[#E9AAA4] font-primary text-base font-semibold hover:gap-3 transition-all duration-200">
              Read more
              <span className="text-lg">&gt;</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
