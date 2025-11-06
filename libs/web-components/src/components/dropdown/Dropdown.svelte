<svelte:options
  customElement={{
    tag: "goa-dropdown",
    props: {
      disableGlobalClosePopover: {
        type: "Boolean",
        reflect: true,
        attribute: "disable-global-close-popover",
      },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import type {
    DropdownItemDestroyRelayDetail,
    DropdownItemMountedRelayDetail,
    Option,
  } from "./DropdownItem.svelte";
  import {
    DropdownItemDestroyMsg,
    DropdownItemMountedMsg,
  } from "./DropdownItem.svelte";
  import {
    dispatch,
    ensureSlotExists,
    fromBoolean,
    receive,
    relay,
    toBoolean,
  } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
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

  interface EventHandler {
    handleKeyUp: (e: KeyboardEvent) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
  }

  // Props

  export let name: string;
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let value: string | undefined = "";
  export let filterable: string = "false";
  export let leadingicon: GoAIconType | null = null;
  export let maxheight: string = "276px";
  export let placeholder: string = "";
  export let width: string = "";
  export let maxwidth: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let multiselect: string = "false";
  export let native: string = "false";
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  export let relative: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let autocomplete: string = "";
  export let testid: string = "";

  /**
   * Exposed Privates
   **/

  export let disableGlobalClosePopover: boolean = false;

  //
  // Private

  let _options: Option[] = [];
  let _selectedOption: Option | undefined;
  let _isMenuVisible = false;
  let _highlightedIndex: number = -1;
  let _width: string;
  let _popoverMaxWidth: string;

  let _rootEl: HTMLElement;
  let _menuEl: HTMLElement;
  let _inputEl: HTMLInputElement;
  let _eventHandler: EventHandler;
  let _popoverEl: HTMLElement;

  let _isDirty: boolean = false;
  let _filteredOptions: Option[] = [];
  let _values: string[] = [];

  let _bindTimeoutId: any;

  let _mountStatus: "active" | "ready" = "ready";
  let _mountTimeoutId: any = undefined;
  let _error = toBoolean(error);
  let _prevError = _error;

  //
  // Reactive
  //

  $: _disabled = toBoolean(disabled);
  $: _multiselect = toBoolean(multiselect);
  $: _native = toBoolean(native);
  $: _filterable = toBoolean(filterable) && !_native;

  // To keep track of active descendant for the accessibility
  $: _activeDescendantId = _filteredOptions[_highlightedIndex]
    ? _filteredOptions[_highlightedIndex].value
    : undefined;

  // make updates if the values are changed
  $: {
    _values = parseValues(value || "");
    setSelected();
  }

  $: calculateWidths(width, _options, _inputEl);

  // TODO: Syed can you add a comment here describing what this does?
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
    ensureSlotExists(_rootEl);
    addRelayListener();
    sendMountedMessage();
    setupPopoverListeners();

    if (disableGlobalClosePopover) {
      _popoverEl.setAttribute("disable-global-close-popover", "yes");
    }
    _eventHandler = _filterable
      ? new ComboboxKeyUpHandler(_inputEl)
      : new DropdownKeyUpHandler(_inputEl);
    showDeprecationWarnings();
  });

  //
  // Functions
  //

  function calculateWidths(
    width: string,
    options: Option[],
    inputEl: HTMLInputElement,
  ) {
    // Calculate the base width
    if (width) {
      const unitPattern = /(px|%|ch|rem|em)$/; // Regex to detect valid units
      if (unitPattern.test(width)) {
        _width = width; // Use the provided width with a valid unit
      } else {
        console.error(
          "Dropdown width must be of an allowed unit. Falling back to `px`",
        );
        _width = `${width}px`; // Default to px if no unit is provided
      }
    } else if (maxwidth) {
      _width = maxwidth;
    } else {
      _width = getLongestChildWidth(options); // Calculate based on the longest option
    }

    // Set popover max width
    if (width?.includes("%") || maxwidth?.includes("%")) {
      _popoverMaxWidth = "100%"; // let the parent's % width constraint handle it
    } else {
      _popoverMaxWidth = `min(${_width}, 100%)`;
    }
  }

  function setupPopoverListeners() {
    _popoverEl?.addEventListener("_open", (e) => {
      _isMenuVisible = true;
    });

    _popoverEl?.addEventListener("_close", (e) => {
      _isMenuVisible = false;
    });
  }

  function showDeprecationWarnings() {
    if (relative != "") {
      console.warn(
        "Dropdown `relative` property is deprecated. It should be removed from your code because it is no longer needed to help with positioning.",
      );
    }
  }

  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: "" });
          break;
        case DropdownItemMountedMsg:
          onChildMounted(data as DropdownItemMountedRelayDetail);
          break;
        case DropdownItemDestroyMsg:
          onChildDestroyed(data as DropdownItemDestroyRelayDetail);
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatch(_rootEl, "_change", { name, value }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  /**
   * Called when a new child option is added to the slot. This component must send
   * a reference to itself back to the child to allow for the child to send messages
   * back to the parent after it is detached from the DOM.
   * @param detail
   */
  function onChildMounted(detail: DropdownItemMountedRelayDetail) {
    switch (detail.mountType) {
      case "append":
        _options = [..._options, detail];
        break;
      case "prepend":
        _options = [detail, ..._options];
        break;
      case "reset":
        _options = [..._options, detail];
        break;
    }

    // send message back to child that contains a reference to this component
    relay(detail.el, "dropdown:bind", { el: _rootEl });

    // ensure bind only runs once for all children
    if (_bindTimeoutId) {
      clearTimeout(_bindTimeoutId);
    }
    _bindTimeoutId = setTimeout(() => {
      syncFilteredOptions();
      if (!_native) {
        setSelected();
        // Update the displayed value after options are loaded and selected option is set
        if (_inputEl && _selectedOption) {
          setDisplayedValue();
        }
      }
    }, 1);
  }

  /**
   * Called when a child is destroyed.
   * @param detail
   */
  function onChildDestroyed(detail: DropdownItemDestroyRelayDetail) {
    _options = _options.filter((option) => option.value !== detail.value);
  }

  function setSelected() {
    _selectedOption = _options.find((o) => o.value == _values[0]);
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

  // compute the required width to ensure all children fit
  function getLongestChildWidth(options: Option[]): string {
    // set width to longest item
    const optionsWidth = Math.max(
      ...options.map((option: Option) => {
        const label = `${option.label}` || `${option.value}` || "";
        return label.length;
      }),
    );

    // calculate the maximum width based on the longest option or placeholder length
    let maxWidth = Math.max(optionsWidth || 0, placeholder.length) + 7;

    // compensate for icon width
    if (leadingicon) {
      maxWidth += 4;
    }

    return `${maxWidth}ch`;
  }

  function setHighlightedToSelected() {
    if (!_selectedOption) {
      _highlightedIndex = -1;
      return;
    }
    const index = _filteredOptions.findIndex(
      (option) => option.value === _selectedOption?.value,
    );
    _highlightedIndex = index;
  }

  function setHighlightedToBestMatch() {
    if (_filteredOptions.length === 0) {
      _highlightedIndex = -1;
      return;
    }
    if (!_inputEl?.value || _inputEl.value === "") return;
    const completeMatchIndex = _filteredOptions.findIndex((option) =>
      isFilterMatch(option, _inputEl?.value || "", false),
    );
    if (completeMatchIndex >= 0) {
      _highlightedIndex = completeMatchIndex;
    } else {
      const partialMatchIndex = _filteredOptions.findIndex((option) =>
        isFilterMatch(option, _inputEl?.value || ""),
      );
      if (partialMatchIndex >= 0) {
        _highlightedIndex = partialMatchIndex;
      }
    }
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
    scrollToHighlighted();
  }

  function scrollToHighlighted() {
    const index = _highlightedIndex;
    const liNode = _menuEl?.querySelector(
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
      ? _options.filter((option) =>
          isFilterMatch(option, _inputEl?.value || ""),
        )
      : _options;
  }

  function showMenu() {
    if (_disabled) {
      return;
    }

    setTimeout(async () => {
      syncFilteredOptions();
      _isMenuVisible = true;
      _inputEl?.focus();
      setTimeout(() => {
        if (_inputEl?.value === "" && _selectedOption) {
          reset();
        }
        setHighlightedToBestMatch();
        scrollToHighlighted();
      }, 0);
    }, 0);
  }

  function hideMenu() {
    _isMenuVisible = false;
    if (_filterable) {
      setDisplayedValue();
    }
  }

  function isFilterMatch(option: Option, filter: string, partialMatch = true) {
    // empty string matches all
    if (filter.length === 0) return true;

    let value = option.filter || option.label || option.value;
    value = value.toLowerCase();
    filter = filter.toLowerCase().trim();

    if (!partialMatch) {
      return value === filter;
    }

    return value.startsWith(filter) || value.includes(" " + filter);
  }

  // update the value show to the user in the <input> element
  function setDisplayedValue() {
    const newValue = _selectedOption?.label || _selectedOption?.value || "";
    _inputEl.value = newValue;
  }

  function dispatchValue(newValue?: string, event?: Event) {
    const detail = _multiselect
      ? { name, values: [newValue, ..._values], event }
      : { name, value: newValue, event };

    if (!_isDirty) {
      return;
    }

    dispatch(_rootEl, "_change", detail, { bubbles: true });
    _isDirty = false;
  }

  //
  // Event handlers
  //

  function onSelect(option: Option, event?: Event) {
    if (_disabled) return;

    _isDirty = option.value !== _selectedOption?.value;
    _selectedOption = option;

    if (!_native) {
      syncFilteredOptions();
      setDisplayedValue();
      setHighlightedToSelected();
      hideMenu();
    }
    dispatchValue(option.value, event);
  }

  function onFilteredOptionClick(option: Option, event?: Event) {
    _isDirty = true;
    onSelect(option, event);
  }

  // Auto-select matching option from input after browser autofill/autocomplete or paste from clipboard.
  function onInputChange(e: Event) {
    if (_disabled || !_filterable) return;

    const isAutofilled =
      testid === "test-autofill" ||
      _inputEl.matches(":-webkit-autofill") ||
      _inputEl.matches(":autofill");

    if (!isAutofilled) return;

    syncFilteredOptions();

    const inputValue = _inputEl?.value || "";
    const hasInputValue = inputValue !== "";
    const matchedOption = hasInputValue
      ? _filteredOptions.find((option) =>
          isFilterMatch(option, inputValue, false),
        )
      : null;

    if (!_selectedOption) {
      if (matchedOption) {
        onFilteredOptionClick(matchedOption, e);
      } else {
        reset();
      }
    }

    setTimeout(() => {
      hideMenu();
    }, 2);
  }

  function onInputKeyUp(e: KeyboardEvent) {
    if (_disabled) return;
    _isDirty = true;
    _eventHandler.handleKeyUp(e);
  }

  function onInputKeyDown(e: KeyboardEvent) {
    if (_disabled) return;
    _isDirty = true;
    _eventHandler.handleKeyDown(e);
  }

  function onClearIconKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      reset();
      showMenu();
      e.stopPropagation();
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
    _isDirty = true;
    onSelect(option, e);
  }

  function reset() {
    if (_disabled) return;

    _activeDescendantId = undefined;
    _highlightedIndex = -1;
    _selectedOption = undefined;
    _isDirty = true;

    syncFilteredOptions();
    dispatchValue("");
    setDisplayedValue();
  }

  function onFocus(e: Event) {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }

  class ComboboxKeyUpHandler implements EventHandler {
    constructor(private input: HTMLInputElement) {}

    onEscape(_e: KeyboardEvent) {
      reset();
      // FIXME: on escape should allow the next tab click to move to the next element, currently
      // clicking tab after esc will refocus onto the Dropdown

      // _inputEl.focus();
      // e.preventDefault();
      // e.stopPropagation();
    }

    onEnter(e: KeyboardEvent) {
      // TODO: emit an event when opened to allow the filterable dropdown to set focus on the input

      const option = _filteredOptions[_highlightedIndex];
      if (option) {
        _isDirty = option.value !== _selectedOption?.value;
        onSelect(option);
      }

      if (_selectedOption) {
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
          option.label?.toLowerCase() === this.input.value.toLowerCase(),
      );

      if (matchedOption) {
        onSelect(matchedOption);
      }

      hideMenu();
    }

    onKeyUp(_: KeyboardEvent) {
      // Clear selection and highlight if input becomes empty
      if (this.input.value === "" && _selectedOption) {
        _selectedOption = undefined;
        _highlightedIndex = -1;
      }
      showMenu();
    }

    handleKeyUp(e: KeyboardEvent) {
      switch (e.key) {
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
        case "Tab":
          // ignore tab
          break;
        case "Enter":
          // ignore enter (to avoid onKeyUp)
          break;
        default:
          this.onKeyUp(e);
          break;
      }
    }

    handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Enter":
          this.onEnter(e);
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
          onSelect(option, e);
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
  bind:this={_rootEl}
  data-testid={testid || `${name}-dropdown`}
  class="dropdown"
  class:dropdown-native={_native}
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --width: ${_width};
  `}
>
  {#if _native}
    <select
      {name}
      aria-label={arialabel || name}
      aria-labelledby={arialabelledby}
      class:error={_error}
      disabled={_disabled}
      id={name}
      {autocomplete}
      on:change={onNativeSelect}
      on:focus={onFocus}
    >
      <slot />
      {#each _options as option}
        <option selected={value === option.value} value={option.value}>
          {option.label}
        </option>
      {/each}
    </select>
  {:else}
    <slot />
    <!-- list and filter -->
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
          value={_selectedOption?.label || _selectedOption?.value || ""}
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
          on:change={onInputChange}
          on:focus={onFocus}
        />

        {#if _inputEl?.value && _filterable}
          <goa-icon-button
            id={name}
            data-testid="clear-icon"
            tabindex={_disabled ? -1 : 0}
            arialabel={`clear ${arialabel || name}`}
            on:click={onClearIconClick}
            on:keydown={onClearIconKeyDown}
            class="dropdown-icon--clear"
            class:disabled={_disabled}
            size="medium"
            theme="filled"
            variant="dark"
            icon="close"
          />
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <goa-icon
            testid="chevron"
            id={name}
            class="dropdown-icon--arrow"
            size="medium"
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
        on:focus={onFocus}
        on:mousedown={(e) => e.preventDefault()}
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
            aria-selected={_selectedOption?.value === option.value}
            class:selected={_selectedOption?.value === option.value}
            class="dropdown-item"
            class:dropdown-item--highlighted={index === _highlightedIndex}
            data-index={index}
            data-testid={`dropdown-item-${option.value}`}
            data-value={option.value}
            role="option"
            style="display: block"
            on:click={(e) => {
              onFilteredOptionClick(option, e);
              _inputEl?.focus();
            }}
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
    max-width: 100%;
  }

  .dropdown-input-group {
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
  .dropdown-input-group:hover {
    box-shadow: var(--goa-dropdown-border-hover);
    border: none;
  }
  .dropdown-input-group:has(input:focus-visible) {
    box-shadow: var(--goa-dropdown-border), var(--goa-dropdown-border-focus);
  }
  .dropdown-input-group.error,
  .dropdown-input-group.error:hover {
    box-shadow: var(--goa-dropdown-border-error);
  }
  .dropdown-input-group.error:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border), var(--goa-dropdown-border-focus);
  }
  @container not (--mobile) {
    .dropdown-input-group {
      width: var(--width, 100%);
    }
  }

  .dropdown-icon--arrow,
  .dropdown-icon--clear {
    padding-right: var(--goa-dropdown-space-icon-text);
  }

  /* TODO: add indicator to when the reset button has focus state */
  .dropdown-icon--clear:focus:not(.disabled),
  .dropdown-icon--clear:active:not(.disabled) {
    outline: none;
  }

  .dropdown-input--leading-icon {
    margin-left: var(--goa-dropdown-padding-lr);
  }

  .dropdown-input--leading-icon + input {
    padding-left: var(--goa-space-xs);
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

  /* Dropdown Menu */
  .dropdown-input-group--disabled,
  .dropdown-input-group--disabled:hover,
  .dropdown-input-group--disabled:active,
  .dropdown-input-group--disabled:focus {
    background-color: var(--goa-dropdown-color-bg-disabled);
    box-shadow: var(--goa-dropdown-border-disabled);
    cursor: default;
  }
  .dropdown-input-group--disabled goa-icon {
    outline: none;
    color: var(--goa-dropdown-color-text-disabled);
  }

  /** menu **/
  ul[role="listbox"] {
    border-radius: var(--goa-dropdown-border-radius);
    padding: 0;
    margin: 0;
  }

  /* dropdown items */

  .dropdown-item {
    margin: 0;
    padding: var(--goa-dropdown-item-padding);
    cursor: pointer;
    color: var(--goa-dropdown-item-color-text);
    overflow: hidden;
    white-space: normal; /* Allows text to wrap */
    word-break: break-word; /* Ensures long words break onto the next line */
    overflow-wrap: break-word; /* Alternative for word wrapping */
  }

  .dropdown-item:hover,
  .dropdown-item--highlighted {
    background: var(--goa-dropdown-item-color-bg-hover);
    color: var(--goa-dropdown-item-color-text-hover);
  }

  .dropdown-item[aria-selected="true"] {
    background: var(--goa-dropdown-item-color-bg-selected);
    color: var(--goa-dropdown-item-color-text-selected);
  }

  .dropdown-item[aria-selected="true"]:hover,
  .dropdown-item[aria-selected="true"].dropdown-item--highlighted {
    background: var(--goa-dropdown-item-color-bg-selected-hover);
    color: var(--goa-dropdown-item-color-text-selected-hover);
  }

  /* Native styling  */
  .dropdown-native {
    position: relative;
    box-shadow: var(--goa-dropdown-border);
    border-radius: var(--goa-dropdown-border-radius);
    background-color: var(--goa-dropdown-color-bg);
    transition: var(--goa-dropdown-transition);
  }

  .dropdown-native:has(select:disabled) {
    background-color: var(--goa-dropdown-color-bg-disabled);
    box-shadow: var(--goa-dropdown-border-disabled);
    color: var(--goa-color-text-secondary);
    cursor: default;
  }

  .dropdown-native:has(select.error) {
    box-shadow: var(--goa-dropdown-border-error);
  }

  .dropdown-native:hover {
    box-shadow: var(--goa-dropdown-border-hover);
  }

  select {
    border: none;
    font: var(--goa-dropdown-typography);
    background-color: transparent;
    color: var(--goa-dropdown-color-text);
    appearance: none;
    padding: var(--goa-dropdown-padding);
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
    background-repeat: no-repeat;
  }

  .dropdown-native:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border), var(--goa-dropdown-border-focus);
  }

  goa-icon:focus-visible {
    outline: none;
  }

  ::placeholder {
    color: var(--goa-dropdown-color-text-placeholder);
    opacity: 1;
  }
</style>
