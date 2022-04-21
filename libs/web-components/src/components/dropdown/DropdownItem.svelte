<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { fromBoolean, toBoolean } from "../../common/utils";
  import { getContext, ContextStore } from '../../common/context-store';
  import { onMount } from "svelte";
  import { BindSelectedMessage, CHANGE, ChangeFilterMessage, FILTER, INIT_RESPONSE, SELECT } from "./types";

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

  let isInitialized = false;

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
    ctx?.notify({
      type: SELECT,
      label,
      value,
      selected: isSelected,
    });
  }

  // Hooks
  onMount(async () => {
    ctx = await getContext(name);
    ctx.subscribe((data) => {
      switch (data?.type) {

        case CHANGE: {
          const _data = data as BindSelectedMessage;
          console.log('DropdownItem change...', data)
          isSelected = _data.values?.includes(value)

          // This condition is only run when the parent component passes
          // the values down on the **initial** value binding and if this
          // dropdown item contains the value that is set within the parent.
          if (!isInitialized && isSelected) {
            ctx.notify({
              type: INIT_RESPONSE,
              label,
              value,
              selected: true,
            });
          }
          // child has been initialized
          isInitialized = true;
          break;
        }

        case FILTER: {
          const { filter } = data as ChangeFilterMessage;
          if (!value && !label) {
            hide = "false";
          } else {
            let matches: boolean;
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
          break;
        }
      }
    });
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
