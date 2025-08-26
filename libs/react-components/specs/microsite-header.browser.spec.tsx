import { render } from "vitest-browser-react";
import { GoabMicrositeHeader } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("MicrositeHeader", () => {
  it("should not show feedback element when no feedbackUrl and no onFeedbackClick provided", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabMicrositeHeader type="alpha" />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    // Check that the feedback element does not exist
    const feedbackElement = container
      .element()
      .querySelector('[data-testid="feedback-click"]');
    expect(feedbackElement).toBeNull();
  });

  it("should show feedback element when feedbackUrl is provided", async () => {
    const Component = () => {
      return (
        <GoabMicrositeHeader type="alpha" feedbackUrl="https://example.com/feedback" />
      );
    };

    const result = render(<Component />);

    await vi.waitFor(async () => {
      const feedbackElement = result.getByTestId("feedback-click");
      expect(feedbackElement).not.toBeNull();
    });
  });

  it("should show feedback element when onFeedbackClick event is provided", async () => {
    const mockFeedbackClick = vi.fn();

    const Component = () => {
      return <GoabMicrositeHeader type="alpha" onFeedbackClick={mockFeedbackClick} />;
    };

    const result = render(<Component />);

    await vi.waitFor(async () => {
      // Check that the feedback element exists
      const feedbackElement = result.getByTestId("feedback-click");
      expect(feedbackElement).not.toBeNull();

      // Test that clicking the feedback element triggers the callback
      if (feedbackElement) {
        const link = feedbackElement.element().querySelector("a");
        await link?.click();

        expect(mockFeedbackClick).toBeCalled();
      }
    });
  });
});
