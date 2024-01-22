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
  export let mt: Spacing = "none";
  export let mr: Spacing = "none";
  export let mb: Spacing = "m";
  export let ml: Spacing = "none";

  // reactive
  $: _pageCount = Math.ceil(itemcount / perpagecount);

  // private
  let pageDropdownEl: HTMLElement;
  let hiddenEl: HTMLInputElement; // needed to allow the inputEl's event to be cancelled

  // hooks
  onMount(async () => {
    await tick();
    validateRequired("GoAPagination", { itemcount, pagenumber });
    validateVariant(variant);

    // prevent event propagation
    if (!pageDropdownEl) {
      console.error("Missing pageDropdownEl");
      return;
    }
    pageDropdownEl?.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      const page = Number.parseInt(ce.detail.value);
      e.stopPropagation();

      hiddenEl.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          bubbles: true,
          detail: { page },
        }),
      );
    });
  });

  // functions
  function goto(e: Event, offset: number) {
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
</script>

<goa-block id="root" {ml} {mr} {mb} {mt}>
  <div class="controls">
    {#if variant === "all"}
      <goa-block data-testid="page-selector" alignment="center" gap="s">
        <span>Page</span>
        <input bind:this={hiddenEl} type="hidden" />
        <goa-dropdown bind:this={pageDropdownEl} value={pagenumber}>
          {#each { length: _pageCount } as _, i}
            <goa-dropdown-item value={i + 1} label={i + 1} />
          {/each}
        </goa-dropdown>
        <span>of {_pageCount}</span>
      </goa-block>
    {/if}
    <goa-block alignment="center" gap="m" data-testid="page-links">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, -1)}
        type="tertiary"
        leadingicon="arrow-back"
        disabled={pagenumber == 1 ? "true" : "false"}>Previous</goa-button
      >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-button
        on:click={(e) => goto(e, 1)}
        type="tertiary"
        trailingicon="arrow-forward"
        disabled={pagenumber == _pageCount ? "true" : "false"}>Next</goa-button
      >
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

  @media not (--mobile) {
    .controls {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
