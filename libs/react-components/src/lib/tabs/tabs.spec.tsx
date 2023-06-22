import { render } from "@testing-library/react";
import React from "react";
import { GoATab } from "../tab/tab";
import GoATabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoATabs>
        <GoATab open heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </GoATab>
      </GoATabs>
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    const tabElement = baseElement.querySelector("goa-tab");
    expect(tabElement.getAttribute("open")).toBe("true");
  });
});
