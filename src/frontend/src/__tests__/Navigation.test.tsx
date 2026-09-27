import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { GenreMarquee } from "@/components/sections/GenreMarquee";
import { Services } from "@/components/sections/Services";
import { GENRES, NAV_LINKS, SERVICES, SITE } from "@/lib/site";
import { renderWithProviders } from "./render";

/**
 * Behavioural baseline for the chrome and content sections. The accepted change
 * is a visual theme swap, so these assert structure, destinations and copy —
 * never colours or utility classes, which the theme is expected to rewrite.
 */
describe("navigation and content chrome", () => {
  it("renders a desktop nav link for every section anchor", () => {
    renderWithProviders(<Navbar />);

    const primary = screen.getByRole("navigation", { name: "Primary" });
    for (const link of NAV_LINKS) {
      expect(
        within(primary).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });

  it("keeps the wordmark and Subscribe CTA pointing at their targets", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("nav.wordmark_link")).toHaveAttribute(
      "href",
      "#home",
    );
    expect(screen.getByTestId("nav.subscribe_button")).toHaveAttribute(
      "href",
      SITE.youtubeUrl,
    );
  });

  it("renders every service card with its blurb and bullet points", () => {
    renderWithProviders(<Services />);

    for (const [index, service] of SERVICES.entries()) {
      const card = screen.getByTestId(`services.card.${index + 1}`);
      expect(
        within(card).getByRole("heading", { name: service.title }),
      ).toBeInTheDocument();
      expect(within(card).getByText(service.blurb)).toBeInTheDocument();
      for (const point of service.points) {
        expect(within(card).getByText(point)).toBeInTheDocument();
      }
    }
  });

  it("renders the global services block with its three points", () => {
    renderWithProviders(<Services />);

    const block = screen.getByTestId("services.global_block");
    expect(within(block).getByText(/Global Services/i)).toBeInTheDocument();
    for (const label of [
      "Remote-first, worldwide",
      "Quick turnaround",
      "Streaming-ready delivery",
    ]) {
      expect(within(block).getByText(label)).toBeInTheDocument();
    }
  });

  it("renders every genre chip in the marquee", () => {
    renderWithProviders(<GenreMarquee />);

    const section = screen.getByTestId("genres.section");
    for (const genre of GENRES) {
      // The track duplicates the set for a seamless loop, so each label
      // appears twice.
      expect(within(section).getAllByText(genre).length).toBeGreaterThan(0);
    }
  });

  it("renders the footer contact channels with their destinations", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByTestId("footer.whatsapp_link")).toHaveAttribute(
      "href",
      SITE.whatsappUrl,
    );
    expect(screen.getByTestId("footer.email_link")).toHaveAttribute(
      "href",
      `mailto:${SITE.email}`,
    );
    expect(screen.getByTestId("footer.instagram_link")).toHaveAttribute(
      "href",
      SITE.instagramUrl,
    );
    expect(screen.getByTestId("footer.youtube_link")).toHaveAttribute(
      "href",
      SITE.youtubeUrl,
    );
  });

  it("links every footer service and studio entry to a section anchor", () => {
    renderWithProviders(<Footer />);

    const servicesNav = screen.getByRole("navigation", { name: "Services" });
    for (const service of SERVICES) {
      expect(
        within(servicesNav).getByRole("link", { name: service.title }),
      ).toHaveAttribute("href", "#services");
    }

    const studioNav = screen.getByRole("navigation", { name: "Studio" });
    for (const link of NAV_LINKS.filter((entry) => entry.href !== "#home")) {
      expect(
        within(studioNav).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });
});
