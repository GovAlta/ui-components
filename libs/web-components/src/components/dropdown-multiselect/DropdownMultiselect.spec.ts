import { cleanup, render, waitFor, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import { tick } from "svelte";
import DropdownMultiselect from "./DropdownMultiselect.svelte";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("GoADropdownMultiselect", () => {
  const defaultProps = {
    name: "fruit",
    testid: "dropdown-multiselect",
    placeholder: "Select fruit",
  };

  describe("Rendering", () => {
    it("should render with default props", async () => {
      const { queryByTestId } = render(DropdownMultiselect, defaultProps);
      const root = queryByTestId("dropdown-multiselect");
      expect(root).toBeTruthy();
    });

    it("should show placeholder when no values selected", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const placeholder = container.querySelector(".placeholder");
      expect(placeholder).toBeTruthy();
      expect(placeholder?.textContent?.trim()).toBe("Select fruit");
    });

    it("should not show placeholder when values are selected", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        value: ["apple"],
      });
      const placeholder = container.querySelector(".placeholder");
      expect(placeholder).toBeNull();
    });

    it("should show comma-separated display text for selected values", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        value: ["apple", "banana"],
      });
      const valueDisplay = container.querySelector(".value-display");
      expect(valueDisplay?.textContent?.trim()).toBe("apple, banana");
    });
  });

  describe("ARIA attributes", () => {
    it("should render trigger with combobox role", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("role")).toBe("combobox");
    });

    it("should set aria-haspopup to dialog", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog");
    });

    it("should set aria-expanded to false when closed", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("aria-expanded")).toBe("false");
    });

    it("should apply aria-label", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        ariaLabel: "Select fruits",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("aria-label")).toBe("Select fruits");
    });
  });

  describe("Disabled state", () => {
    it("should apply disabled class when disabled", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        disabled: "true",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.classList.contains("disabled")).toBe(true);
    });

    it("should set tabindex to -1 when disabled", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        disabled: "true",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("tabindex")).toBe("-1");
    });

    it("should set aria-disabled when disabled", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        disabled: "true",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.getAttribute("aria-disabled")).toBe("true");
    });
  });

  describe("Error state", () => {
    it("should apply error class when error is true", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        error: "true",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.classList.contains("error")).toBe(true);
    });
  });

  describe("Size", () => {
    it("should apply compact class when size is compact", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        size: "compact",
      });
      const trigger = container.querySelector(".trigger");
      expect(trigger?.classList.contains("compact")).toBe(true);
    });
  });

  describe("Margins", () => {
    it("should apply margin styles", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        mt: "m",
        mb: "l",
      });
      const root = container.querySelector(".root") as HTMLElement;
      expect(root?.getAttribute("style")).toContain("margin-top");
    });
  });

  describe("Keyboard interaction", () => {
    it("should set aria-expanded to true on ArrowDown keydown", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger") as HTMLElement;

      await fireEvent.keyDown(trigger, { key: "ArrowDown" });

      await waitFor(() => {
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
      });
    });

    it("should set aria-expanded to true on Enter keydown", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger") as HTMLElement;

      await fireEvent.keyDown(trigger, { key: "Enter" });

      await waitFor(() => {
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
      });
    });

    it("should set aria-expanded to true on Space keydown", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const trigger = container.querySelector(".trigger") as HTMLElement;

      await fireEvent.keyDown(trigger, { key: " " });

      await waitFor(() => {
        expect(trigger.getAttribute("aria-expanded")).toBe("true");
      });
    });

    it("should not open when disabled and ArrowDown pressed", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        disabled: "true",
      });
      const trigger = container.querySelector(".trigger") as HTMLElement;

      await fireEvent.keyDown(trigger, { key: "ArrowDown" });

      await waitFor(() => {
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });

  describe("Select All", () => {
    // Simulate goa-dropdown-item mount relay so _options gets populated.
    // Must await: onMount has an `await tick()` before addRelayListener, so we
    // need one tick to pass before the listener is registered.
    async function addOption(
      rootEl: HTMLElement,
      value: string,
      label: string,
    ) {
      await tick();
      rootEl.dispatchEvent(
        new CustomEvent("msg", {
          detail: {
            action: "dropdown-item:mounted",
            data: {
              el: document.createElement("span"),
              value,
              label,
              mountType: "append",
            },
          },
        }),
      );
    }

    it("should not render Select All checkbox by default", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const selectAll = container.querySelector(
        "goa-checkbox[name='select-all']",
      );
      expect(selectAll).toBeNull();
    });

    it("should not render Select All when no options exist", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
      });
      const selectAll = container.querySelector(
        "goa-checkbox[name='select-all']",
      );
      expect(selectAll).toBeNull();
    });

    it("should render Select All checkbox when selectall=true and options exist", async () => {
      const { container, queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      await waitFor(() => {
        const selectAll = container.querySelector(
          "goa-checkbox[name='select-all']",
        );
        expect(selectAll).not.toBeNull();
      });
    });

    it("should render a divider after Select All when options exist", async () => {
      const { container, queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      await addOption(rootEl, "apple", "Apple");

      await waitFor(() => {
        const divider = container.querySelector("hr.select-all-divider");
        expect(divider).not.toBeNull();
      });
    });

    it("should dispatch _change with all values when Select All is checked", async () => {
      const { container, queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      const handler = vi.fn();
      rootEl.addEventListener("_change", handler);

      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      let selectAll: Element | null = null;
      await waitFor(() => {
        selectAll = container.querySelector("goa-checkbox[name='select-all']");
        expect(selectAll).not.toBeNull();
      });

      selectAll!.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: selectAll, checked: true, value: selectAll },
          bubbles: true,
          composed: true,
        }),
      );

      await waitFor(() => {
        expect(handler).toHaveBeenCalledTimes(1);
        const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.value).toEqual(["apple", "banana"]);
        expect(detail.labels).toEqual(["Apple", "Banana"]);
      });
    });

    it("should dispatch _change with empty values when Select All is unchecked", async () => {
      const { container, queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
        value: ["apple", "banana"],
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      const handler = vi.fn();
      rootEl.addEventListener("_change", handler);

      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      let selectAll: Element | null = null;
      await waitFor(() => {
        selectAll = container.querySelector("goa-checkbox[name='select-all']");
        expect(selectAll).not.toBeNull();
      });

      selectAll!.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: selectAll, checked: false, value: "" },
          bubbles: true,
          composed: true,
        }),
      );

      await waitFor(() => {
        expect(handler).toHaveBeenCalledTimes(1);
        const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.value).toEqual([]);
        expect(detail.labels).toEqual([]);
      });
    });

    it("should set checked=true on Select All when all options are selected", async () => {
      const { queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
        value: ["apple", "banana"],
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      await waitFor(() => {
        const selectAll = queryByTestId(
          "dropdown-multiselect-select-all",
        ) as HTMLElement;
        expect(selectAll?.getAttribute("checked")).toBe("true");
        expect(selectAll?.getAttribute("indeterminate")).toBe("false");
      });
    });

    it("should set indeterminate=true on Select All when some options are selected", async () => {
      const { queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
        value: ["apple"],
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      await waitFor(() => {
        const selectAll = queryByTestId(
          "dropdown-multiselect-select-all",
        ) as HTMLElement;
        expect(selectAll?.getAttribute("checked")).toBe("false");
        expect(selectAll?.getAttribute("indeterminate")).toBe("true");
      });
    });

    it("should set checked=false and indeterminate=false on Select All when no options are selected", async () => {
      const { queryByTestId } = render(DropdownMultiselect, {
        ...defaultProps,
        showSelectAll: "true",
        value: [],
      });
      const rootEl = queryByTestId("dropdown-multiselect") as HTMLElement;
      await addOption(rootEl, "apple", "Apple");
      await addOption(rootEl, "banana", "Banana");

      await waitFor(() => {
        const selectAll = queryByTestId(
          "dropdown-multiselect-select-all",
        ) as HTMLElement;
        expect(selectAll?.getAttribute("checked")).toBe("false");
        expect(selectAll?.getAttribute("indeterminate")).toBe("false");
      });
    });
  });

  describe("Change event", () => {
    it("should dispatch _change event when checkbox list changes", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);
      const root = container.querySelector(
        "[data-testid='dropdown-multiselect']",
      ) as HTMLElement;
      const handler = vi.fn();
      root.addEventListener("_change", handler);

      // A dropdown item relays its registration, which populates the options
      // and causes the internal checkbox list to render.
      const item = document.createElement("goa-dropdown-item");
      item.setAttribute("value", "apple");
      item.setAttribute("label", "Apple");
      root.appendChild(item);

      let checkboxList: Element | null = null;
      await waitFor(() => {
        checkboxList = container.querySelector("goa-checkbox-list");
        expect(checkboxList).not.toBeNull();
      });

      checkboxList!.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: "fruit", value: ["apple"], labels: ["Apple"] },
          bubbles: true,
          composed: true,
        }),
      );

      await waitFor(() => {
        expect(handler).toHaveBeenCalledTimes(1);
        const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.name).toBe("fruit");
        expect(detail.value).toEqual(["apple"]);
        expect(detail.labels).toEqual(["Apple"]);
      });
    });
  });
});
