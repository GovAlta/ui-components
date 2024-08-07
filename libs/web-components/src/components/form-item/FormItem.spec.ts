import { render, fireEvent, cleanup, waitFor } from "@testing-library/svelte";
import GoAFormItem from "./FormItem.svelte";
import { it, describe, expect, afterEach, vi } from "vitest";

afterEach(cleanup);

describe("GoA FormItem", () => {
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
    const { component, findByTestId } = render(GoAFormItem, {
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
      new CustomEvent("input:mounted", {
        detail: { el: input },
        bubbles: true,
        composed: true,
      }),
    );

    // Initially, only helptext should be in aria-describedby
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toContain("helptext-");

    // Simulate error state change
    await fireEvent(
      formItem,
      new CustomEvent("errorChange", {
        detail: { isError: true },
        bubbles: true,
        composed: true,
      }),
    );

    // Now both error and helptext should be in aria-describedby
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain("error-");
    expect(describedBy).toContain("helptext-");

    // Simulate error state change back to no error
    await fireEvent(
      formItem,
      new CustomEvent("errorChange", {
        detail: { isError: false },
        bubbles: true,
        composed: true,
      }),
    );

    // Back to only helptext in aria-describedby
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toContain("helptext-");
    expect(input.getAttribute("aria-describedby")).not.toContain("error-");
  });
});
