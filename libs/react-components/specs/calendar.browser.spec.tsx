import { render } from "vitest-browser-react";

import { GoabCalendar } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Calendar", () => {
  const noop = () => {
    // noop
  };

  describe("Bug fixes", () => {
    describe("3156", () => {
      it("should render all months", async () => {

        // The calendar contained falsey values
        const Component = () => {
          return (
            <GoabCalendar name="favcolor" onChange={noop} />
          );
        };

        const result = render(<Component />);
        const falseyOption = result.getByTestId("dropdown-item-0");

        await vi.waitFor(() => {
          expect(falseyOption.element()).toBeTruthy();
        })
      })
    })
  })
});
