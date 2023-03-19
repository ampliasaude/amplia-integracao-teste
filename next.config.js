/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  trailingSlash: true,
};

module.exports = nextConfig;
