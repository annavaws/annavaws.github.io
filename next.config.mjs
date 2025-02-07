/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/my-portfolio",
  // assetPrefix: "/my-portfolio",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
