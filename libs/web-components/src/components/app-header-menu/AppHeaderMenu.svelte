<svelte:options customElement="goa-app-header-menu" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { validateRequired } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { TABLET_BP } from "../../common/breakpoints";

  // Required
  export let heading: string;

  // Optional
  export let leadingicon: GoAIconType;
  export let type: "primary" | "secondary" = "primary";

  // Private

  // media queries are not sufficient as they don't allow for the same slot
  // to be used in different query selectors
  let _innerWidth: number = window.innerWidth;
  // allows listening to popover events
  let _popoverEl: HTMLElement;
  // allow for finding of contained link elements within slot
  let _slotParentEl: HTMLElement;
  // internal state of when the window location matches with a link within this element's slot
  let _hasCurrentLink = false;
  // open state
  let _open = false;

  // Reactive
  $: _desktop = _innerWidth >= TABLET_BP;

  // call the method when window changes to desktop size
  $: _desktop && bindToPopoverCloseEvent();

  // Hooks

  onMount(async () => {
    await tick();
    validateRequired("GoaAppHeaderMenu", { heading });

    setCurrentLink();
    window.addEventListener("popstate", setCurrentLink, true);
  });

  onDestroy(() => {
    window.removeEventListener("popstate", setCurrentLink, true);
  });

  // Functions

  function setCurrentLink() {
    _hasCurrentLink = hasCurrentLink();
  }

  // Determine if the current browser url matches one of this element's child links
  function hasCurrentLink(): boolean {
    if (!_slotParentEl) return false;

    const slot = _slotParentEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) return false;

    const link = slot
      .assignedElements()
      .filter((el) => el.tagName === "A")
      .find((el) => {
        const href = (el as HTMLLinkElement).href;
        const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        return href.endsWith(url);
      });
    return !!link;
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

  function openMenu() {
    _open = true;
  }

  function closeMenu() {
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

{#if _desktop}
  <goa-popover
    bind:this={_popoverEl}
    context="app-header-menu"
    focusborderwidth="0"
    borderradius="0"
    padded="false"
    tabindex="-1"
    width="16rem"
    position="below"
  >
    <button
      slot="target"
      style="padding: 0 0.75rem;"
      class={type}
      class:current={_hasCurrentLink}
    >
      {#if leadingicon}
        <goa-icon type={leadingicon} mt="1" />
      {/if}
      {heading}
      <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="1" />
    </button>

    <div class="desktop" bind:this={_slotParentEl}>
      <slot />
    </div>
  </goa-popover>
{:else}
  <button class:open={_open} on:click={toggleMenu} class={type}>
    {#if leadingicon}
      <goa-icon type={leadingicon} mt="1" />
    {/if}
    <span class="heading">{heading}</span>
    <goa-spacer hspacing="fill" />
    <goa-icon type={_open ? "chevron-up" : "chevron-down"} mt="1" />
  </button>
  {#if _open}
    <div class="not-desktop" bind:this={_slotParentEl}>
      <slot />
    </div>
  {/if}
{/if}

<style>
  * {
    font: var(--goa-typography-body-m);
  }

  /* ============= */
  /* Common        */
  /* ============= */

  button {
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
    color: var(--goa-color-text-default);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  button:active,
  button:hover,
  button:focus-within,
  [slot="target"]:focus-within {
    background: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }
  button.current {
    border-top: 4px solid var(--goa-color-interactive-default);
    border-bottom: 4px solid transparent;
  }
  button.current:hover {
    border-top: 4px solid var(--goa-color-interactive-hover);
  }

  button.open {
    border-bottom: 1px solid var(--goa-color-greyscale-200);
  }

  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    box-shadow: inset 0 1px 0 0 var(--goa-color-greyscale-200);
    color: var(--goa-color-text-default);
    display: block;
    padding: calc((3rem - var(--goa-line-height-3)) / 2) 1rem;
    text-decoration: none;
  }
  .not-desktop :global(::slotted(a)) {
    padding: calc((3rem - var(--goa-line-height-3)) / 2) 2.75rem;
  }
  :global(::slotted(a:first-child)) {
    box-shadow: none;
  }
  :global(::slotted(a:hover)) {
    background: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }
  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: -3px;
    color: var(--goa-color-interactive-hover);
  }
  :global(::slotted(a.interactive)) {
    text-decoration: underline;
    color: var(--goa-color-interactive-default);
  }

  @media not (--desktop) {
    button {
      box-shadow: inset 0 1px 0 0 var(--goa-color-greyscale-200);
      height: 3rem;
      flex: 1 1 auto;
      padding: 0 1rem;
      width: 100%;
    }
    button:focus {
      outline: var(--goa-border-width-l) solid
        var(--goa-color-interactive-focus);
      outline-offset: -3px;
    }
    .heading {
      /* prevent the menu text from line breaking too early */
      flex: 0 0 auto;
    }
  }

  @media (--desktop) {
    button[slot="target"] {
      font-weight: var(--goa-font-weight-bold);
      /* ensures that the button spans 100% of the height of the desktop app header bar */
      height: 4rem;
      white-space: nowrap;
    }
    button.secondary {
      font-weight: var(--goa-font-weight-regular);
    }
  }
</style>
