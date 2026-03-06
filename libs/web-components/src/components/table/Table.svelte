<svelte:options
  customElement={{
    tag: "goa-table",
    props: {
      variant: { reflect: true },
      version: { reflect: true },
      striped: { reflect: true },
      sortMode: { attribute: "sort-mode", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean, dispatch } from "../../common/utils";
  import type { Spacing } from "../../common/styling";

  // Types
  type SortDirection = "asc" | "desc";
  type SortEntry = { column: string; direction: SortDirection };

  // Validators
  const [Variants, validateVariant] = typeValidator(
    "Table variant",
    ["normal", "relaxed"],
    true,
  );
  type Variant = (typeof Variants)[number];

  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);
  type VersionType = (typeof Version)[number];

  const [SortModes, validateSortMode] = typeValidator(
    "Sort mode",
    ["single", "multi"],
    { required: true },
  );
  type SortMode = (typeof SortModes)[number];

  // Public

  /** Width of the table. By default it will fit the enclosed content. */
  export let width: string = "";
  /** When true, the table header sticks to the top when scrolling. */
  export let stickyheader: string = "false";
  /** When true, alternates row background colors for improved readability. */
  export let striped: string = "false";
  /** A relaxed variant of the table with more vertical padding for the cells. */
  export let variant: Variant = "normal";
  /** @internal Design system version for styling. */
  export let version: VersionType = "1";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sort mode: "single" allows one column, "multi" allows up to 2 columns. */
  export let sortMode: SortMode = "single";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Private

  let _rootEl: HTMLElement;
  let _isTableRoot: boolean = false;
  let _sorts: SortEntry[] = [];
  let _headings: NodeListOf<Element> | undefined;
  const MAX_SORTS = 2;

  // Reactive

  $: _stickyHeader = toBoolean(stickyheader);
  $: _striped = toBoolean(striped);

  // Hooks

  onMount(() => {
    validateVariant(variant);
    validateVersion(version);
    validateSortMode(sortMode);

    // exit here if when running tests (tests don't have assignedElements)
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (!slot || slot.assignedElements().length === 0) {
      return;
    }

    // React has everything nested in a table to prevent invalid DOM errors
    _isTableRoot = slot.assignedElements()[0].tagName === "TABLE";

    // without setTimeout it won't properly find headers in Safari
    setTimeout(initializeSortHeaders, 0);
  });

  // Functions

  function findSortHeaders(): NodeListOf<Element> | undefined {
    const slot = _rootEl?.querySelector("slot") as HTMLSlotElement;
    return slot
      ?.assignedElements()
      .find((el) => el.tagName === "THEAD" || el.tagName === "TABLE")
      ?.querySelectorAll("goa-table-sort-header");
  }

  function initializeSortHeaders() {
    _headings = findSortHeaders();
    if (!_headings || _headings.length === 0) return;

    attachClickHandlers();
    buildInitialSortState();
    updateHeaderAttributes();
    if (_sorts.length > 0) {
      dispatchSortEvent();
    }
  }

  function attachClickHandlers() {
    _headings?.forEach((heading) => {
      heading.addEventListener("click", () => {
        const name = heading.getAttribute("name");
        if (name) {
          handleSortClick(name);
        }
      });
    });
  }

  function buildInitialSortState() {
    const entries: {
      column: string;
      direction: SortDirection;
      order: number;
    }[] = [];

    _headings?.forEach((heading) => {
      const name = heading.getAttribute("name");
      const direction = heading.getAttribute("direction") as SortDirection | "none" | null;
      const sortOrder = Number(heading.getAttribute("sort-order")) || 0;
      if (name && direction && direction !== "none") {
        entries.push({ column: name, direction, order: sortOrder });
      }
    });

    // When multiple headers have initial direction in multi mode, sortOrder
    // determines priority. Without it the table falls back to DOM order,
    // which may not match the author's intent.
    if (sortMode === "multi" && entries.length > 1) {
      const withoutSortOrder = entries.filter((e) => e.order === 0);
      if (withoutSortOrder.length > 0) {
        console.warn(
          `[goa-table] Multiple headers have initial sort direction but no sort-order set ` +
          `[${withoutSortOrder.map((e) => e.column).join(", ")}]. ` +
          `Falling back to DOM order. Add sort-order="1", sort-order="2" to set explicit priority.`,
        );
      }
    }

    // Sort by sortOrder (headers with explicit order first, then by DOM order)
    entries.sort((a, b) => {
      if (a.order && b.order) return a.order - b.order;
      if (a.order) return -1;
      if (b.order) return 1;
      return 0;
    });

    if (sortMode === "single") {
      _sorts =
        entries.length > 0
          ? [{ column: entries[0].column, direction: entries[0].direction }]
          : [];
    } else {
      _sorts = entries
        .slice(0, MAX_SORTS)
        .map(({ column, direction }) => ({ column, direction }));
    }
  }

  function handleSortClick(column: string) {
    if (sortMode === "single") {
      handleSingleSort(column);
    } else {
      handleMultiSort(column);
    }
    updateHeaderAttributes();
    dispatchSortEvent();
  }

  function handleSingleSort(column: string) {
    const current = _sorts.find((s) => s.column === column);
    const direction = current?.direction === "asc" ? "desc" : "asc";
    _sorts = [{ column, direction }];
  }

  function handleMultiSort(column: string) {
    const columnIndex = _sorts.findIndex((s) => s.column === column);

    if (columnIndex >= 0) {
      if (_sorts[columnIndex].direction === "asc") {
        _sorts[columnIndex] = { column, direction: "desc" };
        _sorts = [..._sorts];
      } else {
        // column has been sorted descending, click again to un-sort
        _sorts = _sorts.filter((_, i) => i !== columnIndex);
      }
      return;
    }

    // Add new column, or replace the last sort if at max
    if (_sorts.length < MAX_SORTS) {
      _sorts = [..._sorts, { column, direction: "asc" }];
    } else {
      _sorts = [_sorts[0], { column, direction: "asc" }];
    }
  }

  function updateHeaderAttributes() {
    if (!_headings || _headings.length === 0) return;

    _headings.forEach((heading) => {
      const name = heading.getAttribute("name");
      const sortIndex = _sorts.findIndex((s) => s.column === name);

      if (sortIndex >= 0) {
        heading.setAttribute("direction", _sorts[sortIndex].direction);
        if (sortMode === "multi" && _sorts.length > 1) {
          heading.setAttribute("sort-order", String(sortIndex + 1));
        } else {
          heading.setAttribute("sort-order", "0");
        }
      } else {
        heading.setAttribute("direction", "none");
        heading.setAttribute("sort-order", "0");
      }
    });
  }

  function dispatchSortEvent() {
    if (sortMode === "multi") {
      dispatch(
        _rootEl,
        "_multisort",
        { sorts: _sorts },
        { bubbles: true },
      );
    } else {
      const firstSort = _sorts[0];
      dispatch(
        _rootEl,
        "_sort",
        {
          sortBy: firstSort?.column ?? "",
          sortDir: firstSort ? (firstSort.direction === "asc" ? 1 : -1) : 0,
        },
        { bubbles: true },
      );
    }
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
  .v2.goatable {
    border: var(--goa-table-container-border, 1px solid #e7e7e7);
    border-radius: var(--goa-table-border-radius-container, 16px);
    overflow: hidden;
  }
</style>
