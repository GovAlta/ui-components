import { render } from "@testing-library/react";

import GoabSideMenuHeading from "./side-menu-heading";

describe("GoabSideMenuHeading", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabSideMenuHeading icon="home" testId="foo" />);

    const el = baseElement.querySelector("goa-side-menu-heading");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("icon")).toBe("home");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
