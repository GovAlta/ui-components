import { render } from "@testing-library/react";
import { GoabTab } from "../tab/tab";
import GoabTabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabTabs initialTab={1} testId={'foo'}>
        <GoabTab heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </GoabTab>
      </GoabTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("initialTab")).toBe("1");
    expect(el?.getAttribute("testid")).toBe("foo");

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });
});
