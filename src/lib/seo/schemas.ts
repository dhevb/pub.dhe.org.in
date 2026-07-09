import { siteConfig } from "./metadata";
import type { JournalConfig } from "@/lib/journals/config";
import { PAST_CONFERENCES } from "@/lib/content/homepage";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.nameHindi,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    description: siteConfig.description,
    sameAs: [],
    issn: "2278-1757",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.nameHindi,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function journalSchema(journal: JournalConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Periodical",
    name: journal.name,
    alternateName: journal.nameHindi,
    url: `${siteConfig.url}${journal.entryRoute}`,
    inLanguage: journal.language === "hi" ? "hi-IN" : "en-IN",
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    description: siteConfig.description,
    isAccessibleForFree: true,
    issn: journal.issn,
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
  journalName?: string;
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
    isPartOf: {
      "@type": "Periodical",
      name: article.journalName ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

export function personSchema(person: {
  name: string;
  jobTitle?: string;
  affiliation?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    affiliation: person.affiliation
      ? { "@type": "Organization", name: person.affiliation }
      : undefined,
    url: person.url,
  };
}

export function eventSchema(event: {
  name: string;
  description: string;
  startDate?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    url: event.url,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
  };
}

export function conferenceEventsSchema() {
  return PAST_CONFERENCES.map((conf) =>
    eventSchema({
      name: conf.name,
      description: `${conf.theme} — ${conf.papers} papers published`,
      startDate: `${conf.year}-01-01`,
      url: `${siteConfig.url}/conferences/past`,
    })
  );
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

export function bookSchema(book: {
  name: string;
  description?: string;
  url: string;
  isbn?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.name,
    description: book.description,
    url: book.url,
    isbn: book.isbn,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
  };
}

export function datasetSchema(dataset: {
  name: string;
  description: string;
  url: string;
  identifier?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: dataset.name,
    description: dataset.description,
    url: dataset.url,
    identifier: dataset.identifier,
    creator: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
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
