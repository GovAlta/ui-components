import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/svelte";
import GoAFormItem from "./FormItem.svelte"

afterEach(cleanup);

describe("GoA FormItem", () => {

  it("should render", async () => {
    render(GoAFormItem, {
      label: "the label",
      helptext: "the helptext",
      optional: "true",
      error: "the error",
    });

    const label = document.querySelector(".label");
    expect(label.innerHTML).toContain("the label");

    const optional = document.querySelector("em");
    expect(optional.innerHTML).toContain("optional");

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

    const optional = document.querySelector("em");
    expect(optional).toBeNull();
  });

});
