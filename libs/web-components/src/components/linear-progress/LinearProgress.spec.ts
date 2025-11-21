import { render, waitFor } from "@testing-library/svelte";
import GoALinearProgress from "./LinearProgress.svelte";
import { it, describe } from "vitest";

describe("GoALinearProgress", () => {
  const testid = "progressbar";

  [-1, 0, 20, 100, 101].forEach((progress: number) => {
    it(`renders the linear progress with progress value ${progress}%`, async () => {
      const { queryByTestId } = render(GoALinearProgress, {
        testid,
        progress,
      });

      await waitFor(() => {
        const expectedPercentage = Math.max(0, Math.min(progress || 0, 100));
        expect(queryByTestId(`${testid}-percentage`)?.innerHTML).toContain(
          `${expectedPercentage}%`,
        );
        expect(
          queryByTestId(`${testid}-progressbar-container`)?.getAttribute(
            "aria-valuenow",
          ),
        ).toBe(`${expectedPercentage}`);
      });
    });
  });

  it("renders the ARIA attributes correctly", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50,
      ariaLabel: "Loading progress",
      ariaLabelledby: "progress-label",
    });

    await waitFor(() => {
      const progressBar = queryByTestId(
        `${testid}-progressbar-container`,
      ) as HTMLElement;
      expect(progressBar.getAttribute("role")).toBe("progressbar");
      expect(progressBar.getAttribute("aria-label")).toBe("Loading progress");
      expect(progressBar.getAttribute("aria-labelledby")).toBe(
        "progress-label",
      );
      expect(progressBar.getAttribute("aria-valuemin")).toBe("0");
      expect(progressBar.getAttribute("aria-valuemax")).toBe("100");
      expect(progressBar.getAttribute("aria-valuenow")).toBe("50");
      expect(progressBar.getAttribute("aria-valuetext")).toBeNull();
    });
  });

  it("rounds the percentage down when progress is a decimal", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50.6,
    });

    await waitFor(() => {
      expect(queryByTestId(`${testid}-percentage`)?.innerHTML).toContain("51%");
    });
  });

  it("rounds the percentage up when progress is a decimal", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50.4,
    });

    await waitFor(() => {
      expect(queryByTestId(`${testid}-percentage`)?.innerHTML).toContain("50%");
    });
  });

  it("shows the percentage when showPercentage is not set", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50,
    });

    await waitFor(() => {
      expect(queryByTestId(`${testid}-percentage`)).not.toBeNull();
    });
  });

  it("shows the percentage when showPercentage is true", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50,
      showPercentage: "true",
    });

    await waitFor(() => {
      expect(queryByTestId(`${testid}-percentage`)).not.toBeNull();
    });
  });

  it("hides the percentage when showPercentage is false", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 50,
      showPercentage: "false",
    });

    await waitFor(() => {
      expect(queryByTestId(`${testid}-percentage`)).toBeNull();
    });
  });

  it("renders indeterminate progress when progress is not provided", async () => {
    const { queryByTestId } = render(GoALinearProgress, { testid });

    await waitFor(() => {
      // Check the indeterminate indicator is visible and the determinate one is hidden
      expect(queryByTestId(`${testid}-indeterminate-indicator`)).not.toBeNull();
      expect(queryByTestId(`${testid}-determinate-indicator`)).toBeNull();
    });
  });

  // aria-valuenow should not be present when the value is indeterminate
  it("does render aria-valuenow attribute when progress is indeterminate", async () => {
    const { queryByTestId } = render(GoALinearProgress, { testid });

    await waitFor(() => {
      const progressBar = queryByTestId(
        `${testid}-progressbar-container`,
      ) as HTMLElement;
      expect(progressBar.getAttribute("aria-valuenow")).toBeNull();
      expect(progressBar.getAttribute("aria-valuetext")).toBe("In progress");
    });
  });

  // aria-valuetext should not be present when the value is indeterminate
  it("does render aria-valuetext attribute when progress is indeterminate", async () => {
    const { queryByTestId } = render(GoALinearProgress, {
      testid,
      progress: 100,
    });

    await waitFor(() => {
      const progressBar = queryByTestId(
        `${testid}-progressbar-container`,
      ) as HTMLElement;
      expect(progressBar.getAttribute("aria-valuetext")).toBeNull();
      expect(progressBar.getAttribute("aria-valuenow")).toBe("100");
    });
  });
});
