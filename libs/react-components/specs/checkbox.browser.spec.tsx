import { render } from "vitest-browser-react";
import { GoabCheckbox } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";

describe("Checkbox", () => {
  it("should handle _change fired inside reveal slot without affecting parent checkbox value", async () => {
    const Component = () => {
      const [parentCheckbox, setParentCheckbox] = useState(false);
      const [childCheckbox, setChildCheckbox] = useState(false);

      return (
        <div>
          <span data-testid="parent-checkbox-value">
            {parentCheckbox ? "true" : "false"}
          </span>
          <span data-testid="child-checkbox-value">
            {childCheckbox ? "true" : "false"}
          </span>
          <GoabCheckbox
            testId="parent-checkbox"
            name="parent"
            checked={parentCheckbox}
            text="Parent"
            onChange={(e) => setParentCheckbox(e.checked)}
            reveal={
              <>
                <GoabCheckbox
                  testId="child-checkbox"
                  name="child"
                  checked={childCheckbox}
                  text="Child item"
                  value="Child"
                  onChange={(e) => setChildCheckbox(e.checked)}
                />
              </>
            }
          />
        </div>
      );
    };

    const result = render(<Component />);

    // Initial state
    const parentValue = result.getByTestId("parent-checkbox-value");
    const childValue = result.getByTestId("child-checkbox-value");

    expect(parentValue.element().textContent).toBe("false");
    expect(childValue.element().textContent).toBe("false");

    // First, check the parent checkbox to reveal the child checkbox
    const parentCheckbox = result.getByTestId("parent-checkbox");
    await parentCheckbox.click();

    await vi.waitFor(() => {
      expect(parentValue.element().textContent).toBe("true");
      expect(childValue.element().textContent).toBe("false");
    });

    // Now click child checkbox (it should be visible now)
    const childCheckbox = result.getByTestId("child-checkbox");
    await childCheckbox.click();

    // child should be checked, parent should remain checked
    await vi.waitFor(() => {
      expect(childValue.element().textContent).toBe("true");
      expect(parentValue.element().textContent).toBe("true");
    });

    // Click child checkbox again to uncheck it
    await childCheckbox.click();

    await vi.waitFor(() => {
      expect(childValue.element().textContent).toBe("false");
      expect(parentValue.element().textContent).toBe("true");
    });

    // Uncheck parent checkbox
    await parentCheckbox.click();

    await vi.waitFor(() => {
      expect(parentValue.element().textContent).toBe("false");
      expect(childValue.element().textContent).toBe("false");
    });
  });

  it("should have a 44px x 44px touch target area", async () => {
    const result = render(
      <GoabCheckbox testId="test-checkbox" name="test" text="Test Checkbox" />
    );

    const checkbox = result.getByTestId("test-checkbox");
    await vi.waitFor(() => {
      expect(checkbox.element()).toBeTruthy();
    });

    const container = checkbox.element().querySelector(".container") as HTMLElement;
    expect(container).toBeTruthy();

    // Get computed styles for the ::before pseudo-element (touch target)
    const beforeStyles = window.getComputedStyle(container, "::before");

    // Verify the touch target dimensions
    expect(beforeStyles.width).toBe("44px");
    expect(beforeStyles.height).toBe("44px");
    expect(beforeStyles.position).toBe("absolute");

    // Verify the container itself has position: relative for proper positioning context
    const containerStyles = window.getComputedStyle(container);
    expect(containerStyles.position).toBe("relative");

    // Verify the actual visual size of the container (24px) vs touch target (44px)
    const containerRect = container.getBoundingClientRect();
    expect(containerRect.width).toBe(24); // Visual checkbox is 24px
    expect(containerRect.height).toBe(24); // Visual checkbox is 24px

    // Verify the transform is applied correctly for centering
    // CSS: transform: translate(-50%, -50%) converts to matrix(a, b, c, d, tx, ty)
    // Matrix breakdown:
    //   - (1, 0, 0, 1) = identity matrix (no scaling/rotation)
    //   - (-22, -22) = translate by -22px in X and Y directions
    // Math: 50% of 44px = 22px, so translate(-50%, -50%) = translate(-22px, -22px)
    // Regex explanation:
    //   - matrix\(1, 0, 0, 1, = identity matrix
    //   - -2[0-9.]+ = negative number starting with -2 (e.g., -22, -23.6)
    //   - Flexible pattern accounts for border widths and sub-pixel rendering
    expect(beforeStyles.transform).toMatch(/matrix\(1, 0, 0, 1, -2[0-9.]+, -2[0-9.]+\)/);

    // Check ::after pseudo-element (should not interfere with touch target)
    const afterStyles = window.getComputedStyle(container, "::after");
    // ::after should not have conflicting dimensions or positioning
    expect(afterStyles.position).not.toBe("absolute");

    // Final verification: Check that all styles are applied and rendered
    // After the page is fully loaded and all CSS is computed
    await vi.waitFor(() => {
      const finalContainerStyles = window.getComputedStyle(container);
      const finalBeforeStyles = window.getComputedStyle(container, "::before");

      // Verify final computed styles match expectations
      expect(finalContainerStyles.position).toBe("relative");
      expect(finalBeforeStyles.width).toBe("44px");
      expect(finalBeforeStyles.height).toBe("44px");
    });
  });
});
