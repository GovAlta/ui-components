import { render } from "@testing-library/react";
import { GoabAppHeader } from "./app-header";

describe("GoabAppHeader", () => {
  it("should render", () => {
    const { baseElement } = render(<GoabAppHeader heading="Test heading" url="test" />);

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
    expect(header?.getAttribute("hasmenuclickhandler")).toBe("false");
  });

  it("should dispatch onMobileMenuClick if provided", () => {
    const onMobileMenuClick = vi.fn();
    const { baseElement } = render(
      <GoabAppHeader heading="Test heading" url="test" onMenuClick={onMobileMenuClick} />,
    );

    const header = baseElement.querySelector("goa-app-header");
    expect(header).toBeTruthy();
    expect(header?.getAttribute("hasmenuclickhandler")).toBe("true");
    header?.dispatchEvent(new Event("_menuClick"));
    expect(onMobileMenuClick).toHaveBeenCalled();
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabAppHeader
        heading="Test heading"
        url="test"
        data-grid="row"
      />,
    );
    const el = baseElement.querySelector("goa-app-header");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });
});
