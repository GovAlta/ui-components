<svelte:options tag="goa-dropdown" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { onDestroy, onMount, tick } from "svelte";
  import { toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";

  interface Option {
    label: string;
    value: string;
    selected: boolean;
  }

  // Props

  export let name: string;
  export let arialabel: string = "";
  export let value: string = "";
  export let leadingicon: GoAIconType = null;
  export let maxheight: string = "276px";
  export let placeholder: string = "";
  export let width: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let multiselect: string = "false";
  export let native: string = "false";
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
  let _options: Option[] = [];
  let _selectedLabel: string = "";
  let _isMenuVisible = false;
  let _highlightedIndex: number = 0;
  let _computedWidth: string;

  let _el: HTMLElement;
  let _menuEl: HTMLElement;
  let _selectEl: HTMLSelectElement;

  onMount(async () => {
    await tick();
    _values = parseValues();
    _options = getOptions();

    if (!_native) {
      _computedWidth = getCustomDropdownWidth(_options);
      addKeyboardEventListeners();
      setHighlightedIndexToSelected();
    }

    // watch for DOM changes within the slot => dynamic binding
    const slot = _el.querySelector("slot");
    slot?.addEventListener("slotchange", (_e) => {
      _selectedLabel = "";
      _values = parseValues();
      _options = getOptions();
    })
  });

  onDestroy(() => {
    removeKeyboardEventListeners();
  });

  // Functions

  function getChildren(): Element[] {
    const slot = _el.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      // default
      return slot.assignedElements();
    }
    // unit tests
    const el = _native ? _selectEl : _el;
    return [...el.children] as Element[];
  }


  // Create a list of the options based on the children within the slot
  // The children don't have to be goa-dropdown-item elements. Any child element
  // work as long as it has a value and label content
  function getOptions(): Option[] {
    const children = getChildren();

    return children
      .filter((child: Element) => child.tagName === "GOA-DROPDOWN-ITEM")
      .map((el: HTMLElement) => {
          const option = el as unknown as Option
          const value = el.getAttribute("value") || option.value;
          const label =
            el.getAttribute("label")
            || option.label
            || value;
          const selected = _values.includes(value);
          if (selected) {
            _selectedLabel = label;
            _values = [value];
          }
          return { selected, value, label};
        });    
  }

  // compute the required width to enure all children fit
  function getCustomDropdownWidth(options: Option[]) {
    let width: string;
    let maxCount = 0;

    if (options.length === 0 && placeholder !== "") {
      return `${placeholder.length + 12}ch`;
    }
    
    options.forEach((option: Option) => {
      const label = option.label || option.value || "";
      if (!width && maxCount < label.length) {
        maxCount = label.length;
        width = `${Math.max(20, maxCount + 12)}ch`;
      }
    });
    return width;
  }

  function addKeyboardEventListeners() {
    _el.addEventListener("focus", onFocus, true);
    _el.addEventListener("blur", onBlur, true);
  }

  function removeKeyboardEventListeners() {
    _el.removeEventListener("focus", onFocus, true);
    _el.removeEventListener("blur", onBlur, true);
  }

  // parse and convert values to strings to avoid later type comparison issues
  function parseValues() {
    let rawValue: string[];
    try {
      rawValue = JSON.parse(value || "[]");
    } catch (e) {
      rawValue = [value];
    }
    const rawValues = typeof rawValue === "object" ? rawValue : [rawValue];
    // convert all values to strings to avoid later type comparison issues
    return rawValues.map((val: unknown) => `${val}`);
  }

  async function showMenu() {
    if (_disabled || _isMenuVisible) {
      return;
    }
    _isMenuVisible = true;

    await tick();

    // hide menu on blur
    _menuEl.addEventListener("blur", closeMenu);

    // bind up/down arrows to navigate options
    _menuEl.addEventListener("mouseover", onHighlight);
  }

  function closeMenu() {
    _menuEl.removeEventListener("blur", closeMenu);
    _menuEl.removeEventListener("mouseover", onHighlight);
    setHighlightedIndexToSelected();
    _isMenuVisible = false;
  }

  function setHighlightedIndexToSelected() {
    _highlightedIndex = _options.findIndex(option => _values.includes(option.value));
  }

  // Event handlers

  /**
  * @property value the selected value
  */
  function onSelect(value: string, label: string, close?: boolean) {
    if (_disabled) return;
    _selectedLabel = label;

    let detail: Record<string, unknown>;
    if (_multiselect) {
      _values.push(value);
      detail = { name, values: _values };
    } else {
      _values = [value];
      detail = { name, value };
    }

    _el.dispatchEvent(new CustomEvent("_change", { composed: true, detail }));
    if (close) {
      closeMenu();
    }
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "Enter":
        _isMenuVisible ? closeMenu() : showMenu();
        e.preventDefault();
        break;
      case "Escape":
        _isMenuVisible && closeMenu();
        e.preventDefault();
        break;
      case "ArrowDown":
        if (e.altKey) {
          _isMenuVisible ? closeMenu() : showMenu();
          break;
        }
        _handleArrowDown();
        e.preventDefault();
        break;
      case "ArrowUp":
        if (e.altKey) {
          _isMenuVisible ? closeMenu() : showMenu();
          break;
        }
        _handleArrowUp();
        e.preventDefault();
        break;
    }
  };

  function _handleArrowDown() {
    if (_highlightedIndex < _options.length - 1) {
      _highlightedIndex++;
      onSelect(
        _options[_highlightedIndex].value,
        _options[_highlightedIndex].label,
        false,
      );
    }
  }

  function _handleArrowUp() {
    if (_highlightedIndex > 0) {
      _highlightedIndex--;
      onSelect(
        _options[_highlightedIndex].value,
        _options[_highlightedIndex].label,
        false,
      );
    }
  }

  // add required bindings to component
  function onFocus() {
    _el.addEventListener("keydown", onInputKeyDown);
  }

  // remove all bindings from component
  function onBlur() {
    _el.removeEventListener("keydown", onInputKeyDown);
  }

  function onHighlight(e: Event) {
    _highlightedIndex = Number((e.target as HTMLElement).dataset.index);
  }

  function onNativeSelect(e: Event) {
    const target = e.currentTarget as HTMLSelectElement;
    const option = _options[target.selectedIndex];
    onSelect(option.value, option.label);
  }
</script>

<!-- Template -->
<div
  data-testid={`${name}-dropdown`}
  class="dropdown"
  class:dropdown-native={_native}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    --width: ${width || _computedWidth}
  `}
  bind:this={_el}
>
  {#if _native}
    <select
      bind:this={_selectEl}
      on:change={onNativeSelect}
      disabled={_disabled}
      class:error={_error}
      aria-label={arialabel || name}
    >
      <slot />
      {#each _options as option}
        <option
          selected={option.selected}
          value={option.value}
          aria-label={option.label}
        >
          {option.label}
        </option>
      {/each}
    </select>
  {:else}
    {#if _isMenuVisible}
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
      aria-expanded={_isMenuVisible}
      arialabel={arialabel || name}
      data-testid={`${name}-dropdown-input`}
      readonly
      role="combobox"
      trailingicon="chevron-down"
      type="text"
      value={_selectedLabel}
      width="100%"
      name={name}
    />

    <!-- list and filter -->
    <slot />
    <ul
      id="menu"
      role="listbox"
      aria-activedescendant={_selectedLabel}
      data-testid="dropdown-menu"
      bind:this={_menuEl}
      tabindex="0"
      class="dropdown-list"
      class:dropdown-active={_isMenuVisible}
      style={`overflow-y: auto; max-height: ${maxheight}`}
    >
      {#each _options as option, index (index)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          id={option.label}
          role="option"
          aria-label={option.label || option.value}
          aria-selected={_values.includes(option.value) ? "true" : "false"}
          class="dropdown-item"
          class:dropdown-item--disabled={false}
          class:dropdown-item--tabbed={index === _highlightedIndex}
          class:dropdown-item--selected={_values.includes(option.value)}
          data-testid={`dropdown-item-${option.value}`}
          data-index={index}
          data-value={option.value}
          style={`display: ${false ? "none" : "block"}`}
          on:click={() => onSelect(option.value, option.label, true)}
        >
          {option.label || option.value}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
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
    background: var(--goa-color-greyscale-white);
    border-radius: var(--goa-border-radius-m);
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
  .dropdown-item {
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--goa-color-greyscale-black);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dropdown-item--tabbed {
    background: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }

  .dropdown-item--disabled {
    opacity: 0.5;
    cursor: default;
  }

  .dropdown-item--disabled:hover {
    cursor: default;
    color: var(--goa-color-greyscale-700);
  }

  .dropdown-item--selected {
    background: var(--goa-color-interactive-default);
    color: var(--goa-color-greyscale-white);
  }

  .dropdown-item--tabbed.dropdown-item--selected,
  .dropdown-item--selected:hover {
    background: var(--goa-color-interactive-hover);
    color: var(--goa-color-greyscale-white);
  }

  /* Native styling  */
  .dropdown-native {
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);
    background-color: var(--goa-color-greyscale-white);
  }

  .dropdown-native:has(select:disabled) {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200);
    box-shadow: none;
    color: var(--goa-color-text-secondary);
    cursor: default;
  }

  .dropdown-native:has(select.error) {
    border: 2px solid var(--goa-color-interactive-error);
  }

  select {
    border: none;
    background-color: transparent;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    appearance: none;
    padding: calc(var(--goa-space-xs) + 2px);
    padding-left: 0.5rem;
    padding-right: 3rem;
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
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }
</style>
