import { render } from "@testing-library/react";

import GoABOneColumnLayout from "./one-column-layout";

describe("Page", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoABOneColumnLayout />);
    expect(baseElement).toBeTruthy();
  });
});
