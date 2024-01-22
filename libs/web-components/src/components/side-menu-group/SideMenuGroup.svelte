<svelte:options customElement="goa-side-menu-group" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { isUrlMatch } from "../../common/urls";

  type SideMenuGroupElement = HTMLElement & { heading?: string };

  export let heading: string;

  let _open = false;
  let _current = false;
  let _rootEl: HTMLElement;

  $: _slug = toSlug(heading);

  onMount(async () => {
    await tick(); // needed to allow for window location to be read
    checkUrlMatches();
    setCurrent();
    addEventListeners();
  });

  onDestroy(() => {
    removeEventListeners();
  });

  function checkUrlMatches() {
    _open = matchesMenu() || matchesChild(_rootEl);
    if (_open) {
      notifyParent(true);
    }
  }

  function addEventListeners() {
    // listen to events by children (if child is open the parent also has to be open)
    _rootEl.addEventListener("_open", () => {
      _open = true;
      _current = true;
    });

    // watch path changes
    let currentLocation = document.location.href;
    const observer = new MutationObserver((_mutationList) => {
      // if path change occurs
      if (currentLocation !== document.location.href) {
        currentLocation = document.location.href;
        setCurrent();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // watch hash / browser history changes
    window.addEventListener("popstate", setCurrent);
  }

  function removeEventListeners() {
    window.removeEventListener("popstate", setCurrent);
  }

  function toSlug(path: string): string {
    return path?.toLowerCase().replace(/ /g, "-");
  }

  function matchesMenu(): boolean {
    return isUrlMatch(document.location, _slug) >= 0;
  }

  function matchesChild(el: SideMenuGroupElement): boolean {
    if (isUrlMatch(document.location, toSlug(el.heading)) >= 0) {
      return true;
    }

    const slot = el.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }
    const children = slot.assignedElements();
    return !!children.find((child: Element) => {
      return isUrlMatch(document.location, child.getAttribute("href")) >= 0;
    });
  }

  function setCurrent() {
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }

    const children = slot.assignedElements();
    let maxMatchWeight = -1;
    let matchedChild = null;

    _current = false;
    children.forEach((child: Element) => {
      const url = child.getAttribute("href");
      const weight = isUrlMatch(document.location, url);
      if (weight > maxMatchWeight) {
        maxMatchWeight = weight;
        matchedChild = child;
      }
      child.classList.remove("current");

      // get side-menu-group (level >= 2) marked as children
      if (child.tagName === "GOA-SIDE-MENU-GROUP") {
        child.setAttribute("child", "true");
      }
    });

    if (matchedChild) {
      _current = true;
      matchedChild.classList.add("current");
      notifyParent(true);
    }
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

<div bind:this={_rootEl} class="side-menu-group" class:current={_current}>
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
  :global(::slotted(a)),
  :global(::slotted(goa-side-menu-heading)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-color-text-default) !important;
    display: block;
    font: var(--goa-typography-body-m);
    margin-left: 1rem;
  }

  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-left: 4px solid var(--goa-color-greyscale-100);
  }

  :global(::slotted(a.current)) {
    font: var(--goa-typography-heading-s);
    border-left: 4px solid var(--goa-color-interactive-disabled);
    background: var(--goa-color-info-background);
  }
  :global(::slotted(a:hover:not(.current))) {
    background: var(--goa-color-info-background);
    border-color: var(--goa-color-greyscale-200);
  }
  :global(::slotted(a:focus-visible)),
  .heading:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  /**
   * .heading: the heading of a level 1 side-menu-group
   * :host([child=true]) a.heading: the heading of a level >=2 side-menu-group
   */
  :host([child="true"]) a.heading,
  .heading {
    color: var(--goa-color-text-default);
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 2rem;
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
  }

  :host([child="true"]) a.heading {
    margin-left: 1rem;
    border-left: 4px solid var(--goa-color-greyscale-100);
    padding: 0.5rem 1rem 0.5rem 1rem;
  }

  :host([child="true"]) a.heading:hover {
    border-color: var(--goa-color-greyscale-200);
    background: var(--goa-color-info-background);
  }

  :host([child="true"]) .side-menu-group.current a.heading {
    background: var(--goa-color-info-background);
    border-left: 4px solid var(--goa-color-interactive-disabled);
  }

  .side-menu-group.current .heading {
    background: #cedfee;
  }
  .heading:hover {
    background: #cedfee;
  }

  .hidden {
    display: none;
  }

  .group {
    padding-left: 1rem;
  }
</style>
