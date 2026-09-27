import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Portfolio } from "@/components/sections/Portfolio";
import { PORTFOLIO } from "@/lib/site";

describe("portfolio gallery", () => {
  it("opens a detail lightbox for a work card and closes it", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    expect(screen.queryByTestId("portfolio.modal")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("portfolio.item.1"));

    const modal = screen.getByTestId("portfolio.modal");
    expect(modal).toBeInTheDocument();
    expect(
      within(modal).getByRole("heading", { name: PORTFOLIO[0].title }),
    ).toBeInTheDocument();

    // The lightbox renders two close affordances (backdrop + X button); either
    // closes it.
    const closeButtons = screen.getAllByTestId("portfolio.close_button");
    await user.click(closeButtons[closeButtons.length - 1]);
    expect(screen.queryByTestId("portfolio.modal")).not.toBeInTheDocument();
  });

  it("closes the lightbox on Escape", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    await user.click(screen.getByTestId("portfolio.item.2"));
    expect(screen.getByTestId("portfolio.modal")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("portfolio.modal")).not.toBeInTheDocument();
  });
});
