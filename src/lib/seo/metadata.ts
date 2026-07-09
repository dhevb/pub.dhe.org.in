import type { Metadata } from "next";
import type { JournalConfig } from "@/lib/journals/config";
import { SITE_URL } from "@/lib/site-url";
import { buildHreflangAlternates } from "./hreflang";

export const siteConfig = {
  name: "Viksit Bharat Journal",
  nameHindi: "विकसित भारत पत्रिका",
  tagline: "A Bharatiya Knowledge Journal",
  description:
    "Bharat's indigenous open-access multidisciplinary knowledge journal. Democratizing research publication for scholars, teachers, students, innovators, and every knowledge creator across education, policy, and social development.",
  url: SITE_URL,
  publisher: "Department of Holistic Education",
  email: "pub.dhe4@gmail.com",
  locale: "en_IN",
  keywords: [
    "Viksit Bharat Journal",
    "open access journal",
    "Indian research",
    "education journal",
    "UGC CARE",
    "Google Scholar",
    "Bal Shodh Patrika",
    "multidisciplinary research",
    "Bharatiya knowledge",
  ],
};

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  noIndex = false,
  journal,
  keywords,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  journal?: JournalConfig;
  keywords?: string[];
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const desc = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/opengraph-image`;

  return {
    title: fullTitle,
    description: desc,
    keywords: keywords ?? siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: buildHreflangAlternates(path, journal),
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}

export function journalMetadata(journal: JournalConfig): Metadata {
  return buildMetadata({
    title: journal.name,
    description: `${journal.name} — ${siteConfig.description}`,
    path: journal.entryRoute,
    journal,
    keywords: [
      journal.name,
      journal.language === "hi" ? "हिंदी शोध पत्रिका" : "English research journal",
      "open access",
      siteConfig.name,
    ],
  });
}

export function journalSectionMetadata(
  journal: JournalConfig,
  sectionTitle: string,
  pathSuffix: string,
  description?: string,
  noIndex = false
): Metadata {
  return buildMetadata({
    title: `${sectionTitle} — ${journal.name}`,
    description: description ?? `${sectionTitle} for ${journal.name}. ${siteConfig.description}`,
    path: `${journal.routePrefix}${pathSuffix}`,
    journal,
    noIndex,
  });
}
