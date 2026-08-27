/** @type {import('next').NextConfig} */

// Fast Refresh / Turbopack use eval() in development only. Production ships no
// eval, so 'unsafe-eval' is scoped to dev instead of shipped to every visitor.
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' stays: a fully static App Router site injects inline
  // bootstrap/style with no nonce available (nonces require dynamic rendering).
  // 'unsafe-eval' is dev-only. Vercel Analytics loads from va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com https://static.cloudflareinsights.com`,
  // Fonts are self-hosted by next/font at build time, so no request ever reaches
  // Google, so fonts.googleapis.com / fonts.gstatic.com are removed.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: data:",
  // Vercel Analytics beacons to same-origin /_vercel/insights. In dev, Turbopack
  // Fast Refresh needs its websocket, so ws: is allowed only there.
  `connect-src 'self' https://va.vercel-scripts.com https://api.web3forms.com${isDev ? ' ws:' : ''}`,
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jontaworld.com' }],
        destination: 'https://jontaworld.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'jontaworld.vercel.app' }],
        destination: 'https://jontaworld.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'josiah-rawsignal.vercel.app' }],
        destination: 'https://jontaworld.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  poweredByHeader: false,
};

export default nextConfig;

