/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    additionalData: `@import "@/styles/main.scss";`,
  },
};

module.exports = nextConfig;
