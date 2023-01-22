/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  pageExtensions: ['html', 'jsx', 'js', 'tsx', 'ts'],
};

module.exports = nextConfig;
