import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://res.cloudinary.com/**'),
      new URL('https://lh3.googleusercontent.com/**'),
      new URL('https://platform-lookaside.fbsbx.com/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
  devIndicators: false,
};

export default nextConfig;
