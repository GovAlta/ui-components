import { render } from "@testing-library/react";

import GoabxSideMenu from "./side-menu";

describe("GoabxSideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabxSideMenu testId="foo">
        <a href="#foo">Link</a>
      </GoabxSideMenu>
    );
    const el = baseElement.querySelector("goa-side-menu");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
