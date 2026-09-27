import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { type MockBackend, asBackend, createMockBackend } from "./mock-backend";
import { renderWithProviders } from "./render";

const mockBackend: MockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: asBackend(mockBackend), isFetching: false }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

import App from "@/App";

// Vitest runs with the frontend package as its working directory, so these
// resolve to the real source files the build consumes.
const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const indexCss = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

/**
 * The accepted change is a light Apple-style theme with the forced dark mode
 * removed. These assert the observable light-theme contract at its seams — the
 * document's declared colour scheme, the light palette tokens, and the absence
 * of a forced `dark` class on the rendered tree — without pinning individual
 * utility classes, which the theme is free to rewrite.
 */
describe("light theme contract", () => {
  it("declares a light colour scheme and white browser chrome", () => {
    expect(indexHtml).toMatch(
      /<meta\s+name="color-scheme"\s+content="light"\s*\/?>/,
    );
    expect(indexHtml).toMatch(
      /<meta\s+name="theme-color"\s+content="#ffffff"\s*\/?>/,
    );
  });

  it("defines a white background with dark ink in the base palette", () => {
    // `--background: 1 0 0` is pure white in the oklch triplets the app uses.
    expect(indexCss).toMatch(/--background:\s*1\s+0\s+0\s*;/);
    // The foreground is a dark neutral, not a light-on-dark value.
    const foreground = indexCss.match(/--foreground:\s*([\d.]+)/);
    expect(foreground).not.toBeNull();
    expect(Number(foreground?.[1])).toBeLessThan(0.4);
  });

  it("does not force a dark class onto the document or the app root", () => {
    renderWithProviders(<App />);

    expect(document.documentElement).not.toHaveClass("dark");
    expect(document.body).not.toHaveClass("dark");

    // The app shell is the outermost rendered element; it must not opt into
    // the dark variant either.
    const shell = screen.getByRole("main").parentElement;
    expect(shell).not.toBeNull();
    expect(shell).not.toHaveClass("dark");
  });
});
