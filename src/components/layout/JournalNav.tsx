"use client";

import type { JournalConfig } from "@/lib/journals/config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export function getJournalNavItems(journal: JournalConfig) {
  return [
    { label: "Home", href: journal.entryRoute },
    { label: "Articles", href: `${journal.routePrefix}/ReadArticlePage` },
    { label: "Submit", href: `${journal.routePrefix}/SubmitManuscript` },
    { label: "Editorial Board", href: `${journal.routePrefix}/EditorialBoard` },
    { label: "Indexing", href: `${journal.routePrefix}/Indexing` },
    { label: "Contact", href: `${journal.routePrefix}/ContactUs` },
    { label: "Dashboard", href: "/dashboard" },
  ];
}

interface JournalNavProps {
  journal: JournalConfig;
}

export function JournalNav({ journal }: JournalNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
            <p className="truncate font-devanagari text-xs text-text-muted">
              {journal.nameHindi}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Journal navigation">
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
            <Button size="sm">Submit</Button>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-text-muted hover:bg-background lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border bg-surface px-4 py-4 lg:hidden"
          aria-label="Mobile journal navigation"
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
