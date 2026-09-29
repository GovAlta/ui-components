import { render } from "@testing-library/react";
import { GoabButtonGroup } from "./button-group";

describe("GoabButtonGroup", () => {
  it("should default alignment to start", () => {
    const { container } = render(<GoabButtonGroup />);

    const el = container.querySelector("goa-button-group");
    expect(el?.getAttribute("alignment")).toBe("start");
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabButtonGroup data-grid="row">
        Content
      </GoabButtonGroup>,
    );
    const el = container.querySelector("goa-button-group");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });
});
