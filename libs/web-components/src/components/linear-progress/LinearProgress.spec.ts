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
          `${Math.max(0, progress)}%`,
        );
      });
    });
  });
});
