import { render } from "@testing-library/react";

import GoabxSideMenuHeading from "./side-menu-heading";

describe("GoabxSideMenuHeading", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabxSideMenuHeading icon="home" testId="foo" />);

    const el = baseElement.querySelector("goa-side-menu-heading");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("icon")).toBe("home");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
