import { render } from "@testing-library/react";

import SideMenu from "./side-menu";

describe("SideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <SideMenu>
        <a href="#foo">Link</a>
      </SideMenu>
    );
    expect(baseElement).toBeTruthy();
  });
});
