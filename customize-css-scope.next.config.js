const withMDX = require('@next/mdx')()
const path = require('path');
const { createHash } = require('node:crypto');

const isProd = process.env.NODE_ENV === 'production'

const getHash = (source, length) =>
    createHash('shake256', { outputLength: length }).update(source).digest('hex');

const regexEqual = (x, y) =>
  x instanceof RegExp &&
  y instanceof RegExp &&
  x.source === y.source &&
  x.global === y.global &&
  x.ignoreCase === y.ignoreCase &&
  x.multiline === y.multiline;

function cssLoaderOptions(modules) {
  const { getLocalIdent, ...others } = modules;
  console.log(getLocalIdent, 'getLocalIdent')
  return {
    getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
      const { name } = path.parse(resourcePath);
      console.log(resourcePath, 'resourcePath')
      const moduleName = name
          .replace(/\.module/g, '')
          .replace(/\./g, '-');
      return dev
          ? `${moduleName}--${localName}--${getHash(resourcePath, 2)}`
          : `_${getHash(`${resourcePath}${localName}`, 4)}`;
    },
    ...others,
  };
}

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')

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
        hostname: "upload.wikimedia.org"
      },
      {
        protocol: 'https',
        hostname: '*.oaiusercontent.com'
      }
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/app/styles'),
    ],
    prependData: `@import "variables.scss";`,
    // modules: {
    //   localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]--[hash:base64:5]',
    // }
  },

  webpack: (config, { dev }) => {
    // https://github.com/vercel/next.js/discussions/15818
    let rule, moduleRules, cssLoader;
    if ((rule = config.module.rules.find((rule) => Object.keys(rule).includes('oneOf')))) {
        if (
            (moduleRules = rule.oneOf.filter(
                (r) =>
                    ('test.module.scss'.match(r.test) || 'test.module.css'.match(r.test)) &&
                    Array.isArray(r.use),
            ))
        ) {
            for (const moduleRule of moduleRules) {
                if ((cssLoader = moduleRule.use.find((u) => u.loader.match('/css-loader')))) {
                    delete cssLoader.options.modules.getLocalIdent;
                    cssLoader.options = {
                        ...cssLoader.options,
                        modules: {
                            ...cssLoader.options.modules,
                            getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
                                const { name } = path.parse(resourcePath);
                                const moduleName = name
                                    .replace(/\.module/g, '')
                                    .replace(/\./g, '-');
                                return dev
                                    ? `${moduleName}--${localName}--${getHash(resourcePath, 2)}`
                                    : `_${getHash(`${resourcePath}${localName}`, 4)}`;
                            },
                        },
                    };
                }
            }
        }
    }
    return config;
  },
}

module.exports = withMDX(nextConfig)
