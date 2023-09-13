/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    minimumCacheTTL: 60,
    domains: [
      "source.unsplash.com",
      "googleusercontent.com",
      "cdn-crm.adscrush.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
