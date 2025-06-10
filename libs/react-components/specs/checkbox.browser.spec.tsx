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
});
