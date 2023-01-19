<svelte:options tag="goa-block" />

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";

  export let gap: Spacing = "m";
  export let direction: "row" | "column" = "row";
  export let alignment: "center" | "start" | "end" = "start";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
</script>

<div
  class="block"
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --gap: var(--goa-space-${gap});
    --alignment: ${alignment};
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
