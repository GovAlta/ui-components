import { render } from "vitest-browser-react";
import { GoabxCheckboxList, GoabxCheckbox } from "../src/experimental";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";
import { userEvent } from "@vitest/browser/context";

describe("CheckboxList V2", () => {
  it("should render with version 2 set on the web component", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabxCheckboxList name="test-list" testId="checkbox-list">
            <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
          </GoabxCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    const container = result.getByTestId("container");
    const checkboxList = result.getByTestId("checkbox-list");

    expect(container).toBeTruthy();
    expect(checkboxList).toBeTruthy();

    // V2 wrapper should set version="2" on the web component
    const wcElement = container.element().querySelector("goa-checkbox-list") as any;
    expect(wcElement).toBeTruthy();
    expect(wcElement.version).toBe("2");
  });

  it("should handle checkbox selection and state management", async () => {
    const Component = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div data-testid="container">
          <span data-testid="selected-values">{selectedValues.join(",")}</span>
          <GoabxCheckboxList
            name="test-list"
            testId="checkbox-list"
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
            <GoabxCheckbox name="option3" text="Option 3" testId="checkbox-3" />
          </GoabxCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    const selectedValues = result.getByTestId("selected-values");
    const checkbox1 = result.getByTestId("checkbox-1");
    const checkbox2 = result.getByTestId("checkbox-2");

    // Initial state should be empty
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("");
    });

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
          <GoabxCheckboxList
            name="test-list"
            testId="checkbox-list"
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
            <GoabxCheckbox name="option3" text="Option 3" testId="checkbox-3" />
          </GoabxCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    const selectedValues = result.getByTestId("selected-values");
    const setValuesBtn = result.getByTestId("set-values-btn");
    const clearValuesBtn = result.getByTestId("clear-values-btn");

    // Initial state should be empty
    await vi.waitFor(() => {
      expect(selectedValues.element().textContent).toBe("");
    });

    // Set values programmatically
    await setValuesBtn.click();
    await vi.waitFor(
      () => {
        const text = selectedValues.element().textContent || "";
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
          <GoabxCheckboxList
            name="test-list"
            testId="checkbox-list"
            disabled={isDisabled}
            value={selectedValues}
            onChange={(detail) => setSelectedValues(detail.value)}
          >
            <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
            <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
          </GoabxCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    const selectedValues = result.getByTestId("selected-values");
    const disabledState = result.getByTestId("disabled-state");
    const toggleBtn = result.getByTestId("toggle-disabled-btn");
    const checkbox1 = result.getByTestId("checkbox-1");

    // Initially not disabled - should be able to click
    await vi.waitFor(() => {
      expect(disabledState.element().textContent).toBe("enabled");
    });

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

  it("should propagate disabled state to child checkboxes on mount", async () => {
    const Component = () => (
      <GoabxCheckboxList name="test-list" testId="checkbox-list" disabled={true}>
        <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
        <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
      </GoabxCheckboxList>
    );

    const result = render(<Component />);

    // Verify child checkboxes are disabled (label gets 'disabled' class)
    const checkbox1 = result.getByTestId("checkbox-1");
    const checkbox2 = result.getByTestId("checkbox-2");
    await vi.waitFor(() => {
      const checkbox1El = checkbox1.element() as HTMLElement;
      const checkbox2El = checkbox2.element() as HTMLElement;
      expect(checkbox1El.classList.contains("disabled")).toBe(true);
      expect(checkbox2El.classList.contains("disabled")).toBe(true);
    });
  });

  it("should propagate error state to child checkboxes on mount", async () => {
    const Component = () => (
      <GoabxCheckboxList name="test-list" testId="checkbox-list" error={true}>
        <GoabxCheckbox name="option1" text="Option 1" testId="checkbox-1" />
        <GoabxCheckbox name="option2" text="Option 2" testId="checkbox-2" />
      </GoabxCheckboxList>
    );

    const result = render(<Component />);

    // Verify child checkboxes have error state (label gets 'error' class)
    const checkbox1 = result.getByTestId("checkbox-1");
    const checkbox2 = result.getByTestId("checkbox-2");
    await vi.waitFor(() => {
      const checkbox1El = checkbox1.element() as HTMLElement;
      const checkbox2El = checkbox2.element() as HTMLElement;
      expect(checkbox1El.classList.contains("error")).toBe(true);
      expect(checkbox2El.classList.contains("error")).toBe(true);
    });
  });

  it("passes the browser event in change detail", async () => {
    const onChange = vi.fn();

    const Component = () => (
      <GoabxCheckboxList
        name="event-list"
        testId="event-checkbox-list"
        onChange={onChange}
      >
        <GoabxCheckbox name="event-option1" text="Option 1" testId="event-checkbox-1" />
      </GoabxCheckboxList>
    );

    const result = render(<Component />);
    const checkbox = result.getByTestId("event-checkbox-1");

    await userEvent.click(checkbox);

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      const detail = onChange.mock.calls[0][0];
      expect(detail.name).toBe("event-list");
      expect(detail.value).toEqual(["event-option1"]);
      expect(detail.event).toBeInstanceOf(Event);
    });
  });

  it("should support compact size", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabxCheckboxList
            name="compact-list"
            testId="compact-checkbox-list"
            size="compact"
          >
            <GoabxCheckbox
              name="option1"
              text="Option 1"
              size="compact"
              testId="compact-checkbox-1"
            />
            <GoabxCheckbox
              name="option2"
              text="Option 2"
              size="compact"
              testId="compact-checkbox-2"
            />
          </GoabxCheckboxList>
        </div>
      );
    };

    const result = render(<Component />);

    const container = result.getByTestId("container");
    expect(container).toBeTruthy();

    const wcElement = container.element().querySelector("goa-checkbox-list") as any;
    expect(wcElement).toBeTruthy();
    expect(wcElement.size).toBe("compact");
  });
});
