import { render } from "vitest-browser-react";
import { GoabInput, GoabTextArea } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";
import { userEvent } from "@vitest/browser/context";

describe("TextArea Browser Tests", () => {
  const noop = () => {
    // noop
  };

  it("should render textarea component", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="description"
            testId="textarea"
            placeholder="Enter description"
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    expect(container).toBeTruthy();

    await vi.waitFor(
      () => {
        const textareaEl = container.element().querySelector("goa-textarea");
        expect(textareaEl).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth"
            width="800px"
            maxWidth="300px"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);
        expect(computed.maxWidth).toBe("300px");

        // Width should not exceed the maxWidth
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeGreaterThan(0);
        expect(numericWidth).toBeLessThanOrEqual(300);
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth with ch units", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth-ch"
            width="800px"
            maxWidth="40ch"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);

        // maxWidth gets computed to pixels (~400px for 40ch)
        const maxWidthValue = parseInt(computed.maxWidth || "0", 10);
        //expect(maxWidthValue).toBeGreaterThan(300); // Should be around 320px for 40ch
        //expect(maxWidthValue).toBeLessThan(450); // Allow some tolerance

        // Width should be constrained by maxWidth
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeLessThanOrEqual(maxWidthValue);
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth with % units", async () => {
    const Component = () => {
      return (
        <div data-testid="container" style={{ width: "800px" }}>
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth-percent"
            width="100%"
            maxWidth="50%"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);
        expect(computed.maxWidth).toBe("50%");

        // Should be 50% of 800px container = 400px
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeGreaterThan(350); // Allow some tolerance
        expect(numericWidth).toBeLessThan(450); // Should not exceed 50% + tolerance
      },
      { timeout: 3000 },
    );
  });

  it("passes the browser event on change, keypress, and blur details", async () => {
    const onChange = vi.fn();
    const onKeyPress = vi.fn();
    const onBlur = vi.fn();

    const Component = () => {
      return (
        <div>
          <GoabTextArea
            name="test-textarea"
            testId="test-textarea"
            onChange={onChange}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
          />
          <GoabInput
            name="test-input"
            testId="test-input"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const textarea = result.getByTestId("test-textarea");
    const input = result.getByTestId("test-input");

    await vi.waitFor(async () => {
      const textareaEL = textarea.element() as HTMLTextAreaElement;
      expect(textarea).toBeTruthy();
      textareaEL.focus();

      await userEvent.type(textareaEL, "s");
    });

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      const changeDetail = onChange.mock.calls[0][0];
      expect(changeDetail.name).toBe("test-textarea");
      expect(changeDetail.value).toBe("s");
      expect(changeDetail.event).toBeInstanceOf(Event);

      expect(onKeyPress).toHaveBeenCalledTimes(1);
      const keyPressDetail = onKeyPress.mock.calls[0][0];
      expect(keyPressDetail.name).toBe("test-textarea");
      expect(keyPressDetail.value).toBe("s");
      expect(keyPressDetail.key).toBe("s");
      expect(keyPressDetail.event).toBeInstanceOf(Event);
    });

    // Trigger blur by focusing on the input element
    await vi.waitFor(() => {
      const inputEL = input.element() as HTMLInputElement;
      expect(inputEL).toBeTruthy();
      inputEL.focus();
    });

    // Verify onBlur was called with correct values
    await vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
      const blurDetail = onBlur.mock.calls[0][0];
      expect(blurDetail.name).toBe("test-textarea");
      expect(blurDetail.value).toBe("s");
      expect(blurDetail.event).toBeInstanceOf(Event);
    });
  });
});
