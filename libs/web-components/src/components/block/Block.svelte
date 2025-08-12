<svelte:options customElement={{
  tag: "goa-block",
  props: {
    minWidth: { type: "String", attribute: "min-width"},
  }
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { ensureSlotExists } from "../../common/utils";
  import { style, styles } from "../../common/utils";

  export let gap: Spacing = "m";
  export let direction: "row" | "column" = "row";
  export let alignment: "center" | "start" | "end" | "normal" = "normal";
  export let testid: string = "";
  export let minWidth: string = "";

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
  style={
    styles(
      "display: flex",
      `gap: var(--goa-space-${gap})`,
      calculateMargin(mt, mr, mb, ml),
      style("min-width", minWidth),
      style("align-items", _alignment),
      style("flex-direction", direction),
    )
  }
>
  <slot />
</div>
