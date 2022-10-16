/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'd1.awsstatic.com'],
  },
}

module.exports = nextConfig
