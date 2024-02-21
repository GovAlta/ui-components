import { render, waitFor } from '@testing-library/svelte';
import userEvent from "@testing-library/user-event"
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import AppHeaderWrapper from './AppHeaderWrapper.test.svelte'
import { it, describe } from "vitest";

type QueryAll = (q: string) => NodeListOf<HTMLElement>;

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup()
})

describe('AppHeader Desktop with children', () => {

  const heading = "Test heading";
  const url = "http://localhost/foo"

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    });
  })

  it('should render', async () => {
    const { container, queryByTestId } = render(AppHeaderWrapper, { heading, url, haschildren: true });
    const links = container.querySelectorAll("a");

    expect(queryByTestId("title")?.innerHTML).toBe(heading);
    expect((queryByTestId("url") as HTMLLinkElement)?.href).toBe(url);
    expect(links.length).toBe(6);  // 5 custom links + 1 app header for the url
  });
});

describe('AppHeader Mobile', () => {

  let $t: (query: string) => HTMLElement | null;

  const heading = "Test heading";
  const url = "http://localhost/foo"

  beforeEach(async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 400,
    });

    const result = render(AppHeaderWrapper, { heading, url, haschildren: true });
    const c = result.container
    $t = result.queryByTestId.bind(c)
  })

  it("should show/hide the menu", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    if (!toggleBtn) return;

    // not yet open
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeFalsy();
    })

    // open
    user.click(toggleBtn);
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeTruthy();
    })

    // close
    user.click(toggleBtn);
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeFalsy();
    })
  })

  it("toggles the menu with the space key", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    toggleBtn?.focus();

    // open
    user.keyboard(" ");
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeTruthy();
    })

    // close
    user.keyboard(" ");
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeFalsy();
    })
  })

  it("toggles the menu with the enter key", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    toggleBtn?.focus();

    // open
    user.keyboard("{enter}");
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeTruthy();
    })

    // close
    user.keyboard("{enter}");
    await waitFor(() => {
      const hasMenuItems = $t("slot");
      expect(hasMenuItems).toBeFalsy();
    })
  })
})

describe('AppHeader Tablet', () => {

  let $$: QueryAll;
  let $t: (query: string) => HTMLElement | null;

  const heading = "Test heading";
  const url = "http://localhost/foo"

  beforeEach(async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800,
    });

    const result = render(AppHeaderWrapper, { heading, url, haschildren: true });
    const c = result.container
    $$ = c.querySelectorAll.bind(c);
    $t = result.queryByTestId.bind(c)
  })

  it("should show/hide the menu", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    if (!toggleBtn) return;

    // not yet open
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeFalsy();
    })

    // open
    user.click(toggleBtn);
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeTruthy();
    })

    // close
    user.click(toggleBtn);
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeFalsy();
    })
  })

  it("toggles the menu with the space key", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    toggleBtn?.focus();

    // open
    user.keyboard(" ");
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeTruthy();
    })

    // close
    user.keyboard(" ");
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeFalsy();
    })
  })

  it("toggles the menu with the enter key", async () => {
    const toggleBtn = $t("menu-toggle");
    expect(toggleBtn).toBeTruthy();

    toggleBtn?.focus();

    // open
    user.keyboard("{enter}");
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeTruthy();
    })

    // close
    user.keyboard("{enter}");
    await waitFor(() => {
      const hasMenuItems = $$("goa-popover a");
      expect(hasMenuItems.length).toBeFalsy();
    })
  })
})
