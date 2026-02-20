import { render } from "vitest-browser-react";
import { GoabPopover, GoabButton, GoabModal } from "../src";
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
    expect(closeButton.element()).toBeTruthy();
    await closeButton.click();

    // Result

    await vi.waitFor(() => {
      expect(closeButton.element().checkVisibility()).toBeFalsy();
    });
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

  describe("Popover within a modal", () => {
    it("should open the popover downwards within a modal if content exceeds available space", async () => {
      const Component = () => {
        const longContent = Array.from({ length: 50 }, (_, i) => (
          <p key={i}>This is line {i + 1} of the popover content.</p>
        ));

        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={() => {
              console.log("Does nothing in this test");
            }}
            testId="test-modal"
          >
            <GoabPopover
              testId="popover"
              target={<GoabButton testId={"target"}>Open popover</GoabButton>}
            >
              <div style={{ minHeight: "300px" }}>{longContent}</div>
              <GoabButton testId={"open-popover-button"} action={"close"}>
                Close
              </GoabButton>
            </GoabPopover>
          </GoabModal>
        );
      };

      const result = render(<Component />);
      const target = result.getByTestId("target");
      await target.click();

      await vi.waitFor(() => {
        const popoverContentEl = result.getByTestId("popover-content");
        expect(popoverContentEl.element()).toBeTruthy();
        expect(popoverContentEl.element().style.bottom).toBe("");
      });
    });

    it("should open the popover upwards within a modal if there is more space above than below", async () => {
      const Component = () => {
        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={() => {
              console.log("Does nothing in this test");
            }}
            testId="test-modal"
          >
            <div style={{ height: "400px" }}>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <p>Space above</p>
              <GoabPopover
                testId="popover"
                position="auto"
                target={<GoabButton testId={"target"}>Open popover</GoabButton>}
              >
                <div style={{ minHeight: "200px" }}>
                  <p>Popover Content</p>
                </div>
                <GoabButton testId={"open-popover-button"} action={"close"}>
                  Close
                </GoabButton>
              </GoabPopover>
              <p>Space Below</p>
            </div>
          </GoabModal>
        );
      };

      const result = render(<Component />);
      const target = result.getByTestId("target");
      await target.click();

      await vi.waitFor(() => {
        const popoverContentEl = result.getByTestId("popover-content");
        expect(popoverContentEl.element()).toBeTruthy();
        // It should be a number ending with px when opening upwards
        expect(popoverContentEl.element().style.top).toMatch(/-?\d+px/);
      });
    });

    it("should open the popover downwards within a modal if there is enough space below", async () => {
      const Component = () => {
        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={() => {
              console.log("Does nothing in this test");
            }}
            testId="test-modal"
          >
            <div style={{ height: "400px" }}>
              <p>Space above</p>
              <p>Space above</p>
              <GoabPopover
                testId="popover"
                position="auto"
                target={<GoabButton testId={"target"}>Open popover</GoabButton>}
              >
                <div style={{ minHeight: "200px" }}>
                  <p>Popover Content</p>
                </div>
                <GoabButton testId={"open-popover-button"} action={"close"}>
                  Close
                </GoabButton>
              </GoabPopover>
              <p>Space Below</p>
              <p>Space Below</p>
              <p>Space Below</p>
              <p>Space Below</p>
              <p>Space Below</p>
              <p>Space Below</p>
            </div>
          </GoabModal>
        );
      };

      const result = render(<Component />);
      const target = result.getByTestId("target");
      await target.click();

      await vi.waitFor(() => {
        const popoverContentEl = result.getByTestId("popover-content");
        expect(popoverContentEl.element()).toBeTruthy();
        // bottom should be set to 'auto' when opening downwards
        expect(popoverContentEl.element().style.bottom).toBe("");
      });
    });
  });
});
