import { it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import GoAWorkSideMenuItem from "./WorkSideMenuItem.svelte";

describe("WorkSideMenuItem", () => {
  it("renders", async () => {
    const { container } = render(GoAWorkSideMenuItem, {
      label: "Foo",
      url: "#",
      badge: "42",
      icon: "star",
      testid: "foo",
      type: "success",
    });
    const link = container.querySelector(".menu-item");
    const badge = container.querySelector(".badge");

    expect(container).toBeTruthy();
    expect(link).toBeTruthy();
    expect(badge).toBeTruthy();
  });
});
