import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GoabPublicForm } from "./public-form";
import { GoabFormState, GoabPublicFormOnInitDetail } from "@abgov/ui-components-common";

describe("GoabPublicForm", () => {
  it("renders with all properties", () => {
    const { baseElement } = render(
      <GoabPublicForm
        status="complete"
        name="testForm"
      >
        <div>Test content</div>
      </GoabPublicForm>
    );

    const el = baseElement.querySelector("goa-public-form");
    expect(el?.getAttribute("status")).toBe("complete");
    expect(el?.getAttribute("name")).toBe("testForm");
    expect(el?.textContent).toBe("Test content");
  });

  it("handles onInit event", () => {
    const handleInit = vi.fn();
    const { baseElement } = render(
      <GoabPublicForm onInit={handleInit}>
        <div>Test content</div>
      </GoabPublicForm>
    );

    const el = baseElement.querySelector("goa-public-form");
    const mockFormElement = document.createElement("form");
    const detail: GoabPublicFormOnInitDetail = {
      el: mockFormElement
    };
    const event = new CustomEvent("_init", { detail });
    el?.dispatchEvent(event);

    expect(handleInit).toHaveBeenCalledWith(detail);
  });

  it("handles onComplete event", () => {
    const handleComplete = vi.fn();
    const { baseElement } = render(
      <GoabPublicForm onComplete={handleComplete}>
        <div>Test content</div>
      </GoabPublicForm>
    );

    const el = baseElement.querySelector("goa-public-form");
    const mockFormState: GoabFormState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "complete"
    };
    const event = new CustomEvent("_complete", { detail: mockFormState });
    el?.dispatchEvent(event);

    expect(handleComplete).toHaveBeenCalledWith(mockFormState);
  });

  it("handles onStateChange event", () => {
    const handleStateChange = vi.fn();
    const { baseElement } = render(
      <GoabPublicForm onStateChange={handleStateChange}>
        <div>Test content</div>
      </GoabPublicForm>
    );

    const el = baseElement.querySelector("goa-public-form");
    const mockFormState: GoabFormState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "complete"
    };
    const event = new CustomEvent("_stateChange", { 
      detail: { data: mockFormState }
    });
    el?.dispatchEvent(event);

    expect(handleStateChange).toHaveBeenCalledWith(mockFormState);
  });

  it("removes event listeners on unmount", () => {
    const handleInit = vi.fn();
    const handleComplete = vi.fn();
    const handleStateChange = vi.fn();
    
    const { baseElement, unmount } = render(
      <GoabPublicForm
        onInit={handleInit}
        onComplete={handleComplete}
        onStateChange={handleStateChange}
      >
        <div>Test content</div>
      </GoabPublicForm>
    );

    const el = baseElement.querySelector("goa-public-form");
    unmount();

    // After unmount, events should not trigger callbacks
    const mockFormElement = document.createElement("form");
    const initEvent = new CustomEvent("_init", { 
      detail: { el: mockFormElement }
    });
    
    const mockFormState: GoabFormState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "complete"
    };
    
    const completeEvent = new CustomEvent("_complete", { 
      detail: mockFormState
    });
    
    const stateChangeEvent = new CustomEvent("_stateChange", { 
      detail: { data: mockFormState }
    });

    el?.dispatchEvent(initEvent);
    el?.dispatchEvent(completeEvent);
    el?.dispatchEvent(stateChangeEvent);

    expect(handleInit).not.toHaveBeenCalled();
    expect(handleComplete).not.toHaveBeenCalled();
    expect(handleStateChange).not.toHaveBeenCalled();
  });
});
