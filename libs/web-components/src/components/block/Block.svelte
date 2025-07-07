<svelte:options customElement="goa-block" />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { ensureSlotExists } from "../../common/utils";

  export let gap: Spacing = "m";
  export let direction: "row" | "column" = "row";
  export let alignment: "center" | "start" | "end" | "normal" = "normal";
  export let testid: string = "";

  $: _alignment =
    alignment === "start"
      ? "flex-start"
      : alignment === "end"
        ? "flex-end"
        : alignment === "center"
          ? "center"
          : "normal";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private

  let _rootEl: HTMLElement;

  // ========
  // Hooks
  // ========

  onMount(() => {
    ensureSlotExists(_rootEl);
  });
</script>

<div
  bind:this={_rootEl}
  data-testid={testid}
  class="block"
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --gap: var(--goa-space-${gap});
    --alignment: ${_alignment};
    --direction: ${direction};
  `}
>
  <slot />
</div>

<style>
  .block {
    display: flex;
    flex-direction: var(--direction);
    align-items: var(--alignment);
    gap: var(--gap);
  }

</style>
