"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/author", label: "Author", icon: BookOpen },
  { href: "/dashboard/reviewer", label: "Reviewer", icon: ClipboardList },
  { href: "/dashboard/editor", label: "Editor", icon: Users },
  { href: "/dashboard/admin", label: "Admin / CMS", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex flex-col gap-1"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/dashboard"
            ? pathname === href
            : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
