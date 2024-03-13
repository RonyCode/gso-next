const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('next/constants')

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public',
      disable: false,
      // disable: process.env.NODE_ENV === 'development',
      cacheOnFrontEndNavigation: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      serviceWorker: true,
      workboxOptions: {
        disableDevLogs: true,
      },
    })
    return withPWA(nextConfig)
  }
  return nextConfig
}
