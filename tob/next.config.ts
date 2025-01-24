import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  env: {
    graphql: 'http://localhost:12000/graphql',
  },
}

export default nextConfig;
