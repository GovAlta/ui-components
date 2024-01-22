import { render, cleanup } from "@testing-library/svelte";
import GoAFormItem from "./FormItem.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("GoA FormItem", () => {
  it("should render with no params", async () => {
    const result = render(GoAFormItem, { testid: "foo" });
    const el = result.queryByTestId("foo");

    const label = el.querySelector(".label");
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

    const label = el.querySelector(".label");
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

    const label = el.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement.innerHTML).toContain("optional");

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

    const label = el.querySelector(".label");
    expect(label).toBeTruthy();

    const requirement = document.querySelector("em");
    expect(requirement.innerHTML).toContain("required");

    const helpText = document.querySelector(".help-msg");
    expect(helpText).toBeFalsy();

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg).toBeFalsy();
  });

  it("should render all params", async () => {
    render(GoAFormItem, {
      label: "the label",
      helptext: "the helptext",
      requirement: "optional",
      error: "the error",
      id: "labelId",
    });

    const label = document.querySelector(".label");
    expect(label.innerHTML).toContain("the label");
    expect(label.getAttribute("id")).toBe("labelId");

    const requirement = document.querySelector("em");
    expect(requirement.innerHTML).toContain("optional");

    const helpText = document.querySelector(".help-msg");
    expect(helpText.innerHTML).toContain("the helptext");

    const errMsg = document.querySelector(".error-msg");
    expect(errMsg.innerHTML).toContain("the error");
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
    const mock = vi.spyOn(console, "error").mockImplementation(() => {});

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
});
