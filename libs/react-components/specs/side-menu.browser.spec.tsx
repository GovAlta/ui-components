import { render } from "vitest-browser-react";
import { GoabSideMenu, GoabSideMenuGroup } from "../src";
import { describe, it, expect, vi } from "vitest";

describe("SideMenu", () => {
  const Component = () => {
    return (
      <GoabSideMenu testId="side-menu">
        <GoabSideMenuGroup heading="Parent Group" testId="parent-group">
          <a href="/parent-item">Parent Item</a>

          <GoabSideMenuGroup heading="Child Group" testId="child-group">
            <a href="/child-item" data-testid="child-item-link">
              Child Item
            </a>
          </GoabSideMenuGroup>
        </GoabSideMenuGroup>
      </GoabSideMenu>
    );
  };

  const isGroupOpen = (groupHost: HTMLElement | null) => {
    if (!groupHost) return;
    const container = groupHost.shadowRoot?.querySelector('[data-testid="group"]');
    return !!container && !container.classList.contains("hidden");
  };

  const updateURL = async (url: string) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("closes parent and child groups when no items are current", async () => {
    const handler = vi.fn();

    const result = render(<Component />);

    const menu = result.baseElement.querySelector("goa-side-menu");
    menu?.addEventListener("_open", handler);

    const parentGroup = result.baseElement.querySelector(
      "goa-side-menu-group",
    ) as HTMLElement;
    const childGroup = parentGroup?.querySelector("goa-side-menu-group") as HTMLElement;

    expect(parentGroup).toBeTruthy();
    expect(childGroup).toBeTruthy();

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(isGroupOpen(parentGroup)).toBe(false);
      expect(isGroupOpen(childGroup)).toBe(false);
    });
  });

  it("opens parent and child group when the child item is current", async () => {
    const handler = vi.fn();

    const result = render(<Component />);

    const menu = result.baseElement.querySelector("goa-side-menu");
    menu?.addEventListener("_open", handler);

    const parentGroup = result.baseElement.querySelector(
      "goa-side-menu-group",
    ) as HTMLElement;
    const childGroup = parentGroup?.querySelector("goa-side-menu-group") as HTMLElement;

    expect(parentGroup).toBeTruthy();
    expect(childGroup).toBeTruthy();

    expect(isGroupOpen(parentGroup)).toBe(false);
    expect(isGroupOpen(childGroup)).toBe(false);

    await updateURL("/child-item");

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(isGroupOpen(parentGroup)).toBe(true);
      expect(isGroupOpen(childGroup)).toBe(true);
    });
  });

  it("opens parent and closes child group when the parent item is current", async () => {
    const handler = vi.fn();

    const result = render(<Component />);

    const menu = result.baseElement.querySelector("goa-side-menu");
    menu?.addEventListener("_open", handler);

    const parentGroup = result.baseElement.querySelector(
      "goa-side-menu-group",
    ) as HTMLElement;
    const childGroup = parentGroup?.querySelector("goa-side-menu-group") as HTMLElement;

    expect(parentGroup).toBeTruthy();
    expect(childGroup).toBeTruthy();

    expect(isGroupOpen(parentGroup)).toBe(false);
    expect(isGroupOpen(childGroup)).toBe(false);

    updateURL("/parent-item");

    await vi.waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(isGroupOpen(childGroup)).toBe(false);
      expect(isGroupOpen(parentGroup)).toBe(true);
    });
  });
});
