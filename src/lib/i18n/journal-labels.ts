import type { JournalConfig } from "@/lib/journals/config";
import type { PageLanguage } from "./language";

export interface JournalNavLabels {
  mainSite: string;
  journalHome: string;
  articles: string;
  tableOfContents: string;
  archive: string;
  submit: string;
  editorialBoard: string;
  indexing: string;
  contact: string;
  dashboard: string;
  openMenu: string;
  closeMenu: string;
  navAria: string;
  mobileNavAria: string;
}

export interface JournalFooterLabels {
  quickLinks: string;
  contact: string;
  mainSite: string;
  submitManuscript: string;
  browseArticles: string;
  editorialBoard: string;
  books: string;
  balShodh: string;
  conferences: string;
  tagline: string;
  rights: string;
}

const NAV_EN: JournalNavLabels = {
  mainSite: "Main Site",
  journalHome: "Journal Home",
  articles: "Articles",
  tableOfContents: "Table of Contents",
  archive: "Archive",
  submit: "Submit",
  editorialBoard: "Editorial Board",
  indexing: "Indexing",
  contact: "Contact",
  dashboard: "Dashboard",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  navAria: "Journal navigation",
  mobileNavAria: "Mobile journal navigation",
};

const NAV_HI: JournalNavLabels = {
  mainSite: "मुख्य साइट",
  journalHome: "जर्नल होम",
  articles: "लेख",
  tableOfContents: "अनुक्रमणिका",
  archive: "अभिलेखागार",
  submit: "जमा करें",
  editorialBoard: "संपादकीय बोर्ड",
  indexing: "इंडेक्सिंग",
  contact: "संपर्क",
  dashboard: "डैशबोर्ड",
  openMenu: "मेनू खोलें",
  closeMenu: "मेनू बंद करें",
  navAria: "जर्नल नेविगेशन",
  mobileNavAria: "मोबाइल जर्नल नेविगेशन",
};

const FOOTER_EN: JournalFooterLabels = {
  quickLinks: "Quick Links",
  contact: "Contact",
  mainSite: "Main Site",
  submitManuscript: "Submit Manuscript",
  browseArticles: "Browse Articles",
  editorialBoard: "Editorial Board",
  books: "Books & Publications",
  balShodh: "Bal Shodh Patrika",
  conferences: "Conferences",
  tagline: "Open access multidisciplinary research for Viksit Bharat.",
  rights: "All rights reserved.",
};

const FOOTER_HI: JournalFooterLabels = {
  quickLinks: "त्वरित लिंक",
  contact: "संपर्क",
  mainSite: "मुख्य साइट",
  submitManuscript: "मैन्यूस्क्रिप्ट जमा करें",
  browseArticles: "लेख देखें",
  editorialBoard: "संपादकीय बोर्ड",
  books: "पुस्तकें और प्रकाशन",
  balShodh: "बाल शोध पत्रिका",
  conferences: "सम्मेलन",
  tagline: "विकसित भारत के लिए खुली पहुँच बहु-विषयक शोध।",
  rights: "सर्वाधिकार सुरक्षित।",
};

export function getJournalNavLabels(language: PageLanguage): JournalNavLabels {
  return language === "hi" ? NAV_HI : NAV_EN;
}

export function getJournalFooterLabels(language: PageLanguage): JournalFooterLabels {
  return language === "hi" ? FOOTER_HI : FOOTER_EN;
}

export function journalUiLanguage(journal: JournalConfig): PageLanguage {
  return journal.language === "hi" ? "hi" : "en";
}
