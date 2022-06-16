<svelte:options tag="goa-divider" />

<script lang="ts">
  import { onMount } from "svelte";

  export let spacing: string = "";

  const SPACING = ["small", "medium", "large"];
  type Spacing = typeof SPACING[number];

  function isSpacing(value: string): value is Spacing {
    return SPACING.includes(value);
  }

  $: _spacing = {
    small: "1rem",
    medium: "2rem",
    large: "4rem",
  }[spacing];

  onMount(() => {
    if (!isSpacing(spacing)) {
      throw "Invalid spacing";
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
