import React from "react";
import { render } from "@testing-library/react";
import { GoABadge } from "./badge";
import { screen } from "@testing-library/dom";

describe("GoA Badge", () => {
  it("should render", () => {
    const { baseElement } = render(
      <GoABadge type="information" testId="badge-test" content="Text Content" />
    );

    const badge = screen.findByTestId("badge-test");
    expect(badge).toBeTruthy();
  });
});
