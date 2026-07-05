/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vie-rase-backend.onrender.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/AboutUs", permanent: true },
      { source: "/contact-support", destination: "/ContactUs", permanent: true },
      { source: "/help", destination: "/ContactUs", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
