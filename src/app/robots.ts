import { siteConfig } from "@/lib/seo/metadata";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
