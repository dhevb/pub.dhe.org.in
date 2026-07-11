"use client";

import dynamic from "next/dynamic";
import { AnalyticsBootstrap } from "@/components/analytics/AnalyticsBootstrap";
import { CsrfBootstrap } from "@/components/security/CsrfBootstrap";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import NextTopLoader from "nextjs-toploader";

const Toaster = dynamic(
  () => import("react-hot-toast").then((m) => m.Toaster),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnalyticsBootstrap />
      <CsrfBootstrap />
      <ServiceWorkerRegister />
      <NextTopLoader
        color="#FF9933"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={false}
        showSpinner={false}
      />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
