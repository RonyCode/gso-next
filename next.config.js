/* global require */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.designi.com.br',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dpobjetivo.com.br',
      },
      {
        protocol: 'https',
        hostname: 'apexpublicschool.com',
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
    // disable: false,
    disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNavigation: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,

    swcMinify: true,
    workboxOptions: {
      disableDevLogs: true,
    },
  })
  return withPWA(nextConfig)
}
