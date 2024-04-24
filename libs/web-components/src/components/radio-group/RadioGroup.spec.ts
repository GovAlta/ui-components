import { fireEvent, render } from "@testing-library/svelte";
import GoARadioGroup from "./RadioGroup.svelte";
import GoARadioGroupWrapper from "./RadioGroupWrapper.test.svelte";
import { describe, it, expect, vi } from "vitest";
import {tick} from "svelte";

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

    await tick();

    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    expect(goaRadioItems.length).toBe(3);

    items.forEach((item, index) => {
      expect(goaRadioItems[index].getAttribute("value")).toBe(item);
      expect(goaRadioItems[index].getAttribute("value")).toBe(item);
      expect(goaRadioItems[index].getAttribute("ariadescribedby"))
          .toBe(`description-favcolor-${index}`);
      expect(goaRadioItems[index].getAttribute("arialabel")).toBe("favcolor");
      if (index === 2) {
        expect(goaRadioItems[index].getAttribute("checked")).toBe("true");
      } else {
        expect(goaRadioItems[index].getAttribute("checked")).toBe("false");
      }
    });
  });

  it("should select a value programmatically", async () => {
    // Arrange
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    await tick();
    const goaRadioItems = result.container.querySelectorAll("goa-radio-item");
    expect(goaRadioItems.length).toBe(3);
    // Orange is selected at the beginning
    expect(goaRadioItems[2].getAttribute("checked")).toBe("true");
    expect(goaRadioItems[0].getAttribute("checked")).toBe("false");
    expect(goaRadioItems[1].getAttribute("checked")).toBe("false");

    // Act
    // Select red value (1st option)
    await fireEvent.click(await result.findByTestId("set-value"));
    await tick();
    // Assert
    expect(goaRadioItems[0].getAttribute("checked")).toBe("true");
    expect(goaRadioItems[1].getAttribute("checked")).toBe("false");
    expect(goaRadioItems[2].getAttribute("checked")).toBe("false");
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
