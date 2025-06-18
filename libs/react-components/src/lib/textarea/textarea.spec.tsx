import { fireEvent, render } from "@testing-library/react";
import GoabTextArea from "./textarea";
import { describe, it, expect, vi } from "vitest";
import { GoabTextAreaOnChangeDetail } from "@abgov/ui-components-common";

const noop = () => {
  /* do nothing */
};

describe("TextArea", () => {
  it("should render with properties", async () => {
    render(<GoabTextArea name="textarea-name" onChange={noop} />);

    const el = document.querySelector("goa-textarea");
    expect(el?.getAttribute("name")).toBe("textarea-name");
    expect(el?.getAttribute("readonly")).toBeNull();
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should render with properties", async () => {
    render(
      <GoabTextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        rows={10}
        placeholder="textarea-placeholder"
        readOnly
        disabled
        error
        countBy="word"
        maxCount={50}
        maxWidth="100px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        autoComplete="off"
        onChange={noop}
      />,
    );

    const el = document.querySelector("goa-textarea");
    expect(el?.getAttribute("name")).toBe("textarea-name");
    expect(el?.getAttribute("value")).toBe("textarea-value");
    expect(el?.getAttribute("rows")).toBe("10");
    expect(el?.getAttribute("placeholder")).toBe("textarea-placeholder");
    expect(el?.getAttribute("readonly")).toBe("true");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("countby")).toBe("word");
    expect(el?.getAttribute("maxcount")).toBe("50");
    expect(el?.getAttribute("maxwidth")).toBe("100px");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("autocomplete")).toBe("off");
  });

  it("handles the onChange event", async () => {
    const onChange = vi.fn();
    const newValue = "new-value";

    render(
      <GoabTextArea
        testId="textarea-testid"
        name="textarea-name"
        value="textarea-value"
        countBy="word"
        rows={10}
        placeholder="textarea-placeholder"
        onChange={(event: GoabTextAreaOnChangeDetail) => {
          expect(event.name).toBe("textarea-name");
          expect(event.value).toBe(newValue);
          onChange();
        }}
      />,
    );

    const el = document.querySelector("goa-textarea");

    if (el) {
      fireEvent(
        el,
        new CustomEvent("_change", {
          detail: { name: "textarea-name", value: newValue },
        }),
      );
    }

    expect(onChange).toBeCalled();
  });
});
