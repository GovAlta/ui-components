<svelte:options customElement="goa-public-form-task-list" />

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";

  // ======
  // Public
  // ======
  
  export let heading: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
</script>

<section>
  <fieldset
    style={calculateMargin(mt, mr, mb, ml)}
  >
    {#if heading}
      <goa-text as="h2" size="heading-l">{heading}</goa-text>
    {/if}

    <slot />

  </fieldset>
</section>

<style>
  fieldset {
    border: none;
    padding: 0;
  }
</style>
