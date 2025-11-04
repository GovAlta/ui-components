<svelte:options customElement={{
  tag: "goa-table",
  props: {
    variant: { reflect: true },
    version: { reflect: true },
    striped: { reflect: true }
  }
}} />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { GoATableSortDirection } from "./TableSortHeader.svelte";
  import type { Spacing } from "../../common/styling";

  // Validators
  const [Variants, validateVariant] = typeValidator(
    "Table variant",
    ["normal", "relaxed"],
    true,
  );
  type Variant = (typeof Variants)[number];

  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);
  type VersionType = (typeof Version)[number];

  // Public

  export let width: string = "";
  export let stickyheader: string = "false";
  export let striped: string = "false";
  export let variant: Variant = "normal";
  export let version: VersionType = "2";
  export let testid: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private

  let _rootEl: HTMLElement;
  let _isTableRoot: boolean = false;

  // Reactive

  $: _stickyHeader = toBoolean(stickyheader);
  $: _striped = toBoolean(striped);

  // Hooks

  onMount(() => {
    validateVariant(variant);
    validateVersion(version);

    // without setTimeout it won't properly sort in Safari
    setTimeout(attachSortEventHandling, 0);

    // exit here if when running tests (tests don't have assignedElements)
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot || slot.assignedElements().length === 0) {
      return;
    }

    // React has everything nested in a table to prevent invalid DOM errors
    _isTableRoot = slot.assignedElements()[0].tagName === "TABLE";
  });

  // Functions

  async function attachSortEventHandling() {
    await tick();
    const contentSlot = _rootEl?.querySelector("slot") as HTMLSlotElement;
    const headings = contentSlot
      ?.assignedElements()
      .find((el) => el.tagName === "THEAD" || el.tagName === "TABLE")
      ?.querySelectorAll("goa-table-sort-header");

    headings?.forEach((heading) => {
      heading.addEventListener("click", () => {
        const sortBy = heading.getAttribute("name");
        let sortDir: number = 0;

        // relay state to all children
        headings.forEach((child) => {
          if (child.getAttribute("name") === sortBy) {
            const direction = child["direction"] as GoATableSortDirection;
            // starting direction is asc
            const newDirection = direction === "asc" ? "desc" : "asc";

            sortDir = newDirection === "asc" ? 1 : -1;
            child.setAttribute("direction", newDirection);
          } else {
            child.setAttribute("direction", "none");
          }
        });

        if (sortBy && sortDir !== 0) {
          dispatch(heading, { sortBy, sortDir });
        }
      });

      // dispatch the default sort params if initially set
      const initialSortBy = heading.getAttribute("name");
      const initialDirection = heading["direction"] as GoATableSortDirection;
      if (initialSortBy && initialDirection && initialDirection !== "none") {
        setTimeout(() => {
          dispatch(heading, {
            sortBy: initialSortBy,
            sortDir: initialDirection === "asc" ? 1 : -1,
          });
        }, 10);
      }
    });
  }

  function dispatch(el: Element, params: { sortBy: string; sortDir: number }) {
    el.dispatchEvent(
      new CustomEvent("_sort", {
        composed: true,
        bubbles: true,
        cancelable: false,
        detail: params,
      }),
    );
  }
</script>

<div
  bind:this={_rootEl}
  class={`goatable ${variant}`}
  class:v2={version === "2"}
  class:sticky={_stickyHeader}
  class:striped={_striped}
  style={`
    ${`width: ${width || "100%"};`}
    ${calculateMargin(mt, mr, mb, ml)}
  `}
  data-testid={testid}
>
  {#if _isTableRoot}
    <slot />
  {:else}
    <table style={width && "width: 100%;"}>
      <slot />
    </table>
  {/if}
</div>

<style>
  /* other styles can be found in the assets/css/components.css file */
  .goatable {
    width: 0;
  }

  table {
    border-collapse: collapse;
  }

  /* V2 Border and Border-Radius */
  .v2 table {
    border-collapse: separate;
    border-spacing: 0;
    border: var(--goa-table-container-border, 1px solid #e7e7e7);
    border-radius: var(--goa-table-border-radius-container, 16px);
    overflow: hidden;
  }
</style>
