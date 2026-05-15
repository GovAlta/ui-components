import { render } from "@testing-library/react";

import FormStep from "./form-step";

describe("FormStep", () => {
  it("should render successfully", () => {
    const { container } = render(<FormStep text="Step 1" status="complete" />);

    const el = container.querySelector("goa-form-step");

    expect(el?.getAttribute("text")).toBe("Step 1");
    expect(el?.getAttribute("status")).toBe("complete");
  });
});
