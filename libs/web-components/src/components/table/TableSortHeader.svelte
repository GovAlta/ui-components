<svelte:options customElement="goa-table-sort-header" />

<script context="module" lang="ts">
  export type GoATableSortDirection = "asc" | "desc" | "none";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { GoAVersion } from "../../common/types";

  export let direction: GoATableSortDirection = "none";
  export let version: GoAVersion = "1";

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
  <span class="icon-wrapper" class:direction--none={direction === "none"}>
    {#if direction === "desc"}
      <goa-icon type="arrow-down" size="3" />
    {:else}
      <goa-icon type="arrow-up" size="3" />
    {/if}
  </span>
</button>

<style>
  :host {
    display: flex;
    align-items: flex-end;
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
  }

  /* User set classes */
  button:hover {
    background-color: var(--goa-table-color-bg-heading-hover, var(--goa-color-greyscale-150));
    cursor: pointer;
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

  /* Unsorted - hidden by default, show on hover */
  .direction--none {
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  button:hover .direction--none {
    opacity: 1;
  }

  /* V2: Also show icon on focus (not just hover) */
  button.v2:focus-visible .direction--none {
    opacity: 1;
  }

  .direction--none goa-icon {
    color: var(--goa-color-greyscale-400);
  }

  button:hover .direction--none goa-icon {
    color: var(--goa-color-interactive-hover);
  }

  /* V2: Icon color on focus */
  button.v2:focus-visible .direction--none goa-icon {
    color: var(--goa-color-interactive-hover);
  }
</style>
