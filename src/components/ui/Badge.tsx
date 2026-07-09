import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "primary" | "secondary" | "accent" | "success";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-border text-text",
  primary: "border border-primary/30 bg-primary/15 text-navy",
  secondary: "border border-secondary/30 bg-secondary/15 text-navy",
  accent: "border border-accent/30 bg-accent/15 text-navy",
  success: "bg-success/10 text-success",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
