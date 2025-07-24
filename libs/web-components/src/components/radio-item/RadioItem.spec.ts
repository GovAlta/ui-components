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
      maxwidth: "480px",
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

    const radioDescriptionDiv = result.container.querySelector(".description");
    expect(radioDescriptionDiv?.innerHTML).toContain("test description");
    expect(radioDescriptionDiv?.getAttribute("id")).toContain(
      `${input.getAttribute("name")}-${input.getAttribute("value")}-description`,
    );
    expect(input.getAttribute("aria-describedby")).toBe(
      radioDescriptionDiv?.getAttribute("id"),
    );

    const radioContainerDiv =
      result.container.querySelector("[data-testid=root]");
    expect(radioContainerDiv?.getAttribute("style")).toContain(
      "max-width: 480px;",
    );
  });

  it("should render the radio item with slot description", async () => {
    const result = render(GoARadioItemWrapper, {
      description: "Radio Item 1 description",
      value: "foobar",
    });
    await waitFor(() => {
      expect(
        result.container.querySelector("[slot=description]")?.innerHTML,
      ).toContain("Radio Item 1 description");
    });
  });

  it("should render the radio item with disabled attribute", () => {
    const result = render(GoARadioItem, { disabled: true, value: "foobar" });
    expect(result.getByRole("radio").getAttribute("disabled")).not.toBeNull();
  });

  it("should render the radio item with error attribute", () => {
    const result = render(GoARadioItem, {
      value: "radio-item-1",
      error: true,
    });
    const label = result.container.querySelector("label");
    expect(label?.getAttribute("class")).toContain("error");
  });

  it(`should render with margins`, async () => {
    const baseElement = render(GoARadioItem, {
      value: "foobar",
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    });

    const radio = baseElement.container.querySelector("[data-testid=root]");
    expect(radio).toBeTruthy();
    expect(radio?.getAttribute("style")).toContain(
      "margin-top:var(--goa-space-s)",
    );
    expect(radio?.getAttribute("style")).toContain(
      "margin-right:var(--goa-space-m)",
    );
    expect(radio?.getAttribute("style")).toContain(
      "margin-bottom:var(--goa-space-l)",
    );
    expect(radio?.getAttribute("style")).toContain(
      "margin-left:var(--goa-space-xl)",
    );
  });

  it("should handle the change event and emit _radioItemChange event with value and label", async () => {
    const result = render(GoARadioItem, {
      value: "foobar",
      label: "Test Radio Label",
    });
    const rootEl = result.queryByTestId("root");
    const mockOnChange = vi.fn();
    const input = result.container.querySelector("input") as HTMLInputElement;

    expect(rootEl).toBeTruthy();
    rootEl?.addEventListener("_radioItemChange", mockOnChange);
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(1);

    // Check that the event was called with the correct detail containing both value and label
    const calledEvent = mockOnChange.mock.calls[0][0];
    expect(calledEvent.detail).toEqual({
      value: "foobar",
      label: "Test Radio Label",
    });
  });

  it("should handle the change event with empty label", async () => {
    const result = render(GoARadioItem, {
      value: "test-value",
      // No label provided
    });
    const rootEl = result.queryByTestId("root");
    const mockOnChange = vi.fn();
    const input = result.container.querySelector("input") as HTMLInputElement;

    expect(rootEl).toBeTruthy();
    rootEl?.addEventListener("_radioItemChange", mockOnChange);
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(1);

    // Check that the event was called with the correct detail containing value and empty label
    const calledEvent = mockOnChange.mock.calls[0][0];
    expect(calledEvent.detail).toEqual({
      value: "test-value",
      label: "",
    });
  });

  it("should not emit _click event when radio item is disabled", async () => {
    const mockOnChange = vi.fn();
    const result = render(GoARadioItem, { disabled: true, value: "foobar" });
    const rootEl = result.container.querySelector("label");

    rootEl?.addEventListener("_radioItemChange", mockOnChange);
    const input = result.container.querySelector("input") as HTMLInputElement;
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(0);
  });

  it("should not emit _click event when radio item is selected", async () => {
    const mockOnChange = vi.fn();
    const result = render(GoARadioItem, { checked: true, value: "foobar" });
    const rootEl = result.container.querySelector("label");
    rootEl?.addEventListener("_radioItemChange", mockOnChange);
    const input = result.container.querySelector("input") as HTMLInputElement;
    await fireEvent.click(input);

    expect(mockOnChange).toBeCalledTimes(0);
  });

  describe("Reveal slot", () => {
    it("should stop propagation but relay form field changes as _revealChange", async () => {
      const result = render(GoARadioItem, { value: "test-radio" });
      const revealSlot = document.createElement("div");
      revealSlot.setAttribute("slot", "reveal");
      revealSlot.textContent = "Reveal content";

      const radioItem = result.container.querySelector("goa-radio-item");
      radioItem?.appendChild(revealSlot);
      await new Promise((resolve) => setTimeout(resolve, 100));

      // _click event propagation (should be stopped)
      const clickSpy = vi.fn();
      radioItem?.addEventListener("_click", clickSpy);
      const clickEvent = new CustomEvent("_click", { bubbles: true });
      revealSlot.dispatchEvent(clickEvent);
      expect(clickSpy).not.toHaveBeenCalled();

      // _change event propagation (should be stopped)
      const changeSpy = vi.fn();
      radioItem?.addEventListener("_change", changeSpy);

      // _radioItemChange event propagation (should be stopped)
      const radioChangeSpy = vi.fn();
      radioItem?.addEventListener("_radioItemChange", radioChangeSpy);
      const radioChangeEvent = new CustomEvent("_radioItemChange", {
        bubbles: true,
      });
      revealSlot.dispatchEvent(radioChangeEvent);
      expect(radioChangeSpy).not.toHaveBeenCalled();

      //  _revealChange event (should be dispatched for form fields)
      const revealChangeSpy = vi.fn();
      radioItem?.addEventListener("_revealChange", revealChangeSpy);

      // Dispatch a _change event with form field details (name and value)
      const changeEvent = new CustomEvent("_change", {
        bubbles: true,
        detail: { name: "reveal-input", value: "new-value" },
      });
      revealSlot.dispatchEvent(changeEvent);

      setTimeout(() => {
        expect(changeSpy).not.toHaveBeenCalled();
        expect(revealChangeSpy).toHaveBeenCalledTimes(1);

        const relayedEvent = revealChangeSpy.mock.calls[0][0] as CustomEvent;
        expect(relayedEvent.detail.name).toBe("reveal-input");
        expect(relayedEvent.detail.value).toBe("new-value");
      }, 1000);
    });

    it("should not dispatch _revealChange for non-form field events", async () => {
      const result = render(GoARadioItem, { value: "test-radio" });
      const revealSlot = document.createElement("div");
      revealSlot.setAttribute("slot", "reveal");
      revealSlot.textContent = "Reveal content";

      const radioItem = result.container.querySelector("goa-radio-item");
      radioItem?.appendChild(revealSlot);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const revealChangeSpy = vi.fn();
      radioItem?.addEventListener("_revealChange", revealChangeSpy);

      // Test accordion change event
      const accordionChangeEvent = new CustomEvent("_change", {
        bubbles: true,
        detail: { open: true },
      });
      revealSlot.dispatchEvent(accordionChangeEvent);
      expect(revealChangeSpy).not.toHaveBeenCalled();

      // Test event without name property
      const invalidEvent = new CustomEvent("_change", {
        bubbles: true,
        detail: { value: "some-value" },
      });
      revealSlot.dispatchEvent(invalidEvent);
      expect(revealChangeSpy).not.toHaveBeenCalled();
    });
  });
});
