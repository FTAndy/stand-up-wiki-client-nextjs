const withMDX = require('@next/mdx')()
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
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
