import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { GoabAppHeader } from "./app-header";
import { GoabAppHeaderMenu } from "../app-header-menu/app-header-menu";
import { describe, it, expect, vi } from "vitest";

describe("GoabAppHeader", () => {
  it("should render with version 2", () => {
    const { container } = render(<GoabAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("version")).toBe("2");
  });

  it("should render all properties", () => {
    const { container } = render(
      <GoabAppHeader
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
    const { container } = render(<GoabAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("hasmenuclickhandler")).toBe("false");
  });

  it("should set hasmenuclickhandler to true and dispatch event when handler provided", () => {
    const onMenuClick = vi.fn();
    const { container } = render(
      <GoabAppHeader heading="Test heading" onMenuClick={onMenuClick} />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("hasmenuclickhandler")).toBe("true");

    el && fireEvent(el, new CustomEvent("_menuClick"));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it("should render children into the slot", () => {
    const { container } = render(
      <GoabAppHeader heading="Test heading">
        <div data-testid="child-content">Navigation content</div>
      </GoabAppHeader>,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.querySelector("[data-testid='child-content']")).toBeTruthy();
  });

  it("should pass secondaryText as the secondarytext attribute", () => {
    const { container } = render(
      <GoabAppHeader heading="Test heading" secondaryText="Environment label" />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("secondarytext")).toBe("Environment label");
  });

  it("should not set secondarytext when not provided", () => {
    const { container } = render(<GoabAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("secondarytext")).toBeNull();
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabAppHeader heading="Test heading" data-grid="row" />,
    );

    const el = container.querySelector("goa-app-header");
    expect(el?.getAttribute("data-grid")).toBe("row");
  });

  it("should render banner prop into a div with slot='banner'", () => {
    const { container } = render(
      <GoabAppHeader heading="Test heading" banner={<span>Banner content</span>} />,
    );

    const slot = container.querySelector("goa-app-header div[slot='banner']");
    expect(slot?.textContent).toBe("Banner content");
  });

  it("should render phase prop into a div with slot='phase'", () => {
    const { container } = render(
      <GoabAppHeader heading="Test heading" phase={<span>Beta</span>} />,
    );

    const slot = container.querySelector("goa-app-header div[slot='phase']");
    expect(slot?.textContent).toBe("Beta");
  });

  it("should render navigation prop as direct slotted items", () => {
    const { container } = render(
      <GoabAppHeader
        heading="Test heading"
        navigation={
          <>
            <a href="/home">Home</a>
            <GoabAppHeaderMenu heading="Menu">
              <a href="/help">Help</a>
            </GoabAppHeaderMenu>
          </>
        }
      />,
    );

    const el = container.querySelector("goa-app-header");
    const navigationItems = el?.querySelectorAll(":scope > [slot='navigation']");
    expect(navigationItems).toHaveLength(2);
    expect(navigationItems?.[0].textContent).toBe("Home");
    expect(navigationItems?.[1].tagName).toBe("GOA-APP-HEADER-MENU");
    expect(el?.querySelector("div[slot='navigation']")).toBeNull();
  });

  it("should render utilities prop as direct slotted items", () => {
    const { container } = render(
      <GoabAppHeader
        heading="Test heading"
        utilities={
          <>
            <button type="button">Help</button>
            <button type="button">Account</button>
          </>
        }
      />,
    );

    const el = container.querySelector("goa-app-header");
    const utilityItems = el?.querySelectorAll(":scope > [slot='utilities']");
    expect(utilityItems).toHaveLength(2);
    expect(utilityItems?.[0].textContent).toBe("Help");
    expect(utilityItems?.[1].textContent).toBe("Account");
    expect(el?.querySelector("div[slot='utilities']")).toBeNull();
  });

  it("should update utilities prop content when it changes", () => {
    const { container, rerender } = render(
      <GoabAppHeader
        heading="Test heading"
        utilities={<button type="button">Sign in</button>}
      />,
    );

    expect(
      container.querySelector("goa-app-header > [slot='utilities']")?.textContent,
    ).toBe("Sign in");

    rerender(
      <GoabAppHeader
        heading="Test heading"
        utilities={
          <>
            <button type="button">Help</button>
            <a href="/account">Account</a>
          </>
        }
      />,
    );

    const utilityItems = container.querySelectorAll(
      "goa-app-header > [slot='utilities']",
    );
    expect(utilityItems).toHaveLength(2);
    expect(utilityItems[0].textContent).toContain("Help");
    expect(utilityItems[1].textContent).toContain("Account");
  });

  it("should not render slot divs when slot props are not provided", () => {
    const { container } = render(<GoabAppHeader heading="Test heading" />);

    const el = container.querySelector("goa-app-header");
    expect(el?.querySelector("div[slot='banner']")).toBeNull();
    expect(el?.querySelector("div[slot='phase']")).toBeNull();
    expect(el?.querySelector("div[slot='navigation']")).toBeNull();
    expect(el?.querySelector("div[slot='utilities']")).toBeNull();
  });
});
