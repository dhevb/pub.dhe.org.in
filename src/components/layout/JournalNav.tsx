"use client";

import type { JournalConfig } from "@/lib/journals/config";
import {
  getJournalNavLabels,
  journalUiLanguage,
} from "@/lib/i18n/journal-labels";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { HindiText } from "@/components/ui/HindiText";

export function getJournalNavItems(journal: JournalConfig) {
  const labels = getJournalNavLabels(journalUiLanguage(journal));
  const tableLabel =
    journal.id === "vie" ? labels.archive : labels.tableOfContents;

  return [
    { label: labels.mainSite, href: "/" },
    { label: labels.journalHome, href: journal.entryRoute },
    { label: labels.articles, href: `${journal.routePrefix}/ReadArticlePage` },
    { label: tableLabel, href: `${journal.routePrefix}/table` },
    { label: labels.submit, href: `${journal.routePrefix}/SubmitManuscript` },
    {
      label: labels.editorialBoard,
      href: `${journal.routePrefix}/EditorialBoard`,
    },
    { label: labels.indexing, href: `${journal.routePrefix}/Indexing` },
    { label: labels.contact, href: `${journal.routePrefix}/ContactUs` },
    { label: labels.dashboard, href: "/dashboard" },
  ];
}

interface JournalNavProps {
  journal: JournalConfig;
}

export function JournalNav({ journal }: JournalNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const labels = getJournalNavLabels(journalUiLanguage(journal));
  const navItems = getJournalNavItems(journal);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <div className="container-wide flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href={journal.entryRoute} className="flex min-w-0 items-center gap-3">
          <Image
            src={journal.logo}
            alt={`${journal.name} logo`}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-lg object-contain"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-navy md:text-base">
              {journal.name}
            </p>
            <HindiText as="p" className="truncate text-xs text-text-muted">
              {journal.nameHindi}
            </HindiText>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={labels.navAria}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-background hover:text-text"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={`${journal.routePrefix}/SubmitManuscript`} className="hidden md:block">
            <Button size="sm">{labels.submit}</Button>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-text-muted hover:bg-background lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? labels.closeMenu : labels.openMenu}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border bg-surface px-4 py-4 lg:hidden"
          aria-label={labels.mobileNavAria}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-text hover:bg-background"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
