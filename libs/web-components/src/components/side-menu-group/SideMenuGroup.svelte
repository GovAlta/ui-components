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

  export let heading: string;
  export let testid: string = "";

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

<div bind:this={_rootEl} class="side-menu-group" class:current={_current} data-testid={testid}>
  <a href={`#${_slug}`} class="heading" on:click={handleClick}>
    {heading}
    {#if _open}
      <goa-icon type="chevron-down" />
    {:else}
      <goa-icon type="chevron-forward" />
    {/if}
  </a>
  <div class:hidden={!_open} class="group" data-testid="group">
    <slot />
  </div>
</div>

<style>
  /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
  :host {

    --goa-side-menu-color-bg: var(--goa-color-greyscale-white); /*The background color of the overall side menu container.*/
    --goa-side-menu-color-menu-item: var(--goa-color-text-default);
    --goa-side-menu-color-bg-menu-item-hover: #cedfee; /*The background color of the menu items on hover.*/
    --goa-side-menu-color-bg-menu-item-current: #cedfee; /*The background color of the current menu item.*/

    --goa-side-menu-typography-item: var(--goa-typography-body-m); /*The typography of the menu items.*/
    --goa-side-menu-typography-item-current: var(--goa-typography-heading-s); /*The typography of the current page.*/

    --goa-side-menu-items-gap: var(--goa-space-none); /*The gap between the menu items.*/

    --goa-side-menu-padding: var(--goa-space-m) var(--goa-space-none) var(--goa-space-l) var(--goa-space-none); /*Padding around the main side menu*/
		--goa-side-menu-border-right: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);; /*Border color around the side menu*/
		--goa-side-menu-width: 256px; /*(The fixed width of the side menu.*/

    --goa-side-menu-padding-item: 8px var(--goa-space-s) 10px var(--goa-space-xl);

    --goa-side-menu-item-focus-border: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);


    /* Heading */
    --goa-side-menu-heading-margin: var(--goa-space-none) 0 0 0;
    --goa-side-menu-heading-padding: var(--goa-space-s) var(--goa-space-s) var(--goa-space-xs) var(--goa-space-l);
    --goa-side-menu-heading-color: var(--goa-color-text-secondary);
    --goa-side-menu-heading-color-bg: var(--goa-color-greyscale-100);
    --goa-side-menu-heading-typography: var(--goa-typography-heading-s);
    --goa-side-menu-heading-border: var(--goa-border-width-m) solid var(--goa-color-greyscale-200);
    --goa-side-menu-heading-icon-gap: var(--goa-space-xs);
    --goa-side-menu-icon-size: var(--goa-icon-size-l);
    --goa-side-menu-icon-color: var(--goa-color-text-secondary);

    /* Group */
    --goa-side-menu-sub-item-margin: var(--goa-space-m);
    --goa-side-menu-padding-sub-item: 8px var(--goa-space-s) 10px var(--goa-space-m);
    --goa-side-menu-sub-item-border-left: 4px solid var(--goa-color-greyscale-100);
    --goa-side-menu-sub-item-border-left-hover: 4px solid var(--goa-color-greyscale-200);
    --goa-side-menu-sub-item-border-left-current: 4px solid var(--goa-color-interactive-disabled);

    --goa-side-menu-sub-item-color-bg: none;
    --goa-side-menu-sub-item-color-bg-hover: var(--goa-color-info-background);
    --goa-side-menu-sub-item-color-bg-current: var(--goa-color-info-background);


  }


  :global(::slotted(a)),
  :global(::slotted(goa-side-menu-heading)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-side-menu-color-menu-item) !important;
    display: block;
    font: var(--goa-side-menu-typography-item);
    margin-left: var(--goa-side-menu-sub-item-margin);
  }

  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    padding: var(--goa-side-menu-padding-sub-item);
    text-decoration: none;
    border-left: var(--goa-side-menu-sub-item-border-left);
  }

  :global(::slotted(a.current)) {
    font: var(--goa-side-menu-typography-item-current);
    border-left: var(--goa-side-menu-sub-item-border-left-current);
    background: var(--goa-side-menu-sub-item-color-bg-current);
  }

  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-side-menu-sub-item-color-bg-hover);
    border-left: var(--goa-side-menu-sub-item-border-left-hover);
  }

  :global(::slotted(a:focus-visible)),
  .heading:focus-visible {
    outline: var(--goa-side-menu-item-focus-border);
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
    padding: var(--goa-side-menu-padding-item);
    text-decoration: none;
  }

  :host([child="true"]) a.heading {
    margin-left: var(--goa-side-menu-sub-item-margin);
    border-left: var(--goa-side-menu-sub-item-border-left);
    padding: var(--goa-side-menu-padding-sub-item);
  }

  :host([child="true"]) a.heading:hover {
    border-left: var(--goa-side-menu-sub-item-border-left-hover);
    background: var(--goa-side-menu-sub-item-color-bg-hover);
  }

  :host([child="true"]) .side-menu-group.current a.heading {
    background: var(--goa-side-menu-sub-item-color-bg-current);
    border-left: var(--goa-side-menu-sub-item-border-left);
  }

  .side-menu-group.current .heading {
    background: var(--goa-side-menu-color-bg-menu-item-current);
  }

  .heading:hover {
    background: var(--goa-side-menu-color-bg-menu-item-hover);
  }

  .hidden {
    display: none;
  }

  .group {
    padding-left: var(--goa-side-menu-sub-item-margin);
  }
</style>
