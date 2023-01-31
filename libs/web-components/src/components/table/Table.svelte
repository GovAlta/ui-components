<svelte:options tag="goa-table" />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin, Spacing } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";

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
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;

    if (slot) {
      // React needs to nest data in a <template><table>...</table></template>
      const content = slot.assignedElements()[0].querySelectorAll("template table > *");
      _rootEl.append(...(content.length > 0 ? content : slot.assignedElements()));
    } else {
      return [..._rootEl.children] as Element[];
    }
  });
</script>

<table
  class={variant}
  class:sticky={_stickyHeader}
  bind:this={_rootEl}
  style={`
    ${width ? `width: ${width};`: ``}
    ${calculateMargin(mt, mr, mb, ml)}
  `}
>
  <slot />
  <!-- prevents console errors being seen in react  -->
  <template>
    <thead><tr><th /></tr></thead>
    <tbody><tr><td /></tr></tbody>
    <tfoot><tr><td /></tr></tfoot>
  </template>
</table>

<style>
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
    padding: 0.75rem 1rem 0.5rem;
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    line-height: 1rem;
  }

  table.relaxed td{
    padding: 1.25rem 1rem 1rem;
  }

  th {
    background-color: var(--goa-color-greyscale-white);
    color: var(--goa-color-text-secondary);
    padding: 1rem;
    vertical-align: middle;
    text-align: left;
    border-bottom: 2px solid var(--goa-color-greyscale-700);
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
