import React from "react";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";

function FocusTrapFixture() {
  return React.createElement(
    "goa-focus-trap",
    { open: true, preventScrollIntoView: true },
    <input data-testid="focus-trap-username" name="username" />,
    <input data-testid="focus-trap-email" name="email" />,
    <input data-testid="focus-trap-address" name="address" />,
  );
}

describe("FocusTrap", () => {
  it("focuses the first slotted control when opened", async () => {
    render(<FocusTrapFixture />);
    const username = page.getByTestId("focus-trap-username");

    await vi.waitFor(() => {
      expect(username).toHaveFocus();
    });
  });

  it("wraps focus at both tab boundaries", async () => {
    render(<FocusTrapFixture />);
    const username = page.getByTestId("focus-trap-username");
    const address = page.getByTestId("focus-trap-address");

    await vi.waitFor(() => {
      expect(username).toHaveFocus();
    });

    await userEvent.click(address);
    expect(address).toHaveFocus();

    await userEvent.tab();
    expect(username).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(address).toHaveFocus();
  });
});
