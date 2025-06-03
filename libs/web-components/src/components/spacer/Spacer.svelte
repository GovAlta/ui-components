<svelte:options customElement="goa-spacer" />

<script lang="ts">
  import { onMount } from "svelte";
  import { injectCss, type Spacing } from "../../common/styling";

  export let hspacing: Spacing | "fill" = "none";
  export let vspacing: Spacing = "none";
  export let testid: string = "";

  let rootEl: HTMLElement;
  onMount(() => {
    const height = `var(--goa-space-${vspacing})`;
    const width = hspacing === "fill" ? "100%" : `var(--goa-space-${hspacing})`;
    injectCss(rootEl, ":host", { width, height });
  });
</script>

<div
  bind:this={rootEl}
  style={`
  display: ${hspacing === "fill" || hspacing === "none" ? "block" : "inline-block"};
    height: var(--goa-space-${vspacing});
    width: var(--goa-space-${hspacing});
  `}
  data-testid={testid}
/>
