import { it, expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import GoAWorkSideMenuItem from "./WorkSideMenuItem.svelte";

describe("WorkSideMenuItem", () => {
  it("renders", async () => {
    const { container } = render(GoAWorkSideMenuItem,
      {
        label: "Foo",
        url: "#",
        badge: "42",
        icon: "star",
        testid: "foo",
        type: "success",
      }
    );
    const link = container.querySelector(".menu-item");
    const badge = container.querySelector(".badge");

    expect(container).toBeTruthy();
    expect(link).toBeTruthy();
    expect(badge).toBeTruthy();
  });

  it("fires a mount event when rendered", async () => {
    const { container } = render(GoAWorkSideMenuItem,
      {
        label: "Foo",
        url: "#",
        badge: "42",
        icon: "star",
        testid: "foo",
        type: "success",
      }
    );

    const handler = vitest.fn()
    container.addEventListener("work-side-menu-item:mount", handler);

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it("fires a menu update event on click", async () => {
    const { container } = render(GoAWorkSideMenuItem,
      {
        label: "Foo",
        url: "#",
        badge: "42",
        icon: "star",
        testid: "foo",
        type: "success",
      }
    );

    const menuItem = container.querySelector("a.menu-item");

    const handler = vitest.fn();
    container.addEventListener("work-side-menu:update", handler);

    menuItem && await fireEvent.click(menuItem);

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it("fires a hover event on mouse enter", async () => {
    const { container } = render(GoAWorkSideMenuItem,
      {
        label: "Foo",
        url: "#",
        badge: "42",
        icon: "star",
        testid: "foo",
        type: "success",
      }
    );

    const root = container.querySelector(".root");

    const handler = vitest.fn();
    container.addEventListener("work-side-menu-item:hover", handler);

    root && await fireEvent.mouseEnter(root);

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });
});
