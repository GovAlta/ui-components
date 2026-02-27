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

  it("should trigger the anchor when the leading icon is clicked", async () => {
    const Component = () => {
      return (
        <GoabLink testId={"link"} leadingIcon={"home"}>
          <a href="#test-anchor" data-testid="anchor">Link text</a>
        </GoabLink>
      );
    };

    const result = render(<Component />);
    const leadingIcon = result.container.querySelector("[data-testid='leading-icon']");

    const spy = vi.fn();
    result.container.querySelector("[data-testid='anchor']")!.addEventListener("click", spy);

    (leadingIcon as HTMLElement).click();

    await vi.waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it("should trigger the anchor when the trailing icon is clicked", async () => {
    const Component = () => {
      return (
        <GoabLink testId={"link"} trailingIcon={"home"}>
          <a href="#test-anchor" data-testid="anchor">Link text</a>
        </GoabLink>
      );
    };

    const result = render(<Component />);
    const trailingIcon = result.container.querySelector("[data-testid='trailing-icon']");

    const spy = vi.fn();
    result.container.querySelector("[data-testid='anchor']")!.addEventListener("click", spy);

    (trailingIcon as HTMLElement).click();

    await vi.waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
})
