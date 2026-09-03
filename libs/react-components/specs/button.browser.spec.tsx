import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { GoabButton } from "../src";
import { expect, describe, it, vi, afterEach } from "vitest";

describe("Button", () => {
  it("should trigger the action with an arg", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabButton testId={"button"} action="some-action" actionArg="some-arg-value">
            Some action
          </GoabButton>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");
    const button = result.getByTestId("button");

    const spy = vi.fn();
    container.element().addEventListener("some-action", (e) => {
      const arg = (e as CustomEvent).detail;
      spy(arg);
    });

    // Actions

    await button.click();

    // Result

    await vi.waitFor(() => {
      expect(spy).toBeCalledWith("some-arg-value");
    })
  })

  it("should trigger the action with an args object", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabButton testId={"button"} action="some-action" actionArgs={{foo: "bar"}}>
            Some action
          </GoabButton>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");
    const button = result.getByTestId("button");

    const spy = vi.fn();
    container.element().addEventListener("some-action", (e) => {
      const arg = (e as CustomEvent).detail;
      spy(arg);
    });

    // Actions

    await button.click();

    // Result

    await vi.waitFor(() => {
      expect(spy).toBeCalledWith({foo: "bar"});
    })
  })

  describe("mobile width", () => {
    afterEach(async () => {
      await page.viewport(1280, 800);
    });

    it("should default to the full container width", async () => {
      await page.viewport(390, 800);
      const result = render(
        <div style={{ width: "300px" }}>
          <GoabButton testId="button">Button</GoabButton>
        </div>,
      );
      const button = result.getByTestId("button");

      await vi.waitFor(() => {
        expect(button.element().getBoundingClientRect().width).toBe(300);
      });
    });

    it("should use the supplied width", async () => {
      await page.viewport(390, 800);
      const result = render(
        <div style={{ width: "300px" }}>
          <GoabButton testId="button" width="100px">
            Button
          </GoabButton>
        </div>,
      );
      const button = result.getByTestId("button");

      await vi.waitFor(() => {
        expect(button.element().getBoundingClientRect().width).toBe(100);
      });
    });
  });
})
