import { render } from "@testing-library/react";

import WorkSideMenu from "./work-side-menu";

describe("WorkSideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <WorkSideMenu
        heading="foo"
        url="#"
        userName="Test User"
        userSecondaryText="test.user@example.com"
        testId="bar"
      />,
    );
    expect(baseElement).toBeTruthy();
    const menu = baseElement.querySelector("goa-work-side-menu");
    expect(menu?.getAttribute("heading")).toBe("foo");
    expect(menu?.getAttribute("url")).toBe("#");
    expect(menu?.getAttribute("user-name")).toBe("Test User");
    expect(menu?.getAttribute("user-secondary-text")).toBe("test.user@example.com");
    expect(menu?.getAttribute("testid")).toBe("bar");
  });
});
