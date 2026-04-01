<svelte:options
  customElement={{
    tag: "goa-multi-select",
    props: {},
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import {
    dispatch,
    fromBoolean,
    receive,
    relay,
    toBoolean,
  } from "../../common/utils";
  import {
    FieldsetErrorRelayDetail,
    FieldsetResetErrorsMsg,
    FieldsetSetErrorMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetResetFieldsMsg,
  } from "../../types/relay-types";
  import type {
    MultiSelectItemDestroyRelayDetail,
    MultiSelectItemMountedRelayDetail,
    MultiSelectOption,
  } from "./MultiSelectOption.svelte";
  import {
    MultiSelectItemDestroyMsg,
    MultiSelectItemMountedMsg,
  } from "./MultiSelectOption.svelte";

  // Props

  /** @required Sets the identifier for the multi-select. Should be unique. */
  export let name: string;
  /** Sets the JSON-encoded array of selected values. */
  export let value: string | undefined = "";
  /** Sets the text displayed before a selection is made. */
  export let placeholder: string = "";
  /** Sets whether the control is disabled. Defaults to `false`. */
  export let disabled: string = "false";
  /** Sets whether to show an error state. Defaults to `false`. */
  export let error: string = "false";
  /** Sets whether to allow the user to type to filter options. Defaults to `false`. */
  export let filterable: string = "false";
  /** Sets the width, overriding auto-sizing. Use a CSS unit (px, %, ch, rem, em). */
  export let width: string = "";
  /** Sets the maximum width. Use a CSS unit (px, %, ch, rem, em). */
  export let maxwidth: string = "";
  /** Sets the maximum height of the options menu. Defaults to `276px`. */
  export let maxheight: string = "276px";
  /** Sets how the selected value will be translated for the screen reader. */
  export let arialabel: string = "";
  /** Sets the aria-labelledby attribute identifying the element that labels the multi-select. */
  export let arialabelledby: string = "";
  /** Sets the size of the component. Compact reduces height for dense layouts. Defaults to `default`. */
  export let size: "default" | "compact" = "default";
  /** @internal */
  export let version: "1" | "2" = "1";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  //
  // Private
  //

  let _options: MultiSelectOption[] = [];
  let _isMenuVisible = false;
  let _highlightedIndex = -1;
  let _filteredOptions: MultiSelectOption[] = [];
  let _filterText = "";
  let _values: string[] = [];
  let _width: string;
  let _popoverMaxWidth: string;
  let _bindTimeoutId: ReturnType<typeof setTimeout> | undefined;

  let _rootEl: HTMLElement;
  let _menuEl: HTMLElement;
  let _inputEl: HTMLInputElement;
  let _popoverEl: HTMLElement;

  let _error = toBoolean(error);
  let _prevError = _error;

  //
  // Reactive
  //

  $: _disabled = toBoolean(disabled);
  $: _filterable = toBoolean(filterable);

  $: _selectedValues = _values.filter((v) => v !== "");

  $: _allSelected =
    _options.length > 0 &&
    _options.every((o) => _selectedValues.includes(o.value));

  $: _isFiltering = _filterable && _filterText !== "";

  $: _inputCursor = _disabled ? "default" : _filterable ? "auto" : "pointer";

  $: _activeDescendantId = _filteredOptions[_highlightedIndex]?.value;

  $: _inputValue = getInputValue();

  $: {
    _values = parseValues(value || "");
  }

  // Sync displayed input value whenever selection changes
  $: if (_inputEl) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    _selectedValues;
    setDisplayedValue();
  }

  $: calculateWidths(width, _options);

  $: {
    _error = toBoolean(error);
    if (_error !== _prevError) {
      dispatch(
        _rootEl,
        "error::change",
        { isError: _error },
        { bubbles: true },
      );
      _prevError = _error;
    }
  }

  //
  // Hooks
  //

  onMount(() => {
    addRelayListener();
    sendMountedMessage();
    setupPopoverListeners();
  });

  //
  // Functions
  //

  function calculateWidths(width: string, options: MultiSelectOption[]) {
    if (width) {
      const unitPattern = /(px|%|ch|rem|em)$/;
      if (unitPattern.test(width)) {
        _width = width;
      } else {
        console.error(
          "MultiSelect width must include a valid CSS unit (px, %, ch, rem, em). Falling back to pixels.",
        );
        _width = `${width}px`;
      }
    } else if (maxwidth) {
      _width = maxwidth;
    } else {
      _width = getLongestChildWidth(options);
    }

    if (width?.includes("%") || maxwidth?.includes("%")) {
      _popoverMaxWidth = "100%";
    } else {
      _popoverMaxWidth = _width;
    }
  }

  function parseValues(selectedValue: string): string[] {
    let rawValue: string[];
    try {
      rawValue = JSON.parse(selectedValue || `[""]`);
    } catch (_e) {
      rawValue = [selectedValue];
    }
    const rawValues = typeof rawValue === "object" ? rawValue : [rawValue];
    return rawValues.map((val: unknown) => `${val}`);
  }

  function getLongestChildWidth(options: MultiSelectOption[]): string {
    const optionsWidth = Math.max(
      ...options.map((o) => (o.label || o.value || "").length),
      placeholder.length,
    );
    return `${(optionsWidth || 0) + 7}ch`;
  }

  function syncFilteredOptions() {
    _filterText = _filterable ? _inputEl?.value || "" : "";
    _filteredOptions = _filterable
      ? _options.filter((o) => isFilterMatch(o, _inputEl?.value || ""))
      : [..._options];
  }

  function isFilterMatch(
    option: MultiSelectOption,
    filter: string,
  ): boolean {
    if (filter.length === 0) return true;
    let val = option.filter || option.label || option.value;
    val = val.toLowerCase();
    filter = filter.toLowerCase().trim();
    return val.startsWith(filter) || val.includes(" " + filter);
  }

  function setDisplayedValue() {
    _inputEl.value = getInputValue();
  }

  function getInputValue() {
    if (_filterable) {
      // Keep input clear so the user can type to filter; chips show selections.
      return "";
    } else {
      const selected = _values.filter((v) => v !== "");
      if (selected.length === 0) {
        return "";
      } else if (selected.length === 1) {
        const opt = _options.find((o) => o.value === selected[0]);
        return opt?.label || opt?.value || selected[0] || "";
      } else {
        return `${selected.length} selected`;
      }
    }
  }

  function showMenu() {
    if (_disabled) return;
    setTimeout(() => {
      syncFilteredOptions();
      _isMenuVisible = true;
      _inputEl?.focus();
    }, 0);
  }

  function hideMenu() {
    _isMenuVisible = false;
    if (_filterable) {
      setDisplayedValue();
    }
  }

  function changeHighlightedOption(offset: number) {
    let index = _highlightedIndex + offset;
    const items = _filteredOptions.length ? _filteredOptions : _options;
    if (!items.length) return;
    if (index < 0) {
      index = _filterable ? items.length - 1 : 0;
    } else if (index >= items.length) {
      index = _filterable ? 0 : items.length - 1;
    }
    _highlightedIndex = index;
    scrollToHighlighted();
  }

  function scrollToHighlighted() {
    const liNode = _menuEl?.querySelector(
      `li[data-index="${_highlightedIndex}"]`,
    ) as HTMLLIElement;
    if (!liNode) return;
    const liRect = liNode.getBoundingClientRect();
    const ulRect = _menuEl.getBoundingClientRect();
    const isInView =
      liRect.top >= 0 &&
      liRect.left >= 0 &&
      liRect.bottom <= ulRect.height &&
      liRect.right <= ulRect.width;
    if (!isInView) liNode.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function setupPopoverListeners() {
    _popoverEl?.addEventListener("_open", () => {
      _isMenuVisible = true;
    });
    _popoverEl?.addEventListener("_close", () => {
      _isMenuVisible = false;
    });
  }

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setFieldError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: "" });
          break;
        case MultiSelectItemMountedMsg:
          onChildMounted(data as MultiSelectItemMountedRelayDetail);
          break;
        case MultiSelectItemDestroyMsg:
          onChildDestroyed(data as MultiSelectItemDestroyRelayDetail);
          break;
      }
    });
  }

  function setFieldError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatch(_rootEl, "_change", { name, values: _selectedValues }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onChildMounted(detail: MultiSelectItemMountedRelayDetail) {
    _options = [..._options, detail];
    relay(detail.el, "multi-select:bind", { el: _rootEl });

    if (_bindTimeoutId) clearTimeout(_bindTimeoutId);
    _bindTimeoutId = setTimeout(() => {
      syncFilteredOptions();
      if (_inputEl && _selectedValues.length > 0) {
        setDisplayedValue();
      }
    }, 1);
  }

  function onChildDestroyed(detail: MultiSelectItemDestroyRelayDetail) {
    _options = _options.filter((o) => o.value !== detail.value);
    syncFilteredOptions();
  }

  //
  // Event handlers
  //

  function onSelect(option: MultiSelectOption) {
    if (_disabled) return;
    const isAlreadySelected = _selectedValues.includes(option.value);
    const newValues = isAlreadySelected
      ? _selectedValues.filter((v) => v !== option.value)
      : [..._selectedValues, option.value];

    value = newValues.length > 0 ? JSON.stringify(newValues) : "";
    dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });

    if (_filterable) {
      _inputEl.value = "";
    }
    syncFilteredOptions();
    setDisplayedValue();
  }

  function onSelectAll() {
    if (_disabled) return;
    const newValues = _allSelected ? [] : _options.map((o) => o.value);
    value = newValues.length > 0 ? JSON.stringify(newValues) : "";
    dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });
    syncFilteredOptions();
    setDisplayedValue();
  }

  function onChipRemove(chipValue: string) {
    if (_disabled) return;
    const newValues = _selectedValues.filter((v) => v !== chipValue);
    value = newValues.length > 0 ? JSON.stringify(newValues) : "";
    dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });
    syncFilteredOptions();
    setDisplayedValue();
  }

  function onClearClick(e: Event) {
    if (_disabled) return;
    value = "";
    dispatch(_rootEl, "_change", { name, values: [] }, { bubbles: true });
    setDisplayedValue();
    if (!_filterable) {
      showMenu();
    }
    e.stopPropagation();
  }

  function onClearKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      onClearClick(e);
    }
  }

  function onInputKeyDown(e: KeyboardEvent) {
    if (_disabled) return;
    switch (e.key) {
      case " ":
      case "Enter":
        if (_isMenuVisible) {
          const option = _filteredOptions[_highlightedIndex];
          if (option) onSelect(option);
          // Keep menu open
        } else {
          showMenu();
        }
        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowUp":
        if (!_isMenuVisible) showMenu();
        changeHighlightedOption(-1);
        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowDown":
        if (!_isMenuVisible) showMenu();
        changeHighlightedOption(1);
        e.preventDefault();
        e.stopPropagation();
        break;
      case "Tab":
        hideMenu();
        break;
    }
  }

  function onInputKeyUp(e: KeyboardEvent) {
    if (_disabled || !_filterable) return;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "Enter":
      case " ":
        // handled in keydown
        break;
      default:
        if (_inputEl.value === "") {
          _highlightedIndex = -1;
        }
        showMenu();
        break;
    }
  }

  function onFocus() {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }
</script>

<!-- Template -->
<div
  bind:this={_rootEl}
  data-testid={testid || `${name}-multi-select`}
  class="multi-select"
  class:compact={size === "compact"}
  class:v2={version === "2"}
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --width: ${_width};
  `}
>
  <slot />

  <goa-popover
    {disabled}
    bind:this={_popoverEl}
    data-testid="option-list"
    width={_popoverMaxWidth || _width || undefined}
    open={_isMenuVisible ? "true" : "false"}
    padded="false"
    tabindex="-1"
    filterablecontext={fromBoolean(_filterable)}
  >
    <div
      slot="target"
      class="multi-select-input-group"
      class:multi-select-input-group--disabled={_disabled}
      class:error={_error}
    >
      <input
        style={`cursor: ${_inputCursor};`}
        data-testid="input"
        bind:this={_inputEl}
        value={_inputValue}
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls={`menu-${name}`}
        aria-expanded={_isMenuVisible}
        aria-label={arialabel || name}
        aria-labelledby={arialabelledby}
        id={name}
        aria-activedescendant={_activeDescendantId}
        aria-disabled={_disabled}
        aria-owns={_isMenuVisible ? `menu-${name}` : undefined}
        aria-haspopup="listbox"
        disabled={_disabled}
        readonly={!_filterable}
        placeholder={placeholder}
        {name}
        on:keydown={onInputKeyDown}
        on:keyup={onInputKeyUp}
        on:focus={onFocus}
      />

      {#if _selectedValues.length > 0}
        <goa-icon-button
          data-testid="clear-icon"
          tabindex={_disabled ? -1 : 0}
          arialabel={`clear ${arialabel || name}`}
          on:click={onClearClick}
          on:keydown={onClearKeyDown}
          class="multi-select-icon--clear"
          class:disabled={_disabled}
          disabled={_disabled ? "true" : "false"}
          size={size === "compact" ? "xsmall" : "medium"}
          theme="filled"
          variant="dark"
          icon="close"
        />
      {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <goa-icon
          testid="chevron"
          class="multi-select-icon--arrow"
          size={size === "compact" ? "small" : "medium"}
          type={_isMenuVisible ? "chevron-up" : "chevron-down"}
        />
      {/if}
    </div>

    <!--Menu-->
    <ul
      id={`menu-${name}`}
      role="listbox"
      tabindex="-1"
      data-testid="dropdown-menu"
      bind:this={_menuEl}
      aria-label={arialabel || name}
      aria-labelledby={arialabelledby}
      aria-multiselectable="true"
      on:focus={onFocus}
      on:mousedown={(e) => e.preventDefault()}
      style={`
        outline: none;
        overflow-y: auto;
        max-height: ${maxheight};
      `}
    >
      {#if !_isFiltering}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          aria-selected={_allSelected}
          class="multi-select-item multi-select-item--selectable"
          class:selected={_allSelected}
          data-testid="multi-select-item-select-all"
          role="option"
          style="display: flex"
          on:click={() => {
            onSelectAll();
            _inputEl?.focus();
          }}
        >
          <span class="multi-select-item-checkbox" aria-hidden="true"></span>
          Select All
        </li>
      {/if}
      {#each _filteredOptions as option, index (index)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          id={option.value}
          aria-selected={_selectedValues.includes(option.value)}
          class:selected={_selectedValues.includes(option.value)}
          class="multi-select-item multi-select-item--option"
          class:multi-select-item--highlighted={index === _highlightedIndex}
          data-index={index}
          data-testid={`multi-select-item-${option.value}`}
          data-value={option.value}
          role="option"
          style="display: flex"
          on:click={() => {
            onSelect(option);
            _inputEl?.focus();
          }}
        >
          <span class="multi-select-item-checkbox" aria-hidden="true"></span>
          {option.label || option.value}
        </li>
      {:else}
        <li class="multi-select-item" data-testid="multi-select-item-not-found">
          No matches found
        </li>
      {/each}
    </ul>
  </goa-popover>

  {#if _selectedValues.length > 0}
    <div class="multi-select-chips" data-testid="selected-chips">
      {#each _selectedValues as chipVal}
        {@const opt = _options.find((o) => o.value === chipVal)}
        <goa-filter-chip
          content={opt?.label || chipVal}
          version={version}
          on:_click={() => onChipRemove(chipVal)}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .multi-select {
    cursor: pointer;
    width: var(--width, 100%);
    max-width: 100%;
  }

  .multi-select-input-group {
    box-sizing: border-box;
    outline: none;
    transition: var(--goa-dropdown-transition);
    box-shadow: var(--goa-dropdown-border);
    border-radius: var(--goa-dropdown-border-radius);
    display: inline-flex;
    align-items: stretch;
    vertical-align: middle;
    background-color: var(--goa-dropdown-color-bg);
    cursor: pointer;
    width: 100%;
  }

  .multi-select-input-group:hover {
    box-shadow: var(--goa-dropdown-border-hover);
    border: none;
  }

  .multi-select-input-group:has(input:focus-visible),
  .multi-select-input-group.error:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border), var(--goa-dropdown-border-focus);
  }

  /* V2: Focus state has a single border */
  .v2 .multi-select-input-group:has(input:focus-visible),
  .v2 .multi-select-input-group.error:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border-focus);
  }

  .multi-select-input-group.error,
  .multi-select-input-group.error:hover {
    box-shadow: var(--goa-dropdown-border-error);
  }

  @container not (--mobile) {
    .multi-select-input-group {
      width: var(--width, 100%);
    }
  }

  .multi-select-icon--arrow,
  .multi-select-icon--clear {
    padding-right: var(--goa-dropdown-space-icon-text);
  }

  .multi-select-icon--clear:focus:not(.disabled),
  .multi-select-icon--clear:active:not(.disabled) {
    outline: none;
  }

  .multi-select-input-group--disabled,
  .multi-select-input-group--disabled:hover,
  .multi-select-input-group--disabled:active,
  .multi-select-input-group--disabled:focus {
    background-color: var(--goa-dropdown-color-bg-disabled);
    box-shadow: var(--goa-dropdown-border-disabled);
    cursor: default;
  }

  .multi-select-input-group--disabled goa-icon {
    outline: none;
    color: var(--goa-dropdown-color-text-disabled);
  }

  input {
    display: inline-block;
    font: var(--goa-dropdown-typography);
    color: var(--goa-dropdown-color-text);
    padding: var(--goa-dropdown-padding);
    background-color: transparent;
    width: 100%;
    flex: 1 1 auto;
    z-index: 1;
    text-overflow: ellipsis;
  }

  input,
  input:focus,
  input:hover,
  input:active {
    outline: none;
    border: none;
  }

  input[aria-disabled="true"] {
    color: var(--goa-dropdown-color-text-disabled);
  }

  ::placeholder {
    color: var(--goa-dropdown-color-text-placeholder);
    opacity: 1;
  }

  input:disabled::placeholder {
    color: var(--goa-dropdown-color-text-disabled);
  }

  /* Compact Size */
  .compact input {
    padding: var(--goa-dropdown-compact-padding);
    height: var(--goa-dropdown-compact-height);
    font: var(--goa-dropdown-compact-typography);
  }

  .compact .multi-select-item {
    font: var(--goa-dropdown-compact-item-typography);
  }

  /** menu **/
  ul[role="listbox"] {
    border-radius: var(
      --goa-dropdown-menu-border-radius,
      var(--goa-dropdown-border-radius)
    );
    padding: 0;
    margin: var(--goa-dropdown-menu-margin, 0);
  }

  /* multi-select items */
  .multi-select-item {
    margin: 0;
    padding: var(--goa-dropdown-item-padding);
    cursor: pointer;
    color: var(--goa-dropdown-item-color-text);
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border-radius: var(--goa-dropdown-item-border-radius, 0);
    align-items: center;
    gap: var(--goa-space-xs);
  }

  .multi-select-item:hover,
  .multi-select-item--highlighted {
    background: var(--goa-dropdown-item-color-bg-hover);
    color: var(--goa-dropdown-item-color-text-hover);
  }

  /* Selection is shown by the checkbox, not a row background */
  .multi-select-item[aria-selected="true"] {
    background: transparent;
    color: var(--goa-dropdown-item-color-text);
  }

  .multi-select-item[aria-selected="true"]:hover,
  .multi-select-item[aria-selected="true"].multi-select-item--highlighted {
    background: var(--goa-dropdown-item-color-bg-hover);
    color: var(--goa-dropdown-item-color-text-hover);
  }

  /* Checkbox indicator */
  .multi-select-item-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--goa-checkbox-size);
    height: var(--goa-checkbox-size);
    border: var(--goa-checkbox-border);
    border-radius: var(--goa-checkbox-border-radius);
    background-color: var(--goa-checkbox-color-bg);
    transition: background-color 0.1s ease, border-color 0.1s ease;
  }

  .multi-select-item[aria-selected="true"] .multi-select-item-checkbox {
    background-color: var(--goa-checkbox-color-bg-checked);
    border-color: var(--goa-checkbox-color-bg-checked);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M2 6l3 3 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.875rem;
  }

  /* Chips area */
  .multi-select-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-2xs);
    margin-top: var(--goa-space-2xs);
  }
</style>
