import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import GoARadioGroup from "./RadioGroup.svelte";
import GoARadioGroupWrapper from "./RadioGroupWrapper.test.svelte";

afterEach(() => {
  // cleanup();
  jest.clearAllMocks();
});

describe("GoARadioGroup Component", () => {
  it("should render", async () => {
    const name = "favcolor";
    const mock = jest.spyOn(console, "error").mockImplementation();
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    await waitFor(() => {
      for (const item of items) {
        const label = result.queryByTestId(`radio-option-${item}`);
        expect(label).toBeTruthy()
      }
    })

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBe(0);
    });
    mock.mockRestore();
  });

  it("should handle the events", async () => {
    const name = "favcolor";
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroupWrapper, {
      name,
      value: "orange",
      testid: "test-id",
      items,
    });

    const radioGroup = await result.findByTestId("test-id");

    // initial state
    await waitFor(() => {
      const orange = radioGroup.querySelector<HTMLInputElement>(
        "input[type=radio][value=orange]",
      );
      const red = radioGroup.querySelector<HTMLInputElement>(
        "input[type=radio][value=red]",
      );
      expect(red.checked).toBe(false);
      expect(orange.checked).toBe(true);

      fireEvent.click(red);
      expect(red.checked).toBe(true);
      expect(orange.checked).toBe(false);
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
      expect(radiogroup).toHaveStyle("margin-top:var(--goa-spacing-s)");
      expect(radiogroup).toHaveStyle("margin-right:var(--goa-spacing-m)");
      expect(radiogroup).toHaveStyle("margin-bottom:var(--goa-spacing-l)");
      expect(radiogroup).toHaveStyle("margin-left:var(--goa-spacing-xl)");
    });
  });
});

