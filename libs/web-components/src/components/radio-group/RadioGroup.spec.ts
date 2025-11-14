import { fireEvent, render, waitFor } from "@testing-library/svelte";
import GoARadioGroup from "./RadioGroup.svelte";
import GoARadioGroupWrapper from "./RadioGroupWrapper.test.svelte";
import { describe, it, expect, vi } from "vitest";

describe("GoARadioGroup Component", () => {
  it("should render", async () => {
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });
    const radioGroupDiv = result.container.querySelector("[role='radiogroup']");
    expect(radioGroupDiv?.getAttribute("aria-label")).toBe(""); // If no aria-label is defined, we don't fall back to name

    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    expect(goaRadioItems.length).toBe(3);
    await waitFor(() => {
      items.forEach((item, index) => {
        const el = goaRadioItems[index];

        expect(el.getAttribute("value")).toBe(item);
        if (index === 2) {
          expect(el.getAttribute("checked")).toBe("true");
        } else {
          expect(el.getAttribute("checked")).toBe("false");
        }
      });
    });
  });

  it("should render with accessibility attributes", async () => {
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
      radioGroupAriaLabel: "please choose a color",
    });

    const radioGroupDiv = result.container.querySelector("[role='radiogroup']");
    expect(radioGroupDiv?.getAttribute("aria-label")).toBe(
      "please choose a color",
    );

    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    expect(goaRadioItems.length).toBe(3);
    await waitFor(() => {
      items.forEach((item, index) => {
        const el = goaRadioItems[index];

        expect(el.getAttribute("value")).toBe(item);
        expect(el.getAttribute("arialabel")).toBe(
          "you are choosing color " + item,
        );
        if (index === 2) {
          expect(el.getAttribute("checked")).toBe("true");
        } else {
          expect(el.getAttribute("checked")).toBe("false");
        }
      });
    });
  });

  it("should select the preset value", async () => {
    // Arrange
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    await waitFor(async () => {
      expect(goaRadioItems.length).toBe(3);

      // Orange is selected at the beginning
      expect(goaRadioItems[0].getAttribute("checked")).toBe("false");
      expect(goaRadioItems[1].getAttribute("checked")).toBe("false");
      expect(goaRadioItems[2].getAttribute("checked")).toBe("true");
    });
  });

  it("includes the original event in _change detail when selection changes", async () => {
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    const radioGroup = result.container.querySelector("[role='radiogroup']");
    const changeEvents: CustomEvent[] = [];

    radioGroup?.addEventListener("_change", (e: Event) => {
      changeEvents.push(e as CustomEvent);
    });

    await waitFor(() => {
      const radioItems = result.container.querySelectorAll("goa-radio-item");
      expect(radioItems.length).toBe(items.length);
    });

    const radioEvent = new CustomEvent("_radioItemChange", {
      bubbles: true,
      composed: true,
      detail: { value: "red", label: "red" },
    });

    radioGroup?.dispatchEvent(radioEvent);

    await waitFor(() => {
      expect(changeEvents.length).toBe(1);
      const detail = changeEvents.at(-1)?.detail as
        | { value?: string; event?: Event }
        | undefined;
      expect(detail?.value).toBe("red");
      expect(detail?.event).toBe(radioEvent);
    });
  });

  // FIXME: radio group doesn't hear child event
  it.skip("should handle the events", async () => {
    const mockOnChange = vi.fn();
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      items,
    });

    const radioGroup = result.container.querySelector("goa-radio-group");
    radioGroup?.addEventListener("_change", mockOnChange);

    const radioItems = result.container.querySelectorAll("goa-radio-item");
    expect(radioItems.length).toBe(3);
    await fireEvent.click(radioItems[0]);
    await fireEvent.change(radioItems[0]);
    await waitFor(() => {
      expect(mockOnChange).toBeCalled();
    });
  });

  // FIXME: this test passes on a dev machine, but fails in the Github action
  it.skip("should show the error state when it is changed", async () => {
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      items,
    });
    const button = result.queryByTestId("set-error");
    expect(button).toBeTruthy();
    button && (await fireEvent.click(button));

    await waitFor(() => {
      const radioItem = result.container.querySelector("goa-radio-item");
      expect(radioItem).toBeTruthy();
      expect(radioItem?.getAttribute("error")).toBe("true");
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoARadioGroup, {
        testid: "radiogroup-test",
        name: "test",
        value: "",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const radiogroup = await baseElement.findByTestId("radiogroup-test");

      expect(radiogroup).toBeTruthy();
      // @ts-expect-error: can't find method
      expect(radiogroup).toHaveStyle("margin-top:var(--goa-space-s)");
      // @ts-expect-error: can't find method
      expect(radiogroup).toHaveStyle("margin-right:var(--goa-space-m)");
      // @ts-expect-error: can't find method
      expect(radiogroup).toHaveStyle("margin-bottom:var(--goa-space-l)");
      // @ts-expect-error: can't find method
      expect(radiogroup).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
