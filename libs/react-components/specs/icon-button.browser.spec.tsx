import { render } from "vitest-browser-react";

import { GoabIconButton } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Icon Button", () => {
  it("should trigger the action with an arg", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabIconButton icon="add" testId={"button"} action="some-action" actionArg="some-arg-value" />
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
          <GoabIconButton icon="add" testId={"button"} action="some-action" actionArgs={{foo: "bar"}} />
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
})
