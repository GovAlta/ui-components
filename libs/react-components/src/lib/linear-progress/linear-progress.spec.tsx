import { render, waitFor } from "@testing-library/react";

import { GoabLinearProgress } from "./linear-progress";

describe("LinearProgress", () => {
  it("renders a goa-linear-progress", async () => {
    const { container } = render(<GoabLinearProgress progress={50} />);
    const el = container.querySelector("goa-linear-progress");
    await waitFor(() => {
      expect(el).toBeTruthy();
    });
  });

  it("passes the prop attribute values correctly", async () => {
    const testId = "linear-progress-test-id";
    const progress = 75;
    const { container } = render(
      <GoabLinearProgress progress={progress} showPercentage={true} testId={testId} />,
    );
    const el = container.querySelector("goa-linear-progress");
    await waitFor(() => {
      expect(el?.getAttribute("testid")).toBe(testId);
      expect(el?.getAttribute("progress")).toBe(progress.toString());
      expect(el?.getAttribute("showpercentage")).toBe("true");
    });
  });
});
