import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/dom";

import { GoabRadioGroup, GoabRadioItem } from "./radio-group";
import { GoabRadioGroupOnChangeDetail } from "../../common/types";

type MockData = {
  title: string;
  helperText: string;
  disabled: boolean;
  value: string;
  labelPosition: string;

  required: boolean;
  requiredErrorMessage: string;

  radios: { text: string; value: string; description?: string | React.ReactNode }[];
};

const noop = (detail: GoabRadioGroupOnChangeDetail) => {
  /* do nothing */
};

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
      { text: "Oranges", value: "oranges", description: "Oranges are orange" },
      { text: "Bananas", value: "bananas", description: <h3>Bananas are banana</h3> },
    ],
  };

  describe("Basic rendering", () => {
    it("should render successfully", async () => {
      const data = baseMockData;
      const { baseElement } = render(
        <GoabRadioGroup
          name="fruits"
          disabled={data.disabled}
          value={data.value}
          mt="s"
          mr="m"
          mb="l"
          ml="xl"
          ariaLabel={"please select fruit"}
          onChange={noop}
        >
          {data.radios.map((radio) => (
            <GoabRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
              ariaLabel={"you are choosing " + radio.value}
            >
              {radio.text}
            </GoabRadioItem>
          ))}
        </GoabRadioGroup>,
      );
      expect(baseElement).toBeTruthy();
      const el = baseElement.querySelector("goa-radio-group");
      expect(el).toBeTruthy();

      expect(el?.getAttribute("mt")).toBe("s");
      expect(el?.getAttribute("mr")).toBe("m");
      expect(el?.getAttribute("mb")).toBe("l");
      expect(el?.getAttribute("ml")).toBe("xl");
      expect(el?.getAttribute("name")).toBe("fruits");
      expect(el?.getAttribute("arialabel")).toBe("please select fruit");
      expect(el?.getAttribute("disabled")).toBe("false");
      expect(el?.getAttribute("error")).toBe("false");

      const radios = document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.getAttribute("arialabel")).toBe("you are choosing " + radio.value);
      });
    });
  });

  describe("Initial data", () => {
    const selectedValue = "oranges";

    it("initial data is set", async () => {
      const data = baseMockData;
      render(
        <GoabRadioGroup
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
            <GoabRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
            >
              {radio.text}
            </GoabRadioItem>
          ))}
        </GoabRadioGroup>,
      );

      const radios = document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });

    it("render with description", async () => {
      const data = baseMockData;
      const result = render(
        <GoabRadioGroup
          name="fruits"
          disabled={data.disabled}
          value={data.value}
          onChange={noop}
        >
          {data.radios.map((radio) => (
            <GoabRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
              description={radio.description}
            >
              {radio.text}
            </GoabRadioItem>
          ))}
        </GoabRadioGroup>,
      );

      const radios = document.querySelectorAll("goa-radio-item");
      expect(radios[0].getAttribute("description")).toBe(null);
      expect(radios[1].getAttribute("description")).toBe("Oranges are orange");
      expect(
        result.container.querySelector("div[slot='description']")?.innerHTML,
      ).toContain("Bananas are banana");
    });
  });

  describe("Selection Change Tests", () => {
    it("event should not fire when disabled", async () => {
      const onChange = vi.fn();
      const data = { ...baseMockData, value: "oranges", disabled: true };

      const { container } = render(
        <GoabRadioGroup
          name="fruits"
          disabled={data.disabled}
          value={data.value}
          onChange={(event: GoabRadioGroupOnChangeDetail) => onChange(event)}
        >
          {data.radios.map((radio) => (
            <GoabRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
            >
              {radio.text}
            </GoabRadioItem>
          ))}
        </GoabRadioGroup>,
      );

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
    const { container } = render(
      <GoabRadioGroup name="fruits" value={data.value} onChange={onChange}>
        {data.radios.map((radio) => (
          <GoabRadioItem
            key={radio.value}
            label={radio.text}
            name="fruits"
            checked={data.value === radio.value}
            value={radio.value}
          >
            {radio.text}
          </GoabRadioItem>
        ))}
      </GoabRadioGroup>,
    );

    const radios = container.querySelectorAll<HTMLInputElement>("goa-radio-item");
    const radioGroup = container.querySelector("goa-radio-group");

    expect(radios[0]).toBeTruthy();
    radioGroup &&
      fireEvent(
        radioGroup,
        new CustomEvent("_change", {
          detail: { name: "fruits", value: radios[0].value },
        }),
      );

    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });
});
