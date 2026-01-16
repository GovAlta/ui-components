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

  it("should render with variant='segmented'", () => {
    const { baseElement } = render(
      <GoabTabs variant="segmented">
        <GoabTab heading="Tab 1">Content 1</GoabTab>
        <GoabTab heading="Tab 2">Content 2</GoabTab>
      </GoabTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("variant")).toBe("segmented");
  });

  it("should render with variant='default'", () => {
    const { baseElement } = render(
      <GoabTabs variant="default">
        <GoabTab heading="Tab 1">Content 1</GoabTab>
        <GoabTab heading="Tab 2">Content 2</GoabTab>
      </GoabTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("variant")).toBe("default");
  });

  it("should not have variant attribute when variant is not provided", () => {
    const { baseElement } = render(
      <GoabTabs>
        <GoabTab heading="Tab 1">Content 1</GoabTab>
        <GoabTab heading="Tab 2">Content 2</GoabTab>
      </GoabTabs>,
    );
    const el = baseElement.querySelector("goa-tabs");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("variant")).toBeNull();
  });
});
