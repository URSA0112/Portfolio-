/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'streak-stats.demolab.com' },
      { protocol: 'https', hostname: 'github-readme-stats.vercel.app' },
    ],
  },
}
export default nextConfig
