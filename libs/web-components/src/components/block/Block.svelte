<svelte:options customElement={{
  tag: "goa-block",
  props: {
    minWidth: { type: "String", attribute: "min-width"},
  }
}} />

<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
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
</script>

<div
  class="block"
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    ${styles(
      style("min-width", minWidth),
      style("gap", gap),
      style("align-items", _alignment),
      style("flex-direction", direction),
    )}
  `}
  data-testid={testid}
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
