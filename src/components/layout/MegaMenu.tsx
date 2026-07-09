"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { megaMenuSections, primaryNav } from "@/lib/navigation";

export function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Explore
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-[min(100vw-2rem,48rem)] rounded-xl border border-border bg-surface p-6 shadow-lg"
          role="menu"
        >
          <div className="grid gap-8 sm:grid-cols-3">
            {megaMenuSections.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {section.title}
                </p>
                <ul className="space-y-2" role="none">
                  {section.links.map((link) => (
                    <li key={link.href} role="none">
                      <Link
                        href={link.href}
                        className="block rounded-lg px-2 py-1.5 text-sm text-text transition-colors hover:bg-background hover:text-primary"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-medium">{link.label}</span>
                        {link.description && (
                          <span className="mt-0.5 block text-xs text-text-muted">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="border-t border-border bg-surface lg:hidden" role="dialog" aria-label="Mobile navigation">
      <div className="container-wide space-y-6 px-4 py-6">
        <nav className="flex flex-col gap-1">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text hover:bg-background"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {megaMenuSections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              {section.title}
            </p>
            <div className="flex flex-col gap-1">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-background hover:text-text"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileMenuButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="rounded-lg p-2 text-text-muted hover:bg-background hover:text-text lg:hidden"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
