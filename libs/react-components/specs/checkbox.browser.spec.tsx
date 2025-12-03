import { render } from "vitest-browser-react";
import { GoabCheckbox } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";
import { userEvent } from "@vitest/browser/context";

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
    // a,b,c,d: 2x2 transformation identity matrix
    expect(beforeStyles.transform).toBe("matrix(1, 0, 0, 1, -22, -22)");

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

  it("passes the browser event in change detail", async () => {
    const handleChange = vi.fn();
    const result = render(
      <GoabCheckbox
        testId="event-checkbox"
        name="event"
        value="event-checkbox"
        text="Event checkbox"
        onChange={handleChange}
      />,
    );

    const checkbox = result.getByTestId("event-checkbox");

    await vi.waitFor(async () => {
      const checkboxEl = checkbox.element() as HTMLElement;
      expect(checkboxEl).toBeTruthy();
      await userEvent.click(checkboxEl);
    });

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      const detail = handleChange.mock.calls[0][0];
      expect(detail.name).toBe("event");
      expect(detail.value).toBe("event-checkbox");
      expect(detail.checked).toBe(true);
      expect(detail.event).toBeInstanceOf(Event);
    });
  });
});
