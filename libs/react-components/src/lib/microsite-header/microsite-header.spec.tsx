import { render } from "@testing-library/react";
import GoabMicrositeHeader from "./microsite-header";
import { GoabServiceLevel } from "@abgov/ui-components-common";

describe("Header", () => {
  (["alpha", "beta", "live"] as const).forEach((mode: GoabServiceLevel) => {
    it("should show the all the flairs", async function () {
      render(<GoabMicrositeHeader type={mode} />);
      const el = document.querySelector("goa-microsite-header");
      expect(el).not.toBeNull();
      expect(el?.getAttribute("type")).toEqual(mode);
      expect(el?.getAttribute("hasfeedbackhandler")).toEqual("false");
    });
  });

  it("should render with properties", async function () {
    render(
      <GoabMicrositeHeader
        type="alpha"
        version="v1.2.3"
        feedbackUrl="https://example.com"
        testId="test-header"
        maxContentWidth="100px"
        feedbackUrlTarget="blank"
        headerUrlTarget="blank"
        onFeedbackClick={() => {
          /* do nothing */
        }}
      />,
    );

    const el = document.querySelector("goa-microsite-header");

    expect(el?.getAttribute("type")).toEqual("alpha");
    expect(el?.getAttribute("version")).toEqual("v1.2.3");
    expect(el?.getAttribute("feedbackUrl")).toEqual("https://example.com");
    expect(el?.getAttribute("testId")).toEqual("test-header");
    expect(el?.getAttribute("maxContentWidth")).toEqual("100px");
    expect(el?.getAttribute("feedbackUrlTarget")).toEqual("blank");
    expect(el?.getAttribute("headerUrlTarget")).toEqual("blank");
    expect(el?.getAttribute("hasfeedbackhandler")).toEqual("true");
  });

  it("should set self url target", () => {
    render(
      <GoabMicrositeHeader
        type="alpha"
        headerUrlTarget="self"
        feedbackUrlTarget="self"
      />,
    );
    const el = document.querySelector("goa-microsite-header");
    expect(el?.getAttribute("headerUrlTarget")).toBe("self");
    expect(el?.getAttribute("feedbackUrlTarget")).toBe("self");
  });

  it("should render slotted version", () => {
    render(<GoabMicrositeHeader type="alpha" version={<span>foo</span>} />);
    const el = document.querySelector("goa-microsite-header");
    const slot = el?.querySelector("[slot='version']");
    const slotContent = slot?.querySelector("span");
    expect(slot).toBeTruthy();
    expect(slotContent).toBeTruthy();
    expect(slotContent?.innerHTML).toContain("foo");
  });
});
