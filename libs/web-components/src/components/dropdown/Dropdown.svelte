<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import { deleteContext, ContextStore, createContext } from "../../common/context-store";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import { onMount, onDestroy, tick } from "svelte";
  import { BIND, BindMessage, Option } from "./types";
  import { toBoolean } from "../../common/utils";

  const MAX_HEIGHT = "300px";

  // Props

  export let name: string;
  export let value: string = "";
  export let leadingicon: GoAIconType = null;
  export let maxheight: string = MAX_HEIGHT;
  export let placeholder: string = "";
  export let testid: string = "";
  export let width: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let multiselect: string = "false";

  $: _disabled = toBoolean(disabled);
  $: _multiselect = toBoolean(multiselect);

  // Private
  let _values: string[] = [];
  let options: Option[] = [];
  let selectedLabel: string = "";
  let isMenuVisible = false;
  let highlightedIndex: number = 0;
  let maxLetterCount: number = 0;
  let computedWidth: string;

  let el: HTMLElement;
  let menuEl: HTMLElement;
  let ctx: ContextStore;

  // Hooks

  onMount(async () => {
    el.addEventListener("focus", onFocus, true);
    el.addEventListener("blur", onBlur, true);

    // parse and convert values to strings to avoid later type comparison issues
    let rawValue: string[];
    try {
      rawValue = JSON.parse(value || "[]");
    } catch (e) {
      rawValue = [value];
    }
    const rawValues = typeof rawValue === "object" ? rawValue : [rawValue];
    // convert all values to strings to avoid later type comparison issues
    _values = rawValues.map((val: unknown) => `${val}`);

    bindContext();
  });

  onDestroy(() => {
    el.removeEventListener("focus", onFocus, true);
    el.removeEventListener("blur", onBlur, true);
    deleteContext(name);
  });

  // Functions

  function bindContext() {
    ctx = createContext(name);
    ctx.subscribe(data => {
      switch (data?.type) {
        case BIND: {
          const _data = data as BindMessage;
          const selected = _values.includes(_data.value);

          options = [...options, { ..._data, selected }];
          if (selected) {
            selectedLabel = _data.label;
          }
          if (!width && maxLetterCount < _data.label.length) {
            maxLetterCount = _data.label.length;
            computedWidth = `${Math.max(20, maxLetterCount + 12)}ch`;
          }
          setHighlightedIndexToSelected();
          break;
        }
      }
    });
  }

  async function showMenu() {
    if (_disabled || isMenuVisible) {
      return;
    }
    isMenuVisible = true;

    await tick();

    // hide menu on blur
    menuEl.addEventListener("blur", closeMenu);
    menuEl.focus();

    // bind up/down arrows to navigate options
    menuEl.addEventListener("keydown", onMenuKeyDown);
    menuEl.addEventListener("mouseover", onHighlight);
  }

  function closeMenu() {
    menuEl.removeEventListener("blur", closeMenu);
    menuEl.removeEventListener("keydown", onMenuKeyDown);
    menuEl.removeEventListener("mouseover", onHighlight);
    setHighlightedIndexToSelected();
    isMenuVisible = false;
  }

  function setHighlightedIndexToSelected() {
    highlightedIndex = options.findIndex(option => _values.includes(option.value));
  }

  // Event handlers

  function onSelect(val: string, label: string) {
    if (_disabled) return;
    selectedLabel = label;
    if (_multiselect) {
      _values.push(val);
      el.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          detail: { name, values: _values },
        }),
      );
    } else {
      _values = [val];
      el.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          detail: { name, value: _values[0] },
        }),
      );
    }
    closeMenu();
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
        showMenu();
        e.preventDefault();
        break;
    }
  };

  // add required bindings to component
  function onFocus() {
    el.addEventListener("keydown", onInputKeyDown);
  }

  // remove all bindings from component
  function onBlur() {
    el.removeEventListener("keydown", onInputKeyDown);
  }

  function onMenuKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowUp":
        if (highlightedIndex === 0) {
          highlightedIndex = options.length - 1;
        } else {
          highlightedIndex--;
        }
        e.preventDefault();
        break;
      case "ArrowDown":
        highlightedIndex = (highlightedIndex + 1) % options.length;
        e.preventDefault();
        break;
      case "Tab":
      case "Enter":
        onSelect(options[highlightedIndex].value, options[highlightedIndex].label);
        e.preventDefault();
        break;
      case "Escape":
        closeMenu();
        e.preventDefault();
        break;
    }
  }

  function onHighlight(e: Event) {
    highlightedIndex = Number((e.target as HTMLElement).dataset.index);
  }

</script>

<!-- Template -->

<div 
  data-testid={testid} 
  class="goa-dropdown-box" 
  style={`--width: ${width || computedWidth}`}
  bind:this={el}>
  <!-- background -->
  {#if isMenuVisible}
    <div
      data-testid={`${name}-dropdown-background`}
      class="goa-dropdown-background"
      on:click={closeMenu}
    />
  {/if}

  <!-- readonly input  -->
  <div data-testid={`${name}-dropdown`}>
    <goa-input
      on:click={showMenu}
      error={error}
      {disabled}
      {leadingicon}
      {placeholder}
      width="100%"
      id={`${name}-dropdown-input`}
      name="search"
      readonly
      trailingicon="chevron-down"
      type="text"
      value={selectedLabel}
    />
  </div>

  <!-- list and filter -->
  <ul
    data-testid="dropdown-menu"
    bind:this={menuEl}
    tabindex="0"
    class="goa-dropdown-list"
    class:dropdown-active={isMenuVisible}
    style={`overflow-y: auto; max-height: ${maxheight}`}
  >
    <slot />
    {#each options as option, index (option.value)}
      <li
        data-testid={`${option.value}-dropdown-item`}
        data-index={index}
        class="goa-dropdown-option"
        class:goa-dropdown-option--disabled={false}
        class:goa-dropdown-option--tabbed={index === highlightedIndex}
        class:goa-dropdown-option--selected={_values.includes(option.value)}
        style={`display: ${false ? "none" : "block"}`}
        on:click={() => onSelect(option.value, option.label)}
      >
        {option.label}
      </li>
    {/each}
  </ul>
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .goa-dropdown-box {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 100%;
  }

  @media (min-width: 640px) {
    .goa-dropdown-box {
      width: var(--width);
    }
  }

  .goa-dropdown-background {
    cursor: default;
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
    outline: none;
    box-shadow: var(--shadow-1);
    z-index: 99;

    scroll-behavior: smooth;
    scrollbar-width: thin; /* Firefox */

    display: none;
  }

  /* To prevent a tabindex reset the dropdown must remain in the DOM when menu is closed */
  .dropdown-active {
    display: block;
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

  /* dropdown items */
  .goa-dropdown-option {
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-black);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goa-dropdown-option--tabbed {
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
    background: var(--goa-color-interactive);
    color: var(--color-white);
  }

  .goa-dropdown-option--tabbed.goa-dropdown-option--selected,
  .goa-dropdown-option--selected:hover {
    background: var(--goa-color-interactive--hover);
    color: var(--color-white);
  }
</style>
