import { render } from "@testing-library/react";
import { GoabAppHeader } from "./app-header";

describe("GoABAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(<GoabAppHeader heading="Test heading" url="test" />);

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
  });
});
