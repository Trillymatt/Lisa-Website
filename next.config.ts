import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Railway's Node deployment runs the minimal self-contained server output.
  output: "standalone",
};

export default nextConfig;
