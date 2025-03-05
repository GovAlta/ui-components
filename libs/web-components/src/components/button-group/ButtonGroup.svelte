<svelte:options customElement="goa-button-group" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  export let alignment: ButtonAlignment = "start";
  export let gap: Gap = "relaxed";
  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  const [BUTTON_ALIGNMENTS, validateAlignment] = typeValidator("alignment", [
    "start",
    "end",
    "center",
  ]);
  type ButtonAlignment = (typeof BUTTON_ALIGNMENTS)[number];

  const [GAPS, validateGap] = typeValidator("gap", ["relaxed", "compact"]);
  type Gap = (typeof GAPS)[number];

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
  data-testid={testid}
  style="{calculateMargin(
    mt,
    mr,
    mb,
    ml,
  )}; --alignment: {_alignment}; --gap-size: {gap === 'relaxed'
    ? 'var(--goa-button-group-gap)'
    : 'var(--goa-button-group-compact-gap)'}"
>
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: var(--alignment);
    align-items: center;
    flex-wrap: wrap;
    gap: var(--gap-size);
    padding: 3px 0; /* prevent button box shadow from being cut off */
    line-height: 100%;
  }
</style>
