import { render } from "@testing-library/react";

import SideMenu from "./side-menu";

describe("SideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <SideMenu>
        <a href="#">Link</a>
      </SideMenu>
    );
    expect(baseElement).toBeTruthy();
  });
});
