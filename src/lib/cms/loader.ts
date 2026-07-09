import fs from "fs";
import path from "path";
import type {
  CmsAnnouncement,
  CmsFaq,
  CmsNewsItem,
  SiteSettings,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSiteSettings(): SiteSettings {
  return readJson<SiteSettings>("site.json");
}

export function getAnnouncements(): CmsAnnouncement[] {
  const data = readJson<{ announcements: CmsAnnouncement[] }>(
    "announcements.json"
  );
  const now = new Date();
  return data.announcements.filter((a) => {
    if (!a.expiresAt) return true;
    return new Date(a.expiresAt) >= now;
  });
}

export function getNewsItems(): CmsNewsItem[] {
  const data = readJson<{ items: CmsNewsItem[] }>("news.json");
  return data.items;
}

export function getCmsFaqs(): CmsFaq[] {
  const data = readJson<{ items: CmsFaq[] }>("faqs.json");
  return data.items;
}

export function getCmsFaqsByCategory(category: string): CmsFaq[] {
  return getCmsFaqs().filter((f) => f.category === category);
}
