import type { Metadata } from "next";
import type { JournalConfig } from "@/lib/journals/config";
import { SITE_URL } from "@/lib/site-url";

export const siteConfig = {
  name: "Viksit Bharat Education Journal",
  nameHindi: "विकसित भारत शिक्षा पत्रिका",
  description:
    "Bharat's indigenous open-access multidisciplinary education research journal. Democratizing research publication for scholars, teachers, students, and innovators across every dimension of education.",
  url: SITE_URL,
  publisher: "Department of Holistic Education",
  email: "pub.dhe4@gmail.com",
  locale: "en_IN",
};

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const desc = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-default.png`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
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
      : { index: true, follow: true },
  };
}

export function journalMetadata(journal: JournalConfig): Metadata {
  return buildMetadata({
    title: journal.name,
    description: `${journal.name} — ${siteConfig.description}`,
    path: journal.entryRoute,
  });
}
