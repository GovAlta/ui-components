<svelte:options tag="goa-button-group" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  export let alignment: ButtonAlignment = "start";
  export let gap: Gap = "relaxed";

  const [BUTTON_ALIGNMENTS, validateAlignment] = typeValidator("alignment", [
    "start",
    "end",
    "center",
  ]);
  type ButtonAlignment = typeof BUTTON_ALIGNMENTS[number];

  const [GAPS, validateGap] = typeValidator("gap", ["relaxed", "compact"]);
  type Gap = typeof GAPS[number];

  $: _alignment = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
  }[alignment];

  onMount(() => {
    validateAlignment(alignment);
    validateGap(gap);
  });
</script>

<!-- HTML -->
<div
  style="--alignment: {_alignment}; --gap-size: {gap === 'relaxed' ? '1rem' : '0.75rem'}"
>
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
    align-items: center;
    flex-wrap: wrap;
    gap: var(--gap-size);
    padding: 3px 0; /* prevent button box shadow from being cut off */
  }
</style>
