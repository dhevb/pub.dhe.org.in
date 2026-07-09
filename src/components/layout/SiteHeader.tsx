"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { primaryNav } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { MegaMenu, MobileMenuButton, MobileNav } from "./MegaMenu";

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-surface/95 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
        className
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Viksit Bharat Journal"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-navy sm:text-base">
              Viksit Bharat Journal
            </p>
            <p className="text-xs text-text-muted">A Bharatiya Knowledge Journal</p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryNav.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <MegaMenu />
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-background hover:text-text"
            aria-label="Search"
          >
            <Search className="h-5 w-5" aria-hidden />
          </Link>
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/vbe.rase/SubmitManuscript" className="hidden md:block">
            <Button variant="primary" size="sm">
              Submit Paper
            </Button>
          </Link>
          <MobileMenuButton
            open={mobileOpen}
            onToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
