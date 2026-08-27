import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.neon.tech' },
      { protocol: 'https', hostname: 'drive7.com' },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
