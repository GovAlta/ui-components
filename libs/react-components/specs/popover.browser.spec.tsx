import { render } from "vitest-browser-react";

import { GoabPopover, GoabButton } from "../src";
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


  it("should close popover when clicking on the document body", async () => {
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

    // Actions
    await target.click();

    await vi.waitFor(() => {
      const closeButton = result.getByTestId("close-button");
      expect(closeButton.element().checkVisibility()).toBeTruthy();
    });

    document.body.click(); // Simulate click on document body

    // Result
    await vi.waitFor(() => {
      const closeButton = result.getByTestId("close-button");
      expect(closeButton.element().checkVisibility()).toBeFalsy();
    });
  });
})
