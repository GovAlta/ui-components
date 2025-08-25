import { render } from "@testing-library/react";

import GoabAppHeaderMenu from "./app-header-menu";

describe("AppHeaderMenu", () => {
  it("should render with no children", () => {
    const { baseElement } = render(<GoabAppHeaderMenu heading="Some label" />);
    const el = baseElement.querySelector("goa-app-header-menu");

    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("Some label");
  });

  it("should render children", () => {
    const { baseElement } = render(
      <GoabAppHeaderMenu heading="Some label">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
      </GoabAppHeaderMenu>,
    );
    const el = baseElement.querySelector("goa-app-header-menu");
    expect(el).toBeTruthy();
    expect(el?.querySelector("a[href='#foo']")).toBeTruthy();
    expect(el?.querySelector("a[href='#bar']")).toBeTruthy();
    expect(el?.querySelector("a[href='#boom']")).toBeFalsy();
  });

  it("should set the props correctly", () => {
    const { baseElement } = render(
      <GoabAppHeaderMenu heading="Some label" leadingIcon="search" testId="foo" />,
    );
    const el = baseElement.querySelector("goa-app-header-menu");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("Some label");
    expect(el?.getAttribute("leadingIcon")).toBe("search");
    expect(el?.getAttribute("testid")).toBe("foo");
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabAppHeaderMenu
        heading="Test heading"
        data-grid="row"
      >
        Content
      </GoabAppHeaderMenu>,
    );
    const el = baseElement.querySelector("goa-app-header-menu");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });
});
