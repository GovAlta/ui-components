import { render } from "@testing-library/react";

import GoAAppHeaderMenu from "./app-header-menu";

describe("AppHeaderMenu", () => {
  it("should render with no children", () => {
    const { baseElement } = render(<GoAAppHeaderMenu heading="Some label" />);
    const el = baseElement.querySelector("goa-app-header-menu");

    expect(el).toBeTruthy();
    expect(el.getAttribute("heading")).toBe("Some label");
  });

  it("should render children", () => {
    const { baseElement } = render(
      <GoAAppHeaderMenu heading="Some label">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
      </GoAAppHeaderMenu>
    );
    const el = baseElement.querySelector("goa-app-header-menu");
    expect(el).toBeTruthy();
    expect(el?.querySelector("a[href='#foo']")).toBeTruthy();
    expect(el?.querySelector("a[href='#bar']")).toBeTruthy();
    expect(el?.querySelector("a[href='#boom']")).toBeFalsy();
  });
});
