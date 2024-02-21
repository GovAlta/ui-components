<svelte:options customElement="goa-side-menu-heading" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let icon: GoAIconType = null;
</script>

<h2 data-testid="section-heading" class:icon>
  {#if icon}
    <goa-icon id="heading-icon" type={icon} theme="filled" />
  {/if}
  <slot />
  <slot name="meta" />
</h2>

<style>
  h2 {
    border-top: var(--goa-border-width-m) solid
      var(--goa-color-greyscale-200, #dcdcdc);
    background: var(--goa-color-greyscale-100, #f1f1f1);
    padding: 0.75rem 0.75rem 0.5rem 1.5rem;
    margin: 0;
    color: var(--goa-color-text-secondary, #666);
    font: var(--goa-typography-heading-s);
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
</style>
