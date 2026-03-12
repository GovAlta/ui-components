import { render } from "vitest-browser-react";
import { GoabPopover, GoabButton, GoabModal } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";

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

    await target.click();
    expect(closeButton).toBeVisible();
    await closeButton.click();

    await vi.waitFor(() => {
      expect(closeButton).not.toBeVisible();
    });
  });

  it("should close popover when pressing Escape", async () => {
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

    // Open popover
    await target.click();

    await vi.waitFor(() => {
      expect(closeButton).toBeVisible();
    });

    // Press Escape to close (native popover light dismiss)
    await userEvent.keyboard("{Escape}");

    await vi.waitFor(() => {
      expect(closeButton).not.toBeVisible();
    });
  });

  it("should return focus to trigger after closing with Escape - issue3067", async () => {
    const Component = () => {
      return (
        <GoabPopover
          target={<GoabButton testId={"focus-target"}>Focus Test Button</GoabButton>}
        >
          <p>Popover content</p>
        </GoabPopover>
      );
    };

    const result = render(<Component />);
    const target = result.getByTestId("focus-target");
    const popoverContent = result.getByTestId("popover-content");
    const popoverTarget = result.getByTestId("popover-target");

    // Open popover
    await target.click();
    await vi.waitFor(() => {
      expect(popoverContent).toBeVisible();
    });

    // Close with Escape
    await userEvent.keyboard("{Escape}");
    await vi.waitFor(() => {
      expect(popoverContent).not.toBeVisible();
    });

    // Focus should be on the popover target button
    await vi.waitFor(() => {
      expect(popoverTarget.element().matches(":focus-within")).toBeTruthy();
    });
  });

  it("should close Popover A when Popover B is opened (popover='auto' behavior)", async () => {
    const Component = () => {
      return (
        <>
          <GoabPopover
            testId="popover-a"
            target={<GoabButton testId={"target-a"}>Popover A</GoabButton>}
          >
            <p data-testid="content-a">Content A</p>
          </GoabPopover>
          <GoabPopover
            testId="popover-b"
            target={<GoabButton testId={"target-b"}>Popover B</GoabButton>}
          >
            <p data-testid="content-b">Content B</p>
          </GoabPopover>
        </>
      );
    };

    const result = render(<Component />);
    const targetA = result.getByTestId("target-a");
    const targetB = result.getByTestId("target-b");
    const contentA = result.getByTestId("content-a");
    const contentB = result.getByTestId("content-b");

    // Open Popover A
    await targetA.click();
    await vi.waitFor(() => {
      expect(contentA).toBeVisible();
    });

    // Open Popover B — should auto-close Popover A
    await targetB.click();
    await vi.waitFor(() => {
      expect(contentB).toBeVisible();
      expect(contentA).not.toBeVisible();
    });
  });

  it("should respect maxWidth when popover is placed above a button - issue3062", async () => {
    const Component = () => {
      return (
        <>
          <GoabPopover
            testId="popover-above"
            maxWidth="320px"
            target={
              <GoabButton testId={"target-above"} type="secondary">
                Show Popover
              </GoabButton>
            }
          >
            <p>This popover is above the button. It should respect maxWidth (320px).</p>
          </GoabPopover>

          <GoabButton type="primary">Submit Form</GoabButton>

          <GoabPopover
            testId="popover-below"
            maxWidth="320px"
            target={
              <GoabButton testId={"target-below"} type="secondary" size="compact">
                Popover Test
              </GoabButton>
            }
          >
            <p>
              This popover is below the button. It should also respect maxWidth (320px).
            </p>
          </GoabPopover>
        </>
      );
    };

    const result = render(<Component />);
    const targetAbove = result.getByTestId("target-above");
    const targetBelow = result.getByTestId("target-below");
    const popoverAbove = result.getByTestId("popover-above");
    const popoverBelow = result.getByTestId("popover-below");

    // Open popover above the button
    await targetAbove.click();

    let aboveWidth: number;
    const contentAbove = popoverAbove.getByTestId("popover-content");
    await vi.waitFor(() => {
      expect(contentAbove).toBeVisible();
      aboveWidth = contentAbove.element().getBoundingClientRect().width;
    });

    // Close it
    await userEvent.keyboard("{Escape}");

    // Open popover below the button
    await targetBelow.click();

    let belowWidth: number;
    const contentBelow = popoverBelow.getByTestId("popover-content");
    await vi.waitFor(() => {
      expect(contentBelow).toBeVisible();
      belowWidth = contentBelow.element().getBoundingClientRect().width;
    });

    // Both popovers should have the same width (maxWidth respected equally)
    expect(aboveWidth!).toBe(belowWidth!);
  });

  it("should position via inline styles when anchor positioning is unsupported", async () => {
    const supportsSpy = vi.spyOn(CSS, "supports").mockReturnValue(false);

    const Component = () => (
      <GoabPopover testId="popover" target={<GoabButton testId="target">Open</GoabButton>}>
        <p>Content</p>
      </GoabPopover>
    );

    const result = render(<Component />);
    await result.getByTestId("target").click();

    await vi.waitFor(() => {
      const content = result.getByTestId("popover-content");
      // applyJsPosition sets inline top/left when anchor positioning is unsupported
      expect(content.element().style.top).toMatch(/\d+px/);
      expect(content.element().style.left).toMatch(/\d+px/);
    });

    supportsSpy.mockRestore();
  });

  describe("Popover within a modal", () => {
    it("should open the popover within a modal even with long content", async () => {
      const Component = () => {
        const longContent = Array.from({ length: 50 }, (_, i) => (
          <p key={i}>This is line {i + 1} of the popover content.</p>
        ));

        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={vi.fn()}
            testId="test-modal"
          >
            <GoabPopover
              testId="popover"
              target={<GoabButton testId={"target"}>Open popover</GoabButton>}
            >
              <div style={{ minHeight: "300px" }}>{longContent}</div>
              <GoabButton action={"close"}>Close</GoabButton>
            </GoabPopover>
          </GoabModal>
        );
      };

      const result = render(<Component />);
      const target = result.getByTestId("target");
      const popoverContent = result.getByTestId("popover-content");

      await target.click();

      await vi.waitFor(() => {
        expect(popoverContent).toBeVisible();
      });
    });

    it("should open the popover upwards within a modal if there is more space above than below", async () => {
      const Component = () => {
        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={vi.fn()}
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
                <GoabButton action={"close"}>Close</GoabButton>
              </GoabPopover>
              <p>Space Below</p>
            </div>
          </GoabModal>
        );
      };

      const result = render(<Component />);
      const target = result.getByTestId("target");
      const popoverContent = result.getByTestId("popover-content");

      await target.click();

      await vi.waitFor(() => {
        expect(popoverContent).toBeVisible();
      });
    });

    it("should open the popover downwards within a modal if there is enough space below", async () => {
      const Component = () => {
        return (
          <GoabModal
            heading="Scrollable Modal"
            open={true}
            onClose={vi.fn()}
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
                <GoabButton action={"close"}>Close</GoabButton>
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
      const popoverContent = result.getByTestId("popover-content");

      await target.click();

      await vi.waitFor(() => {
        expect(popoverContent).toBeVisible();
      });
    });
  });
});
