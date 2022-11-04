import React from "react";
import { fireEvent, render } from "@testing-library/react";
import GoATextArea from "./textarea";

describe("TextArea", () => {
  it("renders the text area", async () => {
    const { findByTestId } = render(
      <GoATextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        rows={10}
        placeholder="textarea-placeholder"
        disabled={true}
        showCounter={true}
        maxCharCount={50}
        onChange={() => {}}
      />
    );

    const el = await findByTestId("textarea-testid");
    expect(el.getAttribute("name")).toBe("textarea-name");
    expect(el.getAttribute("value")).toBe("textarea-value");
    expect(el.getAttribute("rows")).toBe("10");
    expect(el.getAttribute("placeholder")).toBe("textarea-placeholder");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("showcounter")).toBe("true");
    expect(el.getAttribute("maxcharcount")).toBe("50");
  });

  it("handles the onChange event", async () => {
    const onChange = jest.fn();
    const newValue = "new-value";

    const { findByTestId } = render(
      <GoATextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        rows={10}
        placeholder="textarea-placeholder"
        disabled={true}
        onChange={(name: string, value: string) => {
          expect(name).toBe("textarea-name");
          expect(value).toBe(newValue);
          onChange();
        }}
      />
    );

    const el = await findByTestId("textarea-testid");

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "textarea-name", value: newValue },
      })
    );

    expect(onChange).toBeCalled();
  });
});
