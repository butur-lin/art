import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gallery.pl.ua',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;