<svelte:options tag="goa-button-group" />

<!-- Script -->
<script lang="ts">
  // import type { ButtonGroupAlignment } from "@abgov/shared/common";
  // export let alignment: ButtonGroupAlignment = "start";
  export let gap: "small" | "medium" | "large" = "medium";
  export let alignment: "start" | "end";
</script>

<!-- HTML -->
<div style="--alignment: flex-{alignment}; --gap-size: {gap === "small" ? "0.5rem" : "1.25rem"}">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: var(--alignment);
    flex-wrap: wrap;
    gap: var(--gap-size);
  }
</style>
