import { render } from "vitest-browser-react";
import { GoabButton, GoabRadioGroup, GoabRadioItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";
import { waitFor } from "@testing-library/react";

// No-operation function
const noop = () => {
  // noop
};

describe("Radio", () => {
  it("should enable and disable radio group programmatically", async () => {

    const Component = () => {
      const [isDisabled, setIsDisabled] = useState(true);
      const [selectedValue, setSelectedValue] = useState("");

      return (
        <div>
          <GoabRadioGroup
            name="fruits"
            disabled={isDisabled}
            value={selectedValue}
            onChange={(e) => {
              setSelectedValue(e.value);
            }}
          >
            <GoabRadioItem name="fruits" value="apple" label="Apple" />
            <GoabRadioItem name="fruits" value="banana" label="Banana" />
          </GoabRadioGroup>

          <GoabButton
            testId="toggle-button"
            onClick={() => {
              setIsDisabled((value) => !value);
            }}
          >
            {isDisabled ? "Enable" : "Disable"}
          </GoabButton>

          <div data-testid="selected-value">{selectedValue}</div>
        </div>
      );
    };

    const result = render(<Component />);
    const radioItems = result.getByTestId(/^radio-option-.*/);

    // Check that radio inputs are actually disabled
    await vi.waitFor(async () => {
      expect(radioItems.elements().length).toBe(2);
    });

    for (const item of radioItems.elements()) {
      expect((item as HTMLInputElement).disabled).toBeTruthy();
    }

    // Try to click a radio item - it should not work when disabled
    for (const item of radioItems.elements()) {
      (item as HTMLInputElement).click();
    }

    // check that no value was selected
    await vi.waitFor(() => {
      const selectedValue = result.getByTestId("selected-value");
      expect(selectedValue.element().textContent).toBe("");
    });

    // Click the toggle button to enable the radio group
    const toggleButton = result.getByTestId("toggle-button");
    await toggleButton.click();

    // Check that radio inputs are now enabled
    for (const item of radioItems.elements()) {
      expect((item as HTMLInputElement).disabled).toBeFalsy();
    }

    // Now try to click a radio item - it should work when enabled
    const appleRadioItem = radioItems.elements()[0];
    (appleRadioItem as HTMLInputElement).click();

    // Check that the value was selected
    await vi.waitFor(() => {
      const selectedValue = result.getByTestId("selected-value");
      expect(selectedValue.element().textContent).toBe("apple");
    });

    // Click the toggle button again to disable the radio group
    await toggleButton.click();

    // Check that radio inputs are disabled again
    for (const item of radioItems.elements()) {
      expect((item as HTMLInputElement).disabled).toBeTruthy();
    }

    // Try to click a different radio item - it should not work when disabled
    const bananaRadioItem = radioItems.elements()[0];
    (bananaRadioItem as HTMLInputElement).click();

    // Check that the value didn't change (should still be apple)
    await vi.waitFor(() => {
      const selectedValue = result.getByTestId("selected-value");
      expect(selectedValue.element().textContent).toBe("apple");
    });
  });

  describe("String Values", () => {

    it("should render with string values", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" onChange={noop}>
            <GoabRadioItem name="options" value="1" label="Option 1" />
            <GoabRadioItem name="options" value="2" label="Option 2" />
            <GoabRadioItem name="options" value="3" label="Option 3" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        expect(radioItems.elements().length).toBe(3);

        // Check that the values are correctly set as numbers
        ["1", "2", "3"].forEach((value, index) => {
          const item = radioItems.elements()[index] as HTMLInputElement;
          expect(item.value).toBe(value);
        });
      });
    });

    it("should handle selection of string values", async () => {
      // Setup
      const onChange = vi.fn();
      const Component = () => {
        return (
          <div>
            <GoabRadioGroup name="options" testId="radio-group" onChange={onChange}>
              <GoabRadioItem name="options" value="1" label="Option 1" />
              <GoabRadioItem name="options" value="2" label="Option 2" />
              <GoabRadioItem name="options" value="3" label="Option 3" />
            </GoabRadioGroup>
          </div>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/radio-option-.*/);

      // Actions
      await waitFor(async () => {
        const option2 = radioItems.elements()[1] as HTMLInputElement;
        option2.click();
      })

      // Result
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
          name: "options",
          value: "2"
        }));
      })
    });

    it("should initialize with a string value", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" value="2" onChange={noop}>
            <GoabRadioItem name="options" value="1" label="Option 1" />
            <GoabRadioItem name="options" value="2" label="Option 2" />
            <GoabRadioItem name="options" value="3" label="Option 3" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        const items = radioItems.elements() as HTMLInputElement[];
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(true); // Option 2 should be checked
        expect(items[2].checked).toBe(false);
      });
    });
  });


  describe("Number Values", () => {
    it("should render with number values", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" onChange={noop}>
            <GoabRadioItem name="options" value={1} label="Option 1" />
            <GoabRadioItem name="options" value={2} label="Option 2" />
            <GoabRadioItem name="options" value={3} label="Option 3" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        expect(radioItems.elements().length).toBe(3);

        // Check that the values are correctly set as numbers
        [1, 2, 3].forEach((num, index) => {
          const item = radioItems.elements()[index] as HTMLInputElement;
          expect(item.value).toBe(num.toString());
        });
      });
    });

    it("should handle selection of number values", async () => {
      // Setup
      const onChange = vi.fn();
      const Component = () => {
        return (
          <div>
            <GoabRadioGroup name="options" testId="radio-group" onChange={onChange}>
              <GoabRadioItem name="options" value={1} label="Option 1" />
              <GoabRadioItem name="options" value={2} label="Option 2" />
              <GoabRadioItem name="options" value={3} label="Option 3" />
            </GoabRadioGroup>
          </div>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/radio-option-.*/);

      // Actions
      await waitFor(async () => {
        const option2 = radioItems.elements()[1] as HTMLInputElement;
        option2.click();
      })

      // Result
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
          name: "options",
          value: 2
        }));
      })
    });

    it("should initialize with a number value", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" value={2} onChange={noop}>
            <GoabRadioItem name="options" value={1} label="Option 1" />
            <GoabRadioItem name="options" value={2} label="Option 2" />
            <GoabRadioItem name="options" value={3} label="Option 3" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        const items = radioItems.elements() as HTMLInputElement[];
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(true); // Option 2 should be checked
        expect(items[2].checked).toBe(false);
      });
    });
  });

  describe("Boolean Values", () => {

    it("should render with boolean values", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" onChange={noop}>
            <GoabRadioItem name="options" value={true} label="True" />
            <GoabRadioItem name="options" value={false} label="False" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        expect(radioItems.elements().length).toBe(2);

        // Check that the values are correctly set as booleans
        const trueItem = radioItems.elements()[0] as HTMLInputElement;
        const falseItem = radioItems.elements()[1] as HTMLInputElement;

        expect(trueItem.value).toBe("true");
        expect(falseItem.value).toBe("false");
      });
    });

    it("should handle selection of boolean values", async () => {
      // Setup
      const onChange = vi.fn();
      const Component = () => {
        return (
          <div>
            <GoabRadioGroup name="options" testId="radio-group" onChange={onChange}>
              <GoabRadioItem name="options" value={true} label="True" />
              <GoabRadioItem name="options" value={false} label="False" />
            </GoabRadioGroup>
          </div>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Actions
      await waitFor(async () => {
        const falseOption = radioItems.elements()[1] as HTMLInputElement;
        falseOption.click();
      })

      // Result
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        name: "options",
        value: false
      }));
    });

    it("should initialize with a boolean value", async () => {
      // Setup
      const Component = () => {
        return (
          <GoabRadioGroup name="options" testId="radio-group" value={false} onChange={noop}>
            <GoabRadioItem name="options" value={true} label="True" />
            <GoabRadioItem name="options" value={false} label="False" />
          </GoabRadioGroup>
        );
      };

      const result = render(<Component />);
      const radioItems = result.getByTestId(/^radio-option-.*/);

      // Result
      await vi.waitFor(() => {
        const items = radioItems.elements() as HTMLInputElement[];
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(true); // False option should be checked
      });
    });
  });
});
