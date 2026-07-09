"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "input-field",
              error && "border-error focus:border-error focus:ring-error/20",
              isPassword && "pr-12",
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden />
              ) : (
                <Eye className="h-4 w-4" aria-hidden />
              )}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
