<svelte:options customElement="goa-side-menu-heading" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let icon: GoAIconType = null;
  export let testid: string = "section-heading";
</script>

<h2 data-testid={testid} class:icon>
  {#if icon}
    <goa-icon id="heading-icon" type={icon} theme="filled" />
  {/if}
  <slot />
  <slot name="meta" />
</h2>

<style>
  h2.icon {
    display: flex;
    align-items: center;
  }

  goa-icon {
    color: var(--goa-side-menu-icon-color);
    font-size: var(--goa-side-menu-icon-size);
    margin-right: var(--goa-side-menu-heading-icon-gap);
}

  h2 {
    border-top: var(--goa-side-menu-heading-border);
    background: var(--goa-side-menu-heading-color-bg);
    padding: var(--goa-side-menu-heading-padding);
    color: var(--goa-side-menu-heading-color, #666);
    font: var(--goa-side-menu-heading-typography);
    display: flex;
    align-items: flex-start;
    margin: var(--goa-side-menu-heading-margin);
    gap: var(--goa-side-menu-heading-gap);
  }
</style>
