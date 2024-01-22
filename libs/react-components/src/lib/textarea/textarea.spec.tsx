import { fireEvent, render } from "@testing-library/react";
import GoATextArea from "./textarea";
import { describe, it, expect, vi } from "vitest";

describe("TextArea", () => {
  it("renders the text area", async () => {
    render(
      <GoATextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        rows={10}
        placeholder="textarea-placeholder"
        disabled={true}
        countBy="word"
        maxCount={50}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        onChange={() => {}}
      />
    );

    const el = document.querySelector("goa-textarea");
    expect(el.getAttribute("name")).toBe("textarea-name");
    expect(el.getAttribute("value")).toBe("textarea-value");
    expect(el.getAttribute("rows")).toBe("10");
    expect(el.getAttribute("placeholder")).toBe("textarea-placeholder");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("countby")).toBe("word");
    expect(el.getAttribute("maxcount")).toBe("50");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("handles the onChange event", async () => {
    const onChange = vi.fn();
    const newValue = "new-value";

    render(
      <GoATextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        countBy="word"
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

    const el = document.querySelector("goa-textarea");

    fireEvent(
      el,
      new CustomEvent("_change", {
        detail: { name: "textarea-name", value: newValue },
      })
    );

    expect(onChange).toBeCalled();
  });
});
