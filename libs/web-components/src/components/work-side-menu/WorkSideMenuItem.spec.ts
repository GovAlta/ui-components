import { it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import GoAWorkSideMenuItem from "./WorkSideMenuItem.svelte";

describe("WorkSideMenuItem", () => {
  it("renders without icon when icon prop is omitted", async () => {
    const { container } = render(GoAWorkSideMenuItem, {
      label: "Foo",
      url: "#",
    });
    const icon = container.querySelector("goa-icon");
    expect(icon).toBeNull();
  });

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

  describe("click events", () => {
    it("should dispatch _navigate event with url on click", async () => {
      const onNavigate = vi.fn();
      const { container } = render(GoAWorkSideMenuItem, {
        label: "Dashboard",
        url: "/dashboard",
      });
      const root = container.querySelector(".root") as HTMLElement;
      const link = container.querySelector(".menu-item") as HTMLElement;

      root.addEventListener("_navigate", onNavigate);
      await fireEvent.click(link);

      expect(onNavigate).toHaveBeenCalledTimes(1);
      expect(onNavigate.mock.calls[0][0].detail).toEqual({ url: "/dashboard" });
    });

    it("should preventDefault on click", async () => {
      const { container } = render(GoAWorkSideMenuItem, {
        label: "Nav",
        url: "/page",
      });
      const link = container.querySelector(".menu-item") as HTMLAnchorElement;

      const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
      const prevented = !link.dispatchEvent(clickEvent);

      expect(prevented).toBe(true);
    });
  });
});
