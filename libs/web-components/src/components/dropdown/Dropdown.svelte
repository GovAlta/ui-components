<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import { deleteContext, ContextStore, getContext } from "../../common/context-store";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { BindMessage, Option } from "./types";
  import type { Spacing } from "../../common/styling";
  import { onDestroy, onMount, tick } from "svelte";
  import { toBoolean, validateRequired } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";

  const MAX_HEIGHT = "276px";

  // Props

  export let name: string;
  export let arialabel: string = "";
  export let value: string = "";
  export let leadingicon: GoAIconType = null;
  export let maxheight: string = MAX_HEIGHT;
  export let placeholder: string = "";
  export let width: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let multiselect: string = "false";

  export let native: string = "false";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  $: _disabled = toBoolean(disabled);
  $: _error = toBoolean(error);
  $: _multiselect = toBoolean(multiselect);
  $: _native = toBoolean(native);

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

  let isBound = false;
  $: {
    (async () => {
      await tick();
      if (name && el && !isBound) {
        isBound = true;
        if (!_native) {
          addKeyboardEventListeners();
        }
        parseValues();
        bindContext();
      }
    })();
  }

  onMount(() => {
    validateRequired("GoADropdown", { name });
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
    deleteContext(name);
  });

  // Functions

  function addKeyboardEventListeners() {
    el.addEventListener("focus", onFocus, true);
    el.addEventListener("blur", onBlur, true);
  }

  function removeKeyboardEventListeners() {
    el.removeEventListener("focus", onFocus, true);
    el.removeEventListener("blur", onBlur, true);
  }

  function parseValues() {
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
  }

  function bindContext() {
    ctx = getContext(name);
    ctx.subscribe(data => {
      const _data = data as BindMessage;
      const selected = _values.includes(_data.value);
      const label = _data.label || _data.value;

      options = [...options, { ..._data, selected }];
      if (selected) {
        selectedLabel = label;
      }
      if (!width && maxLetterCount < label.length) {
        maxLetterCount = label.length;
        computedWidth = `${Math.max(20, maxLetterCount + 12)}ch`;
      }
      setHighlightedIndexToSelected();
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

    // bind up/down arrows to navigate options
    menuEl.addEventListener("mouseover", onHighlight);
  }

  function closeMenu() {
    menuEl.removeEventListener("blur", closeMenu);
    menuEl.removeEventListener("mouseover", onHighlight);
    setHighlightedIndexToSelected();
    isMenuVisible = false;
  }

  function setHighlightedIndexToSelected() {
    highlightedIndex = options.findIndex(option => _values.includes(option.value));
  }

  // Event handlers

  function onSelect(value: string, label: string, close: boolean) {
    if (_disabled) return;
    selectedLabel = label;
    if (_multiselect) {
      _values.push(value);
      el.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          detail: { name, values: _values },
        }),
      );
    } else {
      _values = [value];
      el.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          detail: { name, value },
        }),
      );
    }
    if (close) {
      closeMenu();
    }
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "Enter":
        isMenuVisible ? closeMenu() : showMenu();
        e.preventDefault();
        break;
      case "Escape":
        isMenuVisible && closeMenu();
        e.preventDefault();
        break;
      case "ArrowDown":
        if (e.altKey) {
          isMenuVisible ? closeMenu() : showMenu();
          break;
        }
        _handleArrowDown();
        e.preventDefault();
        break;
      case "ArrowUp":
        if (e.altKey) {
          isMenuVisible ? closeMenu() : showMenu();
          break;
        }
        _handleArrowUp();
        e.preventDefault();
        break;
    }
  };

  function _handleArrowDown() {
    if (highlightedIndex < options.length - 1) {
      highlightedIndex++;
      onSelect(options[highlightedIndex].value, options[highlightedIndex].label, false);
    }
  }

  function _handleArrowUp() {
    if (highlightedIndex > 0) {
      highlightedIndex--;
      onSelect(options[highlightedIndex].value, options[highlightedIndex].label, false);
    }
  }

  // add required bindings to component
  function onFocus() {
    el.addEventListener("keydown", onInputKeyDown);
  }

  // remove all bindings from component
  function onBlur() {
    el.removeEventListener("keydown", onInputKeyDown);
  }

  function onHighlight(e: Event) {
    highlightedIndex = Number((e.target as HTMLElement).dataset.index);
  }

  function onNativeSelect(e: Event) {
    const target = e.currentTarget as HTMLSelectElement;
    const option = options[target.selectedIndex];
    onSelect(option.value, option.label, false);
  }
</script>

<!-- Template -->
<div
  data-testid={`${name}-dropdown`}
  class="dropdown"
  class:dropdown-native={_native}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    --width: ${width || computedWidth}
  `}
  bind:this={el}
>
  {#if _native}
    <select
      on:change={onNativeSelect}
      disabled={_disabled}
      class:error={_error}
      aria-label={arialabel || name}
    >
      {#each options as option (option.value)}
        <option
          selected={option.value === value}
          value={option.value}
          aria-label={option.label || option.value}>{option.label || option.value}</option
        >
      {/each}
    </select>
  {:else}
    {#if isMenuVisible}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        data-testid={`${name}-dropdown-background`}
        class="dropdown-background"
        on:click={closeMenu}
      />
    {/if}

    <!-- readonly input  -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <goa-input
      on:click={showMenu}
      {error}
      {disabled}
      {leadingicon}
      {placeholder}
      aria-controls="menu"
      aria-expanded={isMenuVisible}
      aria-label={arialabel || name}
      data-testid={`${name}-dropdown-input`}
      readonly
      role="combobox"
      trailingicon="chevron-down"
      type="text"
      value={selectedLabel}
      width="100%"
    />
    <!-- list and filter -->
    <ul
      id="menu"
      role="listbox"
      aria-activedescendant={selectedLabel}
      data-testid="dropdown-menu"
      bind:this={menuEl}
      tabindex="0"
      class="dropdown-list"
      class:dropdown-active={isMenuVisible}
      style={`overflow-y: auto; max-height: ${maxheight}`}
    >
      {#each options as option, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          id={option.label}
          role="option"
          aria-label={option.label || option.value}
          aria-selected={_values.includes(option.value) ? "true" : "false"}
          class="dropdown-option"
          class:dropdown-option--disabled={false}
          class:dropdown-option--tabbed={index === highlightedIndex}
          class:dropdown-option--selected={_values.includes(option.value)}
          data-testid={`dropdown-item-${option.value}`}
          data-index={index}
          style={`display: ${false ? "none" : "block"}`}
          on:click={() => onSelect(option.value, option.label, true)}
        >
          {option.label || option.value}
        </li>
      {/each}
      <slot />
    </ul>
  {/if}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .dropdown {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 100%;
  }

  @media (min-width: 640px) {
    .dropdown {
      width: var(--width);
    }
  }

  .dropdown-background {
    cursor: default;
    position: fixed;
    z-index: 98;
    inset: 0;
  }

  .dropdown-list {
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
  .dropdown-list::-webkit-scrollbar {
    width: 6px;
  }
  .dropdown-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .dropdown-list::-webkit-scrollbar-thumb {
    background: #888;
  }
  .dropdown-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* dropdown items */
  .dropdown-option {
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-black);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dropdown-option--tabbed {
    background: var(--color-gray-100);
    color: var(--goa-color-interactive--hover);
  }

  .dropdown-option--disabled {
    opacity: 0.5;
    cursor: default;
  }

  .dropdown-option--disabled:hover {
    cursor: default;
    color: var(--color-gray-600);
  }

  .dropdown-option--selected {
    background: var(--goa-color-interactive);
    color: var(--color-white);
  }

  .dropdown-option--tabbed.dropdown-option--selected,
  .dropdown-option--selected:hover {
    background: var(--goa-color-interactive--hover);
    color: var(--color-white);
  }

  /* Native styling  */
  .dropdown-native {
    border: 1px solid var(--color-gray-600);
    border-radius: var(--input-border-radius);
    background-color: var(--color-white);
  }

  .dropdown-native:has(select:disabled) {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-200);
    box-shadow: none;
    color: var(--goa-color-text-secondary);
    cursor: default;
  }

  .dropdown-native:has(select.error) {
    border: 2px solid var(--goa-color-interactive--error);
  }

  select {
    border: none;
    background-color: transparent;
    color: var(--goa-color-text);
    font-size: var(--input-font-size);
    appearance: none;
    padding: calc(var(--input-padding) + 2px);
    padding-left: 0.5rem;
    padding-right: 2rem;
    outline: none;
    width: 100%;
  }

  .dropdown-native::after {
    content: "";
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    pointer-events: none;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='none' stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' /%3E%3C/svg%3E");
    background-repeat: none;
  }

  .dropdown-native:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
  }
</style>
