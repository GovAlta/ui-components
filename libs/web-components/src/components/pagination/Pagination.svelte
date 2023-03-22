<svelte:options tag="goa-pagination" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import { typeValidator, validateRequired, toArray } from "../../common/utils";

  // Types
  const [Variants, validateVariant] = typeValidator("Pagination variant", ["all", "links-only"])
  type Variant = typeof Variants[number];

  // public
  export let pagenumber: number;
  export let itemcount: number;
  export let perpagecount: string = "10";
  export let variant: Variant = "all";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // reactive
  $: _pageCountOptions = toArray(perpagecount);
  $: _itemsPerPage = _pageCountOptions[0];
  $: _pageCount = _itemsPerPage && Math.ceil(itemcount / Number.parseInt(_itemsPerPage.toString(), 10))
  $: _showSelectors = variant === "all" || _pageCountOptions.length > 1;
  // private
  let pageNumberInput: HTMLInputElement = null;
  let itemCountInput: HTMLInputElement = null;
  let hiddenEl: HTMLInputElement = null;  // needed to allow the pageNumberInput's event to be cancelled


  // hooks
  onMount(async () => {
    await tick()
    validateRequired("GoAPagination", { itemcount, pagenumber })
    validateVariant(variant);
    // prevent event propagation if value is non-numeric
    // (input[type=number] returns blank for non-numeric numbers)
    pageNumberInput && pageNumberInput.addEventListener("_change", (e: CustomEvent) => {
      const page = Number.parseInt(e.detail.value)
      e.stopPropagation();
      if (isNaN(page)) {
        return;
      }

      hiddenEl.dispatchEvent(new CustomEvent("_change", {composed: true, bubbles: true, detail: { page }}))
    })

    itemCountInput && itemCountInput.addEventListener("_change", (e: CustomEvent) => {
      _itemsPerPage = e.detail.value;
      const count = Number.parseInt(e.detail.value);
      e.stopPropagation();
      if (isNaN(count)) {
        return;
      }

      hiddenEl.dispatchEvent(new CustomEvent("_changeItemCount", {composed: true, bubbles: true, detail: { count }}))
    })
  })

  // functions
  function goto(e: Event, offset: number) {
    const newPage = Number.parseInt(pagenumber + "") + offset;
    if (newPage > 0 && newPage <= _pageCount) {
      e.target.dispatchEvent(new CustomEvent("_change", {composed: true, bubbles: true, detail: { page: newPage }}))
    }
    e.preventDefault();
  }
</script>

<style>
  span {
    white-space: nowrap;
  }

  .controls {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .selectors {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 0;
    gap: 1rem;
    align-items: center;
  }

  @media (min-width: 480px) {
    .controls {
      flex-direction: row;
      justify-content: space-between;
    }
    .selectors {
      flex-direction: row;
      flex: 1;
    }
  }
</style>

<goa-block id="root" ml={ml} mr={mr} mb={mb} mt={mt}>
  <div class="controls">
    <div class="selectors" style={`${_showSelectors ? '' : 'display: none'}`}>
      <input bind:this={hiddenEl} type="hidden" />
      {#if _pageCountOptions.length > 1}
        <goa-block data-testid="item-count-selector" alignment="center" gap="s">
          <span>Show</span>
          <goa-dropdown bind:this={itemCountInput} type="number" value={_itemsPerPage} width="8ch">
            {#each _pageCountOptions as count}
              <goa-dropdown-item value={count}>{count}</goa-dropdown-item>
            {/each}
          </goa-dropdown>
          <span>of {itemcount} [items]</span>
        </goa-block>
      {/if}
      {#if variant === "all"}
        <goa-block data-testid="page-selector" alignment="center" gap="s">
          <span>Page</span>
          <goa-input bind:this={pageNumberInput} type="number" value={pagenumber} width="8ch" debounce="500" min="1" max={_pageCount} />
          <span>of {_pageCount}</span>
        </goa-block>
      {/if}
    </div>
    <div class="links">
      <goa-block alignment="center" gap="m" data-testid="page-links">
        <goa-button on:click={(e) => goto(e, -1)} type="tertiary" leadingicon="arrow-back" disabled={pagenumber == 1 ? "true" : "false"}>Previous</goa-button>
        <goa-button on:click={(e) => goto(e, 1)} type="tertiary" trailingicon="arrow-forward" disabled={pagenumber == _pageCount ? "true" : "false"}>Next</goa-button>
      </goa-block>
    </div>
  </div>
</goa-block>
