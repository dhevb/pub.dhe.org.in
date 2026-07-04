import { JOURNAL_LIST } from "@/lib/journals/config";
import { siteConfig } from "@/lib/seo/metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/AboutUs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ContactUs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/AllArticle`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/bal-shodh-patrika`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/conferences`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/conferences/past`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  const journalRoutes: MetadataRoute.Sitemap = JOURNAL_LIST.flatMap((j) => {
    const routes: MetadataRoute.Sitemap = [
      { url: `${base}${j.entryRoute}`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
      { url: `${base}${j.routePrefix}/ReadArticlePage`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
      { url: `${base}${j.routePrefix}/SubmitManuscript`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}${j.routePrefix}/EditorialBoard`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
      { url: `${base}${j.routePrefix}/Indexing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];

    for (let i = 1; i <= j.paperCount; i++) {
      routes.push({
        url: `${base}${j.routePrefix}/Paper${i}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.8,
      });
    }

    return routes;
  });

  return [...staticRoutes, ...journalRoutes];
}
