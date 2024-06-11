import { fireEvent, render, waitFor } from "@testing-library/svelte";
import GoARadioGroup from "./RadioGroup.svelte";
import GoARadioGroupWrapper from "./RadioGroupWrapper.test.svelte";
import { describe, it, expect, vi } from "vitest";
import { tick } from "svelte";

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

    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    expect(goaRadioItems.length).toBe(3);

    await waitFor(() => {
      items.forEach((item, index) => {
        const el = goaRadioItems[index];

        expect(el.getAttribute("value")).toBe(item);
        expect(el.getAttribute("ariadescribedby")).toBe(`description-favcolor-${index}`);
        expect(el.getAttribute("arialabel")).toBe("favcolor");

        if (index === 2) {
          expect(el.getAttribute("checked")).toBe("true");
        } else {
          expect(el.getAttribute("checked")).toBe("false");
        }
      });
    });
  })

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
    })
  });

  // FIXME: unable to get the progress check working. Child events aren't able to be triggered
  it.skip("should handle the events", async () => {
    const mockOnChange = vi.fn();
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    await tick();

    const radioGroup = await result.findByTestId("test-id");

    radioGroup.addEventListener("_change", mockOnChange);
    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    await fireEvent.click(goaRadioItems[0]);
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
