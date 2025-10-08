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

  it("should have a 44px x 44px touch target area", async () => {
    const result = render(
      <GoabRadioGroup name="test" value="">
        <GoabRadioItem name="test" value="option1" label="Option 1" />
      </GoabRadioGroup>
    );

    const radioInput = result.getByTestId("radio-option-option1");
    await vi.waitFor(() => {
      expect(radioInput.element()).toBeTruthy();
    });

    // Get the parent label element and find the .icon element
    const label = radioInput.element().closest("label");
    expect(label).toBeTruthy();

    const icon = label?.querySelector(".icon") as HTMLElement;
    expect(icon).toBeTruthy();

    // Get computed styles for the ::before pseudo-element (touch target)
    const beforeStyles = window.getComputedStyle(icon, "::before");

    // Verify the touch target dimensions
    expect(beforeStyles.width).toBe("44px");
    expect(beforeStyles.height).toBe("44px");
    expect(beforeStyles.position).toBe("absolute");

    // Verify the icon itself has position: relative for proper positioning context
    const iconStyles = window.getComputedStyle(icon);
    expect(iconStyles.position).toBe("relative");

    // Verify the actual visual size of the icon (24px) vs touch target (44px)
    const iconRect = icon.getBoundingClientRect();
    expect(iconRect.width).toBe(24); // Visual icon is 24px
    expect(iconRect.height).toBe(24); // Visual icon is 24px

    // Verify the transform is applied correctly for centering
    // CSS: transform: translate(-50%, -50%) converts to matrix(a, b, c, d, tx, ty)
    // a,b,c,d: 2x2 transformation identity matrix
    expect(beforeStyles.transform).toBe("matrix(1, 0, 0, 1, -22, -22)");

    // Check ::after pseudo-element (should not interfere with touch target)
    const afterStyles = window.getComputedStyle(icon, "::after");
    // ::after should not have conflicting dimensions or positioning
    expect(afterStyles.position).not.toBe("absolute");

    // Final verification: Check that all styles are applied and rendered
    // After the page is fully loaded and all CSS is computed
    await vi.waitFor(() => {
      const finalIconStyles = window.getComputedStyle(icon);
      const finalBeforeStyles = window.getComputedStyle(icon, "::before");

      // Verify final computed styles match expectations
      expect(finalIconStyles.position).toBe("relative");
      expect(finalBeforeStyles.width).toBe("44px");
      expect(finalBeforeStyles.height).toBe("44px");
    });
  });
});
