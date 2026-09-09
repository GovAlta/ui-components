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

  it("should render HTML content in the content slot", async () => {
    const chip = document.createElement("goa-filter-chip");
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
    const deleteButton = result.container.querySelector("goa-icon-button");

    expect(deleteButton).toHaveAttribute(
      "arialabel",
      "Remove filter: Some Badge",
    );
  });

  it("should use an explicit accessible label for the remove button", async () => {
    const result = render(GoAFilterChip, {
      ariaLabel: "Custom filter label",
      content: "Some Badge",
      testid: "chip",
    });
    const deleteButton = result.container.querySelector("goa-icon-button");

    expect(deleteButton).toHaveAttribute(
      "arialabel",
      "Remove filter: Custom filter label",
    );
  });

  it("should use slotted text to label the remove button", async () => {
    const chip = document.createElement("goa-filter-chip");
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
    const chip = await result.findByTestId("chip");
    const deleteButton = result.container.querySelector("goa-icon-button");
    const onClick = vi.fn();

    chip.addEventListener("_click", onClick);
    await fireEvent(deleteButton!, new CustomEvent("_click"));

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
