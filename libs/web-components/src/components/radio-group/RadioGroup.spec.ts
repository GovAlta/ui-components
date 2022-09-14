import "@testing-library/jest-dom";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoARadioGroup from "./RadioGroupWrapper.test.svelte";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("GoARadioGroup Component", () => {
  it("should render", async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroup, {
      name: "favcolor",
      value: "orange",
      testid: "test-id",
      items,
    });

    await waitFor(() => {
      for (const item of items) {
        const radio = result.queryByTestId(`radio-option-${item}`);
        expect(radio).toBeTruthy();
        const input = radio.querySelector("input");
        expect(input).toHaveAttribute("name", "favcolor");
      }
    });

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBe(0);
    });
    mock.mockRestore();
  });

  it("should handle the events", async () => {
    const items = ["red", "blue", "orange"];
    const result = render(GoARadioGroup, {
      name: "favcolor3",
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
});
