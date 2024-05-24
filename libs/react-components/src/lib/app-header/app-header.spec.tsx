import { render } from "@testing-library/react";
import { GoABAppHeader } from "./app-header";

describe("GoABAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(<GoABAppHeader heading="Test heading" url="test" />);

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
  });
});
