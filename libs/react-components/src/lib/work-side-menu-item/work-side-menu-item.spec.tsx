import { render } from "@testing-library/react";

import WorkSideMenuItem from "./work-side-menu-item";

describe("WorkSideMenuItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <WorkSideMenuItem
        label="Foo"
        url="#"
        badge="42"
        icon="star"
        testId="foo"
        type="success"
        ></WorkSideMenuItem>
    );
    expect(baseElement).toBeTruthy();
  });
});
