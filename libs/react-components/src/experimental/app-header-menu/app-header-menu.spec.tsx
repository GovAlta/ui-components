import { render } from "@testing-library/react";
import { GoabxAppHeaderMenu } from "./app-header-menu";
import { describe, it, expect } from "vitest";

describe("GoabxAppHeaderMenu", () => {
  it("should render with heading", () => {
    const { container } = render(<GoabxAppHeaderMenu heading="Menu label" />);

    const el = container.querySelector("goa-app-header-menu");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("Menu label");
  });

  it("should render children", () => {
    const { container } = render(
      <GoabxAppHeaderMenu heading="Menu label">
        <a href="#dashboard">Dashboard</a>
        <a href="#accounts">Accounts</a>
      </GoabxAppHeaderMenu>,
    );

    const el = container.querySelector("goa-app-header-menu");
    expect(el).toBeTruthy();
    expect(el?.querySelector("a[href='#dashboard']")).toBeTruthy();
    expect(el?.querySelector("a[href='#accounts']")).toBeTruthy();
  });

  it("should render all properties", () => {
    const { container } = render(
      <GoabxAppHeaderMenu heading="Menu label" leadingIcon="search" testId="my-menu" />,
    );

    const el = container.querySelector("goa-app-header-menu");
    expect(el?.getAttribute("heading")).toBe("Menu label");
    expect(el?.getAttribute("leadingicon")).toBe("search");
    expect(el?.getAttribute("testid")).toBe("my-menu");
  });

  it("should render without leadingIcon", () => {
    const { container } = render(<GoabxAppHeaderMenu heading="Menu label" />);

    const el = container.querySelector("goa-app-header-menu");
    expect(el?.getAttribute("leadingicon")).toBeNull();
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabxAppHeaderMenu heading="Menu label" data-grid="row">
        Content
      </GoabxAppHeaderMenu>,
    );

    const el = container.querySelector("goa-app-header-menu");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });
});
