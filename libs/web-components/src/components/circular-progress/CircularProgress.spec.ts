import { render, waitFor } from '@testing-library/svelte';
import GoACircularProgress from './CircularProgress.svelte'
import { it, describe } from "vitest";

describe('GoACircularProgress', () => {

  ["fullscreen", "inline"].forEach((variant) => {
    [-1, 0].forEach((progress: number) => {
      ["small", "large"].forEach((size: string) => {
        const type = progress ? "infinite" : "progress";

        it(`renders the ${type} type of the ${variant} variant`, async () => {
          const { container } = render(GoACircularProgress, {
            variant,
            size,
            progress,
            message: "the message",
            visible: "true"
          });

          await waitFor(() => {
            expect(container.querySelector(`.${variant}`)).toBeTruthy();
            expect(container.querySelector(".message").innerHTML).toContain("the message");
            expect(container.querySelector("goa-spinner").hasAttribute(type));
          })
        })
      })
    });
  });

});
