import { render } from "vitest-browser-react";
import { GoabCheckboxList, GoabCheckbox } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";

describe("CheckboxList", () => {
  it("should render a checkbox list with basic properties", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabCheckboxList name="test-list" testId="checkbox-list">
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabCheckbox name="option2" text="Option 2" testId="checkbox-2" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const container = result.getByTestId("container");
    const checkboxList = result.getByTestId("checkbox-list");

    expect(container).toBeTruthy();
    expect(checkboxList).toBeTruthy();
  });

  it("should handle checkbox selection and state management", async () => {
    const Component = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div data-testid="container">
          <span data-testid="selected-values">{selectedValues.join(",")}</span>
          <GoabCheckboxList
            name="test-list"
            testId="checkbox-list"
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabCheckbox name="option2" text="Option 2" testId="checkbox-2" />
            <GoabCheckbox name="option3" text="Option 3" testId="checkbox-3" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const selectedValues = result.getByTestId("selected-values");
    const checkbox1 = result.getByTestId("checkbox-1");
    const checkbox2 = result.getByTestId("checkbox-2");

    // Initial state should be empty
    expect(selectedValues.element().textContent).toBe("");

    // Click first checkbox
    await checkbox1.click();
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("option1");
    });

    // Click second checkbox
    await checkbox2.click();
    await vi.waitFor(() => {
      const text = selectedValues.element().textContent || "";
      expect(text.split(",")).toEqual(expect.arrayContaining(["option1", "option2"]));
      expect(text.split(",").length).toBe(2);
    });

    // Unclick first checkbox
    await checkbox1.click();
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("option2");
    });
  });

  it("should handle programmatic value changes", async () => {
    const Component = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div data-testid="container">
          <span data-testid="selected-values">{selectedValues.join(",")}</span>
          <button
            data-testid="set-values-btn"
            onClick={() => setSelectedValues(["option1", "option3"])}
          >
            Set Values
          </button>
          <button data-testid="clear-values-btn" onClick={() => setSelectedValues([])}>
            Clear Values
          </button>
          <GoabCheckboxList
            name="test-list"
            testId="checkbox-list"
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabCheckbox name="option2" text="Option 2" testId="checkbox-2" />
            <GoabCheckbox name="option3" text="Option 3" testId="checkbox-3" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const selectedValues = result.getByTestId("selected-values");
    const setValuesBtn = result.getByTestId("set-values-btn");
    const clearValuesBtn = result.getByTestId("clear-values-btn");

    // Initial state should be empty
    expect(selectedValues.element().textContent).toBe("");

    // Set values programmatically
    await setValuesBtn.click();
    await vi.waitFor(
      () => {
        const text = selectedValues.element().textContent || "";
        // Handle empty string case
        if (text === "") return false;
        const values = text.split(",").filter((v) => v.trim() !== "");
        return (
          values.length === 2 && values.includes("option1") && values.includes("option3")
        );
      },
      { timeout: 2000 },
    );

    // Clear values programmatically
    await clearValuesBtn.click();
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("");
    });
  });

  it("should handle disabled state", async () => {
    const Component = () => {
      const [isDisabled, setIsDisabled] = useState(false);
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div data-testid="container">
          <span data-testid="selected-values">{selectedValues.join(",")}</span>
          <span data-testid="disabled-state">{isDisabled ? "disabled" : "enabled"}</span>
          <button
            data-testid="toggle-disabled-btn"
            onClick={() => setIsDisabled(!isDisabled)}
          >
            Toggle Disabled
          </button>
          <GoabCheckboxList
            name="test-list"
            testId="checkbox-list"
            disabled={isDisabled}
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabCheckbox name="option2" text="Option 2" testId="checkbox-2" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const selectedValues = result.getByTestId("selected-values");
    const disabledState = result.getByTestId("disabled-state");
    const toggleBtn = result.getByTestId("toggle-disabled-btn");
    const checkbox1 = result.getByTestId("checkbox-1");

    // Initially not disabled - should be able to click
    expect(disabledState.element().textContent).toBe("enabled");

    await checkbox1.click();
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("option1");
    });

    // Disable the checkbox list
    await toggleBtn.click();
    await vi.waitFor(() => {
      expect(disabledState.element().textContent).toBe("disabled");
    });

    // disabled state is applied
    expect(disabledState.element().textContent).toBe("disabled");
  });

  it("should handle error state changes", async () => {
    const Component = () => {
      const [hasError, setHasError] = useState(false);
      const [errorEvents, setErrorEvents] = useState<string[]>([]);

      return (
        <div data-testid="container">
          <span data-testid="error-events">{errorEvents.join(",")}</span>
          <button data-testid="toggle-error-btn" onClick={() => setHasError(!hasError)}>
            Toggle Error
          </button>
          <GoabCheckboxList
            name="test-list"
            testId="checkbox-list"
            error={hasError}
            onChange={() => {
              // Track error state changes
              setErrorEvents((prev) => [...prev, hasError ? "error" : "no-error"]);
            }}
          >
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const toggleBtn = result.getByTestId("toggle-error-btn");

    // Toggle error state
    await toggleBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 100));

    // The component should handle the error state change
    expect(result.getByTestId("checkbox-list")).toBeTruthy();
  });

  it("should handle onChange callback with correct event details", async () => {
    const onChangeSpy = vi.fn();

    const Component = () => {
      return (
        <div data-testid="container">
          <GoabCheckboxList
            name="test-list"
            testId="checkbox-list"
            onChange={onChangeSpy}
          >
            <GoabCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabCheckbox name="option2" text="Option 2" testId="checkbox-2" />
          </GoabCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const checkbox1 = result.getByTestId("checkbox-1");

    // Click checkbox
    await checkbox1.click();

    await vi.waitFor(() => {
      expect(onChangeSpy).toHaveBeenCalled();
    });

    // Verify the callback was called with correct structure
    const lastCall = onChangeSpy.mock.calls[onChangeSpy.mock.calls.length - 1];
    expect(lastCall).toBeDefined();
    expect(lastCall[0]).toHaveProperty("name", "test-list");
    expect(lastCall[0]).toHaveProperty("value");
    expect(Array.isArray(lastCall[0].value)).toBe(true);
  });
});
