import { render, fireEvent, cleanup } from "@testing-library/svelte";
import GoAFormItem from "./FormItem.svelte";
import Checkbox from "../checkbox/Checkbox.svelte";
import "../checkbox-list/CheckboxList.svelte";
import { it, describe } from "vitest";
import { relay } from "../../common/utils";
import {
  FormFieldMountMsg,
  type FormFieldMountRelayDetail,
} from "../../types/relay-types";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("lang");
});

describe("GoA FormItem", () => {
  describe("field requirements through the mount relay", () => {
    const controls = [
      { host: "goa-input", tag: "input", role: "textbox" },
      { host: "goa-textarea", tag: "textarea", role: "textbox" },
      { host: "goa-dropdown", tag: "input", role: "combobox" },
      { host: "goa-radio-group", tag: "div", role: "radiogroup" },
      { host: "goa-checkbox-list", tag: "div", role: "group" },
    ];

    function mountControl(
      parent: HTMLElement,
      control: (typeof controls)[number],
      ariaLabel = "",
    ) {
      const host = document.createElement("div");
      const field = document.createElement(control.tag);
      field.setAttribute("role", control.role);
      field.setAttribute("aria-label", ariaLabel);
      host.attachShadow({ mode: "open" }).appendChild(field);
      parent.appendChild(host);
      relay<FormFieldMountRelayDetail>(
        host,
        FormFieldMountMsg,
        {
          name: "field",
          el: field,
          accessibility: {
            target: field,
            supportsAriaRequired: control.role !== "group",
          },
        },
        { bubbles: true },
      );
      return field;
    }

    it.each([
      {
        control: controls[0],
        requirement: "optional",
        label: "Deuxième prénom",
        expectedName: "Deuxième prénom (facultatif)",
        expectedRequired: null,
      },
      {
        control: controls[4],
        requirement: "required",
        label: "Choix",
        expectedName: "Choix (requis)",
        expectedRequired: null,
      },
      {
        control: controls[0],
        requirement: "required",
        label: "Prénom",
        expectedName: "Prénom",
        expectedRequired: "true",
      },
    ])(
      "uses the French accessible name '$expectedName' and required state",
      ({ control, requirement, label, expectedName, expectedRequired }) => {
        document.documentElement.lang = "fr-CA";
        const result = render(GoAFormItem, {
          testid: "form-item",
          label,
          requirement,
        });
        const field = mountControl(result.getByTestId("form-item"), control);

        expect(field.getAttribute("aria-label")).toBe(expectedName);
        expect(field.getAttribute("aria-required")).toBe(expectedRequired);
      },
    );

    it("uses the translations resolved on mount for the indicator and accessible name", async () => {
      document.documentElement.lang = "en-CA";
      const target = document.createElement("div");
      target.lang = "fr-CA";
      document.body.appendChild(target);
      const result = render(GoAFormItem, {
        target,
        props: {
          testid: "form-item",
          label: "Deuxième prénom",
          requirement: "optional",
        },
      });
      const formItem = result.getByTestId("form-item");
      const field = mountControl(formItem, controls[0]);

      await vi.waitFor(() => {
        expect(formItem.querySelector("em")).toHaveTextContent("(facultatif)");
        expect(field.getAttribute("aria-label")).toBe(
          "Deuxième prénom (facultatif)",
        );
      });
      target.remove();
    });

    describe.each(controls)("$host", (control) => {
      it.each(["required", "optional", ""] as const)(
        "exposes the name and state for requirement '%s'",
        (requirement) => {
          const result = render(GoAFormItem, {
            testid: "form-item",
            label: "Middle name",
            requirement,
          });
          const formItem = result.getByTestId("form-item");
          const field = mountControl(formItem, control);
          const namedRequirement =
            requirement === "optional" ||
            (requirement === "required" && control.role === "group");

          expect(field.getAttribute("aria-label")).toBe(
            namedRequirement ? `Middle name (${requirement})` : "Middle name",
          );
          expect(field.getAttribute("aria-required")).toBe(
            requirement === "required" && control.role !== "group"
              ? "true"
              : null,
          );
        },
      );

      it("updates the name and state when the requirement changes", async () => {
        const result = render(GoAFormItem, {
          testid: "form-item",
          label: "Middle name",
          requirement: "optional",
        });
        const formItem = result.getByTestId("form-item");
        const field = mountControl(formItem, control);
        expect(field.getAttribute("aria-label")).toBe("Middle name (optional)");

        await result.rerender({ requirement: "required" });
        expect(field.getAttribute("aria-label")).toBe(
          control.role === "group" ? "Middle name (required)" : "Middle name",
        );
        expect(field.getAttribute("aria-required")).toBe(
          control.role === "group" ? null : "true",
        );

        await result.rerender({ requirement: "", label: "First name" });
        expect(field.getAttribute("aria-label")).toBe("First name");
        expect(field.hasAttribute("aria-required")).toBe(false);
      });

      it("does not apply an outer form item's requirement to a nested field", () => {
        const result = render(GoAFormItem, {
          testid: "outer-form-item",
          label: "Outer label",
          requirement: "required",
        });
        const outer = result.getByTestId("outer-form-item");
        const inner = document.createElement("goa-form-item");
        const content = document.createElement("div");
        inner.appendChild(content);
        outer.appendChild(inner);
        const field = mountControl(content, control, "Inner label (optional)");

        expect(field.getAttribute("aria-label")).toBe("Inner label (optional)");
        expect(field.hasAttribute("aria-required")).toBe(false);
      });
    });

    it("keeps a consumer's aria-label when adding and removing optional text", async () => {
      const result = render(GoAFormItem, {
        testid: "form-item",
        label: "Name",
        requirement: "optional",
      });
      const field = mountControl(
        result.getByTestId("form-item"),
        controls[0],
        "Full name",
      );
      expect(field.getAttribute("aria-label")).toBe("Full name (optional)");

      await result.rerender({ requirement: "" });
      expect(field.getAttribute("aria-label")).toBe("Full name");
    });
  });

  describe("single Checkbox requirements", () => {
    it.each(["required", "optional", ""] as const)(
      "keeps the checkbox's own name and exposes requirement '%s' on its box",
      async (requirement) => {
        const result = render(GoAFormItem, {
          testid: "form-item",
          label: "Consent",
          requirement,
        });
        const formItem = result.getByTestId("form-item");
        const mounted = vi.fn();
        formItem.addEventListener("msg", (event) => {
          const { action, data } = (event as CustomEvent).detail;
          if (action === FormFieldMountMsg) mounted(data);
        });
        const checkbox = render(Checkbox, {
          target: formItem,
          props: { name: "consent", text: "I agree" },
        });
        const box = checkbox.container.querySelector('input[type="checkbox"]');
        const root = checkbox.container.querySelector(".root");

        await vi.waitFor(() => {
          expect(mounted).toHaveBeenCalledWith({
            name: "consent",
            el: root,
            accessibility: { target: box, supportsAriaRequired: true },
          });
        });
        expect(box?.getAttribute("aria-label")).toBe(
          requirement === "optional" ? "I agree (optional)" : "I agree",
        );
        expect(box?.getAttribute("aria-required")).toBe(
          requirement === "required" ? "true" : null,
        );
        expect(root?.hasAttribute("aria-required")).toBe(false);
      },
    );

    it.each(["required", "optional", ""] as const)(
      "does not pass requirement '%s' from a Checkbox List to its checkbox",
      async (requirement) => {
        const result = render(GoAFormItem, {
          testid: "form-item",
          label: "Contact channels",
          requirement,
        });
        const list = document.createElement("goa-checkbox-list");
        list.setAttribute("name", "channels");
        const checkbox = document.createElement("goa-checkbox");
        checkbox.setAttribute("name", "email");
        checkbox.setAttribute("text", "Email");
        const mounted = vi.fn();
        checkbox.addEventListener("msg", (event) => {
          if ((event as CustomEvent).detail.action === FormFieldMountMsg)
            mounted();
        });
        list.appendChild(checkbox);
        result.getByTestId("form-item").appendChild(list);
        const box = () =>
          checkbox.shadowRoot?.querySelector('input[type="checkbox"]');
        const group = () => list.shadowRoot?.querySelector('[role="group"]');

        await vi.waitFor(() => {
          expect(mounted).toHaveBeenCalledTimes(1);
          expect(group()).toHaveAttribute(
            "aria-label",
            requirement
              ? `Contact channels (${requirement})`
              : "Contact channels",
          );
        });
        expect(box()).toHaveAttribute("aria-label", "Email");
        expect(box()?.hasAttribute("aria-required")).toBe(false);
      },
    );
  });

  it("should render with no params", async () => {
    const result = render(GoAFormItem, { testid: "foo" });
    const el = result.queryByTestId("foo");

    const label = el?.querySelector(".label");
    expect(label).toBeFalsy();

    const requirement = document.querySelector("em");
    expect(requirement).toBeFalsy();

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();
  });

  it("should not show any requirement text for a field when requirement is not set", async () => {
    const result = render(GoAFormItem, {
      testid: "foo",
      label: "Credit Card Number",
    });
    const el = result.queryByTestId("foo");

    const label = el?.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement).toBeFalsy();

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();
  });

  it("should show optional text for a field when requirement set to optional", async () => {
    const result = render(GoAFormItem, {
      testid: "foo",
      label: "Credit Card Number",
      requirement: "optional",
    });
    const el = result.queryByTestId("foo");

    const label = el?.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement?.innerHTML).toContain("optional");

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();
  });

  it("should show required text for a field when requirement set to required", async () => {
    const result = render(GoAFormItem, {
      testid: "foo",
      label: "Credit Card Number",
      requirement: "required",
    });
    const el = result.queryByTestId("foo");

    const label = el?.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement?.innerHTML).toContain("required");

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();
  });

  it("should render all params", async () => {
    const baseElement = render(GoAFormItem, {
      label: "the label",
      labelsize: "large",
      maxwidth: "480px",
      helptext: "the helptext",
      requirement: "optional",
      error: "the error",
      testid: "formitem-test",
    });

    const formitem = await baseElement.findByTestId("formitem-test");
    const label = document.querySelector(".label");

    expect(formitem?.getAttribute("style")).toContain("max-width: 480px;");
    expect(label?.innerHTML).toContain("the label");
    expect(label?.classList).toContain("large");

    const requirement = document.querySelector("em");
    expect(requirement?.innerHTML).toContain("optional");

    const helpText = document.querySelector(".help-msg");
    expect(helpText?.innerHTML).toContain("the helptext");

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg?.innerHTML).toContain("the error");
  });

  it("should not render options if not provided", async () => {
    render(GoAFormItem, {});

    const label = document.querySelector(".label");
    expect(label).toBeNull();

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeNull();

    const errMsg = document.querySelector(".help-msg");
    expect(errMsg).toBeNull();

    const requirement = document.querySelector("em");
    expect(requirement).toBeNull();
  });

  it("should not show any text for a field when requirement value is mispelled/invalid", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => {
      /* do nothing */
    });

    render(GoAFormItem, {
      label: "Credit Card Number",
      requirement: "requireddddddddd",
    });

    const label = document.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement).toBeNull();

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();

    mock.mockRestore();
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAFormItem, {
        testid: "formitem-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const formitem = await baseElement.findByTestId("formitem-test");

      expect(formitem).toBeTruthy();
      expect(formitem).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(formitem).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(formitem).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(formitem).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  it("should have both label and helper text accessible without overriding", async () => {
    const result = render(GoAFormItem, {
      testid: "formitem-test",
      label: "Test Label",
      helptext: "Helper Text",
    });
    const formItem = await result.findByTestId("formitem-test");

    const label = formItem.querySelector(".label");
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain("Test Label");

    const helperText = formItem.querySelector(".help-msg");
    expect(helperText).toBeTruthy();
    expect(helperText?.textContent).toContain("Helper Text");

    // Ensure both label and helper text are present and distinct
    expect(formItem.textContent).toContain("Test Label");
    expect(formItem.textContent).toContain("Helper Text");
  });

  it("should display error text when provided", async () => {
    const result = render(GoAFormItem, {
      testid: "formitem-test",
      label: "Test Label",
      error: "Error Message",
    });
    const formItem = await result.findByTestId("formitem-test");

    const errorText = formItem.querySelector(".error-msg");
    expect(errorText).toBeTruthy();
    expect(errorText?.textContent).toContain("Error Message");

    // Ensure error text is present in the component
    expect(formItem.textContent).toContain("Error Message");
  });

  it("should update aria-describedby", async () => {
    const { findByTestId, rerender } = render(GoAFormItem, {
      testid: "formitem-test",
      label: "Test Label",
      helptext: "Helper Text",
    });

    const formItem = await findByTestId("formitem-test");
    const input = document.createElement("input");
    formItem.appendChild(input);

    // Simulate input mounted event
    await fireEvent(
      formItem,
      new CustomEvent("form-field::bind", {
        detail: { el: input },
        bubbles: true,
        composed: true,
      }),
    );

    // Initially, only helptext should be in aria-describedby
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toContain("helptext-");

    await rerender({ error: "Error Message" });

    // Now both error and helptext should be in aria-describedby
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain("error-");
    expect(describedBy).toContain("helptext-");
    const errorMessage = formItem.querySelector(".error-msg");
    expect(errorMessage?.id).toBe(describedBy?.split(" ")[0]);
    expect(errorMessage?.textContent).toContain("Error Message");

    await rerender({ error: "" });

    // Back to only helptext in aria-describedby
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toContain("helptext-");
    expect(input.getAttribute("aria-describedby")).not.toContain("error-");
  });
});
