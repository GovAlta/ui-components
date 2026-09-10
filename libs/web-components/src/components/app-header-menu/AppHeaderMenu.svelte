<svelte:options customElement="goa-app-header-menu" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { getSlottedChildren, validateRequired } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  // Required

  /** @required The menu heading text displayed as the dropdown trigger. */
  export let heading: string;

  // Optional

  /** Icon displayed before the heading text. */
  export let leadingicon: GoAIconType;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "rootEl";

  // Private

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

  // Hooks

  onMount(() => {
    validateRequired("GoaAppHeaderMenu", { heading });
    addAppHeaderCurrentChangeListener();
    bindToPopoverCloseEvent();
  });

  // Functions

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

  // Ensures that the Popover _close and _open events have handlers.
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
</script>

<div bind:this={_rootEl} data-testid={testid}>
  <goa-popover
    bind:this={_popoverEl}
    class="app-header-menu-popover"
    context="menu"
    focusborderwidth="0"
    borderradius="8"
    padded="false"
    tabindex="-1"
    maxwidth="16rem"
    minwidth="8rem"
    position="below"
    open={_open}
    style="--goa-popover-shadow: var(--goa-app-header-nav-menu-dropdown-shadow); --goa-popover-border: var(--goa-app-header-nav-menu-dropdown-border, 0.5px solid var(--goa-color-greyscale-200, #e0e0e0)); margin-top: var(--goa-app-header-nav-menu-dropdown-gap, 3px);"
  >
    <button slot="target" class:open={_open} class:current={_hasCurrentLink}>
      {#if leadingicon}
        <goa-icon type={leadingicon} mt="1" />
      {/if}
      {heading}
      <goa-icon
        type={_open ? "chevron-up" : "chevron-down"}
        mt="2"
        size="xsmall"
      />
    </button>

    <div class="menu" bind:this={_slotParentEl}>
      <slot />
    </div>
  </goa-popover>
</div>

<style>
  * {
    font: var(--goa-typography-body-m);
  }

  goa-popover.app-header-menu-popover {
    position: inherit;
  }

  button {
    font-weight: var(--goa-font-weight-medium) !important;
    font-size: var(--goa-font-size-3) !important;
    line-height: var(--goa-line-height-2) !important;
    color: var(--goa-app-header-nav-text-color) !important;
    background: var(--goa-app-header-nav-bar-bg) !important;
    padding: var(--goa-app-header-padding-nav-item) !important;
    border: none !important;
    border-bottom: var(--goa-app-header-border-nav-item-default) !important;
    border-radius: 0;
    box-shadow: none !important;
    height: var(--goa-app-header-height-nav-item);
    display: inline-flex;
    align-items: center;
    gap: var(--goa-space-2xs);
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    transition: border-bottom-color 0.2s ease;
  }

  button goa-icon {
    --goa-icon-size: var(--goa-icon-size-2);
  }

  button:hover {
    background: var(--goa-app-header-nav-bar-bg) !important;
    border-bottom-color: var(
      --goa-app-header-nav-hover-indicator-color
    ) !important;
  }

  button:active {
    background: transparent !important;
  }

  button.open {
    background: var(--goa-app-header-nav-bar-bg) !important;
    border-bottom-color: var(
      --goa-app-header-nav-hover-indicator-color
    ) !important;
  }

  button.current {
    font-weight: var(--goa-font-weight-semi-bold) !important;
    border-bottom-color: var(
      --goa-app-header-nav-active-indicator-color
    ) !important;
  }

  button:focus-visible {
    outline: var(--goa-app-header-border-focus);
    outline-offset: -3px;
    z-index: 1;
  }

  .menu {
    padding: var(--goa-app-header-padding-nav-item-in-menu);
  }

  .menu :global(::slotted(a)),
  .menu :global(::slotted(a:visited)) {
    font-size: var(--goa-font-size-4) !important;
    font-weight: var(--goa-font-weight-medium) !important;
    line-height: var(--goa-line-height-3) !important;
    color: var(--goa-color-text-default) !important;
    box-shadow: none !important;
    border: none !important;
    padding: var(--goa-space-s) var(--goa-space-xs) !important;
    border-radius: var(--goa-border-radius-s) !important;
    display: block;
    text-decoration: none;
    background: transparent;
  }

  .menu :global(::slotted(a:hover)) {
    background: var(--goa-app-header-color-bg-nav-item-child-hover) !important;
    color: var(--goa-color-text-default) !important;
  }

  .menu :global(::slotted(a:focus-visible)) {
    outline: 3px solid var(--goa-color-interactive-focus) !important;
    outline-offset: -3px !important;
    background: var(--goa-app-header-color-bg-nav-item-child-hover) !important;
    color: var(--goa-color-text-default) !important;
  }

  .menu :global(::slotted(a.current)) {
    background: var(
      --goa-app-header-color-bg-nav-item-in-menu-current
    ) !important;
    color: var(--goa-color-text-light) !important;
    font-weight: var(--goa-font-weight-medium) !important;
  }

  .menu :global(::slotted(a.current:hover)) {
    background: var(
      --goa-app-header-color-bg-nav-item-in-menu-current
    ) !important;
    color: var(--goa-color-text-light) !important;
  }

  .menu :global(::slotted(a.menu-header)),
  .menu :global(::slotted(a.menu-header:visited)),
  .menu :global(::slotted(a.menu-header:hover)),
  .menu :global(::slotted(a.menu-header:focus)),
  .menu :global(::slotted(a.menu-header:active)) {
    font-size: 14px !important;
    font-weight: var(--goa-font-weight-regular) !important;
    color: var(--goa-color-greyscale-600) !important;
    padding: 6px 8px !important;
    cursor: default !important;
    background: transparent !important;
    text-decoration: none !important;
    pointer-events: none !important;
  }

  .menu :global(::slotted(a.indented)),
  .menu :global(::slotted(a.indented:visited)),
  .menu :global(::slotted(a.indented:hover)),
  .menu :global(::slotted(a.indented:focus)) {
    padding-left: 24px !important;
    padding-right: 8px !important;
  }
</style>
