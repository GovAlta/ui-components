<svelte:options tag="goa-divider" />

<script lang="ts">
  import { onMount } from "svelte";

  export let spacing: string = "small";

  const SPACING = ["small", "medium", "large", "none"];
  type Spacing = typeof SPACING[number];

  function isSpacing(value: string): value is Spacing {
    return SPACING.includes(value);
  }

  $: _spacing = {
    small: "1rem",
    medium: "2rem",
    large: "4rem",
    none: "0rem"
  }[spacing];

  onMount(() => {
    if (!isSpacing(spacing)) {
      console.error("Invalid spacing");
    }
  });
</script>

<hr style="--spacing: {_spacing}" />

<style>
  hr {
    padding: 0;
    margin: var(--spacing) 0;
    border: none;
    border-top: 1px solid var(--color-gray-200);
  }
</style>
