import { render } from "@testing-library/react";
import { GoabAppHeader } from "./app-header";

describe("GoABAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(<GoabAppHeader heading="Test heading" url="test" />);

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
  });
  it("should dispatch onMobileMenuClick if provided", () => {
    const onMobileMenuClick = vi.fn();
    const { baseElement } = render(
      <GoAAppHeader heading="Test heading" url="test" onMenuClick={onMobileMenuClick} />
    );

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
    header?.dispatchEvent(new Event("_menuClick"));
    expect(onMobileMenuClick).toHaveBeenCalled();
  })
});
