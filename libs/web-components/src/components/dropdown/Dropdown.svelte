<svelte:options customElement="goa-dropdown" />

<script lang="ts">
  import { onMount } from "svelte";

  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { fromBoolean, toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";

  interface Option {
    label: string;
    value: string;
    filter: string;
  }

  interface EventHandler {
    handleKeyUp: (e: KeyboardEvent) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
  }

  // Props

  export let name: string;
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let value: string = "";
  export let filterable: string = "false";
  export let leadingicon: GoAIconType | null = null;
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

  //
  // Private
  //

  let _options: Option[] = [];
  let _isMenuVisible = false;
  let _highlightedIndex: number = -1;
  let _width: string;

  let _rootEl: HTMLElement;
  let _menuEl: HTMLElement;
  let _selectEl: HTMLSelectElement;
  let _inputEl: HTMLInputElement;
  let _eventHandler: EventHandler;

  let _isDirty: boolean = false;
  let _filteredOptions: Option[] = [];
  let _values: string[] = [];

  //
  // Reactive
  //

  $: _disabled = toBoolean(disabled);
  $: _error = toBoolean(error);
  $: _multiselect = toBoolean(multiselect);
  $: _native = toBoolean(native);
  $: _filterable = toBoolean(filterable) && !_native;

  // To keep track of active descendant for the accessibility
  $: _activeDescendantId = _filteredOptions[_highlightedIndex]
    ? _filteredOptions[_highlightedIndex].value
    : undefined;

  $: {
    _values = parseValues(value);
    // updating _inputEl.value is done within seperate function
    // to prevent unwanted reactive updates.
    setDisplayedValue();
  }

  //
  // Hooks
  //

  onMount(async () => {
    _eventHandler = _filterable
      ? new ComboboxKeyUpHandler(_inputEl)
      : new DropdownKeyUpHandler(_inputEl);

    // the following is required to appease the unit testing gods in that they don't respond
    // to the slotchange event
    _options = getOptions();

    if (!_native) {
      _inputEl.value = _options.find((o) => o.value === value)?.label ?? "";

      if (width) {
        if (width.endsWith("%")) {
          const percent = parseInt(width) / 100;
          const rootRect = _rootEl.getBoundingClientRect();
          _width = percent * rootRect.width + "px";
        } else {
          _width = width;
        }
      }

      // This is only here to allow the tests to pass :(
      if (!width && _options.length > 0) {
        _width = getLongestChildWidth(_options);
      }
    }

    syncFilteredOptions();

    // watch for DOM changes within the slot => dynamic binding
    const slot = _rootEl.querySelector("slot");
    slot?.addEventListener("slotchange", () => {
      _options = getOptions();

      syncFilteredOptions();

      if (!width) {
        _width = getLongestChildWidth(_options);
      }

      if (!_native) {
        setDisplayedValue();
      }
    });
  });

  //
  // Functions
  //

  // prevents unwanted reactive updates.
  function setDisplayedValue() {
    if (_inputEl) {
      const option = _options.find((o) => o.value == _values[0]); // possible string number comparison
      _inputEl.value = option?.label ?? option?.value ?? "";
    }
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

  function getChildren(): Element[] {
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      // default
      return slot.assignedElements();
    }
    // unit tests
    const el = _native ? _selectEl : _rootEl;
    // @ts-expect-error
    return [...el.children] as Element[];
  }

  // Create a list of the options based on the children within the slot
  // The children don't have to be goa-dropdown-item elements. Any child element
  // work as long as it has a value and label content
  function getOptions(): Option[] {
    return getChildren()
      .filter((child: Element) => child.tagName === "GOA-DROPDOWN-ITEM")
      .map((el: Element) => {
        const option = el as unknown as Option;
        const value = el.getAttribute("value") || option.value || "";
        const label =
          el.getAttribute("label") || option.label || el.innerHTML || value;
        const filter = el.getAttribute("filter") || label || value || "";

        return { value, label, filter } as Option;
      });
  }

  // compute the required width to ensure all children fit
  function getLongestChildWidth(options: Option[]): string {
    // set width to longest item
    const optionsWidth = options
      .map((option: Option) => {
        const label = `${option.label}` || `${option.value}` || "";
        return label.length;
      })
      .sort((a: number, b: number) => (a > b ? 1 : -1))
      .pop();

    // longest one defines the width
    let maxWidth = Math.max(optionsWidth || 0, placeholder.length) + 8;

    // compensate for icon width
    if (leadingicon) {
      maxWidth += 2;
    }

    return `${maxWidth}ch`;
  }

  // Change the direction of highlighted options for Arrow up and down
  function changeHighlightedOption(offset: number) {
    let index = _highlightedIndex + offset;
    let items = !_filteredOptions?.length ? _options : _filteredOptions;
    if (items.length === 0) return;

    // if index is out of scope
    if (index < 0) {
      index = _filterable ? items.length - 1 : 0;
    } else if (index >= items.length) {
      index = _filterable ? 0 : items.length - 1;
    }
    _highlightedIndex = index;
    scrollToOption(index);
  }

  function scrollToOption(index: number) {
    const liNode = _menuEl.querySelector(
      `li[data-index="${index}"]`,
    ) as HTMLLIElement;
    if (!liNode) return;

    const liOptionRect = liNode.getBoundingClientRect();
    const ulRect = _menuEl.getBoundingClientRect();
    const isInView =
      liOptionRect.top >= 0 &&
      liOptionRect.left >= 0 &&
      liOptionRect.bottom <= ulRect.height &&
      liOptionRect.right <= ulRect.width;

    if (isInView) return;

    liNode.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function syncFilteredOptions() {
    _filteredOptions = _filterable
      ? _options.filter((option) => isFilterMatch(option, _inputEl.value))
      : _options;
  }

  function showMenu() {
    if (_disabled) {
      return;
    }

    setTimeout(() => {
      syncFilteredOptions();
      _isMenuVisible = true;
      _inputEl?.focus();
    }, 0);
  }

  function hideMenu() {
    _isMenuVisible = false;
  }

  function isFilterMatch(option: Option, filter: string) {
    if (filter.length === 0) return true;

    let value = option.filter || option.label || option.value;
    value = value.toLowerCase();
    filter = filter.toLowerCase();

    return value.startsWith(filter) || value.includes(" " + filter);
  }

  function dispatchValue(value?: string) {
    const detail = _multiselect
      ? { name, values: [value, ..._values] }
      : { name, value: value };

    setTimeout(() => {
      _rootEl.dispatchEvent(
        new CustomEvent("_change", { composed: true, detail }),
      );
      _isDirty = false;
    }, 1);
  }

  //
  // Event handlers
  //

  function onSelect(option: Option) {
    if (_disabled) return;
    if (!_native) {
      _isDirty = true;
      hideMenu();
      _inputEl.value = option.label;
    }
    dispatchValue(option.value);
  }

  function onInputKeyUp(e: KeyboardEvent) {
    if (_disabled) return;
    _eventHandler.handleKeyUp(e);
  }

  function onInputKeyDown(e: KeyboardEvent) {
    if (_disabled) return;
    _eventHandler.handleKeyDown(e);
  }

  function onClearIconKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      reset();
      showMenu();
    }
  }

  function onClearIconClick(e: Event) {
    reset();
    showMenu();
    e.stopPropagation();
  }

  function onNativeSelect(e: Event) {
    const target = e.currentTarget as HTMLSelectElement;
    const option = _options[target.selectedIndex];
    onSelect(option);
  }

  function reset() {
    if (_disabled) return;

    _activeDescendantId = undefined;
    _highlightedIndex = -1;
    _inputEl.value = "";
    _isDirty = false;
    syncFilteredOptions();

    dispatchValue("");
  }

  function onChevronClick(e: Event) {
    showMenu();
    e.stopPropagation();
  }

  class ComboboxKeyUpHandler implements EventHandler {
    constructor(private input: HTMLInputElement) {
      input.addEventListener("blur", async (e) => {
        if (!_isDirty) return;
        if (!_filterable) return;

        const input = e.target as HTMLInputElement;
        const selectedOption = _filteredOptions.find(
          (o) => o.label === input.value,
        );

        if (!selectedOption) {
          dispatchValue("");
          input.value = "";
        }
      });
    }

    onEscape(e: KeyboardEvent) {
      reset();
      _inputEl.focus();
      e.preventDefault();
      e.stopPropagation();
    }

    onEnter(e: KeyboardEvent) {
      const option = _filteredOptions[_highlightedIndex];
      if (option) {
        onSelect(option);
      }

      if (_inputEl.value) {
        hideMenu();
      } else {
        showMenu();
      }

      e.stopPropagation();
    }

    onArrow(e: KeyboardEvent, direction: "up" | "down") {
      if (!_isMenuVisible) showMenu();
      changeHighlightedOption(direction === "up" ? -1 : 1);
      e.stopPropagation();
    }

    onTab(_: KeyboardEvent) {
      const matchedOption = _filteredOptions.find(
        (option) =>
          option.label.toLowerCase() === this.input.value.toLowerCase(),
      );
      if (matchedOption) {
        onSelect(matchedOption);
      }
      hideMenu();
    }

    onKeyUp(_: KeyboardEvent) {
      showMenu();
      _isDirty = true;
    }

    handleKeyUp(e: KeyboardEvent) {
      switch (e.key) {
        case "Enter":
          this.onEnter(e);
          break;
        case "ArrowUp":
          this.onArrow(e, "up");
          break;
        case "ArrowDown":
          this.onArrow(e, "down");
          break;
        case "Home":
          this.input.setSelectionRange(0, 0);
          break;
        case "End":
          this.input.setSelectionRange(
            this.input.value.length,
            this.input.value.length,
          );
          break;
        default:
          this.onKeyUp(e);
          break;
      }
    }

    handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          this.onEscape(e);
          break;
        case "Tab":
          this.onTab(e);
          break;
      }
    }
  }

  class DropdownKeyUpHandler implements EventHandler {
    constructor(_input: HTMLInputElement) {}

    onEnter(e: KeyboardEvent) {
      if (_isMenuVisible) {
        const option = _filteredOptions[_highlightedIndex];
        if (option) {
          onSelect(option);
        }
        hideMenu();
      } else {
        showMenu();
      }

      e.preventDefault();
      e.stopPropagation();
    }

    onArrow(e: KeyboardEvent, direction: "up" | "down") {
      if (!_isMenuVisible) showMenu();
      changeHighlightedOption(direction === "up" ? -1 : 1);
      e.preventDefault();
      e.stopPropagation();
    }

    handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case " ":
        case "Enter":
          this.onEnter(e);
          break;
        case "ArrowUp":
          this.onArrow(e, "up");
          break;
        case "ArrowDown":
          this.onArrow(e, "down");
          break;
        case "Tab":
          hideMenu();
          break;
      }

      return false;
    }

    handleKeyUp(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case " ":
        case "Enter":
          e.preventDefault();
          e.stopPropagation();
      }
    }
  }
</script>

<!-- Template -->
<div
  data-testid={`${name}-dropdown`}
  class="dropdown"
  class:dropdown-native={_native}
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --width: ${_width};
  `}
  bind:this={_rootEl}
>
  {#if _native}
    <select
      {name}
      aria-label={arialabel || name}
      aria-labelledby={arialabelledby}
      class:error={_error}
      disabled={_disabled}
      id={name}
      bind:this={_selectEl}
      on:change={onNativeSelect}
    >
      <slot />
      {#each _options as option}
        <option selected={value === option.value} value={option.value}>
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
      data-testid="option-list"
      maxwidth="99999px"
      open={_isMenuVisible}
      padded="false"
      tabindex="-1"
      width={_width}
      on:_open={showMenu}
      on:_close={hideMenu}
    >
      <div
        slot="target"
        class="dropdown-input-group"
        class:dropdown-input-group--disabled={_disabled}
        class:error={_error}
      >
        {#if leadingicon}
          <goa-icon
            class="dropdown-input--leading-icon"
            data-testid="leading-icon"
            type={leadingicon}
          />
        {/if}

        <input
          style={`
            cursor: ${!_disabled ? (_filterable ? "auto" : "pointer") : "default"};
          `}
          data-testid="input"
          bind:this={_inputEl}
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
          {placeholder}
          {name}
          on:keydown={onInputKeyDown}
          on:keyup={onInputKeyUp}
        />

        {#if _inputEl?.value && _filterable}
          <goa-icon
            id={name}
            tabindex={_disabled ? -1 : 0}
            role="button"
            arialabel={`clear ${arialabel || name}`}
            ariacontrols={`menu-${name}`}
            ariaexpanded={fromBoolean(_isMenuVisible)}
            on:click|stopPropagation={onClearIconClick}
            on:keydown={onClearIconKeyDown}
            class="dropdown-icon--clear"
            class:disabled={_disabled}
            size="medium"
            type="close"
          />
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <goa-icon
            role="button"
            tabindex="-1"
            id={name}
            arialabel={arialabel || name}
            ariacontrols={`menu-${name}`}
            ariaexpanded={fromBoolean(_isMenuVisible)}
            class="dropdown-icon--arrow"
            size="medium"
            type={_isMenuVisible ? "chevron-up" : "chevron-down"}
            on:click={onChevronClick}
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
        style={`
          outline: none;
          overflow-y: auto;
          max-height: ${maxheight};
        `}
      >
        {#each _filteredOptions as option, index (index)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            id={option.value}
            aria-selected={_inputEl.value === (option.label || option.value)}
            class="dropdown-item"
            class:dropdown-item--highlighted={index === _highlightedIndex}
            class:selected={_inputEl.value === (option.label || option.value)}
            data-index={index}
            data-testid={`dropdown-item-${option.value}`}
            data-value={option.value}
            role="option"
            style="display: block"
            on:click={() => onSelect(option)}
          >
            {option.label || option.value}
          </li>
        {:else}
          {#if _filterable}
            <li class="dropdown-item" data-testid="dropdown-item-not-found">
              No matches found
            </li>
          {/if}
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
    width: var(--width, 100%);
  }

  .dropdown-input-group {
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);
    display: inline-flex;
    align-items: stretch;

    /* The vertical align fixes inputs with a leading icon to not be vertically offset */
    vertical-align: middle;
    background-color: var(--goa-color-greyscale-white);
    cursor: pointer;
    width: var(--width, 100%);
  }

  .dropdown-input-group:hover {
    border-color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }

  .dropdown-input-group:focus,
  .dropdown-input-group:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  @media not (--mobile) {
    .dropdown-input-group {
      width: var(--width);
    }
  }

  .dropdown-input-group.error,
  .dropdown-input-group.error:hover {
    border: 2px solid var(--goa-color-interactive-error);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-error);
  }

  .dropdown-input-group.error:focus-within,
  .dropdown-input-group.error:focus {
    border: 2px solid var(--goa-color-interactive-error);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  .dropdown-icon--arrow,
  .dropdown-icon--clear {
    margin-right: var(--goa-space-s);
  }

  .dropdown-icon--clear:focus:not(.disabled),
  .dropdown-icon--clear:active:not(.disabled) {
    color: var(--goa-color-interactive-focus);
    outline: none;
  }

  .dropdown-input--leading-icon {
    margin-left: 0.75rem;
  }

  .dropdown-input--leading-icon + input {
    padding-left: 0.5rem;
  }

  input {
    display: inline-block;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    padding: var(--goa-space-xs);
    padding-left: var(--goa-space-s);
    line-height: calc(40px - calc(var(--goa-space-xs) * 2));
    background-color: transparent;
    width: 100%;
    flex: 1 1 auto;
    font-family: var(--goa-font-family-sans);
    z-index: 1;
  }

  input,
  input:focus,
  input:hover,
  input:active {
    outline: none;
    border: none;
  }

  input[aria-disabled="true"] {
    color: var(--goa-color-text-secondary);
  }

  .dropdown-input-group--disabled,
  .dropdown-input-group--disabled:hover,
  .dropdown-input-group--disabled:active,
  .dropdown-input-group--disabled:focus {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200) !important;
    cursor: default;
    box-shadow: none !important;
  }

  /** menu **/
  ul[role="listbox"] {
    border-radius: var(--goa-border-radius-m);
    padding: 0;
    margin: 0;
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

  .dropdown-item:hover,
  .dropdown-item--highlighted {
    background: var(--goa-color-greyscale-100);
    color: var(--goa-color-interactive-hover);
  }

  .dropdown-item[aria-selected="true"] {
    background: var(--goa-color-interactive-default);
    color: var(--goa-color-greyscale-white);
  }

  .dropdown-item[aria-selected="true"]:hover,
  .dropdown-item[aria-selected="true"].dropdown-item--highlighted {
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
    box-shadow: 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
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
