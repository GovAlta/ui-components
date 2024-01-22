import { render, waitFor } from '@testing-library/svelte';
import GoASpinner from './Spinner.svelte'
import { it, describe } from "vitest";

describe('GoASpinner', () => {

  it("should render", async () => {
    const result = render(GoASpinner, { testid: "my-spinner", size: "large" });
    const spinner = await result.findByTestId("my-spinner");

    await waitFor(() => {
      expect(spinner).toBeTruthy();
    })
  });

  ["small", "medium", "large", "xlarge"].forEach((size: string) => {
    it(`renders the ${size} spinner`, async () => {
      const result = render(GoASpinner, { testid: "my-spinner", size });
      const spinner = await result.findByTestId("my-spinner");

      await waitFor(() => {
        expect(spinner).toBeTruthy();
      })
    })
  });

  [false, true].forEach((invert: boolean) => {
    it(`renders the ${invert ? "inverted" : "normal"} variants`, () => {
      const result = render(GoASpinner, { testid: "my-spinner", size: "medium", invert });
      const spinner = result.getByTestId("my-spinner");
      const circle = spinner.querySelector("circle");
      const path = spinner.querySelector("path");

      if (!invert) {
        expect(circle.getAttribute("stroke")).toBe("var(--goa-color-brand-light)");
        expect(path.getAttribute("stroke")).toBe("var(--goa-color-info-default)");
      } else {
        expect(circle.getAttribute("stroke")).toBe("var(--goa-color-info-hover)");
        expect(path.getAttribute("stroke")).toBe("var(--goa-color-brand-light)");
      }
    })
  });

});
