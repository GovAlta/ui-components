<svelte:options customElement="goa-divider" />

<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  /** Sets the data-testid attribute. Used with ByTestId queries in tests. */

  export let testid: string = "";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;
</script>

<hr data-testid={testid} style={calculateMargin(mt, mr, mb, ml)} />

<style>
  hr {
    padding: 0;
    margin: 0;
    height: 1px;
    background-color: var(--goa-divider-color);
    border: none;
  }
</style>
