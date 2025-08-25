import { render } from "@testing-library/react";
import { GoabDataGrid } from "./data-grid";

describe("GoabDataGrid", () => {
  it("should create component and render goa-data-grid with projected content", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>
    );

    const el = container.querySelector("goa-data-grid");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("Test content");
    expect(el?.getAttribute("keyboard-icon")).toBe("true");
    expect(el?.getAttribute("keyboard-nav")).toBe("table");
  });

  it("should remove keyboard-icon attribute when set to false", () => {
    const { container } = render(
      <GoabDataGrid keyboardIcon={false} keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.hasAttribute("keyboard-icon")).toBe(false);
    expect(el?.getAttribute("keyboard-icon")).toBeNull();
  });

  it("should set keyboardNav to table mode", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-nav")).toBe("table");
  });

  it("should set keyboardNav to layout mode", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="layout">
        <div>Test content</div>
      </GoabDataGrid>
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-nav")).toBe("layout");
  });
});
