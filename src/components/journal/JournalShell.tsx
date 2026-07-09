import type { JournalConfig } from "@/lib/journals/config";
import Link from "next/link";
import { ReactNode } from "react";
import { JournalNav } from "@/components/layout/JournalNav";

interface JournalShellProps {
  journal: JournalConfig;
  children: ReactNode;
}

export function JournalShell({ journal, children }: JournalShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JournalNav journal={journal} />
      <main id="main-content" className="container-wide flex-1 px-4 py-8 md:px-8">
        {children}
      </main>
      <JournalFooter journal={journal} />
    </div>
  );
}

function JournalFooter({ journal }: { journal: JournalConfig }) {
  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="container-wide px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{journal.name}</h3>
            <p className="mt-2 font-devanagari text-sm text-white/70">
              {journal.nameHindi}
            </p>
            <p className="mt-3 text-sm text-white/70">
              {journal.publisher} — Open access multidisciplinary research for
              Viksit Bharat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={`${journal.routePrefix}/SubmitManuscript`}
                  className="hover:text-saffron"
                >
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link
                  href={`${journal.routePrefix}/ReadArticlePage`}
                  className="hover:text-saffron"
                >
                  Browse Articles
                </Link>
              </li>
              <li>
                <Link
                  href={`${journal.routePrefix}/EditorialBoard`}
                  className="hover:text-saffron"
                >
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/bal-shodh-patrika" className="hover:text-saffron">
                  Bal Shodh Patrika
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="hover:text-saffron">
                  Conferences
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-3 text-sm text-white/70">
              <a href="mailto:pub.dhe4@gmail.com" className="hover:text-saffron">
                pub.dhe4@gmail.com
              </a>
            </p>
            <p className="mt-2 text-sm text-white/70">
              AMCF-132, Arya Nagar, Ballabgarh, Faridabad, 121004, Haryana
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} {journal.publisher}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
