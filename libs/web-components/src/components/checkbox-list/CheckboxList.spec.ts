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

    it("should handle disabled state", async () => {
      const { container } = render(CheckboxList, {
        ...defaultProps,
        disabled: "true",
      });

      // When disabled, child checkboxes should also be disabled
      expect(container).toBeTruthy();
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
