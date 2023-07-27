<svelte:options tag="goa-table" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin, Spacing } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { Direction } from "./TableSortHeader.svelte";

  // Validators
  const [Variants, validateVariant] = typeValidator(
    "Table variant",
    ["normal", "relaxed"],
    true,
  );
  type Variant = typeof Variants[number];

  // Public
  export let width: string = "";
  export let stickyheader: string = "false";
  export let variant: Variant = "normal";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private
  let _rootEl: HTMLElement;
  let _isTableRoot: boolean = false;
  $: _stickyHeader = toBoolean(stickyheader);

  onMount(() => {
    validateVariant(variant);

    // without setTimeout it won't properly sort in Safari
    setTimeout(attachSortEventHandling, 0)

    // exit here if when running tests (tests don't have assignedElements)
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot || slot.assignedElements().length === 0) {
      return;
    }

    // React has everything nested in a table to prevent invalid DOM errors
    _isTableRoot = slot.assignedElements()[0].tagName === "TABLE";
  });

  async function attachSortEventHandling() {
    await tick();
    const headings = _rootEl.querySelectorAll("goa-table-sort-header");
    headings.forEach(heading => {
      heading.addEventListener("click", () => {
        const sortBy = heading.getAttribute("name")
        let sortDir: number;

        // relay state to all children
        headings.forEach(child => {
          if (child.getAttribute("name") === sortBy) {
            const direction = child["direction"] as Direction;
            // starting direction is asc
            const newDirection = direction === "asc" ? "desc" : "asc";

            sortDir = newDirection === "asc" ? 1 : -1
            child.setAttribute("direction", newDirection)
          } else {
            child.setAttribute("direction", "none")
          }
        })

        dispatch(heading, {sortBy, sortDir})
      })

      // dispatch the default sort params if initially set
      const initialSortBy = heading.getAttribute("name");
      const initialDirection = heading["direction"] as Direction;
      if (initialDirection && initialDirection !== "none") {
        setTimeout(() => {
          dispatch(heading, {sortBy: initialSortBy, sortDir: initialDirection === "asc" ? 1 : -1})
        }, 10)
      } 
    })
  }

  function dispatch(el: Element, params: {sortBy: string, sortDir: number}) {
    el.dispatchEvent(new CustomEvent("_sort", {
      composed: true,
      bubbles: true,
      cancelable: false,
      detail: params,
    }));
  }
</script>

<div 
  bind:this={_rootEl}
  class={`goatable ${variant}`}
  class:sticky={_stickyHeader}
  style={`
    ${width && `width: ${width};`}
    ${calculateMargin(mt, mr, mb, ml)}
  `}
>
  {#if _isTableRoot}
    <slot />
  {:else}
    <table
      style={
       width && "width: 100%;"
      }
    >
      <slot />
    </table>
  {/if}
</div>

<style>
  /* other styles can be found in the assets/css/components.css file */
  :host {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
  }
</style>

