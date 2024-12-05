<svelte:options customElement="goa-divider" />

<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
</script>

<hr data-testid={testid} style={calculateMargin(mt, mr, mb, ml)} />

<style>
   :host {
    /* TODO Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-divider-color: var(--goa-color-greyscale-200);
  }
  hr {
    padding: 0;
    margin: 0;
    height: 1px;
    background-color: var(--goa-divider-color);
    border: none;
  }
</style>
