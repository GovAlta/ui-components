import { render } from "@testing-library/react";

import { GoADetails } from "./details";

describe("Detail", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoADetails
        heading="The heading"
        open={true}
        testId="foo"
      >
        The content
      </GoADetails>
    );

    const el = baseElement.querySelector("goa-details");
    expect(el?.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("The content");
    expect(el?.getAttribute("open")).toBe("true");
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });

});
