<svelte:options customElement="goa-spacer" />

<script lang="ts">
  import { onMount } from "svelte";
  import { injectCss, type Spacing } from "../../common/styling";

  /** Horizontal spacing. */
  export let hspacing: Spacing | "fill" = "none";
  /** Vertical spacing */
  export let vspacing: Spacing = "none";
  /** Sets a data-testid attribute for automated testing. */
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
