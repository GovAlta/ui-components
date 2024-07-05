import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import GoARadioItemWrapper from "./RadioItemWrapper.test.svelte";
import GoARadioItem from "./RadioItem.svelte";

describe("RadioItem", () => {
  it("should render the radio item with default attributes", async () => {
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      description: "test description",
    });

    expect(result.getByTestId("radio-option-radio-item-1")).toBeTruthy();
    const input = result.getByRole("radio");
    expect(input).toBeTruthy();
    expect(input.getAttribute("name")).toBe("radio-item-1-name");
    expect(input.getAttribute("value")).toBe("radio-item-1");
    expect(input.getAttribute("aria-label")).toBe("radio-item-1-label");
    expect(input.getAttribute("aria-checked")).toBe("false");
    expect(input.getAttribute("type")).toBe("radio");
    expect(result.getByText("Radio Item 1")).toBeTruthy();
    const radioDescriptionDiv = result.container.querySelector(".goa-radio-description");
    expect(radioDescriptionDiv?.innerHTML).toContain("test description");
    expect(radioDescriptionDiv?.getAttribute("id")).toContain(
      `${input.getAttribute("name")}-${input.getAttribute("value")}-description`,
    );
    expect(input.getAttribute("aria-describedby")).toBe(
      radioDescriptionDiv?.getAttribute("id"),
    );
  });

  it("should render the radio item with slot description", async () => {
    const result = render(GoARadioItemWrapper, {
      description: "Radio Item 1 description",
    });
    await waitFor(() => {
      expect(result.container.querySelector("[slot=description]")?.innerHTML).toContain(
        "Radio Item 1 description",
      );
    });
  });

  it("should render the radio item with disabled attribute", () => {
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      disabled: true,
    });

    expect(result.getByRole("radio").getAttribute("disabled")).not.toBeNull();
  });

  it("should render the radio item with error attribute", () => {
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      ariadescribedby: "radio-item-1-described-by",
      error: true,
    });
    const label = result.getByTestId("radio-option-radio-item-1");
    expect(label.getAttribute("class")).toContain("error");
  });

  it("should handle the change event and emit _click event", async () => {
    const mockOnChange = vi.fn();
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      ariadescribedby: "radio-item-1-described-by",
    });
    const rootEl = result.container.querySelector("label");

    rootEl?.addEventListener("_click", mockOnChange);
    const input = result.container.querySelector("input") as HTMLInputElement;
    await fireEvent.click(input);

    const expectedEvent = new CustomEvent("_click", {
      detail: "radio-item-1",
      composed: true,
      bubbles: true,
    });
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith(expectedEvent);
  });

  it("should not emit _click event when radio item is disabled", async () => {
    const mockOnChange = vi.fn();
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      ariadescribedby: "radio-item-1-described-by",
      disabled: true,
    });
    const rootEl = result.container.querySelector("label");
    rootEl?.addEventListener("_click", mockOnChange);
    const input = result.container.querySelector("input") as HTMLInputElement;
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(0);
  });

  it("should not emit _click event when radio item is selected", async () => {
    const mockOnChange = vi.fn();
    const result = render(GoARadioItem, {
      label: "Radio Item 1",
      value: "radio-item-1",
      name: "radio-item-1-name",
      arialabel: "radio-item-1-label",
      ariadescribedby: "radio-item-1-described-by",
      checked: true,
    });
    const rootEl = result.container.querySelector("label");
    rootEl?.addEventListener("_click", mockOnChange);
    const input = result.container.querySelector("input") as HTMLInputElement;
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(0);
  });
});
