/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    appId: process.env.APP_ID,
    host: process.env.HOST,
    backendUrl: process.env.BACKEND_URL
  }
}

module.exports = nextConfig
