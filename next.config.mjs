/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/my-portfolio",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
