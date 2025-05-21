import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GoabPublicFormPage } from "./public-form-page";
import {
  GoabPublicFormPageOnFieldsetChangeDetail,
  GoabPublicFormPageOnCompleteDetail,
  GoabPublicFormPageOnContinueDetail,
  GoabFieldsetItemState,
  GoabFormDispatchOn
} from "@abgov/ui-components-common";

describe("GoabPublicFormPage", () => {
  it("renders with all properties", () => {
    const { baseElement } = render(
      <GoabPublicFormPage
        id="testPage"
        heading="Test Heading"
        subHeading="Test Subheading"
        summaryHeading="Test Summary"
        sectionTitle="Test Section"
        backUrl="/back"
        type="step"
        buttonText="Continue"
        buttonVisibility="visible"
        first={true}
        last={false}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    expect(el?.getAttribute("id")).toBe("testPage");
    expect(el?.getAttribute("heading")).toBe("Test Heading");
    expect(el?.getAttribute("sub-heading")).toBe("Test Subheading");
    expect(el?.getAttribute("summary-heading")).toBe("Test Summary");
    expect(el?.getAttribute("section-title")).toBe("Test Section");
    expect(el?.getAttribute("back-url")).toBe("/back");
    expect(el?.getAttribute("type")).toBe("step");
    expect(el?.getAttribute("button-text")).toBe("Continue");
    expect(el?.getAttribute("button-visibility")).toBe("visible");
    expect(el?.hasAttribute("first")).toBe(true);
    expect(el?.hasAttribute("last")).toBe(false);
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.textContent).toBe("Test content");
  });

  it("handles onContinue event", () => {
    const handleContinue = vi.fn();
    const { baseElement } = render(
      <GoabPublicFormPage onContinue={handleContinue}>
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    const mockState: Record<string, GoabFieldsetItemState> = {
      field1: {
        name: "field1",
        label: "Field 1",
        value: "test",
        order: 1
      }
    };
    const detail: GoabPublicFormPageOnContinueDetail = {
      el: el as HTMLElement,
      state: mockState,
      cancelled: false
    };
    const event = new CustomEvent("_continue", { detail });
    el?.dispatchEvent(event);

    expect(handleContinue).toHaveBeenCalledWith(detail);
  });

  it("handles onBack event", () => {
    const handleBack = vi.fn();
    const { baseElement } = render(
      <GoabPublicFormPage onBack={handleBack}>
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    const event = new CustomEvent("_back");
    el?.dispatchEvent(event);

    expect(handleBack).toHaveBeenCalled();
  });

  it("handles onFieldsetChange event", () => {
    const handleFieldsetChange = vi.fn();
    const { baseElement } = render(
      <GoabPublicFormPage onFieldsetChange={handleFieldsetChange}>
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    const mockState: Record<string, GoabFieldsetItemState> = {
      field1: {
        name: "field1",
        label: "Field 1",
        value: "test",
        order: 1
      }
    };
    const detail: GoabPublicFormPageOnFieldsetChangeDetail = {
      id: "testPage",
      state: {
        heading: "Test Heading",
        data: mockState
      },
      dispatchOn: "change" as GoabFormDispatchOn
    };
    const event = new CustomEvent("_fieldsetChange", { detail });
    el?.dispatchEvent(event);

    expect(handleFieldsetChange).toHaveBeenCalledWith(detail);
  });

  it("handles onComplete event", () => {
    const handleComplete = vi.fn();
    const { baseElement } = render(
      <GoabPublicFormPage onComplete={handleComplete}>
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    const mockState: Record<string, GoabFieldsetItemState> = {
      field1: {
        name: "field1",
        label: "Field 1",
        value: "test",
        order: 1
      }
    };
    const detail: GoabPublicFormPageOnCompleteDetail = {
      el: el as HTMLElement,
      state: mockState,
      cancelled: false
    };
    const event = new CustomEvent("_complete", { detail });
    el?.dispatchEvent(event);

    expect(handleComplete).toHaveBeenCalledWith(detail);
  });

  it("removes event listeners on unmount", () => {
    const handleContinue = vi.fn();
    const handleBack = vi.fn();
    const handleFieldsetChange = vi.fn();
    const handleComplete = vi.fn();
    
    const { baseElement, unmount } = render(
      <GoabPublicFormPage
        onContinue={handleContinue}
        onBack={handleBack}
        onFieldsetChange={handleFieldsetChange}
        onComplete={handleComplete}
      >
        <div>Test content</div>
      </GoabPublicFormPage>
    );

    const el = baseElement.querySelector("goa-public-form-page");
    unmount();

    // After unmount, events should not trigger callbacks
    const mockState: Record<string, GoabFieldsetItemState> = {
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
        state: mockState,
        cancelled: false
      }
    });
    const backEvent = new CustomEvent("_back");
    const fieldsetChangeEvent = new CustomEvent("_fieldsetChange", {
      detail: {
        id: "testPage",
        state: {
          heading: "Test Heading",
          data: mockState
        },
        dispatchOn: "change" as GoabFormDispatchOn
      }
    });
    const completeEvent = new CustomEvent("_complete", {
      detail: {
        el: el as HTMLElement,
        state: mockState,
        cancelled: false
      }
    });

    el?.dispatchEvent(continueEvent);
    el?.dispatchEvent(backEvent);
    el?.dispatchEvent(fieldsetChangeEvent);
    el?.dispatchEvent(completeEvent);

    expect(handleContinue).not.toHaveBeenCalled();
    expect(handleBack).not.toHaveBeenCalled();
    expect(handleFieldsetChange).not.toHaveBeenCalled();
    expect(handleComplete).not.toHaveBeenCalled();
  });
});
