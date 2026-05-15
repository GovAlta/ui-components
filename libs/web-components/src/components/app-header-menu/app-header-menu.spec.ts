import AppHeaderMenuWrapper from "./AppHeaderMenuWrapper.test.svelte";
import { render, waitFor, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { it, describe } from "vitest";
import { tick } from "svelte";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

type Query = (q: string) => HTMLElement;
type QueryAll = (q: string) => NodeListOf<HTMLElement>;

describe("Desktop", () => {
  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1200,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    });

    const c = result.container;
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  });

  it("renders on desktop", async () => {
    const popover = $("goa-popover");
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");
    const links = $$("a");

    expect(popover).toBeTruthy();
    expect(popover.getAttribute("maxwidth")).toBe("16rem");
    expect(popover.getAttribute("minwidth")).toBe("8rem");
    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();

    // The links will exist for the desktop since the show/hide logic is contained
    // within the popover; so the links will be visible as the they are passed into
    // the default slot
    await waitFor(() => {
      expect(links).toBeTruthy();
      expect(links.length).toBe(4);
    });
  });

  it("listen to appheader:current:change event and set link to be active", async () => {
    const rootEl = screen.queryByTestId("rootEl");

    // Listen to parent GoAAppHeader to dispatch event current:change
    rootEl?.dispatchEvent(
      new CustomEvent("app-header:changed", {
        detail: "#seniors",
      }),
    );

    await waitFor(() => {
      const currentLink = $("a.current");
      expect(currentLink?.getAttribute("href")).toBe("#seniors");
      // We should make sure when router link is changed, the app-header-menu is closed
      const popover = $("goa-popover");
      expect(popover.getAttribute("open")).toBe("false");
    });

    // When parent dispatch event with empty link, means no link should be highlighted, we should remove the current class
    rootEl?.dispatchEvent(
      new CustomEvent("app-header:changed", {
        detail: "",
      }),
    );

    await waitFor(() => {
      const currentLink = $("a.current");
      expect(currentLink).toBeNull();
    });

    // When parent dispatch an event with parent's link, means no link under app-header-menu should be highlighted
    rootEl?.dispatchEvent(
      new CustomEvent("app-header:changed", {
        detail: "parent-link",
      }),
    );

    await waitFor(() => {
      const currentLink = $("a.current");
      expect(currentLink).toBeNull();
    });
  });

  it("close the menu if the link handles other function beside navigate to new page", async () => {
    const specialLink = $("a[href='#special']");
    await user.click(specialLink);
    await tick();
    const popover = $("goa-popover");
    expect(popover.getAttribute("open")).toBe("false");
    // Functionality is handled as usual
    const text = await screen.findByTestId("test-without-loading");
    expect((await text).innerHTML).toBe("Test without loading");
  });
});

describe("Mobile", () => {
  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 400,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    });

    const c = result.container;
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  });

  it("renders on mobile", async () => {
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");

    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();
  });

  it("opens/closes the menu on click", async () => {
    const btn = $("button");
    await user.click(btn);
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    // close
    await user.click(btn);
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("opens/closes on the space key", async () => {
    const btn = $("button");

    btn.focus();
    // open
    await user.keyboard(" ");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    // close
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("opens/closes on the enter key", async () => {
    const btn = $("button");

    btn.focus();
    // open
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    //close
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("focuses on the links on `tab`", async () => {
    const btn = $("button");

    btn.focus();
    await user.keyboard("{enter}");
    await waitFor(async () => {
      const links = $$("a");
      expect(links.length).toBe(4);

      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[0]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[1]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[2]);
    });
  });

  it("close the menu if the link handles other function beside navigate to new page", async () => {
    const specialLink = $("a[href='#special']");
    await user.click(specialLink);
    await tick();
    const links = $$("a");
    expect(links.length).toBe(0);
  });

  it.skip("follows the link on `enter`", () => {
    /* do nothing */
  });
});

describe("Tablet", () => {
  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 800,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    });

    const c = result.container;
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  });

  it("renders on tablet", async () => {
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");

    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();
  });

  it("opens/closes the menu on click", async () => {
    const btn = $("button");
    await user.click(btn);
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    // close
    await user.click(btn);
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("opens/closes on the space key", async () => {
    const btn = $("button");

    btn.focus();
    // open
    await user.keyboard(" ");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    // close
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("opens/closes on the enter key", async () => {
    const btn = $("button");

    btn.focus();
    // open
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(4);
    });

    // close
    await user.keyboard("{enter}");
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    });
  });

  it("focuses on the links on `tab`", async () => {
    const btn = $("button");

    btn.focus();
    await user.keyboard("{enter}");
    await waitFor(async () => {
      const links = $$("a");
      expect(links.length).toBe(4);

      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[0]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[1]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[2]);
    });
  });

  it("close the menu if the link handles other function beside navigate to new page", async () => {
    const specialLink = $("a[href='#special']");
    await user.click(specialLink);
    await tick();
    const links = $$("a");
    expect(links.length).toBe(0);
  });
});
