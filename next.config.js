const withMDX = require('@next/mdx')()
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'standup-wiki.azureedge.net',
      },
      {
        protocol: 'https',
        hostname: "*.wikimedia.org"
      },
      {
        protocol: 'https',
        hostname: '*.oaiusercontent.com'
      }
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  // TODO: add global prefix and classname compress
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
    prependData: `@import "variables.scss";`
  }
}

module.exports = withMDX(nextConfig)
