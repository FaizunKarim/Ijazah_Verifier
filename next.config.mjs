/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    PASSKEY: process.env.PASSKEY,
  },
};

export default nextConfig;
