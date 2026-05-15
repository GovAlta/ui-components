import { fireEvent, render } from '@testing-library/svelte';
import GoAChip from './Chip.svelte'
import { describe, it, expect, vi } from "vitest";

describe('GoAChip', () => {

  it("should render", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", variant: "filter" });

    expect(container.innerHTML).toContain("Some Badge");
    expect(container.querySelector(".leading-icon")).toBeNull();
    expect(container.querySelector(".deletable")).toBeNull();
    expect(container.querySelector(".error")).toBeNull();
    expect(container.querySelector(".delete-icon")).toBeNull();
  })

  it("should show the leading icon", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", leadingicon: "arrow-right", variant: "filter" });
    const leadingIcon = container.querySelector(".leading-icon");

    expect(leadingIcon).not.toBeNull();
  })

  it("should show the chip in the error state", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", error: "true", variant: "filter" });

    expect(container.querySelector(".error")).not.toBeNull();
  })

  it("should show the trailing button and handle the the click event", async () => {
    const result = render(GoAChip, { testid: "chip", content: "Some Badge", deletable: true, variant: "filter" });
    const deleteIcon = result.container.querySelector(".delete-icon");
    const chip = await result.findByTestId("chip");
    const onClick = vi.fn();

    expect(deleteIcon).not.toBeNull();
    chip.addEventListener("_click", onClick);
    await fireEvent.click(chip);

    expect(onClick).toHaveBeenCalled();
  })

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAChip, {
        testid: "chip-test",
        variant: "filter",
        content: "test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const chip = await baseElement.findByTestId("chip-test");

      expect(chip).toBeTruthy();
      expect(chip).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(chip).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(chip).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(chip).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
})
