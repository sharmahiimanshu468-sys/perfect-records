import { describe, expect, it } from "vitest";

import { GENRES, NAV_LINKS, PORTFOLIO, SERVICES, SITE } from "@/lib/site";

/**
 * The site's content contract. These are the values the brief pins down, and
 * every section renders from them, so a regression here silently changes the
 * whole page.
 */
describe("site content contract", () => {
  it("exposes the studio identity and tagline", () => {
    expect(SITE.name).toBe("Perfect Records Official");
    expect(SITE.tagline).toBe("Your Global Music Production Partner");
  });

  it("points the YouTube channel at the official handle", () => {
    expect(SITE.youtubeUrl).toBe("https://youtube.com/@PerfectRecordsofficial");
  });

  it("exposes the WhatsApp quick-contact number", () => {
    expect(SITE.whatsappNumber).toBe("+91 79741 22658");
    expect(SITE.whatsappUrl).toBe("https://wa.me/917974122658");
  });

  it("lists the four required services", () => {
    expect(SERVICES.map((service) => service.title)).toEqual([
      "Full Track Production",
      "Devotional & Spiritual",
      "Custom Compositions",
      "Mixing & Mastering",
    ]);
  });

  it("lists the five required genre chips", () => {
    expect(GENRES).toEqual([
      "Indie Pop",
      "Cinematic Romantic",
      "Devotional",
      "Lo-Fi",
      "Dance",
    ]);
  });

  it("links the nav to every major section", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(hrefs).toEqual([
      "#home",
      "#services",
      "#video-editing",
      "#poster-design",
      "#portfolio",
      "#about",
      "#contact",
    ]);
  });

  it("has portfolio items with a title and category", () => {
    expect(PORTFOLIO.length).toBeGreaterThan(0);
    for (const item of PORTFOLIO) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.category.length).toBeGreaterThan(0);
    }
  });
});
