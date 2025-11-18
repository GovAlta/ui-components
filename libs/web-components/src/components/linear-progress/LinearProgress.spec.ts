import { render, waitFor } from "@testing-library/svelte";
import GoALinearProgress from "./LinearProgress.svelte";
import { it, describe } from "vitest";

describe("GoALinearProgress", () => {
  [-1, 0, 20, 100, 101].forEach((progress: number) => {
    it(`renders the linear progress with progress value ${progress}%`, async () => {
      const { container } = render(GoALinearProgress, {
        progress,
      });

      await waitFor(() => {
        expect(container.querySelector(".percentage")?.innerHTML).toContain(
          `${Math.max(0, Math.min(progress, 100))}%`,
        );
      });
    });
  });

  it("shows the percentage when showpercentage is not set", async () => {
    const { container } = render(GoALinearProgress, {
      progress: 50,
    });

    await waitFor(() => {
      expect(container.querySelector(".percentage")).not.toBeNull();
    });
  });

  it("shows the percentage when showpercentage is true", async () => {
    const { container } = render(GoALinearProgress, {
      progress: 50,
      showpercentage: "true",
    });

    await waitFor(() => {
      expect(container.querySelector(".percentage")).not.toBeNull();
    });
  });

  it("hides the percentage when showpercentage is false", async () => {
    const { container } = render(GoALinearProgress, {
      progress: 50,
      showpercentage: "false",
    });

    await waitFor(() => {
      expect(container.querySelector(".percentage")).toBeNull();
    });
  });
});
