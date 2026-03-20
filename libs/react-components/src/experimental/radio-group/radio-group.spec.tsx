import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/dom";

import { GoabxRadioGroup, GoabxRadioItem } from "./radio-group";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

type MockData = {
  title: string;
  helperText: string;
  value: string;
  labelPosition: string;

  required: boolean;
  requiredErrorMessage: string;

  radios: { text: string; value: string; description?: string | React.ReactNode }[];
};

const noop = (detail: GoabRadioGroupOnChangeDetail) => {
  /* do nothing */
};

describe("GoabxRadioGroup", () => {
  const baseMockData: MockData = {
    title: "mock title",
    value: "",
    helperText: "mock helper text",
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
    it("should render", async () => {
      const data = baseMockData;
      const { baseElement } = render(
        <GoabxRadioGroup name="fruits" onChange={noop}>
          {data.radios.map((radio) => (
            <GoabxRadioItem key={radio.value} name="fruits"></GoabxRadioItem>
          ))}
        </GoabxRadioGroup>,
      );
      expect(baseElement).toBeTruthy();
      const el = baseElement.querySelector("goa-radio-group");

      expect(el?.getAttribute("name")).toBe("fruits");
      expect(el?.getAttribute("disabled")).toBeNull();
      expect(el?.getAttribute("error")).toBeNull();

      const radios = document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.getAttribute("disabled")).toBeNull();
        expect(radio.getAttribute("error")).toBeNull();
        expect(radio.getAttribute("checked")).toBeNull();
      });
    });

    it("should render with properties", async () => {
      const data = baseMockData;
      const { baseElement } = render(
        <GoabxRadioGroup
          name="fruits"
          value={data.value}
          disabled
          error
          size="compact"
          mt="s"
          mr="m"
          mb="l"
          ml="xl"
          ariaLabel={"please select fruit"}
          onChange={noop}
        >
          {data.radios.map((radio) => (
            <GoabxRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              disabled
              error
              checked
              compact
              value={radio.value}
              ariaLabel={"you are choosing " + radio.value}
            >
              {radio.text}
            </GoabxRadioItem>
          ))}
        </GoabxRadioGroup>,
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
      expect(el?.getAttribute("disabled")).toBe("true");
      expect(el?.getAttribute("error")).toBe("true");
      expect(el?.getAttribute("size")).toBe("compact");

      const radios = document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.getAttribute("arialabel")).toBe("you are choosing " + radio.value);
        expect(radio.getAttribute("disabled")).toBe("true");
        expect(radio.getAttribute("error")).toBe("true");
        expect(radio.getAttribute("checked")).toBe("true");
        expect(radio.getAttribute("compact")).toBe("true");
      });
    });
  });

  describe("Initial data", () => {
    const selectedValue = "oranges";

    it("initial data is set", async () => {
      const data = baseMockData;
      render(
        <GoabxRadioGroup
          name="fruits"
          value={data.value}
          mt="s"
          mr="m"
          mb="l"
          ml="xl"
          onChange={noop}
        >
          {data.radios.map((radio) => (
            <GoabxRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
            >
              {radio.text}
            </GoabxRadioItem>
          ))}
        </GoabxRadioGroup>,
      );

      const radios = document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });

    it("render with description", async () => {
      const data = baseMockData;
      const result = render(
        <GoabxRadioGroup name="fruits" value={data.value} onChange={noop}>
          {data.radios.map((radio) => (
            <GoabxRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
              description={radio.description}
            >
              {radio.text}
            </GoabxRadioItem>
          ))}
        </GoabxRadioGroup>,
      );

      const radios = document.querySelectorAll("goa-radio-item");
      expect(radios[0].getAttribute("description")).toBe(null);
      expect(radios[1].getAttribute("description")).toBe("Oranges are orange");
      expect(
        result.container.querySelector("div[slot='description']")?.innerHTML,
      ).toContain("Bananas are banana");
    });

    it("should pass the revealAriaLabel property to the web component", () => {
      const result = render(
        <GoabxRadioGroup name="fruits" onChange={noop}>
          <GoabxRadioItem
            label="Apples with reveal"
            name="fruits"
            value="apples"
            reveal={<div>Additional apple options</div>}
            revealAriaLabel="Screen reader announcement for radio reveal content"
          />
        </GoabxRadioGroup>,
      );

      const radioItem = document.querySelector("goa-radio-item");
      expect(radioItem?.getAttribute("revealarialabel")).toBe(
        "Screen reader announcement for radio reveal content",
      );
      expect(result.container.querySelector("div[slot='reveal']")?.innerHTML).toContain(
        "Additional apple options",
      );
    });
  });

  describe("Selection Change Tests", () => {
    it("event should not fire when disabled", async () => {
      const onChange = vi.fn();
      const data = { ...baseMockData, value: "oranges", disabled: true };

      const { container } = render(
        <GoabxRadioGroup
          name="fruits"
          disabled={data.disabled}
          value={data.value}
          onChange={(event: GoabRadioGroupOnChangeDetail) => onChange(event)}
        >
          {data.radios.map((radio) => (
            <GoabxRadioItem
              key={radio.value}
              label={radio.text}
              name="fruits"
              checked={data.value === radio.value}
              value={radio.value}
            >
              {radio.text}
            </GoabxRadioItem>
          ))}
        </GoabxRadioGroup>,
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
      <GoabxRadioGroup name="fruits" value={data.value} onChange={onChange}>
        {data.radios.map((radio) => (
          <GoabxRadioItem
            key={radio.value}
            label={radio.text}
            name="fruits"
            checked={data.value === radio.value}
            value={radio.value}
          >
            {radio.text}
          </GoabxRadioItem>
        ))}
      </GoabxRadioGroup>,
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

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <GoabxRadioGroup name="fruits" onChange={noop} data-grid="cell">
        <GoabxRadioItem name="fruits" value="apples">
          Apples
        </GoabxRadioItem>
      </GoabxRadioGroup>,
    );
    const el = baseElement.querySelector("goa-radio-group");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
