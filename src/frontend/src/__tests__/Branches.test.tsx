import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProjectType } from "@/backend";
import { type MockBackend, asBackend, createMockBackend } from "./mock-backend";
import { renderWithProviders } from "./render";

const mockBackend: MockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: asBackend(mockBackend), isFetching: false }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";

describe("branch Start a Project CTAs", () => {
  it("pre-fills the inquiry form with Video Editing from the Video Editing branch", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Branches />
        <Contact />
      </>,
    );

    await user.click(screen.getByTestId("branches.cta.1"));

    await waitFor(() => {
      expect(screen.getByTestId("contact.project_type_select")).toHaveValue(
        ProjectType.videoEditing,
      );
    });
  });

  it("pre-fills the inquiry form with Poster Design from the Poster Design branch", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Branches />
        <Contact />
      </>,
    );

    await user.click(screen.getByTestId("branches.cta.2"));

    await waitFor(() => {
      expect(screen.getByTestId("contact.project_type_select")).toHaveValue(
        ProjectType.posterDesign,
      );
    });
  });
});
