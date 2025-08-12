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

    expect(slotContent?.parentElement?.style.display).toBe("none");
    expect(slotTarget).toBeTruthy();
  });

  it("should open content when target is clicked", async () => {
    const result = render(Popover, { minwidth: "8rem", maxwidth: "16rem" });
    const target = result.queryByTestId("popover-target");
    expect(target).toBeTruthy();

    target && (await user.click(target));
    const popOverContent = result.queryByTestId("popover-content");
    expect(popOverContent?.parentElement?.style.display).not.toBe("none");

    const style = popOverContent?.getAttribute("style");
    expect(style).toContain("min-width: 8rem");
    expect(style).toContain("max-width: 16rem");
    expect(style).toContain("padding: var(--goa-space-m)");
  });

  it("should not close content when clicked focusable target then click focusable content inside the content container", async () => {
    // arrange to test that focusout event bubbles up to popover component
    const result = render(PopoverWrapper, {
      content: `<button data-testid="clickable-content">Click me</button>`,
      targetTrigger: `<div><button data-testid="clickable-target">Click Action</button></div>`,
    });

    const target = result.queryByTestId("clickable-target");
    expect(target).toBeTruthy();
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).toBe("none");

    // click on focusable element within popover target
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).not.toBe("none");

    // click on focusable content inside popover content
    const button = result.queryByTestId("clickable-content");
    button && (await user.click(button));
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).not.toBe("none");
  });

  it("should not close content when clicked non-focusable target then click non-focusable content inside the content container", async () => {
    // arrange to test that focusout event bubbles up to popover component
    const result = render(PopoverWrapper, {
      content: `<span data-testid="non-focusable-content">Click me</span>`,
      targetTrigger: `<span data-testid="non-focusable-target">Click Action</span>`,
    });

    const target = result.queryByTestId("non-focusable-target");
    expect(target).toBeTruthy();
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).toBe("none");

    // click on non-focusable element within popover target
    target && (await user.click(target));
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).not.toBe("none");

    // click on non-focusable content within popover content
    const contentNonfocusableEl = result.queryByTestId("non-focusable-content");
    expect(contentNonfocusableEl?.tabIndex).toBe(-1);

    contentNonfocusableEl && (await user.click(contentNonfocusableEl));
    expect(result.queryByTestId("popover-content")?.parentElement?.style.display).not.toBe("none");
  });
})
