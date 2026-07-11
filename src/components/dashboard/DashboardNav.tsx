"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: [] },
  {
    href: "/dashboard/author",
    label: "Author",
    icon: BookOpen,
    roles: ["student", "author", "teacher", "researcher", "other"],
  },
  {
    href: "/dashboard/reviewer",
    label: "Reviewer",
    icon: ClipboardList,
    roles: ["reviewer"],
  },
  { href: "/dashboard/editor", label: "Editor", icon: Users, roles: ["editor"] },
  { href: "/dashboard/admin", label: "Admin / CMS", icon: Settings, roles: ["admin"] },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | undefined>();

  useEffect(() => {
    setRole(localStorage.getItem(LEGACY_STORAGE_KEYS.role)?.toLowerCase() || undefined);
  }, []);

  const visibleItems = NAV_ITEMS.filter(
    (item) => item.roles.length === 0 || (role && item.roles.includes(role))
  );

  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex flex-col gap-1"
    >
      {visibleItems.map(({ href, label, icon: Icon }) => {
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
