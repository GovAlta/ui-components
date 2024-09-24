import { render } from "@testing-library/react";

import SideMenuGroup from "./side-menu-group";

describe("SideMenuGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SideMenuGroup heading="some header" testId="foo" />);

    const el = baseElement.querySelector("goa-side-menu-group");
    expect(el?.getAttribute("heading")).toBe("some header");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
