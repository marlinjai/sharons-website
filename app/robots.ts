// app/robots.ts - Robots.txt configuration for SEO
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://returnhypnosis.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test-newsletter/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

