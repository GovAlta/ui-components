import { render } from "@testing-library/react";

import FooterMetaSection from "./footer-meta-section";

describe("FooterMetaSection", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FooterMetaSection testId="foo" />);
    const el = baseElement.querySelector("goa-app-footer-meta-section");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("data-testid")).toBe("foo");
  });
});
