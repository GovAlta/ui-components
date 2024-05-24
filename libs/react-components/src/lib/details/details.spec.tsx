import { render } from "@testing-library/react";

import { ABGovDetails } from "./details";

describe("Detail", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ABGovDetails heading="The heading" open={true}>
        The content
      </ABGovDetails>
    );

    const el = baseElement.querySelector("goa-details");
    expect(el?.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("The content");
    expect(el?.getAttribute("open")).toBe("true");
  });

});
