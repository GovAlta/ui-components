import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/dom";

import { GoARadioGroup, GoARadioItem } from "./radio-group";

type MockData = {
  title: string;
  helperText: string;
  disabled: boolean;
  value: string;
  labelPosition: string;

  required: boolean;
  requiredErrorMessage: string;

  radios: { text: string, value: string }[];
}

const noop = (name: string, value: string) => {}

describe("RadioGroup", () => {
  const baseMockData: MockData = {
    title: "mock title",
    value: "",
    helperText: "mock helper text",
    disabled: false,
    labelPosition: "after",
    required: true,
    requiredErrorMessage: "mock required error message",

    radios: [
      { text: "Apples", value: "apples" },
      { text: "Oranges", value: "oranges" },
      { text: "Bananas", value: "bananas" },
    ],
  };

  describe("Basic rendering", () => {
    it("should render successfully", async () => {
      const data = baseMockData;
      const { baseElement } = render(<GoARadioGroup
        name="fruits"
        disabled={data.disabled}
        value={data.value}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        onChange={noop}
      >
        {data.radios.map((radio) => (
          <GoARadioItem
            key={radio.value}
            label={radio.text}
            name="fruits"
            checked={data.value === radio.value}
            value={radio.value}
          >
            {radio.text}
          </GoARadioItem>
        ))}
      </GoARadioGroup>);

      expect(baseElement).toBeTruthy();
      const el = baseElement.querySelector("goa-radio-group");
      expect(el).toBeTruthy();

      expect(el?.getAttribute("mt")).toBe("s");
      expect(el?.getAttribute("mr")).toBe("m");
      expect(el?.getAttribute("mb")).toBe("l");
      expect(el?.getAttribute("ml")).toBe("xl");
    });
  });

  describe("Initial data", () => {
    const selectedValue = "oranges";

    it("initial data is set", async () => {
      const data = baseMockData;
      render(<GoARadioGroup
        name="fruits"
        disabled={data.disabled}
        value={data.value}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        onChange={noop}
      >
        {data.radios.map((radio) => (
          <GoARadioItem
            key={radio.value}
            label={radio.text}
            name="fruits"
            checked={data.value === radio.value}
            value={radio.value}
          >
            {radio.text}
          </GoARadioItem>
        ))}
      </GoARadioGroup>);
      

      const radios =
        document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });
  });

  describe("Selection Change Tests", () => {
    it("event should not fire when disabled", async () => {
      const onChange = vi.fn();
      const data = { ...baseMockData, value: "oranges", disabled: true };

      const { container } = render(<GoARadioGroup
        name="fruits"
        disabled={data.disabled}
        value={data.value}
        onChange={(name, newValue) => onChange(name, newValue)}
      >
        {data.radios.map((radio) => (
          <GoARadioItem
            key={radio.value}
            label={radio.text}
            name="fruits"
            checked={data.value === radio.value}
            value={radio.value}
          >
            {radio.text}
          </GoARadioItem>
        ))}
      </GoARadioGroup>);
    
      await waitFor(() => {
        const radios = container.querySelectorAll<HTMLInputElement>("goa-radio-item");
        expect(radios[0]).toBeTruthy();
        fireEvent.click(radios[0]);
        expect(onChange).not.toBeCalled();
      });
    });
  });

  it("change event should work", async () => {
    const onChange = vi.fn();
    const data = { ...baseMockData, value: "oranges" };
    const { container } = render(<GoARadioGroup
      name="fruits"
      value={data.value}
      onChange={onChange}
    >
      {data.radios.map((radio) => (
        <GoARadioItem
          key={radio.value}
          label={radio.text}
          name="fruits"
          checked={data.value === radio.value}
          value={radio.value}
        >
          {radio.text}
        </GoARadioItem>
      ))}
    </GoARadioGroup>);
    
    const radios = container.querySelectorAll<HTMLInputElement>("goa-radio-item");
    const radioGroup = container.querySelector("goa-radio-group");

    expect(radios[0]).toBeTruthy();
    radioGroup && fireEvent(
      radioGroup,
      new CustomEvent("_change", { detail: { name: "fruits", value: radios[0].value} })
    );

    await waitFor(() => {
      expect(onChange).toBeCalled();
    })
  });

});
