<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { messageChannel } from "./common/dropdown-store";

  // public
  export let name: string;
  export let value: string;
  export let label: string;

  // optional
  export let selected: boolean = false;
  export let disabled: boolean = false;
  export let hide: boolean = false;
  export let testId: string = "";

  let multiSelect: boolean;

  onMount(async () => {
    await tick();
  });

  messageChannel.subscribe((channel) => {
    const msg = channel[name];
    if (!msg) {
      return;
    }
    if (msg.tag !== name) {
      return;
    }

    switch (msg.payload.type) {
      case "FilterChange": {
        const filter = msg.payload.filter.toLowerCase();
        if (!value && !label) {
          hide = false;
        } else {
          const matches = value.toLowerCase().includes(filter) || label.toLowerCase().includes(filter);
          hide = !matches;
        }
        break;
      }
      case "DropDownAction": {
        if (msg.payload.label !== label && !multiSelect) {
          selected = false;
        }
        break;
      }
      case "DropDownInit": {
        selected = msg.payload.values.includes(value);
        multiSelect = msg.payload.multiSelect;
        if (selected) {
          messageChannel.update((old) => ({
            ...old,
            [name]: {
              tag: name,
              payload: {
                type: "DropDownAction",
                action: "select",
                label,
                value,
              },
            },
          }));
        }
        break;
      }
    }
  });

  function onSelect() {
    selected = !selected;

    messageChannel.update((old) => ({
      ...old,
      [name]: {
        tag: name,
        payload: {
          type: "DropDownAction",
          action: selected ? "select" : "deselect",
          label: label,
          value: value,
          multiSelect,
        },
      },
    }));
  }
</script>

<li
  class:goa-dropdown-option={true}
  class:goa-dropdown-option--disabled={disabled}
  class:goa-dropdown-option--selected={selected}
  style={`display: ${hide ? "none" : "block"}`}
  data-testid={testId}
  on:click={onSelect}
>
  <slot>
    {label}
  </slot>
</li>

<style>
  .goa-dropdown-option {
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-gray-900);
  }

  .goa-dropdown-option:hover {
    background: var(--color-gray-100);
    color: var(--color-blue-600);
  }

  .goa-dropdown-option--disabled {
    opacity: 0.5;
    cursor: default;
  }

  .goa-dropdown-option--disabled:hover {
    cursor: default;
    color: var(--color-gray-700);
  }

  .goa-dropdown-option--selected {
    background: var(--color-blue-500);
    color: var(--color-white);
  }

  .goa-dropdown-option--selected:hover {
    background: var(--color-blue-600);
    color: var(--color-white);
  }

  .dropdown-group-content .goa-dropdown-option {
    padding-left: 1.5rem;
  }
</style>
