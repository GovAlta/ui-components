import { render } from "@testing-library/react";
import React from "react";
import { GoATab } from "../tab/tab";
import GoATabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoATabs>
        <GoATab heading="Profile">
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
    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });
});
