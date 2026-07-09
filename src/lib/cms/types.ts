export interface SiteSettings {
  siteName: string;
  tagline: string;
  publisher: string;
  email: string;
  address: string;
  issn: string;
  doiPrefix: string;
  orcidEnabled: boolean;
  crossrefReady: boolean;
  maintenanceMode: boolean;
  announcementBanner: string;
  socialLinks: Record<string, string>;
}

export interface CmsAnnouncement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  expiresAt?: string;
  href?: string;
}

export interface CmsNewsItem {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  href?: string;
}

export interface CmsFaq {
  question: string;
  answer: string;
  category: string;
}

export interface CmsStats {
  label: string;
  value: string;
  trend?: string;
}
