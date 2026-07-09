"use client";

import { JournalLogin } from "@/components/auth/JournalLogin";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  return <JournalLogin onLogin={onLogin} />;
}
