<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { messageChannel } from './common/dropdown-store';
  import { fromBoolean, toBoolean } from './common/utils';

  // public
  export let name: string = '';
  export let value: string = '';
  export let label: string = '';

  // optional
  export let testId: string = '';
  export let selected: string = '';
  export let disabled: string = '';
  export let hide: string = '';

  $: isSelected = toBoolean(selected);
  $: isDisabled = toBoolean(disabled);
  $: isHidden = toBoolean(hide);

  // private
  let multiSelect: boolean;
  let filteredLabel: string;

  onMount(async () => {
    await tick();
  });

  function getFilteredLabel(filter: string) {
    if (filter.length === 0) {
      return label;
    }
    if (!label.toLowerCase().includes(filter.toLowerCase())) {
      return label;
    }

    // bold all the matches
    filteredLabel = '';
    let lastIndex = 0;
    [...label.matchAll(new RegExp(filter, 'gi'))].forEach((match) => {
      filteredLabel +=
        label.slice(lastIndex, match.index) + `<b>${match[0]}</b>`;
      lastIndex = match.index + match[0].length;
    });
    filteredLabel += label.slice(lastIndex);

    return filteredLabel;
  }

  messageChannel.subscribe((channel) => {
    const msg = channel[name];
    if (!msg) {
      return;
    }
    if (msg.tag !== name) {
      return;
    }

    switch (msg.payload.type) {
      case 'FilterChange': {
        const filter = msg.payload.filter.toLowerCase();
        if (!value && !label) {
          hide = 'false';
        } else {
          const matches =
            value.toLowerCase().includes(filter) ||
            label.toLowerCase().includes(filter);
          hide = fromBoolean(!matches);
        }
        filteredLabel = getFilteredLabel(filter);
        break;
      }
      case 'DropDownAction': {
        if (msg.payload.label !== label && !multiSelect) {
          isSelected = false;
        }
        break;
      }
      case 'DropDownInit': {
        isSelected = msg.payload.values.includes(value);
        multiSelect = msg.payload.multiSelect;
        if (isSelected) {
          messageChannel.update((old) => ({
            ...old,
            [name]: {
              tag: name,
              payload: {
                type: 'DropDownAction',
                action: 'select',
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
    isSelected = !isSelected;

    messageChannel.update((old) => ({
      ...old,
      [name]: {
        tag: name,
        payload: {
          type: 'DropDownAction',
          action: isSelected ? 'select' : 'deselect',
          label: label,
          value: value,
          multiSelect,
        },
      },
    }));
  }
</script>

<li
  class="goa-dropdown-option"
  class:goa-dropdown-option--disabled={isDisabled}
  class:goa-dropdown-option--selected={isSelected}
  style={`display: ${isHidden ? 'none' : 'block'}`}
  data-testid={testId}
  on:click={onSelect}
>
  {@html filteredLabel || label}
</li>

<style>
  li {
    font-family: var(--font-family);
  }
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
