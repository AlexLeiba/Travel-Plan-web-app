import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'res.cloudinary.com',
      'picsum.photos',
      'cdn.jsdelivr.net',
      'a.tile.openstreetmap.org',
      'b.tile.openstreetmap.org',
      'c.tile.openstreetmap.org',
    ], //if the images comes from external source to allow (specify the domain allowed here)
  },

  async headers() {
    return [
      {
        // Apply this header to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://accounts.google.com https://apis.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com ;
              img-src 'self' data: blob: https:  https://cdn.jsdelivr.net https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org;
              connect-src 'self' https://cdn.jsdelivr.net https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org;
              object-src 'none';
              frame-ancestors 'none';
              base-uri 'none';
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          {
            key: 'Cross-Origin-Opener-Policy', //isolates your page from cross-origin interactions (recommended)
            value: 'same-origin-allow-popups', // or 'Like same-origin but allows popups to work (e.g., OAuth flows)'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', //Prevents MIME-type sniffing. Stops browsers from interpreting files as something else (a classic XSS vector).
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', //Controls what referrer information is sent with requests. Limits sensitive data leakage from URLs.
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', //Prevents clickjacking attacks. Prevents attackers from embedding a page in a frame on another domain.
          },

          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' }, // or remove it entirely
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', //Limits browser features like camera, microphone, geolocation — reducing attack surface.
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
