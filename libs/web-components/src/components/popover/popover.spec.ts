import { render } from "@testing-library/svelte";
import userEvent, { UserEvent } from "@testing-library/user-event";
import PopoverWrapper from "./PopoverWrapper.test.svelte";
import Popover from "./Popover.svelte";
import { it } from "vitest";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

describe("Popover", () => {
  it("should render without content by default", async () => {
    const result = render(Popover);

    const slotContent = result.queryByTestId("popover-content");
    const slotTarget = result.queryByTestId("popover-target");

    expect(slotContent?.classList.contains("is-open")).toBe(false);
    expect(slotTarget).toBeTruthy();
  });

  it("should open content when target is clicked", async () => {
    const result = render(Popover, { minwidth: "8rem", maxwidth: "16rem" });
    const target = result.queryByTestId("popover-target");
    expect(target).toBeTruthy();

    target && (await user.click(target));
    const popOverContent = result.queryByTestId("popover-content");
    expect(popOverContent?.classList.contains("is-open")).toBe(true);

    const style = popOverContent?.getAttribute("style");
    expect(style).toContain("min-width: 8rem");
    expect(style).toContain("max-width: 16rem");
    expect(style).toContain("padding: var(--goa-space-m)");
  });

  it("should close content when target is clicked again", async () => {
    const result = render(Popover);
    const target = result.queryByTestId("popover-target");

    // open
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);

    // close
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(false);
  });

  it("should open when open prop is set to true", async () => {
    const result = render(Popover, { open: "true" });
    const popoverContent = result.queryByTestId("popover-content");

    expect(popoverContent?.classList.contains("is-open")).toBe(true);
  });

  it("should close when open prop changes from true to false", async () => {
    const result = render(Popover, { open: "true" });
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);

    await result.rerender({ open: "false" });
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(false);
  });

  it("should dispatch _open event when popover opens", async () => {
    const result = render(Popover);
    const rootEl = result.queryByTestId("popover");
    const target = result.queryByTestId("popover-target");

    const openHandler = vi.fn();
    rootEl?.addEventListener("_open", openHandler);

    target && (await user.click(target));
    expect(openHandler).toHaveBeenCalledTimes(1);
  });

  it("should dispatch _close event when popover closes", async () => {
    const result = render(Popover);
    const rootEl = result.queryByTestId("popover");
    const target = result.queryByTestId("popover-target");

    const closeHandler = vi.fn();
    rootEl?.addEventListener("_close", closeHandler);

    // open then close
    target && (await user.click(target));
    target && (await user.click(target));
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  it("should not open on space key when disabled", async () => {
    const result = render(Popover, { disabled: "true" });
    const target = result.queryByTestId("popover-target");

    target?.focus();
    await user.keyboard(" ");
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(false);
  });

  it("should apply explicit placement classes", async () => {
    const result = render(Popover, { position: "above" });
    const popoverContent = result.queryByTestId("popover-content") as HTMLElement;

    expect(popoverContent.classList.contains("position-above")).toBe(true);
    expect(popoverContent.classList.contains("position-auto")).toBe(false);
  });

  it("should not close content when clicked focusable target then click focusable content inside the content container", async () => {
    // arrange to test that focusout event bubbles up to popover component
    const result = render(PopoverWrapper, {
      content: `<button data-testid="clickable-content">Click me</button>`,
      targetTrigger: `<div><button data-testid="clickable-target">Click Action</button></div>`,
    });

    const target = result.queryByTestId("clickable-target");
    expect(target).toBeTruthy();
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(false);

    // click on focusable element within popover target
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);

    // click on focusable content inside popover content
    const button = result.queryByTestId("clickable-content");
    button && (await user.click(button));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);
  });

  it("should not close content when clicked non-focusable target then click non-focusable content inside the content container", async () => {
    // arrange to test that focusout event bubbles up to popover component
    const result = render(PopoverWrapper, {
      content: `<span data-testid="non-focusable-content">Click me</span>`,
      targetTrigger: `<span data-testid="non-focusable-target">Click Action</span>`,
    });

    const target = result.queryByTestId("non-focusable-target");
    expect(target).toBeTruthy();
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(false);

    // click on non-focusable element within popover target
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);

    // click on non-focusable content within popover content
    const contentNonfocusableEl = result.queryByTestId("non-focusable-content");
    expect(contentNonfocusableEl?.tabIndex).toBe(-1);

    contentNonfocusableEl && (await user.click(contentNonfocusableEl));
    expect(result.queryByTestId("popover-content")?.classList.contains("is-open")).toBe(true);
  });
})
