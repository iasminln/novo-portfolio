import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/lb',
        destination: 'https://iasmin.dev/?utm_source=linkedin&utm_medium=social?utm_content=botao_contato',
        permanent: false,
      },
      {
        source: '/ld',
        destination: 'https://iasmin.dev/?utm_source=linkedin&utm_medium=social?utm_content=descricao_linkedin',
        permanent: false,
      },
      {
        source: '/is',
        destination: 'https://iasmin.dev/?utm_source=instagram&utm_medium=social',
        permanent: false,
      },
      {
        source: '/bv',
        destination: 'https://iasmin.dev/?utm_source=brevly&utm_medium=project',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
