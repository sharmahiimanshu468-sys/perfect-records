import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Branches } from "@/components/sections/Branches";
import { Hero } from "@/components/sections/Hero";
import { SERVICES, SITE, VIDEO_ALBUM_POSTER } from "@/lib/site";
import { renderWithProviders } from "./render";

/**
 * Cover for the accepted emblem / video-album-poster change.
 *
 * The brand mark moved from a CSS dot-in-circle placeholder to the generated
 * emblem image on a dark backing plate, the hero gained a large decorative
 * emblem, and the Video Editing branch now shows a dedicated portrait album
 * poster with a cover-open reveal. These assert the observable contract at
 * those seams — image source, accessible description, backing plate, poster
 * distinctness, reveal direction — without pinning animation timing.
 */

// Vitest runs with the frontend package as its working directory.
const indexCss = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

describe("emblem brand mark", () => {
  it("shows the emblem image beside the navbar wordmark", () => {
    renderWithProviders(<Navbar />);

    const wordmark = screen.getByTestId("nav.wordmark_link");
    const emblem = within(wordmark).getByRole("img", {
      name: SITE.emblemAlt,
    });
    expect(emblem).toHaveAttribute("src", SITE.emblem);
    // The wordmark text survives alongside the image.
    expect(within(wordmark).getByText("Perfect Records")).toBeInTheDocument();
    expect(within(wordmark).getByText("Official")).toBeInTheDocument();
  });

  it("shows the emblem image beside the footer wordmark", () => {
    renderWithProviders(<Footer />);

    const footer = screen.getByTestId("footer.section");
    const emblem = within(footer).getByRole("img", { name: SITE.emblemAlt });
    expect(emblem).toHaveAttribute("src", SITE.emblem);
    expect(within(footer).getByText("Perfect Records")).toBeInTheDocument();
    expect(within(footer).getByText("Official")).toBeInTheDocument();
  });

  it("presents the emblem on a dark circular backing plate", () => {
    renderWithProviders(<Navbar />);

    const emblem = screen.getByRole("img", { name: SITE.emblemAlt });
    // The image sits inside the circular plate wrapper.
    const plate = emblem.parentElement;
    expect(plate).not.toBeNull();
    expect(plate).toHaveClass("rounded-full");
    expect(plate).toHaveClass("brand-sheen");
    // The plate supplies the dark backing so the emblem reads on the light page.
    expect(plate?.className).toMatch(/bg-foreground/);
  });

  it("shows the emblem at large decorative size in the hero", () => {
    renderWithProviders(<Hero />);

    const hero = screen.getByTestId("hero.section");
    const emblem = within(hero).getByRole("img", { name: SITE.emblemAlt });
    expect(emblem).toHaveAttribute("src", SITE.emblem);
    // The hero pairs the emblem with the existing wordmark heading.
    expect(
      within(hero).getByRole("heading", {
        level: 1,
        name: /Perfect\s*Records/i,
      }),
    ).toBeInTheDocument();
  });
});

describe("video-album poster", () => {
  it("shows the dedicated portrait poster in the Video Editing branch", () => {
    renderWithProviders(<Branches />);

    const videoPanel = screen.getByTestId("branches.panel.1");
    expect(videoPanel).toHaveAttribute("id", "video-editing");

    const poster = within(videoPanel).getByRole("img", {
      name: VIDEO_ALBUM_POSTER.imageAlt,
    });
    expect(poster).toHaveAttribute("src", VIDEO_ALBUM_POSTER.image);
    // Portrait album-cover aspect, not the generic landscape service photo.
    expect(poster.className).toMatch(/aspect-\[3\/4\]/);
  });

  it("keeps the Video Editing poster distinct from the Poster Design image", () => {
    renderWithProviders(<Branches />);

    const videoPoster = within(
      screen.getByTestId("branches.panel.1"),
    ).getByRole("img");
    const posterDesignImage = within(
      screen.getByTestId("branches.panel.2"),
    ).getByRole("img");

    expect(videoPoster).toHaveAttribute("src", VIDEO_ALBUM_POSTER.image);
    expect(posterDesignImage).toHaveAttribute("src", SERVICES[3].image);
    expect(videoPoster.getAttribute("src")).not.toBe(
      posterDesignImage.getAttribute("src"),
    );
  });

  it("reveals the poster with the scroll-driven cover-open direction", () => {
    renderWithProviders(<Branches />);

    const videoPanel = screen.getByTestId("branches.panel.1");
    // The cover reveal wrapper is the ancestor carrying data-reveal="cover";
    // the re-arm behaviour itself is covered by Reveal.test.tsx.
    const cover = videoPanel.querySelector('[data-reveal="cover"]');
    expect(cover).not.toBeNull();
    // The poster image lives inside that cover-open wrapper.
    expect(cover?.querySelector("img")).not.toBeNull();
  });
});

describe("brand motion and reduced-motion contract", () => {
  it("applies the one-directional sheen sweep to the emblem plate", () => {
    renderWithProviders(<Navbar />);

    const emblem = screen.getByRole("img", { name: SITE.emblemAlt });
    expect(emblem.parentElement).toHaveClass("brand-sheen");
    // The sheen is a slow linear sweep, distinct from the reveal transitions.
    expect(indexCss).toMatch(
      /\.brand-sheen::after[\s\S]*?animation:\s*brand-sheen/,
    );
  });

  it("defines the cover-open reveal transform for the poster", () => {
    expect(indexCss).toMatch(/\[data-reveal="cover"\]/);
    expect(indexCss).toMatch(/rotateY\(-12deg\)/);
  });

  it("disables sheen, poster motion and parallax under prefers-reduced-motion", () => {
    const reduced = indexCss.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/,
    );
    expect(reduced).not.toBeNull();
    const block = reduced?.[1] ?? "";

    // The sheen animation is switched off.
    expect(block).toMatch(/\.brand-sheen::after/);
    // The cover reveal is neutralised.
    expect(block).toMatch(/\[data-reveal="cover"\]/);
    // Parallax depth is neutralised.
    expect(block).toMatch(/\.parallax-layer/);
    // Reveal content is shown in its final state.
    expect(block).toMatch(/opacity:\s*1\s*!important/);
    expect(block).toMatch(/transform:\s*none\s*!important/);
  });
});
