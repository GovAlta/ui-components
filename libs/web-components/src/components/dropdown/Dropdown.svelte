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
  export let relative: string = "false";
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
  let _inputWidth: string;

  let _el: HTMLElement;
  let _menuEl: HTMLElement;
  let _selectEl: HTMLSelectElement;
  let _inputEl: HTMLInputElement;

  $: {
    if (_el) {
      _values = parseValues(value);
      _options = getOptions();
      if (!_native) {
        _computedWidth = getCustomDropdownWidth(_options);
        addKeyboardEventListeners();
        setHighlightedIndexToSelected();
      }
    }
  }

  $: if(_inputEl && _options.length) {
    _inputWidth = `${_inputEl.getBoundingClientRect().width}px`;
    console.log(_inputWidth);
  }

  onMount(async () => {
    // watch for DOM changes within the slot => dynamic binding
    const slot = _el.querySelector("slot");
    slot?.addEventListener("slotchange", _e => {
      _selectedLabel = "";
      _values = parseValues(value);
      _options = getOptions();
    });
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
        const option = el as unknown as Option;
        const value = el.getAttribute("value") || option.value || "";
        const label = el.getAttribute("label") || option.label || value;

        const selected = _values.includes(value);
        if (selected) {
          _selectedLabel = label;
          _values = [value];
        }
        return { selected, value, label };
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
  function parseValues(selectedValue: string) {
    let rawValue: string[];
    try {
      rawValue = JSON.parse(selectedValue || `[""]`);
    } catch (e) {
      rawValue = [selectedValue];
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

  function MenuVisibleKeyDownHandler() {
    const handle = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          onSpace(e);
          break;
        case "Enter":
          onEnter(e);
          break;
        case "Escape":
          onEscape(e);
          break;
        case "ArrowUp":
          onArrowUp(e);
          break;
        case "ArrowDown":
          onArrowDown(e);
          break;
      }
    };

    const onSpace = (e: KeyboardEvent) => {
      e.preventDefault();
    };

    const onEnter = (e: KeyboardEvent) => {
      onSelect(
        _options[_highlightedIndex].value,
        _options[_highlightedIndex].label,
        false,
      );
      closeMenu();
      e.preventDefault();
      e.stopPropagation();
    };

    const onEscape = (e: KeyboardEvent) => {
      closeMenu();
      e.preventDefault();
      e.stopPropagation();
    };

    const onArrowUp = (e: KeyboardEvent) => {
      if (e.altKey) {
        closeMenu();
      }
      if (_highlightedIndex > 0) {
        _highlightedIndex--;
      }
      onSelect(
        _options[_highlightedIndex].value,
        _options[_highlightedIndex].label,
        false,
      );
      // e.stopPropagation();
      // e.preventDefault();
    };

    const onArrowDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        closeMenu();
      }
      if (_highlightedIndex < _options.length - 1) {
        _highlightedIndex++;
      }
      onSelect(
        _options[_highlightedIndex].value,
        _options[_highlightedIndex].label,
        false,
      );
      console.log("on arrow down")
      // e.stopPropagation();
      // e.preventDefault();
    };

    return {
      handle,
    };
  }

  function MenuHiddenKeyDownHandler() {
    const handle = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          onSpace(e);
          break;
        case "Enter":
          onEnter(e);
          break;
        case "Escape":
          onEscape(e);
          break;
        case "ArrowUp":
          onArrowUp(e);
          break;
        case "ArrowDown":
          onArrowDown(e);
          break;
      }
    };

    const onSpace = (e: KeyboardEvent) => {
      showMenu();
      _menuEl.focus(); // set menu focus to allow arrow keys to trigger scrolling within option list
      e.preventDefault();
    };

    const onEnter = (e: KeyboardEvent) => {
      showMenu();
      _menuEl.focus(); // set menu focus to allow arrow keys to trigger scrolling within option list
      e.preventDefault();
    };

    const onEscape = (_e: KeyboardEvent) => {};

    const onArrowUp = (e: KeyboardEvent) => {
      if (e.altKey) {
        showMenu();
      }
      if (_highlightedIndex > 0) {
        _highlightedIndex--;
      }
      onSelect(_options[_highlightedIndex].value, _options[_highlightedIndex].label)
      e.stopPropagation();
      e.preventDefault();
    };

    // FIXME: here
    const onArrowDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        showMenu();
      }
      if (_highlightedIndex < _options.length - 1) {
        _highlightedIndex++;
      }
      onSelect(_options[_highlightedIndex].value, _options[_highlightedIndex].label)
      e.stopPropagation();
      e.preventDefault();
    };

    return {
      handle,
    };
  }

  const menuVisibleHandler = MenuVisibleKeyDownHandler();
  const menuHiddenHandler = MenuHiddenKeyDownHandler();

  const onInputKeyDown = (e: KeyboardEvent) => {
    if (_isMenuVisible) {
      menuVisibleHandler.handle(e);
    } else {
      menuHiddenHandler.handle(e);
    }
  };

  // add required bindings to component
  function onFocus() {
    if (!_native) {
      _el.addEventListener("keydown", onInputKeyDown);
    }
  }

  // remove all bindings from component
  function onBlur() {
    if (!_native) {
      _el.removeEventListener("keydown", onInputKeyDown);
    }
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
        <option selected={option.selected} value={option.value} aria-label={option.label}>
          {option.label}
        </option>
      {/each}
    </select>
  {:else}
    <!-- list and filter -->
    <slot />
    <goa-popover
      {disabled}
      {relative}
      tabindex="-1"
      open={_isMenuVisible}
      padded="false"
      width={width || _computedWidth}
      maxwidth={_inputWidth}
    >

      <!-- readonly input  -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-input
        slot="target"
        bind:this={_inputEl}
        on:click={showMenu}
        {disabled}
        {error}
        {leadingicon}
        {name}
        {placeholder}
        aria-controls="menu"
        aria-expanded={_isMenuVisible}
        arialabel={arialabel || name}
        data-testid={`${name}-dropdown-input`}
        role="combobox"
        trailingicon="chevron-down"
        type="text"
        value={_selectedLabel}
        width={width || "100%"}
        readonly
      />

      <ul
        id="menu"
        role="listbox"
        aria-activedescendant={_selectedLabel}
        data-testid="dropdown-menu"
        bind:this={_menuEl}
        style={`
          outline: none;
          overflow-y: auto;
          max-height: ${maxheight};
        `}
      >
        {#each _options as option, index (index)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            id={option.label}
            role="option"
            tabindex="0"
            style="display: block"
            aria-label={option.label || option.value}
            aria-selected={_values.includes(option.value) ? "true" : "false"}
            class="dropdown-item"
            class:dropdown-item--disabled={false}
            class:dropdown-item--tabbed={index === _highlightedIndex}
            class:dropdown-item--selected={_values.includes(option.value)}
            data-testid={`dropdown-item-${option.value}`}
            data-index={index}
            data-value={option.value}
            on:click={() => onSelect(option.value, option.label, true)}
          >
            {option.label || option.value}
          </li>
        {/each}
      </ul>
    </goa-popover>
  {/if}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .dropdown {
    cursor: pointer;
    display: inline-block;
    width: var(--width, 100%);
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
    position: relative;
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);
    background-color: var(--goa-color-greyscale-white);
    transition: box-shadow 0.1s ease-in;
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
  .dropdown-native:hover {
    border-color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-hover);
  }

  select {
    border: none;
    font: var(--goa-font-family-sans);
    background-color: transparent;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    appearance: none;
    padding: calc(var(--goa-space-xs) + 1px);
    padding-left: var(--goa-space-s);
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
