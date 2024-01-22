<svelte:options customElement="goa-grid" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";

  import { calculateMargin } from "../../common/styling";
  import { validateRequired } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  export let gap: Spacing = "m";
  export let minchildwidth: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  onMount(() => {
    validateRequired("Grid", { minchildwidth });
  });
</script>

<!-- HTML -->
<div
  class="goa-grid"
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    --min-child-width: ${minchildwidth || 0};
    gap: var(--goa-space-${gap})
  `}
>
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .goa-grid {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  @media not (--mobile) {
    .goa-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fit,
        minmax(var(--min-child-width), 1fr)
      );
    }
  }
</style>
