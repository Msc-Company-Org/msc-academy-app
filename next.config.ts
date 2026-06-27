import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  // next/image serve avif/webp on-the-fly (fontes em jpg ficam menores na entrega)
  images: { formats: ["image/avif", "image/webp"] },
  // HSTS global (os demais headers de segurança vêm do proxy.ts)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
