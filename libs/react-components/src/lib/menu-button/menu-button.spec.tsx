import { render } from "@testing-library/react";

import { GoabMenuButton } from "./menu-button";
import { GoabMenuAction } from "./menu-action";

describe("GoabMenuButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabMenuButton text="Menu Button" />);
    expect(baseElement).toBeTruthy();
  });

  it("should render with default type primary", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBe("Menu Button");
    expect(el?.getAttribute("type")).toBe("primary");
  });

  it("should render with specified type", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" type="secondary" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBe("Menu Button");
    expect(el?.getAttribute("type")).toBe("secondary");
  });

  it("should render with testId", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" testId="test-menu-button" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("testid")).toBe("test-menu-button");
  });

  it("should render with children", () => {
    const { container } = render(
      <GoabMenuButton text="Menu Button">
        <GoabMenuAction text="Action 1" action="action1" />
        <GoabMenuAction text="Action 2" action="action2" />
      </GoabMenuButton>
    );
    const el = container.querySelector("goa-menu-button");
    const menuActions = container.querySelectorAll("goa-menu-action");

    expect(el).toBeTruthy();
    expect(menuActions).toHaveLength(2);
    expect(menuActions[0]?.getAttribute("text")).toBe("Action 1");
    expect(menuActions[0]?.getAttribute("action")).toBe("action1");
    expect(menuActions[1]?.getAttribute("text")).toBe("Action 2");
    expect(menuActions[1]?.getAttribute("action")).toBe("action2");
  });

  it("should render with all properties", () => {
    const { container } = render(
      <GoabMenuButton text="Advanced Menu" type="tertiary" testId="advanced-menu" />
    );
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBe("Advanced Menu");
    expect(el?.getAttribute("type")).toBe("tertiary");
    expect(el?.getAttribute("testid")).toBe("advanced-menu");
  });

  it("should render with size compact", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" size="compact" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("size")).toBe("compact");
  });

  it("should render with size normal", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" size="normal" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("size")).toBe("normal");
  });

  it("should not render size attribute when not provided", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("size")).toBeNull();
  });

  it("should render without text for icon-only mode", () => {
    const { container } = render(<GoabMenuButton leadingIcon="ellipsis-horizontal" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBeNull();
    expect(el?.getAttribute("leading-icon")).toBe("ellipsis-horizontal");
    expect(el?.getAttribute("aria-label")).toBeNull();
  });

  it("should render with leading icon and text", () => {
    const { container } = render(
      <GoabMenuButton text="More" leadingIcon="ellipsis-horizontal" />
    );
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBe("More");
    expect(el?.getAttribute("leading-icon")).toBe("ellipsis-horizontal");
  });

  it("should render icon-only with size compact", () => {
    const { container } = render(
      <GoabMenuButton leadingIcon="ellipsis-horizontal" size="compact" />
    );
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("text")).toBeNull();
    expect(el?.getAttribute("leading-icon")).toBe("ellipsis-horizontal");
    expect(el?.getAttribute("size")).toBe("compact");
  });

  it("should render with variant destructive", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" variant="destructive" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("variant")).toBe("destructive");
  });

  it("should not render variant attribute when not provided", () => {
    const { container } = render(<GoabMenuButton text="Menu Button" />);
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("variant")).toBeNull();
  });

  it("should render icon-only with custom ariaLabel", () => {
    const { container } = render(
      <GoabMenuButton ariaLabel="Actions for John Smith" />
    );
    const el = container.querySelector("goa-menu-button");

    expect(el?.getAttribute("aria-label")).toBe("Actions for John Smith");
  });
});
