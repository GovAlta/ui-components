import { render } from "@testing-library/react";

import WorkSideMenuItem from "./work-side-menu-item";

describe("WorkSideMenuItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <WorkSideMenuItem
        label="Foo"
        url="#"
        badge="42"
        icon="star"
        testId="foo"
        type="success"
      ></WorkSideMenuItem>,
    );
    expect(baseElement).toBeTruthy();
    const menuItem = baseElement.querySelector("goa-work-side-menu-item");
    expect(menuItem?.getAttribute("label")).toBe("Foo");
    expect(menuItem?.getAttribute("url")).toBe("#");
    expect(menuItem?.getAttribute("badge")).toBe("42");
    expect(menuItem?.getAttribute("icon")).toBe("star");
    expect(menuItem?.getAttribute("testid")).toBe("foo");
    expect(menuItem?.getAttribute("type")).toBe("success");
  });

  it("should render without url", () => {
    const { baseElement } = render(<WorkSideMenuItem label="No Link" icon="settings" />);
    const menuItem = baseElement.querySelector("goa-work-side-menu-item");
    expect(menuItem).toBeTruthy();
    expect(menuItem?.getAttribute("label")).toBe("No Link");
    expect(menuItem?.getAttribute("url")).toBeNull();
  });

  it("should render with popoverContent slot", () => {
    const { baseElement } = render(
      <WorkSideMenuItem
        label="Notifications"
        icon="notifications"
        popoverContent={<div data-testid="popover">Popover content</div>}
      />,
    );
    const menuItem = baseElement.querySelector("goa-work-side-menu-item");
    expect(menuItem).toBeTruthy();
    const slotDiv = menuItem?.querySelector('[slot="popoverContent"]');
    expect(slotDiv).toBeTruthy();
    expect(slotDiv?.textContent).toBe("Popover content");
  });

  it("should not render popoverContent slot when not provided", () => {
    const { baseElement } = render(
      <WorkSideMenuItem label="Home" url="#home" icon="home" />,
    );
    const menuItem = baseElement.querySelector("goa-work-side-menu-item");
    const slotDiv = menuItem?.querySelector('[slot="popoverContent"]');
    expect(slotDiv).toBeNull();
  });
});
