<svelte:options customElement="goa-side-menu-group" />

<script lang="ts" context="module">
  export type SideMenuGroupProps = {
    el: HTMLElement;
    links: Element[];
    currentHref?: string;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { getSlottedChildren } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { calculateMargin, Spacing } from "../../common/styling";

  /** The heading text for the menu group. */
  export let heading: string;
  /** Icon displayed alongside the heading. */
  export let icon: GoAIconType | null = null;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  let _open = false;
  let _current = false;
  let _rootEl: HTMLElement;
  let _senderEl: HTMLElement;

  $: _slug = toSlug(heading);

  onMount(() => {
    dispatchInit();
    addEventListeners();
  });

  function dispatchInit() {
    if (!_rootEl) return;

    const slottedChildren = getSlottedChildren(_rootEl);
    if (slottedChildren.length === 0) return;

    const links = slottedChildren
      .filter((el) => el.tagName === "A")
      .map((el) => {
        el.classList.remove("current");
        return el;
      });

    setTimeout(() => {
      _senderEl.dispatchEvent(
        new CustomEvent<SideMenuGroupProps>("sidemenugroup:mounted", {
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

  function addEventListeners() {
    // listen to events by parent sidemenu (if parent has a final link current)
    _rootEl.addEventListener("sidemenu:current:change", (e: Event) => {
      const href = (e as CustomEvent).detail;
      setCurrent(href);
    });

    // listen to events by children (if child is open the parent also has to be open)
    _rootEl.addEventListener("_open", (e: Event) => {
      _open = _current = true;
    });
  }

  function toSlug(path: string): string {
    return path?.toLowerCase().replace(/ /g, "-");
  }

  function setCurrent(matchedHref: string) {
    const children = getSlottedChildren(_rootEl);
    if (children.length === 0) return;

    let matchedChild = null;

    _current = false;
    children.forEach((child: Element) => {
      const url = child.getAttribute("href");
      if (url === matchedHref) matchedChild = child;

      child.classList.remove("current");

      // get side-menu-group (level >= 2) marked as children
      if (child.tagName === "GOA-SIDE-MENU-GROUP") {
        child.setAttribute("child", "true");
      }
    });

    if (matchedChild) {
      (matchedChild as Element).classList.add("current");
    }
    _current = _open = !!matchedChild;
    if (_open) dispatchGroupOpen();
  }

  function handleClick(e: Event) {
    _open = !_open;
    e.preventDefault();
  }

  function dispatchGroupOpen() {
    _senderEl.dispatchEvent(
      new CustomEvent("_open", {
        bubbles: true,
        composed: true
      }),
    );
  }
</script>

<div bind:this={_senderEl}></div>
<div bind:this={_rootEl}
     class="side-menu-group"
     class:current={_current}
     data-testid={testid}
     style={`
    ${calculateMargin(mt, mr, mb, ml)};
  `}
>
  <a href={`#${_slug}`} class="heading" class:open={_open} class:current={_current} on:click={handleClick}>
    {#if icon}
      <div class="leading-icon">
        <goa-icon type={icon} size="3" />
      </div>
    {/if}
    {heading}
    <div class="trailing-icon">
      {#if _open}
        <goa-icon type="chevron-down" size="3" />
      {:else}
        <goa-icon type="chevron-forward" size="3" />
      {/if}
    </div>
  </a>
  <div class:hidden={!_open} class="group" data-testid="group">
    <slot />
  </div>
</div>

<style>
  :global(::slotted(a)),
  :global(::slotted(goa-side-menu-heading)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-side-menu-color-item) !important;
    display: block;
    font: var(--goa-side-menu-group-item-typography);
    margin-left: var(--goa-side-menu-child-margin);
    background-color: var(--goa-side-menu-group-color-bg);
  }

  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    padding: var(--goa-side-menu-padding-child);
    text-decoration: none;
    border-left: var(--goa-side-menu-child-border-left);
  }

  :global(::slotted(a.current)) {
    font: var(--goa-side-menu-group-item-typography-current);
    border-left: var(--goa-side-menu-child-border-left-selected);
    background: var(--goa-side-menu-child-color-bg-selected);
    /* required to override base styles & above :global(::slotted(a) !important */
    color: var(--goa-side-menu-color-item-current)!important;
  }

  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-side-menu-child-color-bg-hover);
    border-left: var(--goa-side-menu-child-border-left-hover);
  }

  :global(::slotted(a:focus-visible)),
  .heading:focus-visible {
    outline: var(--goa-side-menu-item-focus-border);
    outline-offset: var(--goa-side-menu-item-focus-outline-offset);
  }


  .heading {
    gap: var(--goa-space-xs); /* 8px - the minimum space between the text and the chevron icon */
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  /**
   * .heading: the heading of a level 1 side-menu-group
   * :host([child=true]) a.heading: the heading of a level >=2 side-menu-group
   */
  :host([child="true"]) a.heading,
  .heading {
    color: var(--goa-side-menu-color-item);
    display: flex;
    justify-content: space-between;
    font: var(--goa-side-menu-typography-item);
    padding: var(--goa-side-menu-parent-padding);
    text-decoration: none;
    border-radius: var(--goa-side-menu-group-border-radius);
  }
  .heading.open {
    font: var(--goa-side-menu-typography-item);
  }
  .heading.open.current {
    font: var(--goa-side-menu-typography-item-current);
    color: var(--goa-side-menu-color-item-current);
  }

  :host([child="true"]) a.heading {
    border-left: var(--goa-side-menu-child-border-left);
    padding: var(--goa-side-menu-padding-child);
    margin-left: var(--goa-side-menu-child-margin);
  }

  :host([child="true"]) a.heading:hover {
    border-left: var(--goa-side-menu-child-border-left-hover);
    background: var(--goa-side-menu-child-color-bg-hover);
  }

  :host([child="true"]) .side-menu-group.current a.heading {
    background: var(--goa-side-menu-child-color-bg-selected);
    border-left: var(--goa-side-menu-child-border-left);
  }

  .side-menu-group {
    background-color: var(--goa-side-menu-group-color-bg);
    border-radius: var(--goa-side-menu-group-border-radius);
    padding: var(--goa-side-menu-group-padding);
  }

  .side-menu-group.current .heading {
    background: var(--goa-side-menu-parent-color-bg-selected);
  }

  .heading:hover {
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  .hidden {
    display: none;
  }

  .group {
    padding-left: var(--goa-side-menu-child-margin);
  }

  .trailing-icon {
    margin-left: auto;
    height: var(--goa-icon-size-l); /* to make sure the icon vertical center */
  }
  .leading-icon {
    height: var(--goa-icon-size-l); /* to make sure the icon vertical center */
  }

  .side-menu-group .heading.open {
    border-radius: var(--goa-side-menu-group-border-radius-open);
    background: var(--goa-color-greyscale-100);
  }

  .side-menu-group :global(::slotted(a)) {
    border-radius: var(--goa-border-radius-l);
    font: var(--goa-side-menu-group-item-typography);
    padding: var(--goa-space-2xs) var(--goa-space-xs);
    border-left: none;
    margin-left: 0;
    color: var(--goa-color-text-secondary) !important;
  }

  .side-menu-group .group {
    border-left: var(--goa-side-menu-child-border-width) solid var(--goa-color-greyscale-100);
    margin-left: var(--goa-side-menu-group-container-margin-left);
    padding-left: var(--goa-space-s);
    margin-top: var(--goa-space-xs);
    margin-bottom: var(--goa-side-menu-group-container-margin-bottom);
  }

  .side-menu-group :global(::slotted(a.current)) {
    border-left: none;
    background: var(--goa-side-menu-color-bg-menu-item-hover);
    color: var(--goa-color-text-default) !important;
    font-weight: var(--goa-font-weight-bold);
  }

  .side-menu-group :global(::slotted(a:hover:not(.current))) {
    border-left: none;
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  .side-menu-group .heading {
    padding: var(--goa-space-xs) var(--goa-space-s);
    align-items: flex-start;
    color: var(--goa-color-text-secondary);
  }

  .side-menu-group .heading:hover {
    border-radius: var(--goa-side-menu-group-border-radius-open);
  }

  .side-menu-group .heading:focus-visible {
    border-radius: var(--goa-side-menu-group-border-radius-open);
  }

  :host([child="true"]) .side-menu-group a.heading {
    border-radius: var(--goa-side-menu-group-border-radius-open);
    padding: var(--goa-space-xs) var(--goa-space-s);
    align-items: flex-start;
    color: var(--goa-color-text-secondary);
  }

  .side-menu-group .leading-icon,
  .side-menu-group .trailing-icon {
    height: var(--goa-icon-size-3);
    margin-top: 1px;
  }
</style>
