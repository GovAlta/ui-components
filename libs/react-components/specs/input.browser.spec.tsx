import { render } from "vitest-browser-react";
import { GoabInput } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import React from "react";

describe("Input Browser Tests", () => {
  it("passes the browser event on change, keypress, focus, and blur details", async () => {
    const onChange = vi.fn();
    const onKeyPress = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const result = render(
      <div>
        <GoabInput
          name="event-input"
          testId="event-input"
          onChange={onChange}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        ,
        <GoabInput
          name="blur-target"
          testId="blur-target"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
        />
        ,
      </div>,
    );

    const input = result.getByTestId("event-input");
    const blurTarget = result.getByTestId("blur-target");

    await vi.waitFor(() => {
      expect(input.element()).toBeTruthy();
    });

    const inputEl = input.element() as HTMLElement;
    inputEl.focus();
    await userEvent.type(inputEl, "a");

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
      const focusDetail = onFocus.mock.calls[0][0];
      expect(focusDetail.name).toBe("event-input");
      expect(focusDetail.value).toBe("");
      expect(focusDetail.event).toBeInstanceOf(Event);

      expect(onKeyPress).toHaveBeenCalledTimes(1);
      const keyPressDetail = onKeyPress.mock.calls[0][0];
      expect(keyPressDetail.name).toBe("event-input");
      expect(keyPressDetail.value).toBe("a");
      expect(keyPressDetail.key).toBe("a");
      expect(keyPressDetail.event).toBeInstanceOf(Event);

      expect(onChange).toHaveBeenCalledTimes(1);
      const changeDetail = onChange.mock.calls[0][0];
      expect(changeDetail.name).toBe("event-input");
      expect(changeDetail.value).toBe("a");
      expect(changeDetail.event).toBeInstanceOf(Event);
    });

    await vi.waitFor(() => {
      const blurEl = blurTarget.element() as HTMLElement;
      expect(blurEl).toBeTruthy();
      blurEl.focus();
    });

    await vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
      const blurDetail = onBlur.mock.calls[0][0];
      expect(blurDetail.name).toBe("event-input");
      expect(blurDetail.value).toBe("a");
      expect(blurDetail.event).toBeInstanceOf(Event);
    });
  });
});
