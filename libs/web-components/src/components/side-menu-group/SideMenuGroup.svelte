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
     class:current={_current}
     data-testid={testid}
     style={`
    ${calculateMargin(mt, mr, mb, ml)};
  `}
>
  <a href={`#${_slug}`} class="heading" class:open={_open} on:click={handleClick}>
    {#if icon}
      <div class="leading-icon">
        <goa-icon type={icon} />
      </div>
    {/if}
    {heading}
    <div class="trailing-icon">
      {#if _open}
        <goa-icon type="chevron-down"/>
      {:else}
        <goa-icon type="chevron-forward"/>
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
    color: var(--goa-side-menu-color-menu-item) !important;
    display: block;
    font: var(--goa-side-menu-typography-item);
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
    font: var(--goa-side-menu-typography-item-selected);
    border-left: var(--goa-side-menu-child-border-left-selected);
    background: var(--goa-side-menu-child-color-bg-selected);
    /* required to override base styles & above :global(::slotted(a) !important */
    color: var(--goa-side-menu-child-color-text-selected)!important;
  }

  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-side-menu-child-color-bg-hover);
    border-left: var(--goa-side-menu-child-border-left-hover);
  }

  :global(::slotted(a:focus-visible)),
  .heading:focus-visible {
    outline: var(--goa-side-menu-item-focus-border);
    outline-offset: -3px;
  }


  .heading {
    gap: var(--goa-space-xs); /* 8px - the minimum space between the text and the chevron icon */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  goa-icon {
    margin-top: var(--goa-space-2xs); /* vertically centering the icon with text */
  }

  /**
   * .heading: the heading of a level 1 side-menu-group
   * :host([child=true]) a.heading: the heading of a level >=2 side-menu-group
   */
  :host([child="true"]) a.heading,
  .heading {
    color: var(--goa-side-menu-color-menu-item);
    display: flex;
    justify-content: space-between;
    font: var(--goa-side-menu-typography-item);
    padding: var(--goa-side-menu-parent-padding);
    text-decoration: none;
    font: var(--goa-side-menu-parent-text);
    border-radius: var(--goa-side-menu-group-border-radius);
  }
  .heading.open {
    font: var(--goa-side-menu-parent-text-active);
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
</style>
