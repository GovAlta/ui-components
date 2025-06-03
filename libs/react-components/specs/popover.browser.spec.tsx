import { render } from "vitest-browser-react";

import { GoabTabs, GoabTab, GoabPopover, GoabButton, GoabIconButton } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Popover", () => {
  it("should allow popover to be closed via a button with a close action", async () => {
    const Component = () => {
      return (
        <GoabPopover target={<GoabButton testId={"target"}>Open popover</GoabButton>}>
          This is the popover content
          <GoabButton testId={"close-button"} action={"close"}>
            Close
          </GoabButton>
        </GoabPopover>
      );
    };

    const result = render(<Component />);
    const target = result.getByTestId("target");
    const closeButton = result.getByTestId("close-button");

    // Actions

    await target.click();
    expect(closeButton.element()).toBeTruthy()
    await closeButton.click();

    // Result

    await vi.waitFor(() => {
      expect(closeButton.element().checkVisibility()).toBeFalsy();
    })
  });
})
