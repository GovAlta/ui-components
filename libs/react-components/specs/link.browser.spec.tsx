import { render } from "vitest-browser-react";

import { GoabLink } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";

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
    const link = result.getByTestId("link");
    const leadingIcon = link.getByTestId("leading-icon");

    const spy = vi.fn();

    const anchor = result.getByTestId("anchor");
    anchor.element().addEventListener("click", spy);

    await leadingIcon.click();

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
    const link = result.getByTestId("link");
    const trailingIcon = link.getByTestId("trailing-icon");

    const spy = vi.fn();

    const anchor = result.getByTestId("anchor");
    anchor.element().addEventListener("click", spy);


    await trailingIcon.click();

    await vi.waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it("should apply the focus ring on keyboard focus but not on mouse click (#3605)", async () => {
    const Component = () => {
      return (
        <div>
          <button data-testid="before">before</button>
          <GoabLink testId="link" leadingIcon="download">
            <a href="#focus-anchor" data-testid="anchor">Download file</a>
          </GoabLink>
          <button data-testid="after">after</button>
        </div>
      );
    };

    const result = render(<Component />);
    const anchor = result.getByTestId("anchor");
    const before = result.getByTestId("before");

    // Wait for the custom element to upgrade so .shadowRoot is real.
    // The .keyboard-focused class lives on a shadow-DOM element.
    const linkDiv = await vi.waitFor(() => {
      const host = result.container.querySelector("goa-link") as HTMLElement | null;
      const el = host?.shadowRoot?.querySelector(".link") as HTMLElement | null;
      expect(el).toBeTruthy();
      return el!;
    });

    // Mouse click on the anchor: pointer modality, no ring on the container.
    await anchor.click();
    expect(linkDiv.classList.contains("keyboard-focused")).toBe(false);

    // Tab from the prior button into the link: keyboard modality, ring on the container.
    await before.element().focus();
    await userEvent.keyboard("{Tab}");
    await vi.waitFor(() => {
      expect(linkDiv.classList.contains("keyboard-focused")).toBe(true);
    });

    // Tab onward: focus leaves the link, class clears.
    await userEvent.keyboard("{Tab}");
    await vi.waitFor(() => {
      expect(linkDiv.classList.contains("keyboard-focused")).toBe(false);
    });
  });
})
