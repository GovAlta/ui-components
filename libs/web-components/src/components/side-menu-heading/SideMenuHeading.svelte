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

  /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
  :host {

    --goa-side-menu-color-bg: var(--goa-color-greyscale-white); /*The background color of the overall side menu container.*/
    --goa-side-menu-color-menu-item: var(--goa-color-text-default);
    --goa-side-menu-color-bg-menu-item-hover: #cedfee; /*The background color of the menu items on hover.*/
    --goa-side-menu-color-bg-menu-item-current: #cedfee; /*The background color of the current menu item.*/

    --goa-side-menu-typography-item: var(--goa-typography-body-m); /*The typography of the menu items.*/
    --goa-side-menu-typography-item-current: var(--goa-typography-heading-s); /*The typography of the current page.*/

    --goa-side-menu-items-gap: var(--goa-space-none); /*The gap between the menu items.*/

    --goa-side-menu-padding: var(--goa-space-m) var(--goa-space-none) var(--goa-space-l) var(--goa-space-none); /*Padding around the main side menu*/
		--goa-side-menu-border-right: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);; /*Border color around the side menu*/
		--goa-side-menu-width: 256px; /*(The fixed width of the side menu.*/

    --goa-side-menu-padding-item: 8px var(--goa-space-s) 10px var(--goa-space-xl);

    --goa-side-menu-item-focus-border: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);


    /* Heading */
    --goa-side-menu-heading-margin: var(--goa-space-none) 0 0 0;
    --goa-side-menu-heading-padding: var(--goa-space-s) var(--goa-space-s) var(--goa-space-xs) var(--goa-space-l);
    --goa-side-menu-heading-color: var(--goa-color-text-secondary);
    --goa-side-menu-heading-color-bg: var(--goa-color-greyscale-100);
    --goa-side-menu-heading-typography: var(--goa-typography-heading-s);
    --goa-side-menu-heading-border: var(--goa-border-width-m) solid var(--goa-color-greyscale-200);
    --goa-side-menu-heading-icon-gap: var(--goa-space-xs);
    --goa-side-menu-icon-size: var(--goa-icon-size-l);
    --goa-side-menu-icon-color: var(--goa-color-text-secondary);

    /* Group */
    --goa-side-menu-sub-item-margin: var(--goa-space-m);
    --goa-side-menu-padding-sub-item: 8px var(--goa-space-s) 10px var(--goa-space-m);
    --goa-side-menu-sub-item-border-left: 4px solid var(--goa-color-greyscale-100);
    --goa-side-menu-sub-item-border-left-hover: 4px solid var(--goa-color-greyscale-200);
    --goa-side-menu-sub-item-border-left-current: 4px solid var(--goa-color-interactive-disabled);

    --goa-side-menu-sub-item-color-bg: none;
    --goa-side-menu-sub-item-color-bg-hover: var(--goa-color-info-background);
    --goa-side-menu-sub-item-color-bg-current: var(--goa-color-info-background);


  }

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
  }
</style>
