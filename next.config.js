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
    domains: ["source.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
