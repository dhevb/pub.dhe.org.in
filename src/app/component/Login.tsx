"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginViaAppRoute } from "@/lib/api/auth";
import { persistLegacyAuth } from "@/lib/auth/constants";

/**
 * Legacy login component — delegates to /api/auth/login for httpOnly cookies.
 * Kept for backward compatibility with journal-specific login routes.
 */
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await loginViaAppRoute(email, password);

      persistLegacyAuth({
        token: result.token,
        userId: result.user.userId,
        email: result.user.email,
        institution: result.user.institution,
        role: result.user.role,
        areaOfStudy: result.user.areaOfStudy,
      });

      toast.success("Login successful!");
      router.push("/vbe.rase/SubmitManuscript");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full sm:max-w-md p-6 sm:p-8 bg-surface rounded-xl border border-border shadow-lg">
        <Link
          href="/"
          className="text-white text-xl px-4 py-2 bg-primary rounded-lg absolute left-4 top-4"
        >
          ×
        </Link>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-center mb-6 text-primary">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field mt-1"
              required
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-text text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field mt-1"
              required
              placeholder="Your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-text-muted"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="text-right text-sm">
            <Link href="/ForgotPassword" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-text-muted">
          New here?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
