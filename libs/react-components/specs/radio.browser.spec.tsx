import { render } from "vitest-browser-react";
import { GoabButton, GoabRadioGroup, GoabRadioItem } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";
import React from "react";

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
});
