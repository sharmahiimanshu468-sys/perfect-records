import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Parallax } from "@/components/Parallax";
import { Branches } from "@/components/sections/Branches";
import { renderWithProviders } from "./render";

/**
 * Characterisation baseline for the two seams the emblem/poster change touches.
 *
 * The accepted change replaces the CSS dot-in-circle brand mark with an image
 * emblem and swaps the Video Editing branch poster for a dedicated image. These
 * tests deliberately do NOT pin the placeholder dot or any image `src` — those
 * are expected to change. They protect the adjacent behaviour that must survive:
 * the wordmark text and its link target, the branch panel structure, the branch
 * CTA wiring, and the scroll-driven Parallax primitive the new poster reveal
 * builds on.
 */
describe("brand mark seams", () => {
  it("keeps the navbar wordmark text and its home link", () => {
    renderWithProviders(<Navbar />);

    const wordmark = screen.getByTestId("nav.wordmark_link");
    expect(wordmark).toHaveAttribute("href", "#home");
    expect(within(wordmark).getByText("Perfect Records")).toBeInTheDocument();
    expect(within(wordmark).getByText("Official")).toBeInTheDocument();
  });

  it("keeps the footer wordmark text alongside the contact channels", () => {
    renderWithProviders(<Footer />);

    const footer = screen.getByTestId("footer.section");
    expect(within(footer).getByText("Perfect Records")).toBeInTheDocument();
    expect(within(footer).getByText("Official")).toBeInTheDocument();
  });
});

describe("branch panel structure", () => {
  it("renders both branch panels with their ids, headings and bullets", () => {
    renderWithProviders(<Branches />);

    const videoPanel = screen.getByTestId("branches.panel.1");
    expect(videoPanel).toHaveAttribute("id", "video-editing");
    expect(
      within(videoPanel).getByRole("heading", { name: "Video Editing" }),
    ).toBeInTheDocument();
    expect(
      within(videoPanel).getByText("Beat-synced cuts and transitions"),
    ).toBeInTheDocument();

    const posterPanel = screen.getByTestId("branches.panel.2");
    expect(posterPanel).toHaveAttribute("id", "poster-design");
    expect(
      within(posterPanel).getByRole("heading", { name: "Poster Design" }),
    ).toBeInTheDocument();
    expect(
      within(posterPanel).getByText("Album art and single artwork"),
    ).toBeInTheDocument();
  });

  it("renders a poster image inside each branch panel", () => {
    renderWithProviders(<Branches />);

    // The image source is expected to change; only its presence and its
    // accessible description are protected here.
    for (const index of [1, 2]) {
      const panel = screen.getByTestId(`branches.panel.${index}`);
      const image = within(panel).getByRole("img");
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")).not.toBe("");
    }
  });

  it("keeps both Start a Project CTAs wired to the prefill flow", () => {
    renderWithProviders(<Branches />);

    expect(screen.getByTestId("branches.cta.1")).toHaveTextContent(
      /Start a Project/i,
    );
    expect(screen.getByTestId("branches.cta.2")).toHaveTextContent(
      /Start a Project/i,
    );
  });
});

describe("scroll-driven Parallax primitive", () => {
  it("renders its children inside a parallax layer with a transform offset", () => {
    renderWithProviders(
      <Parallax speed={40}>
        <img src="/poster.jpg" alt="Branch poster" />
      </Parallax>,
    );

    const image = screen.getByRole("img", { name: "Branch poster" });
    const layer = image.parentElement;
    expect(layer).not.toBeNull();
    expect(layer).toHaveClass("parallax-layer");
    // jsdom reports a zero-size rect, so the computed offset is the full speed.
    expect(layer?.style.getPropertyValue("--parallax-y")).toBe("40px");
  });
});
