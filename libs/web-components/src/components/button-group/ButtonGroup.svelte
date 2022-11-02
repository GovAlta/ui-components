<svelte:options tag="goa-button-group" />

<!-- Script -->
<script lang="ts">
  // import type { ButtonGroupAlignment } from "@abgov/shared/common";
  // export let alignment: ButtonGroupAlignment = "start";
  //export let gap: "small" | "medium" | "large" = "medium";

   import { onMount } from "svelte";

  const BUTTON_ALIGNMENTS = ["start", "end", "center"];
  type ButtonAlignment = (typeof BUTTON_ALIGNMENTS)[number];

  const GAP = ["relaxed", "compact"];
  type Gap = (typeof GAP)[number];

  // type check functions

  function isButtonAlignment(value: string): value is ButtonAlignment {
    return BUTTON_ALIGNMENTS.includes(value);
  }

  function isGap(value: string): value is Gap {
    return GAP.includes(value);
  }

  export let alignment: ButtonAlignment;
  export let gap: Gap = "relaxed";

  $: _alignment =
  alignment === "start"
    ? "flex-start"
    : alignment === "center"
      ? "center"
      : "flex-end";

  onMount(() => {
    if (!isButtonAlignment(alignment)) {
      console.error("Invalid button group alignment");
    }
    if (!isGap(gap)) {
      console.error("Invalid button group gap");
    }
  })

</script>

<!-- HTML -->
<div style="--alignment: {_alignment}; --gap-size: {gap === "relaxed" ? "1rem" : "0.75rem"}">
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
    padding: 3px 0;  /* prevent button box shadow from being cut off */
  }
</style>
