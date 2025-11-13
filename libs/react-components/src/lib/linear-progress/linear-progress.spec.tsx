import { render, waitFor } from "@testing-library/react";

import { GoabLinearProgress } from "./linear-progress";

describe("LinearProgress", () => {
  it("renders a goa-linear-progress", async () => {
    const { container } = render(<GoabLinearProgress />);
    const el = container.querySelector("goa-linear-progress");
    await waitFor(() => {
      expect(el).toBeTruthy();
    });
  });
});
