import { render } from "@testing-library/react";

import GoabSideMenu from "./side-menu";

describe("GoabSideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabSideMenu testId="foo">
        <a href="#foo">Link</a>
      </GoabSideMenu>
    );
    const el = baseElement.querySelector("goa-side-menu");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
