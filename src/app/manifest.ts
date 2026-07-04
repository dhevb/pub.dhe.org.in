import { siteConfig } from "@/lib/seo/metadata";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Viksit Bharat",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#FF6B00",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
