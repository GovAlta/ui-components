<svelte:options customElement="goa-spacer" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";

  export let hspacing: Spacing | "fill" = "none";
  export let vspacing: Spacing = "none";
</script>

<div 
  style={`
    width: ${hspacing === "fill" ? "100%" : `var(--goa-space-${hspacing})`};
    height: var(--goa-space-${vspacing});
  `}
/>

