import { render } from "@testing-library/react";
import { GoATab } from "../tab/tab";
import GoATabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoATabs testId="foo" initialTab={1}>
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
    expect(el?.getAttribute("initialTab")).toBe("1");
    expect(el?.getAttribute("data-testid")).toBe("foo");

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });
});
