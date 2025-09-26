import { render } from "vitest-browser-react";
import { GoabTextArea, GoabInput } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";

describe("TextArea", () => {
  it("should trigger onBlur event when focus leaves the textarea", async () => {
    const onBlurSpy = vi.fn();

    const Component = () => {
      const [value, setValue] = useState("");

      return (
        <div>
          <GoabTextArea
            testId="test-textarea"
            name="test-textarea"
            value={value}
            onChange={(detail) => setValue(detail.value)}
            onBlur={onBlurSpy}
          />
          <GoabInput
            type="text"
            testId="focus-target"
            name="focus-input"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const textareaEl = result.getByTestId("test-textarea");
    const inputEl = result.getByTestId("focus-target");

    await vi.waitFor(async () => {
      const textarea = textareaEl.element() as HTMLTextAreaElement;
      expect(textarea).toBeTruthy();
      textarea.focus();
      textarea.value = "Test content for blur";
    });

    // Trigger blur by focusing on the input element
    await vi.waitFor(() => {
      const input = inputEl.element() as HTMLInputElement;
      expect(input).toBeTruthy();
      input.focus();
    });

    // Verify onBlur was called with correct values
    await vi.waitFor(() => {
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onBlurSpy).toHaveBeenCalledWith({
        name: "test-textarea",
        value: "Test content for blur",
      });
    });
  });
});
