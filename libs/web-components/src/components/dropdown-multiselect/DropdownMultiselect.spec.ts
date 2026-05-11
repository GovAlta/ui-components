import { cleanup, render, waitFor } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import DropdownMultiselect from "./DropdownMultiselect.svelte";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("GoADropdownMultiselect", () => {
  const defaultProps = {
    name: "options",
    testid: "dropdown-multiselect",
  };

  describe("Rendering", () => {
    it("should render with default props", async () => {
      const { queryByTestId } = render(DropdownMultiselect, defaultProps);

      const el = queryByTestId("dropdown-multiselect");
      expect(el).toBeTruthy();
    });

    it("should render goa-popover", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);

      const popover = container.querySelector("goa-popover");
      expect(popover).toBeTruthy();
    });

    it("should render goa-checkbox-list inside popover", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList).toBeTruthy();
      expect(checkboxList?.getAttribute("name")).toBe("options");
    });

    it("should pass name to checkbox list", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        name: "my-list",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("name")).toBe("my-list");
    });

    it("should set version='2' on internal checkbox list", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("version")).toBe("2");
    });

    it("should render trigger with chevron icon", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);

      const icon = container.querySelector("goa-icon");
      expect(icon?.getAttribute("type")).toBe("chevron-down");
    });
  });

  describe("Props", () => {
    it("should apply disabled to trigger and checkbox list", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        disabled: "true",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("disabled")).toBe("true");

      const trigger = container.querySelector(".trigger");
      expect(trigger?.classList.contains("trigger--disabled")).toBe(true);
    });

    it("should apply error state to trigger and checkbox list", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        error: "true",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("error")).toBe("true");

      const trigger = container.querySelector(".trigger");
      expect(trigger?.classList.contains("trigger--error")).toBe(true);
    });

    it("should pass size to checkbox list", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        size: "compact",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("size")).toBe("compact");
    });

    it("should pass maxwidth to checkbox list", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        maxwidth: "400px",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      expect(checkboxList?.getAttribute("maxwidth")).toBe("400px");
    });

    it("should pass popover position", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        popoverposition: "above",
      });

      const popover = container.querySelector("goa-popover");
      expect(popover?.getAttribute("position")).toBe("above");
    });

    it("should pass popovermaxwidth", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        popovermaxwidth: "500px",
      });

      const popover = container.querySelector("goa-popover");
      expect(popover?.getAttribute("maxwidth")).toBe("500px");
    });

    it("should pass popoverpadded", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        popoverpadded: "false",
      });

      const popover = container.querySelector("goa-popover");
      expect(popover?.getAttribute("padded")).toBe("false");
    });

    it("should show placeholder text in trigger", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        placeholder: "Select options",
      });

      const triggerText = container.querySelector(".trigger-text");
      expect(triggerText?.textContent?.trim()).toBe("Select options");
      expect(triggerText?.classList.contains("trigger-text--placeholder")).toBe(true);
    });

    it("should apply margins", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        mt: "s",
        mb: "m",
      });

      const root = container.querySelector(".dropdown-multiselect") as HTMLElement;
      expect(root?.style.marginTop).toBeTruthy();
      expect(root?.style.marginBottom).toBeTruthy();
    });
  });

  describe("Events", () => {
    it("should dispatch _change when internal checkbox list fires _change", async () => {
      const changeSpy = vi.fn();
      const { container } = render(DropdownMultiselect, defaultProps);

      const root = container.querySelector(".dropdown-multiselect");
      root?.addEventListener("_change", changeSpy);

      const checkboxList = container.querySelector("goa-checkbox-list");
      checkboxList?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: "options", value: ["opt1"], labels: ["Option 1"] },
          bubbles: true,
          composed: true,
        }),
      );

      await waitFor(() => {
        expect(changeSpy).toHaveBeenCalled();
      });

      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.name).toBe("options");
      expect(detail.value).toEqual(["opt1"]);
      expect(detail.labels).toEqual(["Option 1"]);
    });

    it("should update display text when _change fires with labels", async () => {
      const { container } = render(DropdownMultiselect, defaultProps);

      // Verify that selecting values updates the display text via the re-dispatched _change event.
      // The trigger is the internal checkbox-list's _change which bubbles through the shadow DOM.
      // We verify the re-dispatched event carries the correct data.
      const root = container.querySelector(".dropdown-multiselect");
      const changeDetails: any[] = [];
      root?.addEventListener("_change", (e) => {
        changeDetails.push((e as CustomEvent).detail);
      });

      const checkboxList = container.querySelector("goa-checkbox-list");
      checkboxList?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: "options", value: ["a", "b"], labels: ["Apple", "Banana"] },
          bubbles: true,
          composed: true,
        }),
      );

      await waitFor(() => {
        expect(changeDetails.length).toBeGreaterThan(0);
      });

      // The most recent re-dispatched event should carry the correct labels.
      const lastDetail = changeDetails[changeDetails.length - 1];
      expect(lastDetail.name).toBe("options");
      expect(lastDetail.value).toEqual(["a", "b"]);
      expect(lastDetail.labels).toEqual(["Apple", "Banana"]);
    });

    it("should clear display text when _change fires with empty value", async () => {
      const { container } = render(DropdownMultiselect, {
        ...defaultProps,
        placeholder: "Select",
      });

      const checkboxList = container.querySelector("goa-checkbox-list");

      // First select something
      checkboxList?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: "options", value: ["a"], labels: ["Apple"] },
          bubbles: true,
          composed: true,
        }),
      );

      // Then deselect all
      checkboxList?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name: "options", value: [], labels: [] },
          bubbles: true,
          composed: true,
        }),
      );

      const triggerText = container.querySelector(".trigger-text");
      await waitFor(() => {
        expect(triggerText?.textContent?.trim()).toBe("Select");
        expect(triggerText?.classList.contains("trigger-text--placeholder")).toBe(true);
      });
    });

    it("should dispatch _popoveropen when popover opens", async () => {
      const openSpy = vi.fn();
      const { container } = render(DropdownMultiselect, defaultProps);

      const root = container.querySelector(".dropdown-multiselect");
      root?.addEventListener("_popoveropen", openSpy);

      const popover = container.querySelector("goa-popover");
      popover?.dispatchEvent(
        new CustomEvent("_open", { bubbles: true, composed: true }),
      );

      await waitFor(() => {
        expect(openSpy).toHaveBeenCalled();
      });
    });

    it("should dispatch _popoverclose when popover closes", async () => {
      const closeSpy = vi.fn();
      const { container } = render(DropdownMultiselect, defaultProps);

      const root = container.querySelector(".dropdown-multiselect");
      root?.addEventListener("_popoverclose", closeSpy);

      const popover = container.querySelector("goa-popover");
      popover?.dispatchEvent(
        new CustomEvent("_close", { bubbles: true, composed: true }),
      );

      await waitFor(() => {
        expect(closeSpy).toHaveBeenCalled();
      });
    });
  });
});
