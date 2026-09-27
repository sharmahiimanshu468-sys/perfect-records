import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type MockBackend, asBackend, createMockBackend } from "./mock-backend";
import { renderWithProviders } from "./render";

const mockBackend: MockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: asBackend(mockBackend), isFetching: false }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

import App from "@/App";

describe("Perfect Records landing page", () => {
  beforeEach(() => {
    mockBackend.submitInquiry.mockClear();
  });

  it("renders the hero, every major section, and the footer without a blank screen", () => {
    renderWithProviders(<App />);

    // Hero
    expect(
      screen.getByRole("heading", { level: 1, name: /Perfect\s*Records/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your Global Music Production Partner/i),
    ).toBeInTheDocument();

    // Section landmarks by their headings
    expect(
      screen.getByRole("heading", {
        name: /Four services, one finished release/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Sound is only half the release/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Records, videos and artwork/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Built by producers who finish records/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Tell us what you are making/i }),
    ).toBeInTheDocument();

    // Footer copyright line
    expect(
      screen.getByText(/Perfect Records Official\. All rights reserved/i),
    ).toBeInTheDocument();
  });

  it("renders the four service cards and the global services block", () => {
    renderWithProviders(<App />);

    for (const title of [
      "Full Track Production",
      "Devotional & Spiritual",
      "Custom Compositions",
      "Mixing & Mastering",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(screen.getByText(/Global Services/i)).toBeInTheDocument();
  });

  it("renders the studio stats strip with the joined date", () => {
    renderWithProviders(<App />);

    expect(screen.getByText("Subscribers")).toBeInTheDocument();
    expect(screen.getByText("Videos")).toBeInTheDocument();
    expect(screen.getByText("Total views")).toBeInTheDocument();
    expect(screen.getByText("24 Aug 2023")).toBeInTheDocument();
  });

  it("links the Subscribe CTA and footer YouTube link to the official channel", () => {
    renderWithProviders(<App />);

    const subscribe = screen.getByRole("link", { name: /^Subscribe$/i });
    expect(subscribe).toHaveAttribute(
      "href",
      "https://youtube.com/@PerfectRecordsofficial",
    );

    const footerYoutube = screen.getByTestId("footer.youtube_link");
    expect(footerYoutube).toHaveAttribute(
      "href",
      "https://youtube.com/@PerfectRecordsofficial",
    );
  });

  it("shows a floating WhatsApp button linking to the studio number", () => {
    renderWithProviders(<App />);

    const whatsapp = screen.getByTestId("whatsapp.button");
    expect(whatsapp).toHaveAttribute("href", "https://wa.me/917974122658");
  });

  it("opens and closes the mobile menu panel", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const toggle = screen.getByTestId("nav.menu_toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = screen.getByTestId("nav.mobile_panel");
    expect(panel).toHaveAttribute("aria-hidden", "false");
    expect(
      within(panel).getByRole("link", { name: "Video Editing" }),
    ).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");
  });

  it("closes the mobile menu when a link is chosen", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByTestId("nav.menu_toggle"));
    const panel = screen.getByTestId("nav.mobile_panel");
    await user.click(within(panel).getByRole("link", { name: "Portfolio" }));

    expect(screen.getByTestId("nav.menu_toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
