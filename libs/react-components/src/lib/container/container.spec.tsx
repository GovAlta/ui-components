import React from "react";
import { render } from "@testing-library/react";
import GoAContainer from "./container";
import { GoAButton } from "../button/button";

describe("Container", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoAContainer
        type="interactive"
        accent="thick"
        padding="relaxed"
        title={"Text title"}
        actions={<GoAButton onClick={() => {}}>Save</GoAButton>}
      >
        Container content
      </GoAContainer>
    );

    const el = container.querySelector("goa-container");
    expect(el).toBeTruthy();
    expect(el.getAttribute("type")).toEqual("interactive");
    expect(el.getAttribute("accent")).toEqual("thick");
    expect(el.getAttribute("padding")).toEqual("relaxed");

    expect(el.querySelector("*[slot=title]").innerHTML).toContain("Text title");
    expect(
      el.querySelector("*[slot=actions]").querySelector("goa-button")
    ).not.toBeFalsy();
  });
});
