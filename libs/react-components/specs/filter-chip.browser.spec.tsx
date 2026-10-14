import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import { GoabFilterChip } from "../src";

describe("FilterChip", () => {
  it("should not apply a background fill on hover", async () => {
    const result = render(<GoabFilterChip content="Test" testId="chip" />);
    const host = result.container.querySelector("goa-filter-chip");
    const chip = await vi.waitFor(() => {
      const shadowChip = host?.shadowRoot?.querySelector<HTMLElement>(".chip");
      if (!shadowChip) throw new Error("Filter chip did not render");
      return shadowChip;
    });

    const backgroundBeforeHover = getComputedStyle(chip).backgroundColor;

    await userEvent.hover(chip);

    expect(getComputedStyle(chip).backgroundColor).toBe(backgroundBeforeHover);
  });
});
