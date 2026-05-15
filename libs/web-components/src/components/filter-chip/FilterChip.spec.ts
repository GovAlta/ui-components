import { fireEvent, render } from "@testing-library/svelte";
import GoAFilterChip from "./FilterChip.svelte";
import { describe, it, expect, vi } from "vitest";

describe("FilterChip", () => {
  it("should render", async () => {
    const { container } = render(GoAFilterChip, {
      content: "Some Badge",
    });

    expect(container.innerHTML).toContain("Some Badge");
    expect(container.querySelector(".error")).toBeNull();
  });

  it("should show the chip in the error state", async () => {
    const { container } = render(GoAFilterChip, {
      content: "Some Badge",
      error: "true",
    });

    expect(container.querySelector(".error")).not.toBeNull();
  });

  it("should handle the click event for deletable chips", async () => {
    const result = render(GoAFilterChip, {
      testid: "chip",
      content: "Some Badge",
    });
    const deleteIcon = result.container.querySelector(".delete-icon");
    const chip = await result.findByTestId("chip");
    const onClick = vi.fn();

    expect(deleteIcon).not.toBeNull();
    chip.addEventListener("_click", onClick);
    await fireEvent.click(chip);

    expect(onClick).toHaveBeenCalled();
  });

  it("should have a minimum width of 56px", async () => {
    const { container } = render(GoAFilterChip, {
      content: "Test",
    });
    const chip = container.querySelector(".chip");

    expect(chip).toHaveStyle(
      "min-width: var(--goa-filter-chip-min-width, 56px)",
    );
  });

  it("should have an unfilled close icon by default for deletable chips", async () => {
    const { container } = render(GoAFilterChip, {
      content: "Test",
    });
    const deleteIcon = container.querySelector("goa-icon[type='close-circle']");

    expect(deleteIcon).not.toBeNull();
    expect(deleteIcon).toHaveAttribute("theme", "outline");
  });

  it("should have a filled close icon on hover for deletable chips", async () => {
    const { container } = render(GoAFilterChip, {
      testid: "chip",
      content: "Test",
    });
    const chip = container.querySelector("[data-testid='chip']");
    const deleteIcon = container.querySelector("goa-icon[type='close-circle']");

    expect(deleteIcon).not.toBeNull();
    expect(deleteIcon).toHaveAttribute("theme", "outline");

    await fireEvent.mouseOver(chip);

    expect(deleteIcon).toHaveAttribute("theme", "filled");
  });

  it("should not apply background fill on hover", async () => {
    const result = render(GoAFilterChip, {
      testid: "chip",
      content: "Test",
    });
    const chip = await result.findByTestId("chip");

    await fireEvent.mouseOver(chip);

    expect(chip).not.toHaveStyle(
      "background-color: var(--goa-color-greyscale-200)",
    );
  });
});
