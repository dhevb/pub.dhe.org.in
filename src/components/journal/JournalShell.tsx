import type { JournalConfig } from "@/lib/journals/config";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface JournalShellProps {
  journal: JournalConfig;
  children: ReactNode;
}

export function JournalShell({ journal, children }: JournalShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <JournalHeader journal={journal} />
      <main id="main-content" className="container-wide px-4 py-8 md:px-8">
        {children}
      </main>
      <JournalFooter journal={journal} />
    </div>
  );
}

function JournalHeader({ journal }: { journal: JournalConfig }) {
  const navItems = [
    { label: "Home", href: journal.entryRoute },
    { label: "Articles", href: `${journal.routePrefix}/ReadArticlePage` },
    { label: "Submit", href: `${journal.routePrefix}/SubmitManuscript` },
    { label: "Editorial Board", href: `${journal.routePrefix}/EditorialBoard` },
    { label: "Indexing", href: `${journal.routePrefix}/Indexing` },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact", href: `${journal.routePrefix}/ContactUs` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="container-wide flex items-center justify-between px-4 py-3 md:px-8">
        <Link href={journal.entryRoute} className="flex items-center gap-3">
          <Image
            src={journal.logo}
            alt={`${journal.name} logo`}
            width={48}
            height={48}
            className="rounded-lg object-contain"
          />
          <div>
            <p className="font-display text-sm font-bold text-text md:text-base">
              {journal.name}
            </p>
            <p className="font-devanagari text-xs text-text-muted">
              {journal.nameHindi}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-background hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function JournalFooter({ journal }: { journal: JournalConfig }) {
  return (
    <footer className="border-t border-border bg-secondary text-white">
      <div className="container-wide section-padding !py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{journal.name}</h3>
            <p className="mt-2 text-sm text-white/70">
              {journal.publisher} — Democratizing education research publication across Bharat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li>
                <Link href={`${journal.routePrefix}/SubmitManuscript`} className="hover:text-white">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link href={`${journal.routePrefix}/EditorialBoard`} className="hover:text-white">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/bal-shodh-patrika" className="hover:text-white">
                  Bal Shodh Patrika
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="hover:text-white">
                  Conferences
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-2 text-sm text-white/70">
              pub.dhe4@gmail.com
            </p>
            <p className="text-sm text-white/70">
              AMCF-132, Arya Nagar, Ballabgarh, Faridabad, 121004, Haryana
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} {journal.publisher}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
