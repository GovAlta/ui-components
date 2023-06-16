<svelte:options tag="goa-side-menu-group" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  type SideMenuGroupElement = HTMLElement & { heading?: string }

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
  })

  function checkUrlMatches() {
    const url = window.location.href;
    _open = matchesMenu(url) || matchesChild(_rootEl, url);
    if (_open) {
      notifyParent(true);
    }
  }

  function addEventListeners() {
    // listen to events by children (if child is open the parent also has to be open)
    _rootEl.addEventListener("_open", () => {
      _open = true;  
      _current = true;
    })

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
    window.addEventListener("popstate", () => {
      setCurrent();
    })
  }

  function toSlug(path: string): string {
    return path?.toLowerCase().replace(/ /g, "-");
  }

  function matchesMenu(url: string): boolean {
    return url.endsWith(_slug);
  }

  function matchesChild(el: SideMenuGroupElement, url: string): boolean {
    if (url.endsWith(toSlug(el.heading))) {
      return true; 
    }
    
    const slot = el.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }
    const children = slot.assignedElements();
    return !!children.find((child: Element) => {
      return url.endsWith(child.getAttribute("href"));
    })
  }

  function setCurrent() {  
    const url = document.location.href;
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }

    const children = slot.assignedElements();

    _current = false;
    children.forEach((child: Element) => {
      const current = url.endsWith(child.getAttribute("href"));
      if (current) {
        _current = true;
        child.classList.add("current");
        notifyParent(true);
      } else {
        child.classList.remove("current")  
      }

      // get side-menu-group (level >= 2) marked as children
      if (child.tagName === "GOA-SIDE-MENU-GROUP") {
        child.setAttribute("child", "true")
      }
    })
  }

  function handleClick(e: Event) {
    _open = !_open;
    e.preventDefault();
  }

  function notifyParent(current: boolean) {
    _rootEl.dispatchEvent(new CustomEvent("_open", { 
      bubbles: true, 
      composed: true, 
      detail: { current },
    }))  
  }

</script>

<style>

  ::slotted(a),
  ::slotted(a:visited) {
    /* required to override base styles */
    color: var(--goa-color-text-default) !important; 

    display: block;
    font: var(--goa-typography-body-m);
    border-left: 4px solid var(--goa-color-greyscale-100);
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    text-decoration: none;
  }
  ::slotted(a.current) {
    font: var(--goa-typography-heading-s);
    border-left: 4px solid var(--goa-color-interactive-disabled);
    background: var(--goa-color-info-background);
  }
  ::slotted(a:hover:not(.current)) {
    background: var(--goa-color-info-background);
    border-color: var(--goa-color-greyscale-200);
  }
  ::slotted(a:focus-visible), 
  .heading:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  /**
   * .heading: the heading of a level 1 side-menu-group 
   * :host([child=true]) a.heading: the heading of a level >=2 side-menu-group 
   */
  :host([child=true]) a.heading,
  .heading {
    color: var(--goa-color-text-default);
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 2rem;
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
  }
  
  :host([child=true]) a.heading {
    margin-left: 1rem;
    border-left: 4px solid var(--goa-color-greyscale-100);
    padding: 0.5rem 1rem 0.5rem 1rem;
  }

  :host([child=true]) a.heading:hover {
    border-color: var(--goa-color-greyscale-200);
    background: var(--goa-color-info-background);
  }

  :host([child=true]) .side-menu-group.current a.heading {
    background: var(--goa-color-info-background);
    border-left: 4px solid var(--goa-color-interactive-disabled);
  }

  .side-menu-group.current .heading {
    background: #CEDFEE;
  }
  .heading:hover {
    background: #CEDFEE;
  }

  .hidden {
    display: none;
  }

  .group {
    padding-left: 1rem;
  }

</style>

<div 
  bind:this={_rootEl}
  class="side-menu-group"
  class:current={_current}
>
  <a 
    href={`#${_slug}`} 
    class="heading" 
    on:click={handleClick}
  >
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