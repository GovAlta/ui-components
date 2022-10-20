import { render } from "@testing-library/react";

import GoAOneColumnLayout from "./one-column-layout";

describe("Page", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoAOneColumnLayout />);
    expect(baseElement).toBeTruthy();
  });
});
