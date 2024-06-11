<svelte:options customElement="goa-pages" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { getSlottedChildren } from "../../common/utils";

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

    const children = getSlottedChildren(_rootEl);
    children.forEach((child: Element, index: number) => {
      const _child = child as HTMLElement;
      _child.style.display = index + 1 === +current ? "block" : "none";
    });
  }
</script>

<div bind:this={_rootEl} style={calculateMargin(mt, mr, mb, ml)} class="pages">
  <slot />
</div>
