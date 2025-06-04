// NOTE: This file should be named datepicker.browser.spec.tsx for JSX/TSX support!
import React from "react";
import { render } from "vitest-browser-react";
import { GoabDatePicker } from "../src";
import { expect, describe, it, vi } from "vitest";

const noop = () => undefined;

function px(val: string) {
  return Number(val.replace("px", ""));
}

describe("GoabDatePicker width", () => {
  it("should render at 50% width", async () => {
    // Setup a parent with a known width
    const Component = () => (
      <div style={{ width: "400px" }}>
        <GoabDatePicker testId="datepicker" width="50%" onChange={noop} />
      </div>
    );
    const result = render(<Component />);
    const datepicker = result.getByTestId("datepicker");
    await vi.waitFor(() => {
      const rect = datepicker.element().getBoundingClientRect();
      expect(Math.abs(rect.width - 200)).toBe(200); // 50% of 400px
    });
  });

  it("should render at 550px width", async () => {
    const Component = () => (
      <div style={{ width: "550px" }}>
        <GoabDatePicker testId="datepicker" width="550px" onChange={noop} />
      </div>
    );
    const result = render(<Component />);
    const datepicker = result.getByTestId("datepicker");
    await vi.waitFor(() => {
      const rect = datepicker.element().getBoundingClientRect();
      expect(Math.abs(rect.width)).toBe(550);
    });
  });

  it("should render at 30ch width", async () => {
    const Component = () => (
      <div style={{ width: "30ch", fontFamily: "monospace", fontSize: "16px" }}>
        <GoabDatePicker testId="datepicker" width="30ch" onChange={noop} />
      </div>
    );
    const result = render(<Component />);
    const datepicker = result.getByTestId("datepicker");

    // Dynamically measure the width of a single "0" in the same font
    const measureCh = () => {
      const span = document.createElement("span");
      span.style.fontFamily = "monospace";
      span.style.fontSize = "16px";
      span.textContent = "0";
      document.body.appendChild(span);
      const chWidth = span.getBoundingClientRect().width;
      document.body.removeChild(span);
      return chWidth;
    };

    await vi.waitFor(() => {
      const rect = datepicker.element().getBoundingClientRect();
      const chWidth = measureCh();
      expect(rect.width).toBe(chWidth * 30);
    });
  });
});
