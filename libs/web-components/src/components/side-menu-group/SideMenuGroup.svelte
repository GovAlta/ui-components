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

  export let version: "1" | "2" = "1";
  export let heading: string;
  export let icon: GoAIconType | null = null;
  export let testid: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _open = false;
  let _current = false;
  let _rootEl: HTMLElement;

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
      _rootEl.dispatchEvent(
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
      _open = _current = (e as CustomEvent).detail.current;
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
    notifyParent(_open);
  }

  function handleClick(e: Event) {
    _open = !_open;
    e.preventDefault();
  }

  function notifyParent(current: boolean) {
    _rootEl.dispatchEvent(
      new CustomEvent("_open", {
        bubbles: true,
        composed: true,
        detail: { current },
      }),
    );
  }
</script>

<div bind:this={_rootEl}
     class="side-menu-group"
     class:v2={version === "2"}
     class:current={_current}
     data-testid={testid}
     style={`
    ${calculateMargin(mt, mr, mb, ml)};
  `}
>
  <a href={`#${_slug}`} class="heading" class:open={_open} on:click={handleClick}>
    {#if icon}
      <div class="leading-icon">
        {#if version === "2"}
          <goa-icon type={icon} size="3" />
        {:else}
          <goa-icon type={icon} />
        {/if}
      </div>
    {/if}
    {heading}
    <div class="trailing-icon">
      {#if version === "2"}
        {#if _open}
          <goa-icon type="chevron-down" size="3" />
        {:else}
          <goa-icon type="chevron-forward" size="3" />
        {/if}
      {:else}
        {#if _open}
          <goa-icon type="chevron-down" />
        {:else}
          <goa-icon type="chevron-forward" />
        {/if}
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
    color: var(--goa-side-menu-color-item, var(--goa-color-text-default)) !important;
    display: block;
    font: var(--goa-side-menu-group-item-typography, var(--goa-side-menu-typography-item));
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
    font: var(--goa-side-menu-group-item-typography-current, var(--goa-side-menu-typography-item-current));
    border-left: var(--goa-side-menu-child-border-left-selected);
    background: var(--goa-side-menu-child-color-bg-selected);
    /* required to override base styles & above :global(::slotted(a) !important */
    color: var(--goa-side-menu-color-item-current, var(--goa-color-text-default))!important;
  }

  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-side-menu-child-color-bg-hover);
    border-left: var(--goa-side-menu-child-border-left-hover);
  }

  :global(::slotted(a:focus-visible)),
  .heading:focus-visible {
    outline: var(--goa-side-menu-item-focus-border);
    outline-offset: var(--goa-side-menu-item-focus-outline-offset, -3px);
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
    color: var(--goa-side-menu-color-item, var(--goa-color-text-default));
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
    color: var(--goa-side-menu-color-item-current, var(--goa-color-text-default));
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

  /* V2 Styles */

  /* V2: Open group heading */
  .side-menu-group.v2 .heading.open {
    border-radius: var(--goa-side-menu-group-border-radius-open, 0);
    background: var(--goa-color-greyscale-100);
  }

  /* V2: Nested child links - typography, padding, border-radius, colors */
  .side-menu-group.v2 :global(::slotted(a)) {
    border-radius: var(--goa-border-radius-l, 6px);
    font: var(--goa-side-menu-group-item-typography, var(--goa-side-menu-typography-item));
    padding: var(--goa-space-2xs) var(--goa-space-xs);
    border-left: none;
    margin-left: 0;
    color: var(--goa-color-text-secondary) !important;
  }

  /* V2: Group container - left border on container instead of individual items */
  .side-menu-group.v2 .group {
    border-left: var(--goa-side-menu-child-border-width) solid var(--goa-color-greyscale-100);
    margin-left: var(--goa-side-menu-group-container-margin-left, 20px);
    padding-left: var(--goa-space-s);
    margin-top: var(--goa-space-xs);
    margin-bottom: var(--goa-side-menu-group-container-margin-bottom, 6px);
  }

  /* V2: Current state - background, bold text, default text color */
  .side-menu-group.v2 :global(::slotted(a.current)) {
    border-left: none;
    background: var(--goa-side-menu-color-bg-menu-item-hover);
    color: var(--goa-color-text-default) !important;
    font-weight: var(--goa-font-weight-bold);
  }

  /* V2: Hover state */
  .side-menu-group.v2 :global(::slotted(a:hover:not(.current))) {
    border-left: none;
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  /* V2: Group heading - padding, alignment, color */
  .side-menu-group.v2 .heading {
    padding: var(--goa-space-xs) var(--goa-space-s);
    align-items: flex-start;
    color: var(--goa-color-text-secondary);
  }

  .side-menu-group.v2 .heading:hover {
    border-radius: var(--goa-side-menu-group-border-radius-open, 0);
  }

  .side-menu-group.v2 .heading:focus-visible {
    border-radius: var(--goa-side-menu-group-border-radius-open, 0);
  }

  /* V2: Nested groups (child attribute) */
  :host([child="true"]) .side-menu-group.v2 a.heading {
    border-radius: var(--goa-side-menu-group-border-radius-open, 0);
  }

  /* V2: Icon containers - smaller height for size-3 icons, align with first line */
  .side-menu-group.v2 .leading-icon,
  .side-menu-group.v2 .trailing-icon {
    height: var(--goa-icon-size-3, 1.25rem);
    margin-top: 1px;
  }
</style>
