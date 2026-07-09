import { JOURNAL_LIST } from "@/lib/journals/config";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Search", href: "/search" },
  { label: "Conferences", href: "/conferences" },
  { label: "Bal Shodh Patrika", href: "/bal-shodh-patrika" },
  { label: "Contact", href: "/ContactUs" },
];

export const journalNav: NavSection = {
  title: "Journals",
  links: JOURNAL_LIST.map((j) => ({
    label: j.name,
    href: j.entryRoute,
    description: j.language === "hi" ? "हिंदी" : "English",
  })),
};

export const authorNav: NavSection = {
  title: "For Authors",
  links: [
    { label: "Author Guidelines", href: "/about", description: "Submission standards" },
    { label: "Submit Manuscript", href: "/vbe.rase/SubmitManuscript", description: "VBE journal" },
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/signup" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

export const researchNav: NavSection = {
  title: "Research",
  links: [
    { label: "All Articles", href: "/AllArticle" },
    { label: "Conferences", href: "/conferences" },
    { label: "Bal Shodh Patrika", href: "/bal-shodh-patrika" },
    { label: "Search", href: "/search" },
  ],
};

export const megaMenuSections: NavSection[] = [
  journalNav,
  authorNav,
  researchNav,
];

export const footerSections: NavSection[] = [
  journalNav,
  authorNav,
  {
    title: "Platform",
    links: [
      { label: "About Journal", href: "/about" },
      { label: "Contact", href: "/ContactUs" },
      { label: "Conferences", href: "/conferences" },
      { label: "Bal Shodh Patrika", href: "/bal-shodh-patrika" },
    ],
  },
];
