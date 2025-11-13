import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";

import { GoabLinearProgress } from "../src";

describe("LinearProgress", () => {
  it("renders with a <goa-linear-progress>", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={0} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(el).toBeTruthy();
    });
  });
});
