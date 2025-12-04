<svelte:options customElement="goa-side-menu-heading" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let version: "1" | "2" = "1";
  export let icon: GoAIconType | null = null;
  export let testid: string = "section-heading";
</script>

<h2 data-testid={testid} class:icon class:v2={version === "2"}>
  {#if icon}
    {#if version === "2"}
      <goa-icon id="heading-icon" type={icon} theme="outline" size="3" />
    {:else}
      <goa-icon id="heading-icon" type={icon} theme="filled" size="4" />
    {/if}
  {/if}
  <span class="label"><slot /></span>
  <slot name="meta" />
</h2>

<style>
  h2.icon {
    display: flex;
    align-items: center;
  }

  /* V2: Icon aligns with first line of text */
  h2.v2.icon {
    align-items: flex-start;
  }

  goa-icon {
    color: var(--goa-side-menu-icon-color);
    margin-right: var(--goa-side-menu-heading-icon-gap);
  }

  /* V2: Remove margin-right from icon, match text color */
  h2.v2 goa-icon {
    margin-right: 0;
    color: var(--goa-side-menu-heading-color);
  }

  h2 {
    border-top: var(--goa-side-menu-heading-border);
    background: var(--goa-side-menu-heading-color-bg);
    padding: var(--goa-side-menu-heading-padding);
    color: var(--goa-side-menu-heading-color);
    font: var(--goa-side-menu-heading-typography);
    display: flex;
    align-items: flex-start;
    margin: var(--goa-side-menu-heading-margin);
    gap: var(--goa-side-menu-heading-gap);
  }

  /* V2 Styles */
  h2.v2 {
    border-top: none;
    border-bottom: var(--goa-side-menu-heading-border);
    margin-bottom: var(--goa-space-2xs);
    margin-right: var(--goa-space-xs);
    padding: var(--goa-side-menu-heading-padding-top, 14px) var(--goa-space-s) var(--goa-space-xs) var(--goa-space-s);
  }

  /* V2: Adjust label vertical alignment */
  h2.v2 .label {
    margin-top: 2px;
  }
</style>
