import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GoabFieldset } from "./fieldset";
import { GoabFieldsetOnContinueDetail, GoabFieldsetItemState } from "@abgov/ui-components-common";

describe("GoabFieldset", () => {
  it("renders with all properties", () => {
    const { baseElement } = render(
      <GoabFieldset
        id="testFieldset"
        sectionTitle="Test Section"
        dispatchOn="change"
      >
        <div>Test content</div>
      </GoabFieldset>
    );

    const el = baseElement.querySelector("goa-fieldset");
    expect(el?.getAttribute("id")).toBe("testFieldset");
    expect(el?.getAttribute("section-title")).toBe("Test Section");
    expect(el?.getAttribute("dispatch-on")).toBe("change");
    expect(el?.textContent).toBe("Test content");
  });

  it("handles onContinue event", () => {
    const handleContinue = vi.fn();
    const { baseElement } = render(
      <GoabFieldset onContinue={handleContinue}>
        <div>Test content</div>
      </GoabFieldset>
    );

    const el = baseElement.querySelector("goa-fieldset");
    const detail: GoabFieldsetOnContinueDetail = {
      el: el as HTMLElement,
      state: {
        field1: {
          name: "field1",
          label: "Field 1",
          value: "test",
          order: 1
        }
      },
      cancelled: false
    };
    const event = new CustomEvent("_continue", { detail });
    el?.dispatchEvent(event);

    expect(handleContinue).toHaveBeenCalledWith(detail);
  });

  it("removes event listeners on unmount", () => {
    const handleContinue = vi.fn();
    const { baseElement, unmount } = render(
      <GoabFieldset onContinue={handleContinue}>
        <div>Test content</div>
      </GoabFieldset>
    );

    const el = baseElement.querySelector("goa-fieldset");
    unmount();

    // After unmount, events should not trigger callbacks
    const mockData: Record<string, GoabFieldsetItemState> = {
      field1: {
        name: "field1",
        label: "Field 1",
        value: "test",
        order: 1
      }
    };
    const continueEvent = new CustomEvent("_continue", {
      detail: {
        el: el as HTMLElement,
        state: mockData,
        cancelled: false
      }
    });
    el?.dispatchEvent(continueEvent);

    expect(handleContinue).not.toHaveBeenCalled();
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabFieldset
        data-grid="cell"
      >
        <div>Test content</div>
      </GoabFieldset>
    );
    const el = baseElement.querySelector("goa-fieldset");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
