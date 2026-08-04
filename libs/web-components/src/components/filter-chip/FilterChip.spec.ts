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

  it("should render HTML content in the content slot for version 2", async () => {
    const chip = document.createElement("goa-filter-chip");
    chip.setAttribute("version", "2");
    chip.innerHTML = '<span slot="content"><strong>Some Badge</strong></span>';
    document.body.appendChild(chip);
    await Promise.resolve();

    const contentSlot = chip.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="content"]',
    );
    const content = contentSlot?.assignedElements()[0];

    expect(content?.querySelector("strong")).toHaveTextContent("Some Badge");
    chip.remove();
  });

  it("should use string content in the accessible label", async () => {
    const result = render(GoAFilterChip, {
      content: "Some Badge",
      testid: "chip",
    });
    const chip = await result.findByTestId("chip");

    expect(chip).toHaveAttribute("aria-label", "Some Badge, removable");
  });

  it("should retain an explicit accessible label for version 1", async () => {
    const result = render(GoAFilterChip, {
      ariaLabel: "Custom filter label",
      content: "Some Badge",
      testid: "chip",
    });
    const chip = await result.findByTestId("chip");

    expect(chip).toHaveAttribute("aria-label", "Custom filter label");
  });

  it("should use slotted text to label the remove button for version 2", async () => {
    const chip = document.createElement("goa-filter-chip");
    chip.setAttribute("version", "2");
    chip.innerHTML =
      '<span slot="content"><strong>Some</strong> filter chip</span>';
    document.body.appendChild(chip);
    await Promise.resolve();

    const contentSlot = chip.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="content"]',
    );
    contentSlot?.dispatchEvent(new Event("slotchange", { bubbles: true }));
    await Promise.resolve();

    expect(chip.shadowRoot?.querySelector(".chip")).not.toHaveAttribute(
      "aria-label",
    );
    expect(chip.shadowRoot?.querySelector("goa-icon-button")).toHaveAttribute(
      "arialabel",
      "Remove filter: Some filter chip",
    );
    chip.remove();
  });

  it("should allow an accessible label to override slotted text", async () => {
    const chip = document.createElement("goa-filter-chip");
    chip.setAttribute("version", "2");
    chip.setAttribute("arialabel", "Custom filter");
    chip.innerHTML = '<span slot="content">Some filter chip</span>';
    document.body.appendChild(chip);
    await Promise.resolve();

    const contentSlot = chip.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="content"]',
    );
    contentSlot?.dispatchEvent(new Event("slotchange", { bubbles: true }));
    await Promise.resolve();

    expect(chip.shadowRoot?.querySelector("goa-icon-button")).toHaveAttribute(
      "arialabel",
      "Remove filter: Custom filter",
    );
    chip.remove();
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
