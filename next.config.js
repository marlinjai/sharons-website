/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  images: {
    domains: ['images.unsplash.com', 'i.pinimg.com'],
    unoptimized: true,
  },
  // Remove allowedDevOrigins - it might be blocking network access
};

module.exports = nextConfig;
