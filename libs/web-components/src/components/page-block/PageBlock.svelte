<svelte:options customElement="goa-page-block" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { isValidDimension } from "../../common/validators";

  type Size = "full" | string;
  const Sizes = {
    full: "100%",
  };

  // Required
  export let width: Size;

  // Private
  export let _width: string;

  function isValidSize(value: string) {
    if (["full"].includes(width)) return true;
    if (isValidDimension(value)) return true;

    return false;
  }

  onMount(() => {
    if (!isValidSize(width)) {
      console.error("Invalid PageBlock width");
    }

    _width = Sizes[width] || width;
  });
</script>

<!-- HTML -->
<div class="page-content" style={`--max-width: ${_width}`}>
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .page-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--goa-space-m);
  }
  @media not (--mobile) {
    .page-content {
      padding: 0 var(--goa-space-xl);
    }
  }
  @media (--desktop) {
    .page-content {
      padding: 0 var(--goa-space-3xl);
    }
  }
</style>
