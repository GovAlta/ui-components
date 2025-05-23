import { render } from "@testing-library/react";
import GoabSpinner from "./spinner";
import { GoabSpinnerSize } from "@abgov/ui-components-common";

describe("Spinner", () => {
  it("should render", () => {
    render(<GoabSpinner type="progress" size="small" />);

    const el = document.querySelector("goa-spinner");
    expect(el?.getAttribute("invert")).toBeNull();
  });

  (["small", "medium", "large", "xlarge"] as const).forEach((size: GoabSpinnerSize) => {
    it(`renders the ${size} spinner with properties`, async () => {
      render(
        <GoabSpinner
          type="progress"
          size={size}
          invert
          testId="spinner-testid"
          progress={20}
        />,
      );

      const el = document.querySelector("goa-spinner");
      expect(el?.getAttribute("size")).toBe(size);
      expect(el?.getAttribute("type")).toBe("progress");
      expect(el?.getAttribute("testid")).toBe("spinner-testid");
      expect(el?.getAttribute("progress")).toBe("20");
      expect(el?.getAttribute("invert")).toBe("true");
    });
  });
});
