import type { AnalyticsEvent, AnalyticsProvider } from "./types";

const noopProvider: AnalyticsProvider = {
  id: "none",
  name: "No-op",
  enabled: true,
  track: () => {},
};

function createGaProvider(): AnalyticsProvider | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;
  return {
    id: "google-analytics",
    name: "Google Analytics 4",
    enabled: true,
    init: () => {
      if (typeof window === "undefined") return;
      // GA script injection deferred until ID is configured in Vercel
      window.dataLayer = window.dataLayer || [];
    },
    track: (event) => {
      if (typeof window === "undefined") return;
      window.dataLayer?.push({
        event: event.name,
        ...event.properties,
      });
    },
  };
}

export const analyticsProviders: AnalyticsProvider[] = [
  createGaProvider(),
  {
    id: "google-search-console",
    name: "Google Search Console",
    enabled: Boolean(process.env.NEXT_PUBLIC_GSC_VERIFICATION),
    track: () => {},
  },
  {
    id: "microsoft-clarity",
    name: "Microsoft Clarity",
    enabled: Boolean(process.env.NEXT_PUBLIC_CLARITY_ID),
    track: () => {},
  },
  {
    id: "plausible",
    name: "Plausible",
    enabled: Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    track: () => {},
  },
  {
    id: "matomo",
    name: "Matomo",
    enabled: Boolean(process.env.NEXT_PUBLIC_MATOMO_URL),
    track: () => {},
  },
].filter((p): p is AnalyticsProvider => p !== null);

export function getActiveProviders(): AnalyticsProvider[] {
  return analyticsProviders.filter((p) => p.enabled);
}

export function trackEvent(event: AnalyticsEvent): void {
  const providers = getActiveProviders();
  if (providers.length === 0) {
    noopProvider.track(event);
    return;
  }
  providers.forEach((p) => p.track(event));
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
