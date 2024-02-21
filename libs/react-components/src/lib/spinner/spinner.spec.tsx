import { render } from "@testing-library/react";
import GoASpinner, { SpinnerSize } from "./spinner";

describe("Spinner", () => {
  (["small", "medium", "large", "xlarge"] as const).forEach((size: SpinnerSize) => {
    it(`renders the ${size} spinner`, async () => {
      render(
        <GoASpinner
          type="progress"
          size={size}
          invert
          testId="spinner-testid"
          progress={20}
        />
      );
      const el = document.querySelector("goa-spinner");
      expect(el?.getAttribute("size")).toBe(size);
      expect(el?.getAttribute("type")).toBe("progress");
      expect(el?.getAttribute("data-testid")).toBe("spinner-testid");
      expect(el?.getAttribute("progress")).toBe("20");
      expect(el?.getAttribute("invert")).not.toBeNull();
    });
  });
});
