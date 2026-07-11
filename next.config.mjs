/** @type {import('next').NextConfig} */
const API_ORIGIN = "https://vie-rase-backend.onrender.com";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
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
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/AboutUs", destination: "/about", permanent: true },
      { source: "/vbe.rase/home", destination: "/vbe", permanent: true },
      { source: "/vbe.rase/Vbe", destination: "/vbe", permanent: true },
      { source: "/vbh.rase/home", destination: "/vbh", permanent: true },
      { source: "/vbh.rase/Vbh", destination: "/vbh", permanent: true },
      { source: "/vie.rase/home", destination: "/vie", permanent: true },
      { source: "/vie.rase/Vie", destination: "/vie", permanent: true },
      {
        source: "/vie.rase/issues",
        destination: "/vie.rase/table",
        permanent: true,
      },
      { source: "/vih.rase/home", destination: "/vih", permanent: true },
      { source: "/vih.rase/Vih", destination: "/vih", permanent: true },
      { source: "/contact", destination: "/ContactUs", permanent: true },
      { source: "/contact-support", destination: "/ContactUs", permanent: true },
      { source: "/help", destination: "/ContactUs", permanent: true },
      {
        source: "/Role%20of%20academic%20driven%20startups%20in%20economy.pdf",
        destination: "/b/rase20232.pdf",
        permanent: true,
      },
      {
        source: "/Shiksha_Mahakumbh.pdf",
        destination: "/b/Shiksha%20Mahakumbh%202.0%20Abstract%20booklet%20final.pdf",
        permanent: true,
      },
      {
        source: "/SchoolEducation.pdf",
        destination: "/b/rase20231.pdf",
        permanent: true,
      },
      {
        source: "/forgot-password",
        destination: "/ForgotPassword",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          ...securityHeaders,
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
