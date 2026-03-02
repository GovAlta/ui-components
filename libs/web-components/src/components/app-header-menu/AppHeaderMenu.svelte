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
  import { onMount, tick } from "svelte";
  import { getSlottedChildren, validateRequired } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { TABLET_BP } from "../../common/breakpoints";

  // Required
  export let heading: string;

  // Optional
  export let leadingicon: GoAIconType;
  export let type: "primary" | "secondary" = "primary";
  export let testid: string = "rootEl";

  // Private

  let _innerWidth: number = window.innerWidth;
  let _popoverEl: HTMLElement;
  let _slotParentEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _hasCurrentLink = false;
  let _open = false;
  let _menuItems: HTMLAnchorElement[] = [];
  let _menuButton: HTMLButtonElement;

  // Reactive
  $: _desktop = _innerWidth >= TABLET_BP;

  $: _desktop && bindToPopoverCloseEvent();

  // Hooks

  onMount(() => {
    validateRequired("GoaAppHeaderMenu", { heading });
    dispatchInit();
    addAppHeaderCurrentChangeListener();
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
      _menuItems = Array.from(_slotParentEl.querySelectorAll("a"));
      if (_menuItems.length > 0) {
        _menuItems[0].focus();
      }
    }
  }

  function closeMenu() {
    if (_slotParentEl) {
      _slotParentEl.removeEventListener("click", closeMenu);
    }
    setTimeout(() => {
      _open = false;
      _menuButton?.focus();
    }, 1);
  }

  function toggleMenu() {
    _open ? closeMenu() : openMenu();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!_open) return;

    const currentIndex = _menuItems.indexOf(document.activeElement as HTMLAnchorElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (currentIndex < _menuItems.length - 1) {
          _menuItems[currentIndex + 1].focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (currentIndex > 0) {
          _menuItems[currentIndex - 1].focus();
        } else {
          _menuButton.focus();
        }
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
    }
  }
</script>

<svelte:window bind:innerWidth={_innerWidth} />

<div bind:this={_rootEl} data-testid={testid} on:keydown={handleKeydown}>
  {#if _desktop}
    <goa-popover
      bind:this={_popoverEl}
      class="app-header-menu-popover"
      context="menu"
      focusborderwidth="0"
      borderradius="0"
      padded="false"
      tabindex="-1"
      maxwidth="16rem"
      minwidth="8rem"
      position="below"
      open={_open}
    >
      <button
        bind:this={_menuButton}
        slot="target"
        class={type}
        class:open={_open}
        class:current={_hasCurrentLink}
        on:click={toggleMenu}
      >
        {#if leadingicon}
          <goa-icon type={leadingicon} mt="1" />
        {/if}
        {heading}
        <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="2" />
      </button>

      <div class="desktop" bind:this={_slotParentEl}>
        <slot />
      </div>
    </goa-popover>
  {:else}
    <button bind:this={_menuButton} class:open={_open} on:click={toggleMenu} class={type}>
      {#if leadingicon}
        <goa-icon type={leadingicon} mt="1" />
      {/if}
      <span class="heading">{heading}</span>
      <goa-spacer hspacing="fill" />
      <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="2" />
    </button>
    {#if _open}
      <div class="not-desktop" bind:this={_slotParentEl}>
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

  /* Menu item with children */
  button {
    padding: var(--goa-app-header-padding-nav-item-with-children);
    border: none;
    color: var(--goa-app-header-color-text-nav-item);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
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
</style>
