import { render } from "@testing-library/react";
import { GoabTab } from "../../lib/tab/tab";
import GoabxTabs from "./tabs";

describe("GoabxTabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabxTabs initialTab={1} testId={'foo'}>
        <GoabTab heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </GoabTab>
      </GoabxTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("initialTab")).toBe("1");
    expect(el?.getAttribute("testid")).toBe("foo");

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(1);
  });
});
