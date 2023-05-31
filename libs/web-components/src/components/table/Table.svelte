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
    // React needs to nest data in a <template><table>...</table></template>
    const content = slot.assignedElements()[0].querySelectorAll("template table > *");
    _rootEl.append(...(content.length > 0 ? content : slot.assignedElements()));
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
            const direction = child.getAttribute("direction") as Direction;
            // starting direction is desc
            const newDirection = direction === "desc" ? "asc" : "desc";

            sortDir = newDirection === "asc" ? 1 : -1
            child.setAttribute("direction", newDirection)
          } else {
            child.setAttribute("direction", "none")
          }
        })

        dispatch(heading, {sortBy, sortDir})
      })

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

<table
  class={variant}
  class:sticky={_stickyHeader}
  bind:this={_rootEl}

  style={`
    ${width ? `width: ${width};`: ``}
    ${calculateMargin(mt, mr, mb, ml)}
  `}>
  <slot />
  
  <!--
    prevents console errors being seen in react
    and prevents the internal styles from being removed
  -->
  <template>
    <thead><tr><th /></tr></thead>
    <tbody><tr><td /></tr></tbody>
    <tfoot><tr><td /></tr></tfoot>
  </template>
</table>

<style>
  :host {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
  }
  table.sticky {
    position: relative;
  }
  table.sticky thead {
    position: sticky;
    top: 0;
  }
  td {
    font: var(--goa-typography-body-m);
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--goa-color-greyscale-200);
  }

  table :global(.goa-table-number-column) {
    font: var(--goa-typography-number-m);
    text-align: right;
  }

  table.relaxed td {
    padding: 1rem;
  }

  th {
    background-color: var(--goa-color-greyscale-white);
    color: var(--goa-color-text-secondary);
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid var(--goa-color-greyscale-600);
    vertical-align: bottom;
  }

  th:has(goa-table-sort-header) {
    padding: 0;
  }

  tfoot td {
    background-color: var(--goa-color-greyscale-100);
  }

  tfoot tr:first-child td {
    border-top: 2px solid var(--goa-color-greyscale-200);
  }

  tfoot tr:last-child td {
    border-bottom: none;
  }

</style>
