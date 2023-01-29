/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BACKEND_HOST": process.env.BACKEND_HOST
  }
}


module.exports = nextConfig
