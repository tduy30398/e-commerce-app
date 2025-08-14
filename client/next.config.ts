import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/**')],
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
  devIndicators: false,
};

export default nextConfig;
