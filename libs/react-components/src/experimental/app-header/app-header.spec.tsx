import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { GoabxAppHeader } from "./app-header";
import { describe, it, expect, vi } from "vitest";

describe("GoabxAppHeader", () => {
  it("should render with version 2", () => {
    const { container } = render(<GoabxAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("version")).toBe("2");
  });

  it("should render all properties", () => {
    const { container } = render(
      <GoabxAppHeader
        heading="Service name"
        secondaryText="Beta"
        url="https://example.com"
        maxContentWidth="800px"
        fullMenuBreakpoint={1024}
        testId="my-header"
      />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("heading")).toBe("Service name");
    expect(el?.getAttribute("secondarytext")).toBe("Beta");
    expect(el?.getAttribute("url")).toBe("https://example.com");
    expect(el?.getAttribute("maxcontentwidth")).toBe("800px");
    expect(el?.getAttribute("fullmenubreakpoint")).toBe("1024");
    expect(el?.getAttribute("testid")).toBe("my-header");
    expect(el?.getAttribute("version")).toBe("2");
  });

  it("should set hasmenuclickhandler to false when no handler provided", () => {
    const { container } = render(<GoabxAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("hasmenuclickhandler")).toBe("false");
  });

  it("should set hasmenuclickhandler to true and dispatch event when handler provided", () => {
    const onMenuClick = vi.fn();
    const { container } = render(
      <GoabxAppHeader heading="Test heading" onMenuClick={onMenuClick} />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("hasmenuclickhandler")).toBe("true");

    el && fireEvent(el, new CustomEvent("_menuClick"));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it("should render children into the slot", () => {
    const { container } = render(
      <GoabxAppHeader heading="Test heading">
        <div data-testid="child-content">Navigation content</div>
      </GoabxAppHeader>,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.querySelector("[data-testid='child-content']")).toBeTruthy();
  });

  it("should pass secondaryText as the secondarytext attribute", () => {
    const { container } = render(
      <GoabxAppHeader heading="Test heading" secondaryText="Environment label" />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("secondarytext")).toBe("Environment label");
  });

  it("should not set secondarytext when not provided", () => {
    const { container } = render(<GoabxAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("secondarytext")).toBeNull();
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabxAppHeader heading="Test heading" data-grid="row" />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });
});
