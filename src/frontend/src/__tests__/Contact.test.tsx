import { screen, waitFor } from "@testing-library/react";
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

import { Contact, INQUIRY_PREFILL_EVENT } from "@/components/sections/Contact";

function renderContact() {
  return renderWithProviders(<Contact />);
}

describe("inquiry form", () => {
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

  it("shows inline errors and does not call the backend when fields are empty", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByTestId("contact.submit_button"));

    expect(screen.getByTestId("contact.name_error")).toHaveTextContent(
      /tell us your name/i,
    );
    expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
      /need an email/i,
    );
    expect(screen.getByTestId("contact.message_error")).toHaveTextContent(
      /line or two/i,
    );
    expect(mockBackend.submitInquiry).not.toHaveBeenCalled();
  });

  it("shows an inline error for an invalid email", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByTestId("contact.name_input"), "Ada");
    await user.type(screen.getByTestId("contact.email_input"), "not-an-email");
    await user.type(screen.getByTestId("contact.message_textarea"), "Hello");
    await user.click(screen.getByTestId("contact.submit_button"));

    expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
      /does not look right/i,
    );
    expect(mockBackend.submitInquiry).not.toHaveBeenCalled();
  });

  it("submits a valid brief and shows the success confirmation", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByTestId("contact.name_input"), "Ada");
    await user.type(
      screen.getByTestId("contact.email_input"),
      "ada@example.com",
    );
    await user.selectOptions(
      screen.getByTestId("contact.project_type_select"),
      ProjectType.posterDesign,
    );
    await user.type(
      screen.getByTestId("contact.message_textarea"),
      "A poster for my single",
    );
    await user.click(screen.getByTestId("contact.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("contact.success_state")).toBeInTheDocument();
    });

    // The typed consumer contract: the actor receives the trimmed draft with
    // the selected project type.
    expect(mockBackend.submitInquiry).toHaveBeenCalledTimes(1);
    expect(mockBackend.submitInquiry).toHaveBeenCalledWith({
      name: "Ada",
      email: "ada@example.com",
      projectType: ProjectType.posterDesign,
      message: "A poster for my single",
    });
  });

  it("pre-fills the project type when a branch CTA dispatches the prefill event", async () => {
    renderContact();

    window.dispatchEvent(
      new CustomEvent(INQUIRY_PREFILL_EVENT, {
        detail: { projectType: ProjectType.videoEditing },
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("contact.project_type_select")).toHaveValue(
        ProjectType.videoEditing,
      );
    });
  });

  it("surfaces a backend validation error inline", async () => {
    const user = userEvent.setup();
    mockBackend.submitInquiry.mockResolvedValueOnce({
      __kind__: "err",
      err: "invalidEmail",
    });
    renderContact();

    await user.type(screen.getByTestId("contact.name_input"), "Ada");
    await user.type(
      screen.getByTestId("contact.email_input"),
      "ada@example.com",
    );
    await user.type(screen.getByTestId("contact.message_textarea"), "Hello");
    await user.click(screen.getByTestId("contact.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
        /check your email/i,
      );
    });
    expect(
      screen.queryByTestId("contact.success_state"),
    ).not.toBeInTheDocument();
  });
});
