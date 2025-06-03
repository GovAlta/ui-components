import { render } from "vitest-browser-react";

import { GoabLink } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Link", () => {
  it("should trigger the action with an arg", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabLink testId={"link"} action="some-action" actionArg="some-arg-value">
            Some action
          </GoabLink>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");
    const link = result.getByTestId("link");

    const spy = vi.fn();
    container.element().addEventListener("some-action", (e) => {
      const arg = (e as CustomEvent).detail;
      spy(arg);
    });

    // Actions

    await link.click();

    // Result

    await vi.waitFor(() => {
      expect(spy).toBeCalledWith("some-arg-value");
    })
  })

  it("should trigger the action with an args object", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabLink testId={"link"} action="some-action" actionArgs={{foo: "bar"}}>
            Some action
          </GoabLink>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");
    const link = result.getByTestId("link");

    const spy = vi.fn();
    container.element().addEventListener("some-action", (e) => {
      const arg = (e as CustomEvent).detail;
      spy(arg);
    });

    // Actions

    await link.click();

    // Result

    await vi.waitFor(() => {
      expect(spy).toBeCalledWith({foo: "bar"});
    })
  })
})
