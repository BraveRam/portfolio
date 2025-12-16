import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "blogs.lencho.dev",
          },
        ],
        destination: "/blogs/:path*",
      },
    ];
  },
};

export default nextConfig;
