<svelte:options customElement="goa-card" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  export let elevation: number = 0;
  export let width: string = "100%";
  export let height: "auto" | "max" = "auto";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  //optional
  export let testid: string = "";
</script>

<!-- HTML -->
<div
  data-testid={testid}
  class="card"
  style="
    --width: {width};
    --height: {height === 'auto' ? 'auto' : '100%'};
    {calculateMargin(mt, mr, mb, ml)}
    {elevation === 0
    ? `border: 1px solid var(--goa-color-greyscale-200);`
    : `box-shadow: var(--shadow-${elevation});`}
  "
>
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .card {
    background-color: var(--goa-color-greyscale-white);
    border-radius: 4px;
    overflow: hidden;
    height: var(--height);
  }
  @media not (--mobile) {
    .card {
      margin: 0 auto;
    }
  }
</style>
