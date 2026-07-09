import { cn } from "@/lib/utils/cn";
import { LabelHTMLAttributes } from "react";

export function Label({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-medium text-text",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
