<svelte:options customElement="goa-side-menu" />

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { isUrlMatch } from "../../common/urls";

  let _rootEl: HTMLElement;

  onMount(async () => {
    await tick();
    setCurrentUrl();
    addEventListeners();
  });

  onDestroy(() => {
    removeEventListeners();
  });

  function setCurrentUrl() {
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return;
    }

    const links = slot
      .assignedElements()
      .filter((el: Element) => el.tagName === "A");

    let currentEl: Element | undefined = undefined;
    let maxWeight = 0;
    links.forEach((child: Element) => {
      const weight = isUrlMatch(
        document.location,
        child.getAttribute("href") || "",
      );

      if (weight > maxWeight) {
        maxWeight = weight;
        currentEl = child;
      }
      child.classList.remove("current");
    });

    if (!!currentEl) {
      // @ts-expect-error
      currentEl?.classList.add("current");
    }
  }

  function addEventListeners() {
    // watch path changes
    let currentLocation = document.location.href;
    const observer = new MutationObserver((_mutationList) => {
      if (isUrlMatch(document.location, currentLocation)) {
        currentLocation = document.location.href;
        setCurrentUrl();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // watch hash / browser history changes
    window.addEventListener("popstate", setCurrentUrl);
  }

  function removeEventListeners() {
    window.removeEventListener("popstate", setCurrentUrl);
  }
</script>

<div bind:this={_rootEl} class="side-menu">
  <slot />
</div>

<style>
  :global(::slotted(a)),
  :global(::slotted(a:visited)) {
    /* required to override base styles */
    color: var(--goa-color-text-default) !important;

    display: block;
    font: var(--goa-typography-body-m);
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
  }

  :global(::slotted(a.current)) {
    font: var(--goa-typography-heading-s);
    background: #cedfee;
  }
  :global(::slotted(a:hover:not(.current))) {
    background: #cedfee;
  }
  :global(::slotted(a:focus-visible)) {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .side-menu {
    display: block;
  }
</style>
