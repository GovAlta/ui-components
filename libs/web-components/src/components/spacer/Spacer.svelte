<svelte:options tag="goa-spacer" />

<script lang="ts">
  import { onMount } from "svelte";

  import { injectCss, Spacing } from "../../common/styling";

  export let hspacing: Spacing | "fill" = "none";
  export let vspacing: Spacing = "none";

  let rootEl: HTMLElement;

  onMount(() => {
    injectCss(rootEl, ":host", {
      width: `var(--goa-space-${hspacing})`,
      height: `var(--goa-space-${vspacing})`,
    });
  });
</script>

<div bind:this={rootEl} />
