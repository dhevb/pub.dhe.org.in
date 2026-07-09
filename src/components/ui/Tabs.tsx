"use client";

import { cn } from "@/lib/utils/cn";
import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = ctx.active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.setActive(value)}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-surface text-text shadow-sm"
          : "text-text-muted hover:text-text",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");

  if (ctx.active !== value) return null;

  return (
    <div role="tabpanel" className={cn("mt-4", className)}>
      {children}
    </div>
  );
}
