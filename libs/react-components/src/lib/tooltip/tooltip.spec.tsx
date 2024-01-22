import { render } from "@testing-library/react";
import { GoATooltip } from "./tooltip";

describe("Tooltip", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoATooltip content="This is a tooltip">Hover me</GoATooltip>
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("content")).toBe("This is a tooltip");
    expect(baseElement.innerHTML).toContain("Hover me");
  });

  it("should bind all web-component attributes", () => {
    const { baseElement } = render(
      <GoATooltip
        content="This is a tooltip"
        position="top"
        hAlign="right"
        testId="foo"
      >
        Hover me
      </GoATooltip>
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("position")).toBe("top");
    expect(el?.getAttribute("halign")).toBe("right");
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });
});
