import { render } from "@testing-library/react";
import { GoabTab } from "../tab/tab";
import GoabTabs from "./tabs";

describe("Tabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabTabs initialTab={1} testId={"foo"}>
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

  it("should render tabs with slug props", () => {
    const { baseElement } = render(
      <GoabTabs initialTab={1}>
        <GoabTab heading="Overview" slug="overview-section">
          <p>Overview content</p>
        </GoabTab>
        <GoabTab heading="Details">
          <p>Details content</p>
        </GoabTab>
      </GoabTabs>,
    );

    const tabElements = baseElement.querySelectorAll("goa-tab");
    expect(tabElements.length).toBe(2);

    // First tab should have slug attribute
    expect(tabElements[0].getAttribute("slug")).toBe("overview-section");

    // Second tab should not have slug attribute (or null/undefined)
    expect(tabElements[1].getAttribute("slug")).toBeNull();
  });
});
