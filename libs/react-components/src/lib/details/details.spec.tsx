import { render } from "@testing-library/react";

import { GoabDetails } from "./details";

describe("Detail", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabDetails heading="The heading" open={true} maxWidth={"480px"} testId="foo">
        The content
      </GoabDetails>,
    );

    const el = baseElement.querySelector("goa-details");
    expect(el?.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("The content");
    expect(el?.getAttribute("open")).toBe("true");
    expect(el?.getAttribute("maxwidth")).toBe("480px");
    expect(el?.getAttribute("testid")).toBe("foo");
  });
});
