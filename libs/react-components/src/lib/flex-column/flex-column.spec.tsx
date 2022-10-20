import { render } from "@testing-library/react";

import FlexColumn from "./flex-column";

describe("FlexColumn", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FlexColumn />);
    expect(baseElement).toBeTruthy();
  });
});
