<svelte:options customElement="goa-side-menu-heading" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";

  /** Icon displayed before the heading text. */
  export let icon: GoAIconType | null = null;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "section-heading";
</script>

<h2 data-testid={testid} class:icon>
  {#if icon}
    <goa-icon id="heading-icon" type={icon} theme="outline" size="3" />
  {/if}
  <span class="label"><slot /></span>
  <slot name="meta" />
</h2>

<style>
  h2.icon {
    display: flex;
    align-items: flex-start;
  }

  goa-icon {
    margin-right: 0;
    color: var(--goa-side-menu-heading-color);
  }

  h2 {
    border-top: none;
    border-bottom: var(--goa-side-menu-heading-border);
    background: var(--goa-side-menu-heading-color-bg);
    padding: var(--goa-side-menu-heading-padding-top, 14px) var(--goa-space-s) var(--goa-space-xs) var(--goa-space-s);
    color: var(--goa-side-menu-heading-color);
    font: var(--goa-side-menu-heading-typography);
    display: flex;
    align-items: flex-start;
    margin: var(--goa-side-menu-heading-margin);
    margin-bottom: var(--goa-space-2xs);
    margin-right: var(--goa-space-xs);
    gap: var(--goa-side-menu-heading-gap);
  }

  h2 .label {
    margin-top: 2px;
  }
</style>
