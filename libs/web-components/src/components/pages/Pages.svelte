<svelte:options customElement="goa-pages" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  // Public
  export let current: number = 1; // 1-based
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private
  let _rootEl: HTMLElement;

  // Hooks
  onMount(async () => {
    await tick();
    setCurrentPage(current);
  });

  // Reactive
  $: setCurrentPage(current);

  function setCurrentPage(current: number) {
    if (!_rootEl) return;

    const children = getChildren();
    children.forEach((child: Element, index: number) => {
      const _child = child as HTMLElement;
      _child.style.display = index + 1 === +current ? "block" : "none";
    });
  }

  function getChildren(): Element[] {
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      return [...slot.assignedElements()];
    } else {
      return [..._rootEl.children] as Element[]; // unit tests
    }
  }
</script>

<div bind:this={_rootEl} style={calculateMargin(mt, mr, mb, ml)} class="pages">
  <slot />
</div>
