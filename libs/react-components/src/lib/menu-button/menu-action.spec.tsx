import { render } from "@testing-library/react";

import { GoabMenuAction } from "./menu-action";

describe("GoabMenuAction", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabMenuAction text="Action" action="test-action" />);
    expect(baseElement).toBeTruthy();
  });

  it("should render with required properties", () => {
    const { container } = render(<GoabMenuAction text="Test Action" action="test-action" />);
    const el = container.querySelector("goa-menu-action");

    expect(el?.getAttribute("text")).toBe("Test Action");
    expect(el?.getAttribute("action")).toBe("test-action");
  });

  it("should render with icon", () => {
    const { container } = render(
      <GoabMenuAction text="Action with Icon" action="icon-action" icon="add" />
    );
    const el = container.querySelector("goa-menu-action");

    expect(el?.getAttribute("text")).toBe("Action with Icon");
    expect(el?.getAttribute("action")).toBe("icon-action");
    expect(el?.getAttribute("icon")).toBe("add");
  });

  it("should render with testId", () => {
    const { container } = render(
      <GoabMenuAction text="Testable Action" action="testable-action" testId="test-menu-action" />
    );
    const el = container.querySelector("goa-menu-action");

    expect(el?.getAttribute("text")).toBe("Testable Action");
    expect(el?.getAttribute("action")).toBe("testable-action");
    expect(el?.getAttribute("testid")).toBe("test-menu-action");
  });

  it("should render with all properties", () => {
    const { container } = render(
      <GoabMenuAction
        text="Complete Action"
        action="complete-action"
        icon="checkmark"
        testId="complete-test"
      />
    );
    const el = container.querySelector("goa-menu-action");

    expect(el?.getAttribute("text")).toBe("Complete Action");
    expect(el?.getAttribute("action")).toBe("complete-action");
    expect(el?.getAttribute("icon")).toBe("checkmark");
    expect(el?.getAttribute("testid")).toBe("complete-test");
  });
});