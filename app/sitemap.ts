// app/sitemap.ts - Dynamic sitemap generation for SEO
import { MetadataRoute } from 'next';
import { blogPostsData } from '@/blogPosts/BlogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://returnhypnosis.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic blog post pages (only published posts)
  const blogPages: MetadataRoute.Sitemap = blogPostsData
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...blogPages];
}

