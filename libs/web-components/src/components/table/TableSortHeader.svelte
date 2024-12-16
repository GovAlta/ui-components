<svelte:options customElement="goa-table-sort-header" />

<script context="module" lang="ts">
  export type GoATableSortDirection = "asc" | "desc" | "none";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  export let direction: GoATableSortDirection = "none";

  // Private
  let _rootEl: HTMLElement;
  onMount(() => {
    if (_rootEl) {
      // Add styling if an ancestor has a class to style number columns,
      const hostEl = _rootEl.getRootNode().host;
      const parentThead = hostEl?.closest("th");
      parentThead?.style.setProperty("--goa-table-header-padding", "0");

      const ancestor = hostEl?.closest("th.goa-table-number-header");
      if (ancestor) {
        _rootEl.style.setProperty("--header-text-align", "flex-end");
        _rootEl.style.setProperty("--header-align", "right");
      }
    }
  });
</script>

<button bind:this={_rootEl}>
  <slot />
  {#if direction === "desc"}
    <goa-icon type="caret-down" size="small" />
  {:else if direction === "asc"}
    <goa-icon type="caret-up" size="small" />
  {:else}
    <div class="direction--none">
      <goa-icon type="caret-up" size="small" />
      <goa-icon type="caret-down" size="small" />
    </div>
  {/if}
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
    width: 100%;
    height: var(--goa-space-2xl);
    padding: var(--goa-space-s) var(--goa-space-m);
    justify-content: var(--header-text-align, flex-start);
    gap: var(--goa-space-2xs);
    align-items: flex-end;
    text-align: var(--header-align, left);
  }

  /* User set classes */
  button:hover {
    background-color: var(--goa-color-greyscale-100);
    cursor: pointer;
    color: var(--goa-color-interactive-hover);
  }

  button goa-icon {
    color: var(--goa-color-interactive-default);
  }
  button:hover goa-icon {
    color: var(--goa-color-interactive-hover);
  }
  button .direction--none goa-icon {
    color: var(--goa-color-greyscale-400);
  }
  button:hover .direction--none goa-icon {
    color: var(--goa-color-interactive-hover);
  }

  goa-icon {
    scale: 0.8;
  }

  .direction--none goa-icon {
    height: 0.625rem;
  }

  .direction--none {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
</style>
