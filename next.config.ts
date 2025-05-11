import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: true,
    serverActions: {
      bodySizeLimit: '2mb',
    }
  },
};

export default nextConfig;
