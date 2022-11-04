import { render } from "@testing-library/react";

import FooterNavSection from "./footer-nav-section";

describe("FooterNavSection", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FooterNavSection />);
    expect(baseElement).toBeTruthy();
  });
});
