import { render } from "@testing-library/react";
import { GoabDataGrid } from "./data-grid";

describe("GoabDataGrid", () => {
  it("should create component and render goa-data-grid with projected content", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>,
    );

    const el = container.querySelector("goa-data-grid");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("Test content");
    expect(el?.getAttribute("keyboard-icon-visibility")).toBe("visible");
    expect(el?.getAttribute("keyboard-icon-position")).toBe("left");
    expect(el?.getAttribute("keyboard-nav")).toBe("table");
  });

  it("should hide keyboard icon when keyboardIconVisibility is hidden", () => {
    const { container } = render(
      <GoabDataGrid keyboardIconVisibility="hidden" keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>,
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-icon-visibility")).toBe("hidden");
  });

  it("should set keyboard icon position to right", () => {
    const { container } = render(
      <GoabDataGrid keyboardIconPosition="right" keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>,
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-icon-position")).toBe("right");
  });

  it("should set keyboardNav to table mode", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="table">
        <div>Test content</div>
      </GoabDataGrid>,
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-nav")).toBe("table");
  });

  it("should set keyboardNav to layout mode", () => {
    const { container } = render(
      <GoabDataGrid keyboardNav="layout">
        <div>Test content</div>
      </GoabDataGrid>,
    );

    const el = container.querySelector("goa-data-grid");
    expect(el?.getAttribute("keyboard-nav")).toBe("layout");
  });
});
