<svelte:options customElement="goa-table-sort-header" />

<script context="module" lang="ts">
  export type GoATableSortDirection = "asc" | "desc" | "none";
</script>

<script lang="ts">
  export let direction: GoATableSortDirection = "none";
</script>

<button>
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
    height: 3.75rem;
    align-items: center;
    padding: 0 1rem;
    text-align: left;

    gap: 0.25rem;
    align-items: center;
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
    color: var(--goa-color-greyscale-400);
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
