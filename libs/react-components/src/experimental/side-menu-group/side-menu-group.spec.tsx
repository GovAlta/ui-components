import { render } from "@testing-library/react";

import GoabxSideMenuGroup from "./side-menu-group";

describe("GoabxSideMenuGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabxSideMenuGroup heading="some header" testId="foo" />);

    const el = baseElement.querySelector("goa-side-menu-group");
    expect(el?.getAttribute("heading")).toBe("some header");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
  it("should render icon if provided", () => {
    const { baseElement } = render(
      <GoabxSideMenuGroup heading={"Some header"} testId={"foo"} icon={"accessibility"} />,
    );

    const el = baseElement.querySelector("goa-side-menu-group");
    expect(el?.getAttribute("icon")).toBe("accessibility");
  })
});
