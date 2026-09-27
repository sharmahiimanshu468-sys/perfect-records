import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectType } from "@/backend";
import { type MockBackend, asBackend, createMockBackend } from "./mock-backend";
import { renderWithProviders } from "./render";

const mockBackend: MockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: asBackend(mockBackend), isFetching: false }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

import { Contact } from "@/components/sections/Contact";
import { Portfolio } from "@/components/sections/Portfolio";

/**
 * Adjacent journeys the theme change must not disturb: the post-submit reset
 * back to a blank form, and the portfolio lightbox's commission CTA.
 */
describe("inquiry form reset and portfolio commission CTA", () => {
  beforeEach(() => {
    mockBackend.submitInquiry.mockClear();
    mockBackend.submitInquiry.mockResolvedValue({
      __kind__: "ok",
      ok: {
        id: 1n,
        name: "Ada",
        email: "ada@example.com",
        projectType: ProjectType.videoEditing,
        message: "A brief",
        createdAt: 0n,
      },
    });
  });

  it("returns to a blank form after Send another brief", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByTestId("contact.name_input"), "Ada");
    await user.type(
      screen.getByTestId("contact.email_input"),
      "ada@example.com",
    );
    await user.type(
      screen.getByTestId("contact.message_textarea"),
      "A poster for my single",
    );
    await user.click(screen.getByTestId("contact.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("contact.success_state")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("contact.send_another_button"));

    const form = screen.getByTestId("contact.submit_button");
    expect(form).toBeInTheDocument();
    expect(screen.getByTestId("contact.name_input")).toHaveValue("");
    expect(screen.getByTestId("contact.email_input")).toHaveValue("");
    expect(screen.getByTestId("contact.message_textarea")).toHaveValue("");
  });

  it("closes the portfolio lightbox from its commission CTA", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Portfolio />);

    await user.click(screen.getByTestId("portfolio.item.1"));
    const modal = screen.getByTestId("portfolio.modal");
    expect(modal).toBeInTheDocument();

    await user.click(within(modal).getByTestId("portfolio.modal_cta"));

    expect(screen.queryByTestId("portfolio.modal")).not.toBeInTheDocument();
  });
});
