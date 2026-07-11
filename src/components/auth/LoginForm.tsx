"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { loginViaAppRoute } from "@/lib/api/auth";
import { persistLegacyAuth } from "@/lib/auth/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = redirectTo || searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginViaAppRoute(data.email, data.password);

      persistLegacyAuth({
        token: result.token,
        userId: result.user.userId,
        email: result.user.email,
        institution: result.user.institution,
        role: result.user.role,
        areaOfStudy: result.user.areaOfStudy,
      });

      toast.success("Login successful!");
      router.push(redirect);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred during login."
      );
    }
  };

  return (
    <Card className="relative w-full max-w-md">
        <Link
          href="/"
          className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md hover:brightness-110"
          aria-label="Back to home"
        >
          ×
        </Link>

        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Access your author dashboard and manuscript submissions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="your.email@institution.edu"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="text-right">
            <Link
              href="/ForgotPassword"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          New here?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </Card>
  );
}
