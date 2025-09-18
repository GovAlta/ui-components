import { render } from "vitest-browser-react";

import { GoabTextArea } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("TextArea Browser Tests", () => {
  const noop = () => {
    // noop
  };

  it("should render textarea component", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="description"
            testId="textarea"
            placeholder="Enter description"
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    expect(container).toBeTruthy();

    await vi.waitFor(
      () => {
        const textareaEl = container.element().querySelector("goa-textarea");
        expect(textareaEl).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth"
            width="800px"
            maxWidth="300px"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);
        expect(computed.maxWidth).toBe("300px");

        // Width should not exceed the maxWidth
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeGreaterThan(0);
        expect(numericWidth).toBeLessThanOrEqual(300);
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth with ch units", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth-ch"
            width="800px"
            maxWidth="40ch"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);

        // maxWidth gets computed to pixels (~400px for 40ch)
        const maxWidthValue = parseInt(computed.maxWidth || "0", 10);
        //expect(maxWidthValue).toBeGreaterThan(300); // Should be around 320px for 40ch
        //expect(maxWidthValue).toBeLessThan(450); // Allow some tolerance

        // Width should be constrained by maxWidth
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeLessThanOrEqual(maxWidthValue);
      },
      { timeout: 3000 },
    );
  });

  it("should apply maxWidth with % units", async () => {
    const Component = () => {
      return (
        <div data-testid="container" style={{ width: "800px" }}>
          <GoabTextArea
            name="longtext"
            testId="textarea-maxwidth-percent"
            width="100%"
            maxWidth="50%"
            value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10)}
            onChange={noop}
          />
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(
      () => {
        const host = container.element().querySelector("goa-textarea");
        expect(host).toBeTruthy();

        const computed = window.getComputedStyle(host as HTMLElement);
        expect(computed.maxWidth).toBe("50%");

        // Should be 50% of 800px container = 400px
        const numericWidth = parseInt(computed.width || "0", 10);
        expect(numericWidth).toBeGreaterThan(350); // Allow some tolerance
        expect(numericWidth).toBeLessThan(450); // Should not exceed 50% + tolerance
      },
      { timeout: 3000 },
    );
  });
});
