import { render } from "@testing-library/react";

import FooterMetaSection from "./footer-meta-section";

describe("FooterMetaSection", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FooterMetaSection testId="foo" />);
    const el = baseElement.querySelector("goa-app-footer-meta-section");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("testid")).toBe("foo");
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <FooterMetaSection
        data-grid="cell"
      >
        Meta content
      </FooterMetaSection>
    );
    const el = baseElement.querySelector("goa-app-footer-meta-section");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
