/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "@/styles/main.scss";`,
  },
};

module.exports = nextConfig;
