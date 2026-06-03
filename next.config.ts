import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Optimisation images : AVIF puis WebP automatique
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // Headers HTTP de sécurité sur toutes les pages
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Empêche l'inclusion dans une iframe (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Empêche le sniffing MIME
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer limité — protège les URLs avec paramètres sensibles
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Désactive les APIs inutiles
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js requiert unsafe-inline pour les styles inline générés
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
              "img-src 'self' data: blob:",
              // API backend — localhost en dev, domaine prod en prod
              "connect-src 'self' http://localhost:8080 https://api.eduboost.tg https://www.eduboost.tg",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
