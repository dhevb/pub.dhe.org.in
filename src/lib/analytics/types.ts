export type AnalyticsProviderId =
  | "google-analytics"
  | "google-search-console"
  | "microsoft-clarity"
  | "plausible"
  | "matomo"
  | "none";

export type AnalyticsEventName =
  | "page_view"
  | "paper_view"
  | "paper_download"
  | "search_query"
  | "citation_copy"
  | "manuscript_submit"
  | "login"
  | "signup";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
}

export interface AnalyticsProvider {
  id: AnalyticsProviderId;
  name: string;
  enabled: boolean;
  init?: () => void;
  track: (event: AnalyticsEvent) => void;
}
