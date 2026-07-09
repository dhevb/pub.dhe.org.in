import { describe, expect, it } from "vitest";
import { isFeatureEnabled, FEATURE_FLAGS } from "../feature-flags";

describe("feature flags", () => {
  it("defaults pwa and search enabled", () => {
    expect(FEATURE_FLAGS.pwaOffline).toBe(true);
    expect(FEATURE_FLAGS.advancedSearch).toBe(true);
  });

  it("disables experimental modules by default", () => {
    expect(isFeatureEnabled("semanticSearch")).toBe(false);
    expect(isFeatureEnabled("editorialWorkflow")).toBe(false);
  });
});
