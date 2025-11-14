import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";

import { GoabLinearProgress } from "../src";

describe("LinearProgress", () => {
  it("renders with a <goa-linear-progress>", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={20} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      console.log(el);
      expect(el).toBeTruthy();
    });
  });

  it("sets the progress value correctly", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={75} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(el?.shadowRoot?.querySelector("progress")?.getAttribute("value")).toBe("75");
      expect(el?.shadowRoot?.querySelector("span")?.innerText).toBe("75%");
    });
  });
});
