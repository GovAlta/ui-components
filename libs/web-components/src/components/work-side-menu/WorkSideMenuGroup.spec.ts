import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import GoAWorkSideMenuGroup from "./WorkSideMenuGroup.svelte";

describe("WorkSideMenuGroup", () => {
  it("dispatches _hoverItem event when mouseenter is fired on the details element", async () => {
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
  });
});
