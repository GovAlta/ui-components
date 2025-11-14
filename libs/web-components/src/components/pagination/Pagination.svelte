<svelte:options customElement="goa-pagination" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import { typeValidator, validateRequired } from "../../common/utils";

  // Types

  const [Variants, validateVariant] = typeValidator("Pagination variant", [
    "all",
    "links-only",
  ]);
  type Variant = (typeof Variants)[number];

  // public

  export let pagenumber: number;
  export let itemcount: number;
  export let perpagecount: number = 10;
  export let variant: Variant = "all";
  export let testid: string = "";
  export let mt: Spacing = "none";
  export let mr: Spacing = "none";
  export let mb: Spacing = "m";
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
          detail: { page: newPage, event: e },
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
        detail: { page, event: e },
      }),
    );
  }
</script>

<goa-block id="root" {ml} {mr} {mb} {mt}>
  <div class="controls" data-testid={testid}>
    {#if variant === "all"}
      <goa-block data-testid="page-selector" alignment="center" gap="s">
        <span>Page</span>
        <input bind:this={hiddenEl} type="hidden" />
        {#if itemcount <= 0}
          <goa-dropdown
            bind:this={pageDropdownEl}
            value="1"
            on:_change={handlePageChange}
          >
            <goa-dropdown-item value="1" label="1" />
          </goa-dropdown>
        {:else}
          {#key _pageCount}
            <goa-dropdown
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
    <goa-block alignment="center" gap="m" data-testid="page-links">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, -1)}
        type="tertiary"
        leadingicon="arrow-back"
        disabled={itemcount <= 0 || pagenumber <= 1 ? "true" : "false"}>Previous</goa-button>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, 1)}
        type="tertiary"
        trailingicon="arrow-forward"
        disabled={itemcount <= 0 || pagenumber >= _pageCount ? "true" : "false"}>Next</goa-button>
    </goa-block>
  </div>
</goa-block>

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

  @media (--not-mobile) {
    .controls {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
