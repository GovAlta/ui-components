import { render } from "@testing-library/react";

import SideMenuHeading from "./side-menu-heading";

describe("SideMenuHeading", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SideMenuHeading icon="home" />);

    const el = baseElement.querySelector("goa-side-menu-heading");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("icon")).toBe("home");
  });
});
