import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['https://res.cloudinary.com', 'picsum.photos'], //if the images comes from external source to allow (specify the domain allowed here)
  },
};

export default nextConfig;
