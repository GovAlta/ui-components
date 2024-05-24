import { render } from "@testing-library/react";
import { ABGovAppHeader } from "./app-header";

describe("ABGovAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(
      <ABGovAppHeader heading="Test heading" url="test" />
    );

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
  });
});
