<svelte:options tag="goa-side-menu" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  let _rootEl: HTMLElement;

  onMount(async () => {
    await tick();
    setCurrent(window.location.toString());
    addEventListeners();
  })

  function setCurrent(url: string) {  
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }

    const links = slot
        .assignedElements()
        .filter((el: HTMLElement) => el.tagName === "A");

    links.forEach((child: HTMLElement) => {
      const current = url.endsWith(child.getAttribute("href"));
      if (current) {
        child.classList.add("current");
      } else {
        child.classList.remove("current");
      }
    })
  }

  function addEventListeners() {
    // watch path changes
    let currentLocation = document.location.href;
    const observer = new MutationObserver((_mutationList) => {
      if (currentLocation !== document.location.href) {
        currentLocation = document.location.href;
        setCurrent(currentLocation);
      }
    });
    observer.observe(document.body, {childList: true, subtree: true });

    // watch hash / browser history changes
    window.addEventListener("popstate", () => {
      setCurrent(document.location.href);
    })
  }
</script>

<style>
  ::slotted(a),
  ::slotted(a:visited) {
    /* required to override base styles */
    color: var(--goa-color-text-default) !important; 

    display: block;
    font: var(--goa-typography-body-m);
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
  }
  ::slotted(a.current) {
    font: var(--goa-typography-heading-s);
    background: #CEDFEE;
  }
  ::slotted(a:hover:not(.current)) {
    background: #CEDFEE;
  }
  ::slotted(a:focus-visible) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }
  
  .side-menu {
    display: block;
  }
</style>

<div 
  bind:this={_rootEl}
  class="side-menu"
>
  <slot />
</div>

