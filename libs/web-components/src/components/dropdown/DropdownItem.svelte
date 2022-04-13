<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { fromBoolean, toBoolean } from "../../common/utils";
  import { getContext, ContextStore } from '../../common/context-store';
  import { onMount, onDestroy } from "svelte";
  import type { BindSelectedMessage, ChangeFilterMessage } from "./types";

  // public
  export let name: string = "";
  export let value: string = "";
  export let label: string = "";

  // optional
  export let selected: string = "false";
  export let disabled: string = "false";
  export let hide: string = "false";
  export let testid: string;

  $: isSelected = toBoolean(selected);
  $: isDisabled = toBoolean(disabled);
  $: isHidden = toBoolean(hide);

  // private
  let filteredLabel: string;
  let ctx: ContextStore;

  function getFilteredLabel(filter: string) {
    if (filter.length === 0) {
      return label;
    }
    if (!label.toLowerCase().includes(filter.toLowerCase())) {
      return label;
    }

    // bold all the matches
    filteredLabel = "";
    let lastIndex = 0;
    [...label.matchAll(new RegExp(filter, "gi"))].forEach(match => {
      filteredLabel += label.slice(lastIndex, match.index) + `<b>${match[0]}</b>`;
      lastIndex = match.index + match[0].length;
    });
    filteredLabel += label.slice(lastIndex);

    return filteredLabel;
  }

  function onSelect() {
    isSelected = !isSelected;
    ctx.notify("selectionChange", {
      label,
      value,
      selected: isSelected,
    });
  }

  // Hooks

  let unsub: () => void;
  onMount(() => {
    ctx = getContext(name);
    ctx.subscribe<BindSelectedMessage>("propChange", (data) => {
      isSelected = data.values.includes(value)
    });

    unsub = ctx.subscribe<BindSelectedMessage>("propChange", (data) => {
      const isSelected = data.values.includes(value);
      if (isSelected) {
        ctx.notify("init", {
          label,
          value,
          selected: true,
        });
      }
      unsub();
    });

    ctx.subscribe<ChangeFilterMessage>("filterChange", (data) => {
      const filter = data.filter.toLowerCase();
      if (!value && !label) {
        hide = "false";
      } else {
        let matches;
        switch (typeof value) {
          case "string":
            matches = value?.toLowerCase().includes(filter) || label?.toLowerCase().includes(filter);
            break;
          case "number":
            matches = value === filter || label?.toLowerCase().includes(filter);
            break;
        }

        hide = fromBoolean(!matches);
      }
      filteredLabel = getFilteredLabel(filter);
    });
  });

  onDestroy(() => {
    unsub();
  });

</script>

<li
  class="goa-dropdown-option"
  class:goa-dropdown-option--disabled={isDisabled}
  class:goa-dropdown-option--selected={isSelected}
  style={`display: ${isHidden ? "none" : "block"}`}
  data-testid={testid}
  on:click={onSelect}
>
  {@html filteredLabel || label}
</li>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  li {
    font-family: var(--font-family);
  }
  .goa-dropdown-option {
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-black);
  }

  .goa-dropdown-option:hover {
    background: var(--color-gray-100);
    color: var(--goa-color-interactive--hover);
  }

  .goa-dropdown-option--disabled {
    opacity: 0.5;
    cursor: default;
  }

  .goa-dropdown-option--disabled:hover {
    cursor: default;
    color: var(--color-gray-600);
  }

  .goa-dropdown-option--selected {
    background: var(--goa-color-interactive--active);
    color: var(--color-white);
  }

  .goa-dropdown-option--selected:hover {
    background: var(--goa-color-interactive--hover);
    color: var(--color-white);
  }

  .dropdown-group-content .goa-dropdown-option {
    padding-left: 1.5rem;
  }
</style>
