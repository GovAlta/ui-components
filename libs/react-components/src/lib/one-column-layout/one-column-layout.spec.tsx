import { render } from "@testing-library/react";

import ABGovOneColumnLayout from "./one-column-layout";

describe("Page", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ABGovOneColumnLayout />);
    expect(baseElement).toBeTruthy();
  });
});
