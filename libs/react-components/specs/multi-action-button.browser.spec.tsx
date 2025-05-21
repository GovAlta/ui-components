import { render } from "vitest-browser-react";

import { GoabButton, GoabMultiActionButton } from "../src";
import { vi } from "vitest";

describe("MultiActionButton", () => {
  it("should show buttons", async () => {
    const onClick = vi.fn();

    const Component = () => {
      return (
        <GoabMultiActionButton text="Show actions" testId="multi-action-button">
          <GoabButton action="close" onClick={() => onClick(1)} testId="button-1">Action 1</GoabButton>
          <GoabButton action="close" onClick={() => onClick(2)} testId="button-2">Action 2</GoabButton>
          <GoabButton action="close" onClick={() => onClick(3)} testId="button-3">Action 3</GoabButton>
        </GoabMultiActionButton>
      );
    };

    const result = render(<Component />);
    const multiActionButton = result.getByTestId("multi-action-button");

    for (let i = 1; i <= 3; i++) {
      // button should not be visible yet
      const button = result.getByTestId(`button-${i}`);
      try {
        button.element();
        expect(true).toBe(false);
      } catch(e) {
        // should make it here
      }

      await multiActionButton.click();
      await vi.waitFor(async () => {
        const button = result.getByTestId(`button-${i}`);
        await button.click();
        expect(onClick).toBeCalledWith(i);
      })
    }
  });
})
