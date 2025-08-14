'use client'

interface BlogMetadataProps {
  category: string;
  readTime: string;
  date: string;
  className?: string;
  textColor?: string;
  categoryBgColor?: string;
  categoryTextColor?: string;
}

export default function BlogMetadata({
  category,
  readTime,
  date,
  className = "justify-start",
  textColor = "text-gray-500",
  categoryBgColor = "bg-white",
  categoryTextColor = "text-[#2F2F2F]"
}: BlogMetadataProps) {
  return (
    <div className={`flex items-center gap-1 sm:gap-2 lg:gap-3 mb-6 text-xs sm:text-sm md:text-base ${className}`}>
      <span className={`flex items-center justify-center px-3 py-[6px] ${categoryBgColor} ${categoryTextColor} font-primary font-semibold uppercase tracking-wide rounded-full leading-none`}>
        <p className='translate-y-[0.09rem]'>{category}</p>
      </span>
      <span className={`font-primary ${textColor} leading-none`}>|</span>
      <span className={`font-primary ${textColor} leading-none`}>
        {readTime}
      </span>
      <span className={`font-primary ${textColor} leading-none`}>|</span>
      <span className={`font-primary ${textColor} leading-none`}>
        {date}
      </span>
    </div>
  );
}
