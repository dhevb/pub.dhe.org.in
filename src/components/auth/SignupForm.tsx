"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { signupUser } from "@/lib/api/auth";
import type { SignupPayload } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

const signupSchema = z
  .object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    institution: z.string().optional(),
    areaOfStudy: z.string().optional(),
    role: z.enum(["student", "teacher", "researcher", "other"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  loginHref?: string;
}

export function SignupForm({ loginHref = "/login" }: SignupFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "student" },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signupUser({
        name: data.email.split("@")[0],
        email: data.email,
        password: data.password,
        institution: data.institution,
        areaOfStudy: data.areaOfStudy,
        role: data.role,
        confirmPassword: data.confirmPassword,
      } as SignupPayload & { confirmPassword: string });
      toast.success("Account created! Please sign in.");
      router.push(loginHref);
    } catch {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <h1 className="mb-6 text-center font-display text-2xl font-bold text-navy">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" error={errors.email?.message} {...register("email")} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" error={errors.password?.message} {...register("password")} />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" {...register("institution")} />
          </div>
          <div>
            <Label htmlFor="areaOfStudy">Area of Study</Label>
            <Input id="areaOfStudy" {...register("areaOfStudy")} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select id="role" className="input-field" {...register("role")}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="researcher">Researcher</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link href={loginHref} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
