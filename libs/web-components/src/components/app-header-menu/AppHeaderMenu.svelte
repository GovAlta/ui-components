<svelte:options customElement="goa-app-header-menu" />

<script lang="ts" context="module">
  export type AppHeaderMenuProps = {
    el: HTMLElement;
    links: Element[];
    currentHref?: string;
    testid?: string;
  };
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { getSlottedChildren, validateRequired } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { TABLET_BP } from "../../common/breakpoints";

  // Required
  export let heading: string;

  // Optional
  export let leadingicon: GoAIconType;
  export let type: "primary" | "secondary" = "primary";
  export let version: "1" | "2" = "1";
  export let testid: string = "rootEl";

  // Private

  // media queries are not sufficient as they don't allow for the same slot
  // to be used in different query selectors
  let _innerWidth: number = window.innerWidth;
  // allows listening to popover events
  let _popoverEl: HTMLElement;
  // allow for finding of contained link elements within slot
  let _slotParentEl: HTMLElement;
  // allow for binding with appheader events
  let _rootEl: HTMLElement;
  // internal state of when the window location matches with a link within this element's slot
  let _hasCurrentLink = false;
  // open state
  let _open = false;
  // Track if this menu is in V2 navigation context
  let _isV2Navigation = false;
  // MutationObserver for cleanup
  let _observer: MutationObserver | null = null;

  // Reactive
  // V2 navigation menus stay in desktop mode at all sizes (they're in the navigation slot with full width)
  // V1 menus collapse to mobile mode below TABLET_BP (they're inside the collapsed menu)
  $: _desktop = _isV2Navigation ? true : _innerWidth >= TABLET_BP;

  // call the method when window changes to desktop size
  $: _desktop && bindToPopoverCloseEvent();

  // Hooks

  onMount(() => {
    validateRequired("GoaAppHeaderMenu", { heading });
    // Check if this menu is in V2 navigation context
    // First, check if we have an explicit version prop
    // If not, fall back to checking if parent AppHeader has version="2"
    const hostElement = (_rootEl?.getRootNode() as ShadowRoot)?.host as HTMLElement;
    const inNavigationSlot = hostElement?.getAttribute('slot') === 'navigation';

    // Check version: use explicit prop, or check parent AppHeader's version property
    const parentAppHeader = hostElement?.parentElement as HTMLElement;
    let parentVersion = version;
    if (parentAppHeader?.tagName === 'GOA-APP-HEADER') {
      // Use property access since Svelte components expose props as properties
      parentVersion = (parentAppHeader as any).version || version;
    }

    _isV2Navigation = parentVersion === "2" && inNavigationSlot;
    dispatchInit();
    addAppHeaderCurrentChangeListener();

    // Check for current link on initial mount
    checkForCurrentLink();

    // Set up MutationObserver to watch for class changes on child links
    if (_slotParentEl) {
      // Store observer for cleanup in onDestroy
      _observer = new MutationObserver(() => {
        checkForCurrentLink();
      });

      // Observe the slot parent for changes to descendants
      _observer.observe(_slotParentEl, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
      });
    }
  });

  onDestroy(() => {
    // Clean up MutationObserver to prevent memory leaks
    if (_observer) {
      _observer.disconnect();
      _observer = null;
    }

    // Clean up popover event listeners
    if (_popoverEl) {
      _popoverEl.removeEventListener("_close", closeMenu);
      _popoverEl.removeEventListener("_open", openMenu);
    }

    // Clean up slot parent event listener
    if (_slotParentEl) {
      _slotParentEl.removeEventListener("click", closeMenu);
    }
  });

  // Functions

  function dispatchInit() {
    if (!_slotParentEl) return;
    const slottedChildren = getSlottedChildren(_slotParentEl);

    if (slottedChildren.length === 0) return;

    const links = slottedChildren
      .filter((el) => el.tagName === "A")
      .map((el) => {
        el.classList.remove("current");
        return el;
      });

    setTimeout(() => {
      _rootEl?.dispatchEvent(
        new CustomEvent<AppHeaderMenuProps>("app-header-menu:mounted", {
          detail: {
            el: _rootEl,
            links: links,
          },
          composed: true,
          bubbles: true,
        }),
      );
    }, 1);
  }

  function addAppHeaderCurrentChangeListener() {
    _rootEl?.addEventListener("app-header:changed", (e: Event) => {
      const href = (e as CustomEvent).detail;
      setCurrentLink(href);
    });
  }

  function setCurrentLink(href: string) {
    if (!_slotParentEl) return;

    const slotChildren = getSlottedChildren(_slotParentEl);
    if (slotChildren.length === 0) return;

    const links = slotChildren
      .filter((el) => el.tagName === "A")
      .map((el) => {
        el.classList.remove("current");
        return el;
      });

    const matchedLink = links.find(
      (link) => link.getAttribute("href") === href,
    );
    if (matchedLink) {
      matchedLink.classList.add("current");
    }

    _hasCurrentLink = !!matchedLink;

    closeMenu();
  }

  function checkForCurrentLink() {
    if (!_slotParentEl) return;

    const slotChildren = getSlottedChildren(_slotParentEl);
    if (slotChildren.length === 0) return;

    const links = slotChildren.filter((el) => el.tagName === "A");
    const hasCurrentLink = links.some((link) => link.classList.contains("current"));

    _hasCurrentLink = hasCurrentLink;
  }

  // Ensures that the Popover _close event has a handler if the window
  // is resized after initial load
  async function bindToPopoverCloseEvent() {
    await tick();
    if (!_popoverEl) return;
    _popoverEl.removeEventListener("_close", closeMenu);
    _popoverEl.removeEventListener("_open", openMenu);

    _popoverEl.addEventListener("_close", closeMenu);
    _popoverEl.addEventListener("_open", openMenu);
  }

  async function openMenu() {
    _open = true;

    await tick();

    if (_slotParentEl) {
      _slotParentEl.addEventListener("click", closeMenu);
    }
  }

  function closeMenu() {
    if (_slotParentEl) {
      _slotParentEl.removeEventListener("click", closeMenu);
    }
    // timeout is required to allow any other events to fire before DOM is changed
    setTimeout(() => {
      _open = false;
    }, 1);
  }

  function toggleMenu() {
    _open ? closeMenu() : openMenu();
  }
</script>

<svelte:window bind:innerWidth={_innerWidth} />

<div bind:this={_rootEl} data-testid={testid}>
  {#if _desktop}
    <goa-popover
      bind:this={_popoverEl}
      class="app-header-menu-popover"
      context="menu"
      focusborderwidth="0"
      borderradius={_isV2Navigation ? "8" : "0"}
      padded="false"
      tabindex="-1"
      maxwidth="16rem"
      minwidth="8rem"
      position="below"
      open={_open}
      style={_isV2Navigation ? "--goa-popover-shadow: var(--goa-app-header-nav-menu-dropdown-shadow); --goa-popover-border: var(--goa-app-header-nav-menu-dropdown-border, 0.5px solid var(--goa-color-greyscale-200, #e0e0e0)); margin-top: var(--goa-app-header-nav-menu-dropdown-gap, 3px);" : ""}
    >
      <button
        slot="target"
        class={type}
        class:open={_open}
        class:current={_hasCurrentLink}
        class:v2-nav={_isV2Navigation}
      >
        {#if leadingicon}
          <goa-icon type={leadingicon} mt="1" />
        {/if}
        {heading}
        <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="2" size={_isV2Navigation ? "xsmall" : undefined} />
      </button>

      <div class="desktop" class:v2-nav-menu={_isV2Navigation} bind:this={_slotParentEl}>
        <slot />
      </div>
    </goa-popover>
  {:else}
    <button class:open={_open} on:click={toggleMenu} class={type} class:v2-nav={_isV2Navigation}>
      {#if leadingicon}
        <goa-icon type={leadingicon} mt="1" />
      {/if}
      <span class="heading">{heading}</span>
      {#if !_isV2Navigation}
        <goa-spacer hspacing="fill" />
      {/if}
      <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="2" size={_isV2Navigation ? "xsmall" : undefined} />
    </button>
    {#if _open}
      <div class="not-desktop" class:v2-nav-menu={_isV2Navigation} bind:this={_slotParentEl}>
        <slot />
      </div>
    {/if}
  {/if}
</div>

<style>
  * {
    font: var(--goa-typography-body-m);
  }

  goa-popover.app-header-menu-popover {
    position: inherit;
  }

  /* Menu item with children - V1 styles */
  button {
    padding: var(--goa-app-header-padding-nav-item-with-children);
    border: none;
    color: var(--goa-app-header-color-text-nav-item);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--goa-color-greyscale-white, #ffffff);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-default);
  }
  /* Menu item with children --Hover, --Active */
  button:active,
  button:hover {
    background: var(--goa-app-header-color-bg-nav-item-hover);
    color: var(--goa-app-header-color-text-nav-item-hover);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-hover);
  }
  /* Menu item with children --Focus */
  button:focus-visible {
    outline: var(--goa-app-header-border-focus) !important;
    position: relative;
    z-index: 100;
    background-color: var(--goa-app-header-color-bg-nav-item-focus);
    color: var(--goa-app-header-color-text-nav-item-focus);
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-focus);
  }
  button.open {
    background-color: var(--goa-app-header-color-bg-menu-button-focus);
    color: var(--goa-app-header-color-menu-button-focus);
  }

  /* Menu item with children --Current */
  button.current {
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-current);
  }
  /* Menu item with children --Current--Hover */
  button.current:hover {
    border-top: var(--goa-app-header-border-nav-item-default);
    border-bottom: var(--goa-app-header-border-nav-item-hover);
  }

  /* Secondary Menu items (in popover on menu item) */
  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    box-shadow: var(--goa-app-header-border-top-menu-item);
    color: var(--goa-app-header-color-text-nav-item);
    display: block;
    padding: var(--goa-app-header-padding-nav-item-in-menu) !important;
    text-decoration: none;
  }
  /* Secondary Menu items (in popover on menu item) --Hover */
  :global(::slotted(a:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-child-hover);
    color: var(--goa-app-header-color-text-nav-item-hover) !important;
  }
  /* Secondary Menu items (in popover on menu item) --Focus */
  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-app-header-border-focus);
    outline-offset: -3px;
    background: var(--goa-app-header-color-bg-nav-item-child-focus);
    color: var(--goa-app-header-color-text-nav-item-focus) !important;
  }
  /* Secondary Menu items (in popover on menu item) --Current */
  :global(::slotted(a.current)) {
    background-color: var(--goa-app-header-color-bg-nav-item-in-menu-current);
  }
  /* Secondary Menu items (in popover on menu item) --Current--Hover */
  :global(::slotted(a.current:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-in-menu-current-hover);
    color: var(
      --goa-app-header-color-text-nav-item-in-menu-current-hover
    ) !important;
  }

  /* Menu items in collapsed menu --Interactive */
  :global(::slotted(a.interactive)) {
    color: var(--goa-app-header-nav-color-text-link-item) !important;
    text-decoration: underline !important;
    white-space: nowrap;
  }
  /* Menu items in collapsed menu --Interactive--Hover */
  :global(::slotted(a.interactive:hover)) {
    color: var(--goa-app-header-nav-color-text-link-item-hover) !important;
  }
  /* Menu items in collapsed menu --Interactive--Focus */
  :global(::slotted(a.interactive:focus-visible)) {
    color: var(--goa-app-header-nav-color-text-link-item-focus) !important;
    background-color: var(--goa-app-header-color-bg-nav-item-focus);
  }

  /* Menu items in collapsed menu --Interactive--Current */
  :global(::slotted(a.interactive.current)) {
    color: var(
      --goa-app-header-color-text-nav-item-in-menu-current-hover
    ) !important;
    background-color: var(--goa-app-header-color-bg-nav-item-in-menu-current);
  }
  /* Menu items in collapsed menu --Interactive--Current--Hover */
  :global(::slotted(a.interactive.current:hover)) {
    color: var(
      --goa-app-header-color-text-nav-item-in-menu-current-hover
    ) !important;
    background-color: var(
      --goa-app-header-color-bg-nav-item-in-menu-current-hover
    );
  }

  /* Menu headers (non-clickable group labels in More menu) */
  /* Need high specificity to override .desktop.v2-nav-menu styles */
  .desktop.v2-nav-menu :global(::slotted(a.menu-header)),
  .desktop.v2-nav-menu :global(::slotted(a.menu-header:visited)),
  .desktop.v2-nav-menu :global(::slotted(a.menu-header:hover)),
  .desktop.v2-nav-menu :global(::slotted(a.menu-header:focus)),
  .desktop.v2-nav-menu :global(::slotted(a.menu-header:active)) {
    font-size: 14px !important;
    font-weight: var(--goa-font-weight-regular) !important;
    color: var(--goa-color-greyscale-600) !important;
    padding: 6px 8px !important;
    cursor: default !important;
    background: transparent !important;
    text-decoration: none !important;
    pointer-events: none !important;
  }

  /* Indented menu items (children under a header in More menu) */
  /* Need high specificity to override .desktop.v2-nav-menu padding */
  .desktop.v2-nav-menu :global(::slotted(a.indented)),
  .desktop.v2-nav-menu :global(::slotted(a.indented:visited)),
  .desktop.v2-nav-menu :global(::slotted(a.indented:hover)),
  .desktop.v2-nav-menu :global(::slotted(a.indented:focus)) {
    padding-left: 24px !important;
    padding-right: 8px !important;
  }

  /* Secondary Menu items (in popover on menu item) --Tablet */
  .not-desktop :global(::slotted(a)) {
    padding: var(
      --goa-app-header-padding-secondary-nav-item-in-menu
    ) !important;
  }

  @media not (--desktop) {
    /* Menu item with children on mobile */
    button {
      box-shadow: var(--goa-app-header-border-top-menu-item);
      padding: 9px var(--goa-space-m);
      width: 100%;
      border-top: none;
      border-bottom: none;
      display: flex;
      align-items: center;
      background: var(--goa-color-greyscale-white, #ffffff);
    }
    /* Menu item with children on mobile --Hover, --Active */
    button:active,
    button:hover,
    button:focus-visible {
      background: var(--goa-app-header-color-bg-nav-item-child-hover);
      color: var(--goa-app-header-color-text-nav-item-hover);
      border-top: none;
      border-bottom: none;
    }
    /* Menu item with children on mobile --Focus */
    button:focus-visible {
      outline: var(--goa-app-header-border-focus) !important;
      outline-offset: -3px;
      border-top: none;
      border-bottom: none;
    }
    button.open {
      box-shadow:
        var(--goa-app-header-border-top-menu-item),
        var(--goa-app-header-border-bottom-menu-item);
      background: var(--goa-app-header-color-bg-nav-item-child-hover);
      color: var(--goa-app-header-color-text-nav-item-hover);
    }
    button.open:hover,
    button.open:focus-visible {
      box-shadow:
        var(--goa-app-header-border-top-menu-item),
        var(--goa-app-header-border-bottom-menu-item);
    }
    .heading {
      /* prevent the menu text from line breaking too early */
      flex: 0 0 auto;
    }
  }

  @media (--mobile) {
    /* Secondary Menu items (in popover on menu item) --Mobile */
    .not-desktop :global(::slotted(a)) {
      padding: var(
        --goa-app-header-padding-secondary-nav-item-in-menu-mobile
      ) !important;
    }
    /* Menu item with children (in popover on menu item) --Mobile */
    button {
      padding: 9px var(--goa-space-2xl);
    }
  }

  @media (--desktop) {
    button[slot="target"] {
      font-weight: var(--goa-font-weight-bold);
      white-space: nowrap;
    }
    button.secondary {
      font-weight: var(--goa-font-weight-regular);
    }
    button.open {
      background-color: var(--goa-app-header-color-bg-menu-button-focus);
      color: var(--goa-app-header-color-menu-button-focus);
      border-bottom: var(--goa-app-header-border-nav-item-focus);
    }
  }

  /* V2 Navigation Button Styling - Using class-based approach with design tokens */
  /* This works because the button is in the same shadow DOM as these styles */
  button.v2-nav {
    /* Typography - use design tokens */
    font-weight: var(--goa-font-weight-medium) !important;
    font-size: var(--goa-font-size-3) !important;
    line-height: var(--goa-line-height-2) !important;
    color: var(--goa-app-header-nav-text-color) !important;

    /* Background - use design token */
    background: var(--goa-app-header-nav-bar-bg) !important;

    /* Padding - use design token */
    padding: var(--goa-app-header-padding-nav-item) !important;

    /* Border - use design token */
    border: none !important;
    border-bottom: var(--goa-app-header-border-nav-item-default) !important;
    border-radius: 0;

    /* Layout */
    height: var(--goa-app-header-height-nav-item);
    display: inline-flex;
    align-items: center;
    gap: var(--goa-space-2xs);
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;

    /* Transition */
    transition: border-bottom-color 0.2s ease;
  }

  button.v2-nav goa-icon {
    --goa-icon-size: var(--goa-icon-size-2);
  }

  button.v2-nav:hover {
    background: var(--goa-app-header-nav-bar-bg) !important;
    border-bottom-color: var(--goa-app-header-nav-hover-indicator-color) !important;
  }

  button.v2-nav:active {
    background: transparent !important;
  }

  button.v2-nav.open {
    background: var(--goa-app-header-nav-bar-bg) !important;
    border-bottom-color: var(--goa-app-header-nav-hover-indicator-color) !important;
  }

  button.v2-nav.current {
    font-weight: var(--goa-font-weight-semi-bold) !important;
    border-bottom-color: var(--goa-app-header-nav-active-indicator-color) !important;
  }

  button.v2-nav:focus-visible {
    outline: var(--goa-app-header-border-focus);
    outline-offset: -3px;
    z-index: 1;
  }

  /* V2 Mobile/Tablet dropdown - position it like a popover (V2 only) */
  @media not (--desktop) {
    /* Root container needs relative positioning for absolute dropdown - V2 only */
    :has(.v2-nav-menu) div[data-testid] {
      position: relative;
    }

    .not-desktop.v2-nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 8rem;
      max-width: 16rem;
      width: max-content;
      background: var(--goa-color-greyscale-white, #ffffff);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
      z-index: 1000;
      margin-top: 0;
    }
  }

  /* V2 Dropdown Menu Container - Add padding around items */
  .desktop.v2-nav-menu {
    padding: var(--goa-app-header-padding-nav-item-in-menu);
  }

  /* V2 Dropdown Menu Items - Target the v2-nav-menu class on desktop div */
  .desktop.v2-nav-menu :global(::slotted(a)),
  .desktop.v2-nav-menu :global(::slotted(a:visited)) {
    /* Typography - use design tokens */
    font-size: var(--goa-font-size-4) !important;
    font-weight: var(--goa-font-weight-medium) !important;
    line-height: var(--goa-line-height-3) !important;
    color: var(--goa-color-text-default) !important;

    /* Remove border separator */
    box-shadow: none !important;
    border: none !important;

    /* Spacing */
    padding: var(--goa-space-s) var(--goa-space-xs) !important;

    /* Border radius */
    border-radius: var(--goa-border-radius-s) !important;

    /* Display */
    display: block;
    text-decoration: none;
    background: transparent;
  }

  .desktop.v2-nav-menu :global(::slotted(a:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-child-hover) !important;
    color: var(--goa-color-text-default) !important;
  }

  .desktop.v2-nav-menu :global(::slotted(a:focus-visible)) {
    outline: 3px solid var(--goa-color-interactive-focus) !important;
    outline-offset: -3px !important;
    background: var(--goa-app-header-color-bg-nav-item-child-hover) !important;
    color: var(--goa-color-text-default) !important;
  }

  .desktop.v2-nav-menu :global(::slotted(a.current)) {
    background: var(--goa-app-header-color-bg-nav-item-in-menu-current) !important;
    color: var(--goa-color-text-light) !important;
    font-weight: var(--goa-font-weight-medium) !important;
  }

  .desktop.v2-nav-menu :global(::slotted(a.current:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-in-menu-current) !important;
    color: var(--goa-color-text-light) !important;
  }
</style>
