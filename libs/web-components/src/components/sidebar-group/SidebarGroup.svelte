<svelte:options tag="goax-sidebar-group" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  type SidebarGroupElement = HTMLElement & { heading?: string }

  export let heading: string;

  let _open = false;
  let _rootEl: HTMLElement;

  $: _slug = toSlug(heading);

  onMount(async () => {
    await tick()
    const url = window.location.toString();
    
    _open = matchesMenu(url) || matchesChild(_rootEl, url)

    if (_open) {
      notifyParent()
    }

    _rootEl.addEventListener("_open", () => {
      _open = true;  
    })
  })

  function toSlug(path: string): string {
    return path?.toLowerCase().replace(/ /g, "-");
  }

  function matchesMenu(url: string): boolean {
    return url.endsWith(_slug);
  }

  function matchesChild(el: SidebarGroupElement, url: string): boolean {
    if (url.endsWith(toSlug(el.heading))) {
      return true; 
    }
    
    const slot = el.querySelector("slot") as HTMLSlotElement;
    if (!slot) {
      return false;
    }
    const children = slot.assignedElements();
    return !!children.find((child: Element) => {
      if (child.tagName === "GOAX-SIDEBAR-GROUP") {
        return matchesChild(child as SidebarGroupElement, url);
      } else {
        return url.endsWith(child.getAttribute("href"));
      }
    })
  }

  function handleClick() {
    _open = !_open;
  }

  function notifyParent() {
    _rootEl.dispatchEvent(new CustomEvent("_open", { bubbles: true, composed: true }))  
  }

</script>

<style>
  ::slotted(a) {
    display: block;
  }

  .heading {
    font-size: 1.4rem;
    display: block;
    line-height: 2rem;
  }

  .hidden {
    display: none;
  }

  .group {
    padding-left: 1rem;
  }
</style>

<div bind:this={_rootEl}>
  <a href={`#${_slug}`} class="heading" on:click={handleClick}>{heading}</a>
  <div class:hidden={!_open} class="group">
    <slot />
  </div>
</div>
