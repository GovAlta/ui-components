import { render } from "@testing-library/react";

import WorkSideMenuGroup from "./work-side-menu-group";

describe("WorkSideMenuGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <WorkSideMenuGroup
        heading="Menu Group"
        icon="star"
        testId="foo"
      ></WorkSideMenuGroup>,
    );
    expect(baseElement).toBeTruthy();
    const menuGroup = baseElement.querySelector("goa-work-side-menu-group");
    expect(menuGroup?.getAttribute("heading")).toBe("Menu Group");
    expect(menuGroup?.getAttribute("icon")).toBe("star");
    expect(menuGroup?.getAttribute("testid")).toBe("foo");
  });
});
