/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows you to continue building despite ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
