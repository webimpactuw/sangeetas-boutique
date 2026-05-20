/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-sanity', 'sanity', '@sanity/vision'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
