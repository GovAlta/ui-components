<svelte:options
  customElement={{
    tag: "goa-block",
    props: {
      minWidth: { type: "String", attribute: "min-width" },
      maxWidth: { type: "String", attribute: "max-width" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { ensureSlotExists } from "../../common/utils";
  import { style, styles } from "../../common/utils";

  /** Spacing between items. Uses design system spacing tokens. */
  export let gap: Spacing = "m";
  /** Stacking direction of child components. */
  export let direction: "row" | "column" = "row";
  /** Primary axis alignment of child components. */
  export let alignment: "center" | "start" | "end" | "normal" = "normal";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the minimum width of the block container. */
  export let minWidth: string = "";
  /** Sets the maximum width of the block container. */
  export let maxWidth: string = "";
  /** Sets the width of the block container. Defaults to max-content. */
  export let width: string = "";

  $: _alignment =
    alignment === "start"
      ? "flex-start"
      : alignment === "end"
        ? "flex-end"
        : alignment === "center"
          ? "center"
          : "normal";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
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
  style={styles(
    "display: flex",
    `gap: var(--goa-space-${gap})`,
    calculateMargin(mt, mr, mb, ml),
    style("min-width", minWidth),
    style("max-width", maxWidth),
    style("width", width || "max-content"),
    style("align-items", _alignment),
    style("flex-direction", direction),
  )}
>
  <slot />
</div>
