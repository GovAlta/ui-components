import AppHeaderMenuWrapper from "./AppHeaderMenuWrapper.test.svelte"
import { render, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { it, describe } from "vitest";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup()
})

type Query = (q: string) => HTMLElement;
type QueryAll = (q: string) => NodeListOf<HTMLElement>;

describe("Desktop", () => {

  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    })

    const c = result.container
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  })

  it("renders on desktop", async () => {

    const popover = $("goa-popover")
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");
    const links = $$("a");

    expect(popover).toBeTruthy();
    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();

    // The links will exist for the desktop since the show/hide logic is contained
    // within the popover; so the links will be visible as the they are passed into
    // the default slot
    await waitFor(() => {
      expect(links).toBeTruthy();
      expect(links.length).toBe(3);
    })
  })

})

describe("Mobile", () => {

  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 400,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    })

    const c = result.container
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  })

  it("renders on mobile", async () => {
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");

    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();
  })

  it("opens/closes the menu on click", async () => {
    const btn = $("button");
    await user.click(btn)
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.click(btn)
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("opens/closes on the space key", async () => {
    const btn = $("button");

    btn.focus()
    // open
    await user.keyboard(" ")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("opens/closes on the enter key", async () => {
    const btn = $("button");

    btn.focus()
    // open
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("focuses on the links on `tab`", async () => {
    const btn = $("button");

    btn.focus()
    await user.keyboard("{enter}")
    await waitFor(async () => {
      const links = $$("a");
      expect(links.length).toBe(3);

      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[0]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[1]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[2]);
    })
  })

  it("follows the link on `enter`", () => {

  })

})

describe("Tablet", () => {

  let $: Query;
  let $$: QueryAll;
  let heading: string;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800,
    });

    heading = "Some links";
    const result = render(AppHeaderMenuWrapper, {
      heading,
      leadingicon: "add",
    })

    const c = result.container
    $ = c.querySelector.bind(c);
    $$ = c.querySelectorAll.bind(c);
  })

  it("renders on tablet", async () => {
    const button = $("button");
    const leadingIcon = $("button goa-icon[type=add]");
    const chevronIcon = $("button goa-icon[type=chevron-down]");

    expect(button.innerHTML).toContain(heading);
    expect(leadingIcon).toBeTruthy();
    expect(chevronIcon).toBeTruthy();
  })

  it("opens/closes the menu on click", async () => {
    const btn = $("button");
    await user.click(btn)
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.click(btn)
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("opens/closes on the space key", async () => {
    const btn = $("button");

    btn.focus()
    // open
    await user.keyboard(" ")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("opens/closes on the enter key", async () => {
    const btn = $("button");

    btn.focus()
    // open
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(3);
    })

    // close
    await user.keyboard("{enter}")
    await waitFor(() => {
      const links = $$("a");
      expect(links.length).toBe(0);
    })
  })

  it("focuses on the links on `tab`", async () => {
    const btn = $("button");

    btn.focus()
    await user.keyboard("{enter}")
    await waitFor(async () => {
      const links = $$("a");
      expect(links.length).toBe(3);

      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[0]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[1]);
      await user.keyboard("{Tab}");
      expect(document.activeElement).toBe(links[2]);
    })
  })
})
