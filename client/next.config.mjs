/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      // Important: return the modified config
      return config
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  }

  export default nextConfig;