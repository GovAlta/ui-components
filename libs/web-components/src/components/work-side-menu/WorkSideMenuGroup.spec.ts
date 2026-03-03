import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import GoAWorkSideMenuGroup from "./WorkSideMenuGroup.svelte";

describe("WorkSideMenuGroup", () => {
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
