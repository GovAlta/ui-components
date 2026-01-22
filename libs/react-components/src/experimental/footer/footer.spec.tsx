import { render } from "@testing-library/react";

import Footer from "./footer";

describe("Footer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <Footer
        data-grid="cell"
      >
        Footer content
      </Footer>
    );
    const el = baseElement.querySelector("goa-app-footer");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
