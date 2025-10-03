import { render } from "@testing-library/react";
import { GoabTooltip } from "./tooltip";

describe("Tooltip", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabTooltip content="This is a tooltip">Hover me</GoabTooltip>,
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("content")).toBe("This is a tooltip");
    expect(baseElement.innerHTML).toContain("Hover me");
  });

  it("should bind all web-component attributes", () => {
    const { baseElement } = render(
      <GoabTooltip content="This is a tooltip" position="top" hAlign="right" testId="foo">
        Hover me
      </GoabTooltip>,
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("position")).toBe("top");
    expect(el?.getAttribute("halign")).toBe("right");
    expect(el?.getAttribute("testid")).toBe("foo");
  });

  it("should bind maxWidth attribute", () => {
    const { baseElement } = render(
      <GoabTooltip content="This is a tooltip" maxWidth="300px">
        Hover me
      </GoabTooltip>,
    );

    const el = baseElement.querySelector("goa-tooltip");

    expect(el?.getAttribute("maxwidth")).toBe("300px");
  });
});