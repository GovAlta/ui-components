import { render } from "@testing-library/react";
import { GoABTab } from "../tab/tab";
import GoABTabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoABTabs initialTab={1} testId={'foo'}>
        <GoABTab heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </GoABTab>
      </GoABTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("initialTab")).toBe("1");
    expect(el?.getAttribute("data-testid")).toBe("foo");

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });
});
