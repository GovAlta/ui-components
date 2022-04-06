import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { GoACircularProgress, CircularProgressType, CircularProgressVariant } from './circular-progress'

describe('CircularProgress', () => {

  it("does not render anything when not visible", async () => {
    const { baseElement } = render(<GoACircularProgress type="infinite" variant="inline" message="the message" visible={false} size="small" />);
    const el = baseElement.querySelector('goa-circular-progress');
    expect(el.innerHTML).toBeFalsy();
  });

  ["fullscreen", "inline"].forEach((variant: CircularProgressVariant) => {
    ["infinite", "progress"].forEach((type: CircularProgressType) => {
      it(`renders the ${type} type of the ${variant} variant`, async () => {
        const { baseElement } = render(<GoACircularProgress type={type} variant={variant} message="the message" visible={true} />);
        const el = baseElement.querySelector('goa-circular-progress');
        await waitFor(() => {
          expect(el.getAttribute("type")).toBe(type);
          expect(el.getAttribute("message")).toBe("the message");
          expect(el.getAttribute("variant")).toBe(variant);
        })
      })
    });
  });
});
