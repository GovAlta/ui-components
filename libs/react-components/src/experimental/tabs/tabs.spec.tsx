import { render } from "@testing-library/react";
import { GoabxTab } from "../tab/tab";
import GoabxTabs from "./tabs";

describe("GoabxTabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabxTabs initialTab={1} testId={'foo'}>
        <GoabxTab heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </GoabxTab>
      </GoabxTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("initialTab")).toBe("1");
    expect(el?.getAttribute("testid")).toBe("foo");

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });

  it("should render with navigation attribute", () => {
    const { baseElement } = render(
      <GoabxTabs initialTab={1} navigation="none">
        <GoabxTab heading="Tab 1">Tab 1 content</GoabxTab>
      </GoabxTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el?.getAttribute("navigation")).toBe("none");
  });
});
