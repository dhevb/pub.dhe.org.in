import { siteConfig } from "./metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.nameHindi,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    description: siteConfig.description,
    sameAs: [],
  };
}

export function scholarlyArticleSchema(article: {
  title: string;
  abstract: string;
  authors: string[];
  datePublished: string;
  url: string;
  keywords?: string;
  doi?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    abstract: article.abstract,
    author: article.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    datePublished: article.datePublished,
    url: article.url,
    keywords: article.keywords,
    identifier: article.doi,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    isAccessibleForFree: true,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
