<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import { messageChannel } from './common/dropdown-store';
  import type { Message } from './common/dropdown-store';
  import type { GoAIconType } from './Icon.wc.svelte';
  import { onDestroy, onMount, tick } from 'svelte';

  const MAX_HEIGHT = 300;

  // Props

  export let name: string;
  export let values: string;
  export let leadingicon: GoAIconType;
  export let maxheight: number;
  export let placeholder: string;

  export let ismultiselect: boolean;
  export let isdisabled: boolean;
  export let isautocomplete: boolean;

  // Private

  let el: HTMLElement;
  let selectedLabels: string[] = [];
  let selectedValues: string[] = [];
  let isMenuVisible = false;

  let filterEl: HTMLElement;
  let filter = '';

  // Init

  const unsubscribe = messageChannel.subscribe((channel) => {
    if (channel[name]?.tag !== name) {
      return;
    }

    const msg = channel[name] as Message;
    switch (msg?.payload?.type) {
      case 'DropDownAction': {
        if (msg.payload.action === 'select') {
          if (ismultiselect) {
            selectedLabels = [...selectedLabels, msg.payload.label];
            selectedValues = [...selectedValues, msg.payload.value];
          } else {
            selectedLabels = [msg.payload.label];
            selectedValues = [msg.payload.value];
          }
        }
        if (msg.payload.action === 'deselect') {
          const _label = msg.payload.label;
          const _value = msg.payload.value;
          selectedLabels = selectedLabels.filter((label) => label !== _label);
          selectedValues = selectedValues.filter((value) => value !== _value);
        }

        if (!ismultiselect) {
          isMenuVisible = false;
        }

        messageChannel.update((old) => ({ ...old, [name]: null }));
        el.dispatchEvent(
          new CustomEvent('on:change', {
            composed: true,
            detail: { event: null, data: { name, value: selectedValues } },
          })
        );
        break;
      }
    }
  });

  // Hooks

  onMount(async () => {
    await tick();

    // set initial values state
    messageChannel.update((old) => ({
      ...old,
      [name]: {
        tag: name,
        payload: {
          type: 'DropDownInit',
          values: values ? JSON.parse(values) : [],
          multiSelect: ismultiselect,
        },
      },
    }));
  });

  onDestroy(() => {
    messageChannel.update((old) => {
      delete old[name];
      return old;
    });

    unsubscribe();
  });

  // Reactive

  let filterOnChangeListener = (e) => {
    e.stopPropagation();
    filter = e.detail.data.value;
    messageChannel.update((old) => ({
      ...old,
      [name]: {
        tag: name,
        payload: {
          type: 'FilterChange',
          filter,
        },
      },
    }));
  };

  let filterOnTrailingIconClickListener = (e) => {
    e.stopPropagation();
    filter = '';
    messageChannel.update((old) => ({
      ...old,
      [name]: {
        tag: name,
        payload: {
          type: 'FilterChange',
          filter,
        },
      },
    }));
    filterEl.focus()
  };

  // Functions
  async function showMenu() {
    isMenuVisible = true;
    await tick();
    // To prevent the event from bubbling up to the parent, we need to listen to the event on the element itself
    // then we can stop propagation and prevent default
    filterEl?.addEventListener('on:change', filterOnChangeListener);
    filterEl?.addEventListener(
      'on:trailingIconClick',
      filterOnTrailingIconClickListener
    );
    filterEl.focus()
  }

  function closeMenu() {
    isMenuVisible = false;
    filterEl?.removeEventListener('on:change', filterOnChangeListener);
    filterEl?.removeEventListener(
      'on:trailingIconClick',
      filterOnTrailingIconClickListener
    );
  }
</script>

<div class="goa-dropdown-box" bind:this={el}>
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
    {#if !isMenuVisible || !isautocomplete}
      <div on:click={showMenu} data-testid={`${name}-dropdown`}>
        <goa-input
          disabled={isdisabled}
          {leadingicon}
          {placeholder}
          id={`${name}-dropdown-input`}
          name="search"
          readonly={true}
          trailingicon="chevron-down"
          type="text"
          value={selectedLabels.join(', ')}
        />
      </div>
    {/if}

    <!-- list and filter -->
    {#if isMenuVisible}
      <div class="menu">
        <!-- filter -->
        {#if isautocomplete}
          <goa-input
            bind:this={filterEl}
            focused={isMenuVisible}
            name="filter"
            placeholder="Filter"
            trailingIcon={filter.length > 0 ? 'close-circle' : 'search'}
            handletrailingiconclick="true"
            type="text"
            variant="goa"
            value={filter}
          />
        {/if}

        <!-- list -->
        <ul
          class="goa-dropdown-list"
          style={`overflow-y: auto; max-height: ${maxheight || MAX_HEIGHT}px`}
        >
          <slot />
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  .goa-dropdown-box {
    position: relative;
  }

  .goa-dropdown-box ~ .goa-dropdown-box {
    margin-top: 1rem;
  }

  .menu goa-input {
    position: relative;
  }

  .goa-dropdown-background {
    position: fixed;
    inset: 0;
  }

  .goa-icon ~ input {
    padding-left: 0.5rem;
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
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.1);
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

  .goa-dropdown-list hr {
    border: none;
    border-top: 1px solid var(--color-gray-100);
    margin: 0;
  }

  .goa-dropdown-list label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    padding-left: 0.5rem;
  }

  .goa-state--error .goa-dropdown-input {
    border: 2px solid var(--color-red);
  }
</style>
