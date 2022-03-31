import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import GoACircularProgress from './CircularProgress.svelte'

describe('GoACircularProgress', () => {

  ["fullscreen", "inline"].forEach((variant) => {
    ["infinite", "progress"].forEach((type: string) => {
      it(`renders the ${type} type of the ${variant} variant`, async () => {
        const { container } = render(GoACircularProgress, { type, variant, message: "the message", visible: "true" });

        await waitFor(() => {
          expect(container.querySelector(`.${variant}`)).toBeTruthy();
          expect(container.querySelector(".message").innerHTML).toContain("the message");
          expect(container.querySelector("goa-spinner").hasAttribute(type));
        })
      })
    });
  });

});
