import { render } from "@testing-library/react";
import { ABGovTooltip } from "./tooltip";

describe("Tooltip", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ABGovTooltip content="This is a tooltip">Hover me</ABGovTooltip>
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("content")).toBe("This is a tooltip");
    expect(baseElement.innerHTML).toContain("Hover me");
  });

  it("should bind all web-component attributes", () => {
    const { baseElement } = render(
      <ABGovTooltip
        content="This is a tooltip"
        position="top"
        hAlign="right"
        testId="foo"
      >
        Hover me
      </ABGovTooltip>
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("position")).toBe("top");
    expect(el?.getAttribute("halign")).toBe("right");
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });
});
