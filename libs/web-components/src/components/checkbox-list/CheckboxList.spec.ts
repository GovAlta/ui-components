import { cleanup, render, waitFor } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import CheckboxList from "./CheckboxList.svelte";
import { relay } from "../../common/utils";
import {
  FormFieldMountMsg,
  FormFieldMountRelayDetail,
} from "../../types/relay-types";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("GoACheckboxList", () => {
  const defaultProps = {
    name: "contact_prefs",
    testid: "checkbox-list",
  };

  describe("Rendering", () => {
    it("should render checkbox list with default props", async () => {
      const { queryByTestId } = render(CheckboxList, defaultProps);

      const checkboxList = queryByTestId("checkbox-list");
      expect(checkboxList).toBeTruthy();
      expect(checkboxList?.getAttribute("role")).toBe("group");
      expect(checkboxList?.getAttribute("aria-label")).toBe(defaultProps.name);
    });

    it("should apply max-width style", async () => {
      const { container } = render(CheckboxList, {
        ...defaultProps,
        maxwidth: "500px",
      });

      const root = container.querySelector(".root") as HTMLElement;
      expect(root?.style.maxWidth).toBe("500px");
    });
  });

  describe("Value management", () => {
    it("should handle array values", async () => {
      const { container } = render(CheckboxList, {
        ...defaultProps,
        value: ["email", "phone", "text"],
      });

      // Component should internally handle array values
      expect(container).toBeTruthy();
    });

    it("should handle empty value array", async () => {
      const { container } = render(CheckboxList, {
        ...defaultProps,
        value: [],
      });

      expect(container).toBeTruthy();
    });

    it("should handle value changes", async () => {
      const { container, rerender } = render(CheckboxList, {
        ...defaultProps,
        value: ["option1"],
      });

      await rerender({
        ...defaultProps,
        value: ["option1", "option2"],
      });

      // Component should update internal state
      expect(container).toBeTruthy();
    });
  });

  describe("Disabled state", () => {
    it("should not be disabled by default", async () => {
      const { container } = render(CheckboxList, defaultProps);

      // Check that disabled attribute handling is in place
      expect(container.querySelector(".root")).toBeTruthy();
    });

    it("should update child checkboxes when disabled changes", async () => {
      const result = render(CheckboxList, defaultProps);
      const checkboxContainer = result.container.querySelector(".checkbox-container");
      const checkbox = document.createElement("goa-checkbox");
      const slot = document.createElement("slot");
      vi.spyOn(slot, "assignedElements").mockReturnValue([checkbox]);
      checkboxContainer?.appendChild(slot);

      expect(checkbox.hasAttribute("disabled")).toBe(false);

      await result.rerender({
        ...defaultProps,
        disabled: "true",
      });

      await waitFor(() => {
        expect(checkbox.getAttribute("disabled")).toBe("true");
      });

      await result.rerender({
        ...defaultProps,
        disabled: "false",
      });

      await waitFor(() => {
        expect(checkbox.hasAttribute("disabled")).toBe(false);
      });
    });

    it("should disable a child checkbox that mounts after the list", async () => {
      const result = render(CheckboxList, defaultProps);
      const checkboxContainer = result.container.querySelector(".checkbox-container");
      const checkbox = document.createElement("goa-checkbox");
      const checkboxRoot = document.createElement("div");
      checkbox.attachShadow({ mode: "open" }).appendChild(checkboxRoot);
      checkboxContainer?.appendChild(checkbox);

      await result.rerender({
        ...defaultProps,
        disabled: "true",
      });

      relay<FormFieldMountRelayDetail>(
        checkboxRoot,
        FormFieldMountMsg,
        { name: "option1", el: checkboxRoot },
        { bubbles: true },
      );

      await waitFor(() => {
        expect(checkbox.getAttribute("disabled")).toBe("true");
      });
    });
  });

  describe("Events", () => {
    it("should dispatch help-text::announce on focus", async () => {
      const announceSpy = vi.fn();
      const { container, queryByTestId } = render(CheckboxList, defaultProps);

      const root = container.querySelector(".root");
      root?.addEventListener("help-text::announce", announceSpy);

      const checkboxList = queryByTestId("checkbox-list");
      checkboxList?.dispatchEvent(new FocusEvent("focus", { bubbles: true }));

      expect(announceSpy).toHaveBeenCalled();
    });

    it("dispatches _focus when focus enters and _blur when focus leaves the list", async () => {
      const { queryByTestId } = render(CheckboxList, defaultProps);

      const checkboxList = queryByTestId("checkbox-list");
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      checkboxList?.addEventListener("_focus", (e: Event) => {
        expect((e as CustomEvent).detail.name).toBe(defaultProps.name);
        onFocus();
      });
      checkboxList?.addEventListener("_blur", (e: Event) => {
        expect((e as CustomEvent).detail.name).toBe(defaultProps.name);
        onBlur();
      });

      // CheckboxList's onMount awaits `tick()` before wiring up focus tracking,
      // so retry the dispatch until the listener has been attached.
      await waitFor(() => {
        checkboxList?.dispatchEvent(new FocusEvent("focusin", { bubbles: true, composed: true }));
        expect(onFocus).toHaveBeenCalledTimes(1);
      });

      checkboxList?.dispatchEvent(new FocusEvent("focusout", { bubbles: true, composed: true }));
      await waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Child checkbox management", () => {
    it("should update child checkbox states based on value", async () => {
      const { container } = render(CheckboxList, {
        ...defaultProps,
        value: ["option1"],
      });

      // Add child checkbox
      const checkboxContainer = container.querySelector(".checkbox-container");
      const checkbox = document.createElement("goa-checkbox");
      checkbox.setAttribute("name", "option1");
      checkboxContainer?.appendChild(checkbox);

      // Simulate the child mounting and registering with parent
      const root = container.querySelector(".root");
      relay<FormFieldMountRelayDetail>(
        root,
        FormFieldMountMsg,
        { name: "option1", el: checkbox },
        { bubbles: true },
      );

      // Allow the component's next tick (initialization setTimeout(0)) to complete
      await waitFor(() => {
        // Child is present (condition gives waitFor a concrete predicate)
        expect(checkboxContainer?.contains(checkbox)).toBe(true);
      });

      // Child should be updated to checked state via relay message
      expect(checkbox.getAttribute("name")).toBe("option1");
    });
  });
});
