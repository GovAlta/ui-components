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
});