<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import { deleteContext, ContextStore, createContext } from "../../common/context-store";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { onMount, onDestroy, tick } from "svelte";
  import { BIND, BindMessage, Option } from "./types";

  const MAX_HEIGHT = 300;

  // Props

  export let name: string;

  // TODO: determine if this should be called `value` to allow it to work
  // in a standard form without javascript
  export let value: string;
  export let leadingicon: GoAIconType;
  export let maxheight: number = MAX_HEIGHT;
  export let placeholder: string = "";
  export let disabled: boolean;
  export let error: boolean;
  export let testid: string;

  // TODO: remove this once goa-input has the toBoolean method removed
  $: isError = error ? "true" : "false";

  // Private
  let options: Option[] = [];
  let selectedLabel: string = "";
  let isMenuVisible = false;

  let el: HTMLElement;
  let ctx: ContextStore;

  function onSelect(name: string, val: string, label: string) {
    selectedLabel = label;
    value = val;
    isMenuVisible = false;
    el.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, value },
      }),
    );
  }

  onMount(async () => {
    ctx = createContext(name);
    ctx.subscribe(data => {
      switch (data?.type) {
        case BIND: {
          const _data = data as BindMessage
          const selected = value === _data.value;
          options = [...options, { ..._data, selected }];
          if (selected) {
            selectedLabel = _data.label
          }
          break;
        }
      }
    })
  });

  onDestroy(() => {
    deleteContext(name);
  })

  // Functions
  async function showMenu() {
    if (disabled) {
      return;
    }
    isMenuVisible = true;
  }

  function closeMenu() {
    isMenuVisible = false;
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
    <div data-testid={`${name}-dropdown`}>
      <goa-input
        on:click={showMenu}
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
        value={selectedLabel}
      />
    </div>

    <!-- list and filter -->
    {#if isMenuVisible}
      <div class="menu">
        <ul
          class="goa-dropdown-list"
          style={`overflow-y: auto; max-height: ${maxheight}px`}
        >
          <slot />
          {#each options as option (option.value)}
            <li
              data-testid={`${option.value}-dropdown-item`}
              class="goa-dropdown-option"
              class:goa-dropdown-option--disabled={false}
              class:goa-dropdown-option--selected={option.value === value }
              style={`display: ${false ? "none" : "block"}`}
              on:click={() => onSelect(option.name, option.value, option.label)}
            >
              {option.label}
            </li>
          {/each}
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
    z-index: 98;
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

  /* dropdown items */
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
