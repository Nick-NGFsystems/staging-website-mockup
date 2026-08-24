import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — there is a stray lockfile in the
  // parent GitHub/ folder, and without this Turbopack scans every sibling repo
  // (blowing out memory during build).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'public.blob.vercel-storage.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Baseline policy. 'unsafe-inline' is required for Next's inline
            // hydration bootstrap and styled-jsx; 'unsafe-eval' is required by
            // webpack/React Refresh in `next dev`. img-src allows https: so the
            // portal editor can swap in Vercel Blob uploads. frame-ancestors is
            // what lets the NGF portal iframe this site for live preview.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://app.ngfsystems.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self' https://app.ngfsystems.com https://*.vercel.app",
            ].join('; '),
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
