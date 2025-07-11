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
              setIsDisabled(!isDisabled);
            }}
          >
            {isDisabled ? "Enable" : "Disable"}
          </GoabButton>

          <div data-testid="selected-value">{selectedValue}</div>
        </div>
      );
    };

    const result = render(<Component />);

    // Check that radio inputs are actually disabled
    await vi.waitFor(async () => {
      // Get the goa-radio-item elements
      const radioItems = result.container.querySelectorAll("goa-radio-item");
      expect(radioItems.length).toBe(2);

      // Access the shadow root of each radio item to find the elements with data-testid
      const appleRadio = radioItems[0];
      const bananaRadio = radioItems[1];

      const appleShadow = appleRadio.shadowRoot;
      const bananaShadow = bananaRadio.shadowRoot;

      expect(appleShadow).toBeTruthy();
      expect(bananaShadow).toBeTruthy();

      // Verify the radio inputs are disabled
      const appleInput = appleShadow?.querySelector(
        "input[type='radio']",
      ) as HTMLInputElement;
      const bananaInput = bananaShadow?.querySelector(
        "input[type='radio']",
      ) as HTMLInputElement;

      expect(appleInput?.hasAttribute("disabled")).toBe(true);
      expect(bananaInput?.hasAttribute("disabled")).toBe(true);

      // Try to click a radio item - it should not work when disabled
      await appleInput?.click();

      // Wait a moment and check that no value was selected
      await vi.waitFor(() => {
        const selectedValue = result.getByTestId("selected-value");
        expect(selectedValue.element().textContent).toBe("");
      });

      // Click the toggle button to enable the radio group
      const toggleButton = result.getByTestId("toggle-button");
      await toggleButton.click();

      // Check that radio inputs are now enabled
      await vi.waitFor(() => {
        expect(appleInput?.hasAttribute("disabled")).toBe(false);
        expect(bananaInput?.hasAttribute("disabled")).toBe(false);
      });

      // Now try to click a radio item - it should work when enabled
      await appleInput?.click();

      // Check that the value was selected
      await vi.waitFor(() => {
        const selectedValue = result.getByTestId("selected-value");
        expect(selectedValue.element().textContent).toBe("apple");
      });

      // Click the toggle button again to disable the radio group
      await toggleButton.click();

      // Check that radio inputs are disabled again
      await vi.waitFor(() => {
        expect(appleInput?.hasAttribute("disabled")).toBe(true);
        expect(bananaInput?.hasAttribute("disabled")).toBe(true);
      });

      // Try to click a different radio item - it should not work when disabled
      await bananaInput?.click();

      // Check that the value didn't change (should still be apple)
      await vi.waitFor(() => {
        const selectedValue = result.getByTestId("selected-value");
        expect(selectedValue.element().textContent).toBe("apple");
      });
    });
  });
});
