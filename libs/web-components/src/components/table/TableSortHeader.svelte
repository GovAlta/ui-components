<svelte:options customElement="goa-table-sort-header" />

<script context="module" lang="ts">
  export type GoATableSortDirection = "asc" | "desc" | "none";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { GoAVersion } from "../../common/types";

  export let direction: GoATableSortDirection = "none";
  export let version: GoAVersion = "1";
  export let sortorder: string = "";  // "1", "2", or empty

  // Private
  let _rootEl: HTMLElement;
  onMount(() => {
    if (_rootEl) {
      // Add styling if an ancestor has a class to style number columns,
      const hostEl = _rootEl.getRootNode().host;

      const ancestor = hostEl?.closest("th.goa-table-number-header, th.goa-table-cell--numeric");
      if (ancestor) {
        _rootEl.style.setProperty("--header-text-align", "flex-end");
        _rootEl.style.setProperty("--header-align", "right");
      }
    }
  });
</script>

<button bind:this={_rootEl} class:sorted={direction !== "none"} class:v2={version === "2"}>
  <slot />
  <span class="icon-wrapper">
    {#if sortorder && direction !== "none"}
      <span class="sort-order">{sortorder}</span>
    {/if}
    {#if direction === "desc"}
      <goa-icon type="arrow-down" size="3" />
    {:else if direction === "asc"}
      <goa-icon type="arrow-up" size="3" />
    {:else}
      <goa-icon type="chevron-expand" size="3" />
    {/if}
  </span>
</button>

<style>
  :host {
    display: flex;
    align-items: flex-end;
    cursor: pointer;
  }

  button {
    border: none;
    background: none;
    display: flex;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
		line-height: inherit;
		height: inherit;
    width: 100%;
    padding: var(--goa-table-padding-heading, var(--goa-space-s) var(--goa-space-m) var(--goa-space-xs));
    justify-content: var(--header-text-align, flex-start);
    gap: var(--goa-table-sort-header-gap, var(--goa-space-2xs));
    align-items: flex-end;
    text-align: var(--header-align, left);
    cursor: pointer;
  }

  /* Hover state - no background change, only text color */
  button:hover {
    color: var(--goa-table-color-heading-hover, var(--goa-color-interactive-hover));
  }

  button:focus {
    outline: none;
  }

  /* V1: Focus ring on whole button */
  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  /* V2: No focus ring on button, focus ring goes on icon instead */
  button.v2:focus-visible {
    box-shadow: none;
  }

  /* Icon wrapper - contains the sort icon */
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--goa-border-radius-m);
  }

  /* V2: Focus ring on icon when button is focused - matches icon-button V2 focus styling */
  button.v2:focus-visible .icon-wrapper {
    box-shadow: 0 0 0 var(--goa-icon-button-focus-border-width, 2px) var(--goa-icon-button-focus-border-color, var(--goa-color-interactive-focus));
  }

  /* Active sort icon */
  button.sorted goa-icon {
    color: var(--goa-color-interactive-default);
  }
  button.sorted:hover goa-icon {
    color: var(--goa-color-interactive-hover);
  }

  /* Unsorted state - icon always visible */
  button:not(.sorted) goa-icon {
    color: var(--goa-color-greyscale-500);
  }

  button:not(.sorted):hover goa-icon {
    color: var(--goa-color-interactive-hover);
  }

  /* V2: Icon color on focus for unsorted state */
  button.v2:not(.sorted):focus-visible goa-icon {
    color: var(--goa-color-interactive-hover);
  }

  /* Sort order number badge */
  .sort-order {
    font-size: var(--goa-font-size-1);
    font-weight: var(--goa-font-weight-bold);
    color: var(--goa-color-interactive-default);
    line-height: 1;
  }

  button:hover .sort-order {
    color: var(--goa-color-interactive-hover);
  }
</style>
