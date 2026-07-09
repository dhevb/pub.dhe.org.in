"use client";

import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { CsrfBootstrap } from "@/components/security/CsrfBootstrap";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
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
