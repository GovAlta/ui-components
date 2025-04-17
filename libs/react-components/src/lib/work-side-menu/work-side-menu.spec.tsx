import { render } from "@testing-library/react";

import WorkSideMenu from "./work-side-menu";

describe("WorkSideMenu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <WorkSideMenu
        title=""
        url="#"
        userName="Test User"
        userEmail="test.user@example.com"
        testId="foo"></WorkSideMenu>
    );
    expect(baseElement).toBeTruthy();
  });
});
