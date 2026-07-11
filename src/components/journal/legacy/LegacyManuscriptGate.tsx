"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

interface LegacyManuscriptGateProps {
  ManuscriptDetails: React.ComponentType;
  Login: React.ComponentType<{ onLogin: (email: string, password: string) => void }>;
}

export function LegacyManuscriptGate({
  ManuscriptDetails,
  Login,
}: LegacyManuscriptGateProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("authToken")));
    setLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      localStorage.setItem("authToken", "mock-auth-token");
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (loading) {
    return <p className="text-center text-text-muted">Loading...</p>;
  }

  if (isLoggedIn) {
    return <ManuscriptDetails />;
  }

  return (
    <Card className="mx-auto max-w-lg p-6">
      <h2 className="mb-6 text-center font-display text-xl font-bold text-navy">
        Please log in to view manuscript details
      </h2>
      <Login onLogin={handleLogin} />
    </Card>
  );
}