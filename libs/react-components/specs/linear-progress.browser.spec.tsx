import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";

import { GoabLinearProgress } from "../src";

describe("LinearProgress", () => {
  it("renders with a <goa-linear-progress>", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={-1} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(el).toBeTruthy();
    });
  });

  it("sets the progress value correctly", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={75} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(
        el?.shadowRoot
          ?.querySelector(".progressbar-determinate-indicator")
          ?.getAttribute("style"),
      ).toBe("width: 75%;");
      expect(el?.shadowRoot?.querySelector(".percentage")?.innerText).toBe("75%");
    });
  });

  it("rounds the progress value correctly", async () => {
    const { baseElement } = render(<GoabLinearProgress progress={49.49} />);
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(
        el?.shadowRoot
          ?.querySelector(".progressbar-determinate-indicator")
          ?.getAttribute("style"),
      ).toBe("width: 49%;");
      expect(el?.shadowRoot?.querySelector(".percentage")?.innerText).toBe("49%");
    });
  });

  it("does not show percent label when showPercentage is false", async () => {
    const { baseElement } = render(
      <GoabLinearProgress progress={50} showPercentage={false} />,
    );
    await vi.waitFor(() => {
      const el = baseElement.querySelector("goa-linear-progress");
      expect(el?.shadowRoot?.querySelector("span .percentage")).toBeNull();
    });
  });
});
