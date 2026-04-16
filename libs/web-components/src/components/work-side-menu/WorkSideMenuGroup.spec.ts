import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import GoAWorkSideMenuGroup from "./WorkSideMenuGroup.svelte";

describe("WorkSideMenuGroup", () => {

  it("renders without icon when icon prop is omitted", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Group",
      testid: "no-icon",
    });
    // Only the chevron-forward marker icon should be present, no leading icon
    const leadingIcon = container.querySelector("summary goa-icon:not(.marker-icon)");
    expect(leadingIcon).toBeNull();
  });

  it("renders with icon when icon prop is provided", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Group",
      icon: "star",
      testid: "with-icon",
    });
    const leadingIcon = container.querySelector("summary goa-icon[type='star']");
    expect(leadingIcon).toBeTruthy();
  });


  it("renders with default closed state", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Group",
      icon: "star",
      testid: "foo",
    });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.hasAttribute("open")).toBe(false);
  });

  it("renders with open=true state", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Group",
      icon: "star",
      open: true,
    });
    const details = container.querySelector("details");
    expect(details?.hasAttribute("open")).toBe(true);
  });

  it("opens when _itemCurrent event is received from a child", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Group",
      icon: "star",
      open: false,
    });
    const details = container.querySelector("details");
    expect(details?.hasAttribute("open")).toBe(false);

    // Dispatch _itemCurrent from inside the group (simulating a child item becoming current)
    const root = container.querySelector(".root") as HTMLElement;
    root.dispatchEvent(
      new CustomEvent("_itemCurrent", { bubbles: true, composed: true }),
    );

    await new Promise((r) => setTimeout(r, 0));
    expect(details?.hasAttribute("open")).toBe(true);
  });

  it("dispatches an event on hover", async () => {
    const { container } = render(GoAWorkSideMenuGroup, {
      heading: "Test Group",
      icon: "star",
      testid: "test-group",
    });

    const fn = vi.fn();
    container.addEventListener("_hoverItem", fn);

    const details = container.querySelector("details");
    expect(details).toBeTruthy();

    await fireEvent.mouseEnter(details!);
    expect(fn).toHaveBeenCalled();

    const event = fn.mock.calls[0][0];
    expect(event.detail.label).toBe("Test Group");
    expect(event.detail.el).toBeTruthy();
  });
});
