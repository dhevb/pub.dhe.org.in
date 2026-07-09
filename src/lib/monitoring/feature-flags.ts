/**
 * Feature flags — enable capabilities without redeploying UI.
 * Override via env: NEXT_PUBLIC_FF_<FLAG>=true|false
 */
export const FEATURE_FLAGS = {
  pwaOffline: true,
  advancedSearch: true,
  editorialWorkflow: false,
  semanticSearch: false,
  analyticsGa4: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  analyticsClarity: Boolean(process.env.NEXT_PUBLIC_CLARITY_ID),
  maintenanceBanner: false,
  auditLogging: true,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

function envOverride(flag: FeatureFlag): boolean | undefined {
  const key = `NEXT_PUBLIC_FF_${flag.replace(/([A-Z])/g, "_$1").toUpperCase()}`;
  const raw = process.env[key];
  if (raw === "true") return true;
  if (raw === "false") return false;
  return undefined;
}

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return envOverride(flag) ?? FEATURE_FLAGS[flag];
}

export function getEnabledFeatures(): FeatureFlag[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlag[]).filter(isFeatureEnabled);
}
