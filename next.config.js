/** @type {import('next').NextConfig} */
const nextConfig = {
  // dev speed improvement
  fastRefresh: true,
  concurrentFeatures: true,
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  minify: false, // Disable minification
  // dev speed improvement

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
