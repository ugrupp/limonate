/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
