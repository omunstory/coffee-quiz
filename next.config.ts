import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/coffee-quiz',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
