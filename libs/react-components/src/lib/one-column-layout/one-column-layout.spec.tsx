import { render } from "@testing-library/react";

import GoabOneColumnLayout from "./one-column-layout";

describe("Page", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabOneColumnLayout />);
    expect(baseElement).toBeTruthy();
  });
});
