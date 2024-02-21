import { render } from "@testing-library/react";
import { GoAAppHeader } from "./app-header";

describe("GoAAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(
      <GoAAppHeader heading="Test heading" url="test" />
    );

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
  });
});
