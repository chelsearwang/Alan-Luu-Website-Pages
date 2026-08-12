/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Alan-Luu-Website-Pages', // must match your repo name exactly
  images: { unoptimized: true },       // required for static export
}

module.exports = nextConfig