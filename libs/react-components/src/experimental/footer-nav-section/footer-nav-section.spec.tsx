import { render } from "@testing-library/react";

import FooterNavSection from "./footer-nav-section";

describe("FooterNavSection", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FooterNavSection />);
    expect(baseElement).toBeTruthy();
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <FooterNavSection
        heading="Navigation"
        data-grid="cell"
      >
        Nav content
      </FooterNavSection>
    );
    const el = baseElement.querySelector("goa-app-footer-nav-section");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
