import React, { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  logDOM,
} from "@testing-library/react";

import { GoARadioGroup, GoARadioItem } from "./radio-group";

describe("RadioGroup", () => {
  const baseMockData = {
    title: "mock title",
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

  function Template(data, onChange) {
    let value = data.value;
    function setValue(newValue) {
      value = newValue;
    }
    return (
      <GoARadioGroup
        name="fruits"
        disabled={data.disabled}
        value={value}
        onChange={(name, newValue) => onChange && onChange(name, newValue)}
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
      </GoARadioGroup>
    );
  }

  describe("Basic rendering", () => {
    const mockData = { ...baseMockData };

    it("should render successfully", async () => {
      const { baseElement } = render(Template(baseMockData, null));
      expect(baseElement).toBeTruthy();
    });
  });

  describe("Initial data", () => {
    const selectedValue = "oranges";

    let mockData;
    beforeEach(() => {
      mockData = { ...baseMockData, value: selectedValue };
    });

    it("initial data is set", async () => {
      render(Template(mockData, null));

      const radios =
        document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      radios.forEach((radio) => {
        expect(radio.checked).toBe(radio.value === selectedValue);
      });
    });
  });

  describe("Selection Change Tests", () => {
    it("event should not fire when disabled", async () => {
      const onChange = jest.fn();
      render(
        Template(
          { ...baseMockData, value: "oranges", disabled: true },
          onChange
        )
      );

      // const radios = screen.getAllByRole('radio');
      waitFor(() => {
        const radios =
          document.querySelectorAll<HTMLInputElement>("input[type=radio]");
        fireEvent.click(radios[0]);
        expect(onChange).not.toBeCalled();
      });
    });
  });

  it("change event should work", async () => {
    let newValue;
    render(
      Template({ ...baseMockData, value: "oranges" }, (_name, _newValue) => {
        newValue = _newValue;
      })
    );

    // const radios = screen.getAllByRole('radio');
    waitFor(() => {
      const radios =
        document.querySelectorAll<HTMLInputElement>("input[type=radio]");
      fireEvent.click(radios[0]);
      expect(newValue).toBe("apples");
    });
  });
});
