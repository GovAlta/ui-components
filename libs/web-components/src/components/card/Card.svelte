<svelte:options customElement="goa-card" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  /** Adds a shadow to the card. 0 shows a border, 1-3 increase shadow intensity. */
  export let elevation: number = 0;
  /** Sets the width of the card. */
  export let width: string = "100%";
  /** Sets the height behavior. 'auto' fits content, 'max' fills available height. */
  export let height: "auto" | "max" = "auto";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
</script>

<!-- HTML -->
<div id="container">
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
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  #container {
    container: self / inline-size;
  }

  .card {
    background-color: var(--goa-color-greyscale-white);
    border-radius: 4px;
    overflow: hidden;
    height: var(--height);
  }

  @container self (--not-mobile) {
    .card {
      margin: 0 auto;
    }
  }
</style>
