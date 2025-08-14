/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  images: {
    domains: ['images.unsplash.com', 'i.pinimg.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
