const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('next/constants')

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@ducanh2912/next-pwa'],
          as: '*.js',
        },
      },
    },
  },
  reactStrictMode: true,
  // experimental: {
  //   turbo: {
  //     rules: {
  //       '*.svg': {
  //         loaders: ['@ducanh2912/next-pwa'],
  //         as: '*.js',
  //       },
  //     },
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'wsgso.000webhostapp.com',
      },
      {
        protocol: 'http',
        hostname: 'wsgso.localhost',
      },
      {
        protocol: 'http',
        hostname: '192.168.100.50',
      },
    ],
  },
}

module.exports = (phase) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    customWorkerSrc: 'service-worker',
    disable: false,
    // disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNavigation: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,

    swcMinify: true,
    workboxOptions: {
      disableDevLogs: true,
    },
  })
  return withPWA(nextConfig)
  // }
  // return nextConfig
}
