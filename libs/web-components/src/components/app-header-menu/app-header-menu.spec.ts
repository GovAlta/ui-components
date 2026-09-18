import AppHeaderMenuWrapper from "./AppHeaderMenuWrapper.test.svelte";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { describe, it } from "vitest";
import { tick } from "svelte";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

describe("AppHeaderMenu", () => {
  it("renders the permanent menu layout", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 400,
    });

    const heading = "Some links";
    const { container } = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    });

    const popover = container.querySelector("goa-popover");
    const button = container.querySelector("button");
    const leadingIcon = container.querySelector("button goa-icon[type=add]");
    const chevronIcon = container.querySelector(
      "button goa-icon[type=chevron-down]",
    );
    const links = container.querySelectorAll("a");

    expect(popover?.getAttribute("maxwidth")).toBe("16rem");
    expect(popover?.getAttribute("minwidth")).toBe("8rem");
    expect(popover?.getAttribute("borderradius")).toBe("8");
    expect(button?.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon?.getAttribute("size")).toBe("xsmall");
    expect(links.length).toBe(4);
  });

  it("listens to app-header:changed and sets the matching link to active", async () => {
    const { container } = render(AppHeaderMenuWrapper, {
      heading: "Some links",
      leadingicon: "add",
    });
    const rootEl = screen.queryByTestId("rootEl");

    rootEl?.dispatchEvent(
      new CustomEvent("app-header:changed", {
        detail: "#seniors",
      }),
    );

    await waitFor(() => {
      const currentLink = container.querySelector("a.current");
      expect(currentLink?.getAttribute("href")).toBe("#seniors");
      expect(container.querySelector("goa-popover")?.getAttribute("open")).toBe(
        "false",
      );
    });

    rootEl?.dispatchEvent(
      new CustomEvent("app-header:changed", {
        detail: "",
      }),
    );

    await waitFor(() => {
      expect(container.querySelector("a.current")).toBeNull();
    });
  });

  it("closes the menu when a link handles another function", async () => {
    const { container } = render(AppHeaderMenuWrapper, {
      heading: "Some links",
      leadingicon: "add",
    });
    const specialLink = container.querySelector(
      "a[href='#special']",
    ) as HTMLAnchorElement;

    await user.click(specialLink);
    await tick();

    expect(container.querySelector("goa-popover")?.getAttribute("open")).toBe(
      "false",
    );
    expect((await screen.findByTestId("test-without-loading")).innerHTML).toBe(
      "Test without loading",
    );
  });
});
