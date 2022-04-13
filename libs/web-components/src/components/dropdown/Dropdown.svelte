<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import { getContext, deleteContext, ContextStore } from "../../common/context-store";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { onDestroy, onMount, tick } from "svelte";
  import type { ChangeSelectedMessage } from "./types";

  const MAX_HEIGHT = 300;

  // Props

  export let name: string;

  // TODO: determine if this should be called `value` to allow it to work
  // in a standard form without javascript
  export let values: string;
  export let leadingicon: GoAIconType;
  export let maxheight: number = MAX_HEIGHT;
  export let placeholder: string = "";

  export let multiselect: boolean;
  export let disabled: boolean;
  export let filterable: boolean;
  export let error: boolean;
  export let testid: string;

  // TODO: remove this once goa-input has the toBoolean method removed
  $: isError = error ? "true" : "false";

  // Private

  let selectedLabels: string[] = [];
  let selectedValues: string[];
  let isMenuVisible = false;

  let el: HTMLElement;
  let filterEl: HTMLElement;
  let filter = "";
  let ctx: ContextStore;

  let unsubChangeSelected: () => void;
  let unsubInit: () => void;

  // notify children of value change
  $: {
    if (values !== undefined) {
      let vals: string[];
      if (typeof values === "string") {
        vals = values ? JSON.parse(values) : [];
      } else {
        vals = values;
      }
      selectedValues = vals;

      ctx?.notify("propChange", {
        multiSelect: multiselect,
        values: vals,
      });
    }
  }

  onMount(async () => {
    await tick();

    ctx = getContext(name);


    // Listen for initial label selection updates on initial mount.
    // > This is required because the parent does not know the label values
    // > for each of the children, so on the initial load any preselected values
    // > have to communicated back to the parent of the label values that correspond
    // > to the preselected values.
    // > A separate event is required to prevent circular updates.
    unsubInit = ctx.subscribe<ChangeSelectedMessage>("init", data => {
      if (multiselect) {
        selectedLabels = [...selectedLabels, data.label];
      } else {
        selectedLabels = [data.label];
      }
      // calling the unsub init
      unsubInit();
    })

    // listen for change messages from children
    unsubChangeSelected = ctx.subscribe<ChangeSelectedMessage>("selectionChange", data => {
      if (data.selected) {
        if (multiselect) {
          selectedLabels = [...selectedLabels, data.label];
          selectedValues = [...selectedValues, data.value];
        } else {
          selectedLabels = [data.label];
          selectedValues = [data.value];
        }
      } else {
        selectedLabels = selectedLabels.filter(label => label !== data.label);
        selectedValues = selectedValues.filter(value => value !== data.value);
      }

      if (!multiselect) {
        isMenuVisible = false;
      }

      // This isn't required when the component is properly bound, but this
      // will make the component appear to work properly before the component
      // is properly bound.
      ctx.notify("propChange", {
        multiSelect: multiselect,
        values: selectedValues,
      });

      el.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          detail: { name, value: selectedValues }, // TODO: send single value if multiselect is false
        }),
      );
    });
  });

  onDestroy(() => {
    unsubChangeSelected();
    deleteContext(name);
  });

  // Reactive

  let filterOnChangeListener = e => {
    e.stopPropagation();
    filter = e.detail.value;
    ctx.notify("filterChange", {
      filter,
    });
  };

  let filterOnTrailingIconClickListener = e => {
    e.stopPropagation();
    filter = "";
    ctx.notify("filterChange", {
      filter,
    });
    filterEl?.focus();
  };

  // Functions
  async function showMenu() {
    if (disabled) {
      return;
    }
    isMenuVisible = true;
    await tick();
    // To prevent the event from bubbling up to the parent, we need to listen to the event on the element itself
    // then we can stop propagation and prevent default
    filterEl?.addEventListener("_change", filterOnChangeListener);
    filterEl?.addEventListener("_trailingIconClick", filterOnTrailingIconClickListener);
    filterEl?.focus();
  }

  function closeMenu() {
    isMenuVisible = false;
    filterEl?.removeEventListener("_change", filterOnChangeListener);
    filterEl?.removeEventListener(
      "_trailingIconClick",
      filterOnTrailingIconClickListener,
    );
  }
</script>

<div data-testid={testid} class="goa-dropdown-box" bind:this={el}>
  <!-- background -->
  {#if isMenuVisible}
    <div
      data-testid={`${name}-dropdown-background`}
      class="goa-dropdown-background"
      on:click={closeMenu}
    />
  {/if}

  <div>
    <!-- readonly input  -->
    {#if !isMenuVisible || !filterable}
      <div data-testid={`${name}-dropdown`}>
        <goa-input
          on:focus={showMenu}
          error={isError}
          disabled={disabled}
          {leadingicon}
          {placeholder}
          id={`${name}-dropdown-input`}
          name="search"
          readonly
          trailingicon="chevron-down"
          handletrailingiconclick
          type="text"
          value={selectedLabels.join(", ")}
        />
      </div>
    {/if}

    <!-- list and filter -->
    {#if isMenuVisible}
      <div class="menu">
        <!-- filter -->
        {#if filterable}
          <goa-input
            bind:this={filterEl}
            id={`${name}-dropdown-filter`}
            focused={isMenuVisible}
            name="filter"
            placeholder="Filter"
            trailingicon={filter.length > 0 ? "close-circle" : "search"}
            handletrailingiconclick
            type="text"
            value={filter}
          />
        {/if}

        <!-- list -->
        <ul
          class="goa-dropdown-list"
          style={`overflow-y: auto; max-height: ${maxheight}px`}
        >
          <slot />
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .goa-dropdown-box {
    position: relative;
  }

  .menu goa-input {
    position: relative;
  }

  .goa-dropdown-background {
    position: fixed;
    inset: 0;
  }

  .goa-dropdown-list {
    position: absolute;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    margin-top: 3px;
    list-style-type: none;
    background: var(--color-white);
    border-radius: var(--input-border-radius);
    box-shadow: var(--shadow-1);
    z-index: 99;
  }

  .goa-dropdown-list {
    scroll-behavior: smooth;
    scrollbar-width: thin; /* Firefox */
  }

  /* Chrome based browsers and Safari */
  .goa-dropdown-list::-webkit-scrollbar {
    width: 6px;
  }

  .goa-dropdown-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .goa-dropdown-list::-webkit-scrollbar-thumb {
    background: #888;
  }

  .goa-dropdown-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .error {
    border-radius: 3px;
    border: 2px solid var(--goa-color-interactive--error);
    color: var(--goa-color-interactive--error);
  }
</style>
