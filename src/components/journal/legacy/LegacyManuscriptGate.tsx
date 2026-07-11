"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { getSessionViaAppRoute } from "@/lib/api/auth";

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
    let active = true;

    getSessionViaAppRoute()
      .then((session) => {
        if (active) setIsLoggedIn(session.authenticated);
      })
      .catch(() => {
        if (active) setIsLoggedIn(false);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogin = (_email: string, _password: string) => {
    setIsLoggedIn(true);
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