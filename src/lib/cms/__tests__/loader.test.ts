import { describe, expect, it } from "vitest";
import { getSiteSettings, getCmsFaqs } from "../loader";

describe("cms loader", () => {
  it("loads site settings from content/site.json", () => {
    const site = getSiteSettings();
    expect(site.siteName).toBeTruthy();
    expect(site.issn).toBe("2278-1757");
  });

  it("loads FAQ items", () => {
    const faqs = getCmsFaqs();
    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs[0]).toHaveProperty("question");
    expect(faqs[0]).toHaveProperty("answer");
  });
});
