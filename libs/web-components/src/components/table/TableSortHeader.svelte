<svelte:options
  customElement={{
    tag: "goa-table-sort-header",
    props: {
      name: { reflect: true },
      direction: { reflect: true },
      sortOrder: { attribute: "sort-order", reflect: true, type: "Number" },
    },
  }}
/>

<script context="module" lang="ts">
  export type GoATableSortDirection = "asc" | "desc" | "none";
  export type GoATableSortOrder = 0 | 1 | 2;
</script>

<script lang="ts">
  import { onMount } from "svelte";

  /** Column name identifier for sorting. */
  export let name: string = "";
  /** Sets the sort direction indicator. */
  export let direction: GoATableSortDirection = "none";
  /** @internal Design system version for styling. */
  export let version: "1" | "2" = "1";
  /** Sort order number for multi-column sort display ("1", "2", etc). */
  export let sortOrder: GoATableSortOrder = 0;

  // Private
  let _rootEl: HTMLElement;
  onMount(() => {
    if (_rootEl) {
      const host = (_rootEl.getRootNode() as ShadowRoot).host as HTMLElement;

      // Add styling if an ancestor has a class to style number columns
      const ancestor = host?.closest(
        "th.goa-table-number-header, th.goa-table-cell--numeric",
      );
      if (ancestor) {
        _rootEl.style.setProperty("--header-text-align", "flex-end");
        _rootEl.style.setProperty("--header-align", "right");
      }
    }
  });
</script>

<button
  bind:this={_rootEl}
  class:sorted={direction !== "none"}
  class:v2={version === "2"}
>
  <slot />
  <span class="icon-wrapper">
    <span class="sort-order" class:hidden={!sortOrder || direction === "none"}>{sortOrder}</span>
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
    padding: var(
      --goa-table-padding-heading,
      var(--goa-space-s) var(--goa-space-m) var(--goa-space-xs)
    );
    justify-content: var(--header-text-align, flex-start);
    gap: var(--goa-table-sort-header-gap, var(--goa-space-2xs));
    align-items: flex-end;
    text-align: var(--header-align, left);
  }

  /* Hover state - no background change, only text color */
  button:hover {
    color: var(
      --goa-table-color-heading-hover,
      var(--goa-color-interactive-hover)
    );
  }

  button:focus {
    outline: none;
  }

  /* V1: Focus ring on whole button */
  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
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

  /* V2: Focus ring on icon when button is focused */
  button.v2:focus-visible .icon-wrapper {
    box-shadow: 0 0 0 var(--goa-icon-button-focus-border-width, 2px)
      var(
        --goa-icon-button-focus-border-color,
        var(--goa-color-interactive-focus)
      );
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
    margin-left: var(--goa-space-2xs);
  }

  .sort-order.hidden {
    visibility: hidden;
  }

  button:hover .sort-order {
    color: var(--goa-color-interactive-hover);
  }
</style>
