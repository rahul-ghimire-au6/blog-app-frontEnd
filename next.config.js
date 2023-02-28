/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  env: {
    // declare here all your variables
    baseUrl: process.env.baseUrl,
  }
}

module.exports = nextConfig
