import { siteConfig } from "@/lib/seo/metadata";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Viksit Bharat",
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#F8F9FA",
    theme_color: "#FF9933",
    categories: ["education", "books", "productivity"],
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Search", url: "/search", description: "Search research papers" },
      { name: "Submit", url: "/vbe.rase/SubmitManuscript", description: "Submit manuscript" },
      { name: "Dashboard", url: "/dashboard", description: "Author dashboard" },
    ],
    // Service worker registration deferred — add /sw.js when offline mode is implemented
  };
}
