<svelte:options customElement="goa-pagination" />

<script lang="ts">
  import { calculateMargin, type Spacing } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import { typeValidator, validateRequired } from "../../common/utils";

  // Types

  const [Variants, validateVariant] = typeValidator("Pagination variant", [
    "all",
    "links-only",
  ]);
  type Variant = (typeof Variants)[number];

  // public

  /** @required The current page being viewed (non-zero based). */
  export let pagenumber: number;
  /** @required Total number of data items within all pages. */
  export let itemcount: number;
  /** Number of data items shown per page. */
  export let perpagecount: number = 10;
  /** Controls which nav controls are visible. */
  export let variant: Variant = "all";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Top margin. */
  export let mt: Spacing = "none";
  /** Right margin. */
  export let mr: Spacing = "none";
  /** Bottom margin. */
  export let mb: Spacing = "m";
  /** Left margin. */
  export let ml: Spacing = "none";

  // reactive

  $: _pageCount = Math.max(1, Math.ceil(itemcount / perpagecount));

  $: {
    if (pagenumber <= 0 || itemcount === 0) {
      pagenumber = 1;
    } else if (pagenumber > _pageCount) {
      pagenumber = _pageCount;
    }
  }

  // private

  let pageDropdownEl: HTMLElement;
  let hiddenEl: HTMLInputElement; // needed to allow the inputEl's event to be cancelled

  // hooks

  onMount(async () => {
    await tick();
    validateRequired("GoAPagination", { itemcount, pagenumber });
    validateVariant(variant);
  });

  // functions

  function goto(e: Event, offset: number) {
    if (itemcount <= 0) return;

    const newPage = Number.parseInt(pagenumber + "") + offset;

    if (newPage > 0 && newPage <= _pageCount) {
      e.target?.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          bubbles: true,
          detail: { page: newPage },
        }),
      );
    }
    e.preventDefault();
  }

  function handlePageChange(e: Event) {
    const ce = e as CustomEvent;
    const pageValue = ce.detail.value;

    // For "0 of 0" state, dont dspatch
    if (pageValue === "0" || itemcount <= 0) {
      e.stopPropagation();
      return;
    }

    const page = Number.parseInt(pageValue);
    e.stopPropagation();
    hiddenEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { page },
      }),
    );
  }
</script>

<div id="root" style={calculateMargin(mt, mr, mb, ml)}>
  <div class="controls" data-testid={testid}>
    {#if variant === "all"}
      <goa-block data-testid="page-selector" alignment="center" gap="s">
        <span>Page</span>
        <input bind:this={hiddenEl} type="hidden" />
        {#if itemcount <= 0}
          <goa-dropdown
            size="compact"
            bind:this={pageDropdownEl}
            value="1"
            on:_change={handlePageChange}
          >
            <goa-dropdown-item value="1" label="1" />
          </goa-dropdown>
        {:else}
          {#key _pageCount}
            <goa-dropdown
              size="compact"
              bind:this={pageDropdownEl}
              value={pagenumber}
              on:_change={handlePageChange}
            >
              {#each { length: _pageCount } as _, i}
                <goa-dropdown-item value={i + 1} label={i + 1} />
              {/each}
            </goa-dropdown>
          {/key}
        {/if}
        <span>of {itemcount <= 0 ? "1" : _pageCount}</span>
      </goa-block>
    {/if}
    <div class="page-links" data-testid="page-links">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, -1)}
        type="tertiary"
        size="compact"
        leadingicon="arrow-back"
        disabled={itemcount <= 0 || pagenumber <= 1 ? "true" : "false"}
        >Previous</goa-button
      >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, 1)}
        type="tertiary"
        size="compact"
        trailingicon="arrow-forward"
        disabled={itemcount <= 0 || pagenumber >= _pageCount ? "true" : "false"}
        >Next</goa-button
      >
    </div>
  </div>
</div>

<style>
  :host {
    display: block;
  }

  span {
    white-space: nowrap;
    font: var(--goa-pagination-text-size);
    color: var(--goa-pagination-text-color);
  }

  .controls {
    display: flex;
    gap: var(--goa-pagination-gap, 1rem);
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .page-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--goa-space-l);
    width: 100%;
  }

  @media (--not-mobile) {
    .controls {
      flex-direction: row;
      justify-content: space-between;
    }

    .page-links {
      width: auto;
    }
  }
</style>
