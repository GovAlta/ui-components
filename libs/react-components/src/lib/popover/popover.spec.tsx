import { render } from "@testing-library/react";
import GoabPopover from "./popover";

describe("Popover", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabPopover target="Click Action">The content</GoabPopover>,
    );

    const el = baseElement.querySelector("goa-popover");
    expect(el?.querySelector("[slot='target']")?.innerHTML).toContain("Click Action");
    expect(baseElement.innerHTML).toContain("The content");
    expect(el?.getAttribute("padded")).toBeNull();
  });

  it("should bind all web-component attributes", () => {
    const { baseElement } = render(
      <GoabPopover
        target="Click Action"
        maxWidth="500px"
        minWidth="100px"
        testId="foo"
        padded
      >
        The content
      </GoabPopover>,
    );

    const el = baseElement.querySelector("goa-popover");
    expect(el?.getAttribute("maxwidth")).toBe("500px");
    expect(el?.getAttribute("minwidth")).toBe("100px");
    expect(el?.getAttribute("padded")).toBe("true");
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabPopover
        target="Click Action"
        data-grid="cell"
      >
        <div>Test content</div>
      </GoabPopover>
    );
    const el = baseElement.querySelector("goa-popover");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
