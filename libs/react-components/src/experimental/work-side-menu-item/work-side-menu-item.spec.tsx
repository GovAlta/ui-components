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
        ></WorkSideMenuItem>
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
});
