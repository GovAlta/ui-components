import { render } from "@testing-library/react";

import SideMenu from "./side-menu";

describe("SideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <SideMenu testId="foo">
        <a href="#foo">Link</a>
      </SideMenu>
    );
    const el = baseElement.querySelector("goa-side-menu");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
