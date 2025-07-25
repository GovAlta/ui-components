import { cleanup, fireEvent, render, waitFor } from "@testing-library/svelte";
import { describe, it, afterEach, vi } from "vitest";
import GoACheckboxListWrapper from "./CheckboxListWrapper.test.svelte";

afterEach(() => {
  cleanup();
});

describe("GoACheckboxList", () => {
  const name = "contact_prefs";
  const testItems = [
    { value: "email", text: "Email" },
    { value: "phone", text: "Phone" },
    { value: "text", text: "Text message" },
    { value: "mail", text: "Mail", disabled: true },
  ];

  async function createElement(props = {}) {
    return render(GoACheckboxListWrapper, {
      name,
      testid: "checkbox-list-test",
      items: testItems,
      ...props,
    });
  }

  describe("Render", () => {
    it("should render checkbox list", async () => {
      const result = await createElement();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList).toBeTruthy();
      expect(checkboxList?.getAttribute("role")).toBe("group");
      expect(checkboxList?.getAttribute("aria-label")).toBe(name);
      expect(checkboxList?.getAttribute("aria-invalid")).toBe("false");
    });

    it("should render checkbox list items", async () => {
      const result = await createElement();
      await waitFor(() => {
        const checkboxInputs = result.container.querySelectorAll(
          'input[type="checkbox"]',
        );
        expect(checkboxInputs.length).toBe(testItems.length);
        testItems.forEach((item, index) => {
          const input = checkboxInputs[index] as HTMLInputElement;
          expect(input.value).toBe(item.value);
          expect(input.disabled).toBe(item.disabled || false);
        });
      });
    });

    it("should have correct orientation class", async () => {
      const result = await createElement({ orientation: "horizontal" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("orientation-horizontal")).toBe(
        true,
      );
    });

    it("should apply max width", async () => {
      const result = await createElement({ maxwidth: "300px" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      const root = checkboxList?.closest(".root");
      expect(root?.getAttribute("style")).toContain("max-width: 300px");
    });

    it("should have aria-label from arialabel prop", async () => {
      const arialabel = "Contact preferences";
      const result = await createElement({ arialabel });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.getAttribute("aria-label")).toBe(arialabel);
    });
  });

  describe("Properties", () => {
    it("can set name", async () => {
      const customName = "custom_name";
      const result = await createElement({ name: customName });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.getAttribute("aria-label")).toBe(customName);
    });

    it("can set disabled state", async () => {
      const result = await createElement({ disabled: "true" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("disabled")).toBe(true);
    });

    it("can set error state", async () => {
      const result = await createElement({ error: "true" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("error")).toBe(true);
      expect(checkboxList?.getAttribute("aria-invalid")).toBe("true");
    });

    it("can set initial value", async () => {
      const initialValue = '["email", "phone"]';
      const result = await createElement({ value: initialValue });
      const valueDisplay = result.queryByTestId("current-value");
      expect(valueDisplay?.textContent).toBe(initialValue);
    });
  });

  describe("Interactions", () => {
    it("should handle checkbox selection via real input events", async () => {
      const result = await createElement();
      const onChange = vi.fn();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      const rootEl = checkboxList?.closest(".root");
      rootEl?.addEventListener("_change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        onChange(detail);
      });

      await waitFor(() => {
        const emailCheckbox = result.container.querySelector(
          'input[value="email"]',
        );
        expect(emailCheckbox).toBeTruthy();
      });

      const emailCheckbox = result.container.querySelector(
        'input[value="email"]',
      ) as HTMLInputElement;
      await fireEvent.click(emailCheckbox);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            name,
            values: ["email"],
          }),
        );
      });
    });

    it("should handle multiple selections", async () => {
      const result = await createElement();
      const onChange = vi.fn();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      const rootEl = checkboxList?.closest(".root");
      rootEl?.addEventListener("_change", onChange);

      await waitFor(() => {
        const emailCheckbox = result.container.querySelector(
          'input[value="email"]',
        );
        const phoneCheckbox = result.container.querySelector(
          'input[value="phone"]',
        );
        expect(emailCheckbox).toBeTruthy();
        expect(phoneCheckbox).toBeTruthy();
      });

      const emailCheckbox = result.container.querySelector(
        'input[value="email"]',
      ) as HTMLInputElement;
      const phoneCheckbox = result.container.querySelector(
        'input[value="phone"]',
      ) as HTMLInputElement;

      await fireEvent.click(emailCheckbox);
      await fireEvent.click(phoneCheckbox);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(2);
      });
    });

    it("should update value when using wrapper methods", async () => {
      const result = await createElement();
      const setValueButton = result.queryByTestId("set-value-button");
      const resetButton = result.queryByTestId("reset-value-button");
      const valueDisplay = result.queryByTestId("current-value");

      setValueButton && (await fireEvent.click(setValueButton));
      await waitFor(() => {
        expect(valueDisplay?.textContent).toBe('["test-value"]');
      });

      resetButton && (await fireEvent.click(resetButton));
      await waitFor(() => {
        expect(valueDisplay?.textContent).toBe("[]");
      });
    });
  });

  describe("Orientations", () => {
    it("should have vertical orientation by default", async () => {
      const result = await createElement();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("orientation-vertical")).toBe(
        true,
      );
      expect(checkboxList?.classList.contains("orientation-horizontal")).toBe(
        false,
      );
    });

    it("should apply horizontal orientation", async () => {
      const result = await createElement({ orientation: "horizontal" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("orientation-horizontal")).toBe(
        true,
      );
      expect(checkboxList?.classList.contains("orientation-vertical")).toBe(
        false,
      );
    });
  });

  describe("Error State", () => {
    it("should not show error state by default", async () => {
      const result = await createElement();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("error")).toBe(false);
      expect(checkboxList?.getAttribute("aria-invalid")).toBe("false");
    });

    it("should show error state when error is true", async () => {
      const result = await createElement({ error: "true" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("error")).toBe(true);
      expect(checkboxList?.getAttribute("aria-invalid")).toBe("true");
    });
  });

  describe("Disabled State", () => {
    it("should not be disabled by default", async () => {
      const result = await createElement();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("disabled")).toBe(false);
    });

    it("should be disabled when disabled is true", async () => {
      const result = await createElement({ disabled: "true" });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList?.classList.contains("disabled")).toBe(true);
    });
  });

  describe("Focus", () => {
    it("should dispatch help text announce event on focus", async () => {
      const result = await createElement();
      const helpTextSpy = vi.fn();
      const checkboxList = result.queryByTestId("checkbox-list-test");
      const rootEl = checkboxList?.closest(".root");
      rootEl?.addEventListener("help-text::announce", helpTextSpy);
      if (checkboxList) {
        await fireEvent.focus(checkboxList);
        expect(helpTextSpy).toHaveBeenCalled();
      }
    });
  });

  describe("Margins", () => {
    it("should add margins", async () => {
      const result = render(GoACheckboxListWrapper, {
        name,
        testid: "checkbox-list-test",
        items: testItems,
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      const root = checkboxList?.closest(".root");
      expect(root?.getAttribute("style")).toContain(
        "margin-top:var(--goa-space-s)",
      );
      expect(root?.getAttribute("style")).toContain(
        "margin-right:var(--goa-space-m)",
      );
      expect(root?.getAttribute("style")).toContain(
        "margin-bottom:var(--goa-space-l)",
      );
      expect(root?.getAttribute("style")).toContain(
        "margin-left:var(--goa-space-xl)",
      );
    });
  });

  describe("Form Integration", () => {
    it("should render within form item", async () => {
      const result = render(GoACheckboxListWrapper, {
        label: "Contact Preferences",
        helptext: "Select how you'd like to be contacted",
        name,
        items: testItems,
        testid: "checkbox-list-test",
      });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList).toBeTruthy();
    });
  });

  describe("Relay Messaging", () => {
    it("should handle setting values through wrapper methods", async () => {
      const result = await createElement();
      const setValueButton = result.queryByTestId("set-value-button");
      setValueButton && (await fireEvent.click(setValueButton));
      await waitFor(() => {
        const valueDisplay = result.queryByTestId("current-value");
        expect(valueDisplay?.textContent).toBe('["test-value"]');
      });
    });

    it("should handle resetting values through wrapper methods", async () => {
      const result = await createElement({ value: '["email"]' });
      const resetButton = result.queryByTestId("reset-value-button");
      resetButton && (await fireEvent.click(resetButton));
      await waitFor(() => {
        const valueDisplay = result.queryByTestId("current-value");
        expect(valueDisplay?.textContent).toBe("[]");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", async () => {
      const result = render(GoACheckboxListWrapper, {
        name,
        testid: "checkbox-list-test",
        items: [],
      });
      const checkboxList = result.queryByTestId("checkbox-list-test");
      expect(checkboxList).toBeTruthy();
      const itemElements = result.container.querySelectorAll(
        'input[type="checkbox"]',
      );
      expect(itemElements.length).toBe(0);
    });
  });
});
