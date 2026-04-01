<svelte:options
  customElement={{
    tag: "goa-dropdown",
    props: {},
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

  /** @required Identifier for the dropdown. Should be unique. */
  export let name: string;
  /** Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name. */
  export let arialabel: string = "";
  /** The aria-labelledby attribute identifies the element(or elements) that labels the dropdown it is applied to. Normally it is the id of the label. */
  export let arialabelledby: string = "";
  /** Stores the value of the item selected from the dropdown. */
  export let value: string | undefined = "";
  /** When true the dropdown will have the ability to filter options by typing into the input field. */
  export let filterable: string = "false";
  /** Icon shown to the left of the dropdown input. */
  export let leadingicon: GoAIconType | null = null;
  /** Maximum height of the dropdown menu. Non-native only. */
  export let maxheight: string = "276px";
  /** The text displayed for the dropdown before a selection is made. Non-native only. */
  export let placeholder: string = "";
  /** Overrides the autosized menu width. Non-native only. */
  export let width: string = "";
  /** Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em). */
  export let maxwidth: string = "";
  /** Disable this control. */
  export let disabled: string = "false";
  /** Show an error state. */
  export let error: string = "false";
  /** When true, allows multiple items to be selected from the dropdown. */
  export let multiselect: string = "false";
  /** When true will render the native select HTML element. */
  export let native: string = "false";
  /** Sets the size of the dropdown. Compact reduces height for dense layouts. */
  export let size: "default" | "compact" = "default";
  /** @internal Design system version for styling. */
  export let version: "1" | "2" = "1";

  /** @deprecated This property has no effect and will be removed in a future version. */
  export let relative: string = "";
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;
  /** Specifies the autocomplete attribute for the dropdown input. Native only. */
  export let autocomplete: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
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
  let _filterText: string = "";

  let _bindTimeoutId: any;

  let _error = toBoolean(error);
  let _prevError = _error;

  //
  // Reactive
  //

  $: _disabled = toBoolean(disabled);
  $: _native = toBoolean(native);
  $: _multiselect = toBoolean(multiselect) && !_native;
  $: _filterable = toBoolean(filterable) && !_native;

  // Tracks the filtered (non-empty) selected values for multiselect mode
  $: _selectedValues = _multiselect ? _values.filter((v) => v !== "") : [];
  $: _showChips = _multiselect;

  // True when all available options are selected (used for the "Select All" checkbox state)
  $: _allSelected = _multiselect && _options.length > 0 && _options.every((o) => _selectedValues.includes(o.value));

  // True when the user has typed something in the filter input (hides "Select All")
  $: _isFiltering = _filterable && _filterText !== "";

  // Compute input cursor style
  $: _inputCursor = _disabled ? "default" : _filterable ? "auto" : "pointer";

  // To keep track of active descendant for the accessibility
  $: _activeDescendantId = _filteredOptions[_highlightedIndex]
    ? _filteredOptions[_highlightedIndex].value
    : undefined;

  // make updates if the values are changed
  $: {
    _values = parseValues(value || "");
    setSelected();
  }

  // Sync input display value when multiselect selections change.
  // _selectedValues is referenced to create a Svelte reactive dependency.
  $: if (_multiselect && _inputEl) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    _selectedValues;
    setDisplayedValue();
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
      _popoverMaxWidth = _width;
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
        if (_inputEl && (_selectedOption || (_multiselect && _selectedValues.length > 0))) {
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
    syncFilteredOptions();
  }

  function setSelected() {
    if (_multiselect) {
      // In multiselect mode _selectedValues drives the display; no single _selectedOption needed
      _selectedOption = undefined;
    } else {
      _selectedOption = _options.find((o) => o.value == _values[0]);
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
    _filterText = _filterable ? (_inputEl?.value || "") : "";
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
    if (_multiselect) {
      if (_filterable) {
        // In filterable multiselect, keep the input clear so the user can type to filter.
        // Chips below the dropdown show the selected values.
        _inputEl.value = "";
      } else {
        const selected = _values.filter((v) => v !== "");
        if (selected.length === 0) {
          _inputEl.value = "";
        } else if (selected.length === 1) {
          const opt = _options.find((o) => o.value === selected[0]);
          _inputEl.value = opt?.label || opt?.value || selected[0];
        } else {
          _inputEl.value = `${selected.length} selected`;
        }
      }
      return;
    }
    const newValue = _selectedOption?.label || _selectedOption?.value || "";
    _inputEl.value = newValue;
  }

  function dispatchValue(newValue?: string) {
    if (!_isDirty) {
      return;
    }

    dispatch(_rootEl, "_change", { name, value: newValue }, { bubbles: true });
    _isDirty = false;
  }

  //
  // Event handlers
  //

  function onSelect(option: Option) {
    if (_disabled) return;

    if (_multiselect) {
      const isAlreadySelected = _selectedValues.includes(option.value);
      const newValues = isAlreadySelected
        ? _selectedValues.filter((v) => v !== option.value)
        : [..._selectedValues, option.value];

      _isDirty = true;
      value = newValues.length > 0 ? JSON.stringify(newValues) : "";
      dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });
      _isDirty = false;

      if (!_native) {
        if (_filterable) {
          // Clear the filter input after selection so the user can search again.
          _inputEl.value = "";
        }
        syncFilteredOptions();
        setDisplayedValue();
        // Keep the menu open in multiselect mode
      }
      return;
    }

    _isDirty = option.value !== _selectedOption?.value;
    _selectedOption = option;

    if (!_native) {
      syncFilteredOptions();
      setDisplayedValue();
      setHighlightedToSelected();
      hideMenu();
    }
    dispatchValue(option.value);
  }

  function onFilteredOptionClick(option: Option) {
    _isDirty = true;
    onSelect(option);
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
        onFilteredOptionClick(matchedOption);
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
      if (!_multiselect) {
        showMenu();
      }
      e.stopPropagation();
    }
  }

  function onClearIconClick(e: Event) {
    reset();
    if (!_multiselect) {
      showMenu();
    }
    e.stopPropagation();
  }

  function onChipRemove(chipValue: string) {
    if (_disabled) return;
    const newValues = _selectedValues.filter((v) => v !== chipValue);
    _isDirty = true;
    value = newValues.length > 0 ? JSON.stringify(newValues) : "";
    dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });
    _isDirty = false;
    syncFilteredOptions();
    setDisplayedValue();
  }

  function onSelectAll() {
    if (_disabled) return;
    const newValues = _allSelected ? [] : _options.map((o) => o.value);
    _isDirty = true;
    value = newValues.length > 0 ? JSON.stringify(newValues) : "";
    dispatch(_rootEl, "_change", { name, values: newValues }, { bubbles: true });
    _isDirty = false;
    syncFilteredOptions();
    setDisplayedValue();
  }

  function onNativeSelect(e: Event) {
    const target = e.currentTarget as HTMLSelectElement;
    const option = _options[target.selectedIndex];
    _isDirty = true;
    onSelect(option);
  }

  function reset() {
    if (_disabled) return;

    _activeDescendantId = undefined;
    _highlightedIndex = -1;
    _selectedOption = undefined;
    _isDirty = true;

    syncFilteredOptions();

    if (_multiselect) {
      value = "";
      dispatch(_rootEl, "_change", { name, values: [] }, { bubbles: true });
      _isDirty = false;
      setDisplayedValue();
    } else {
      dispatchValue("");
      setDisplayedValue();
    }
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

      if (_multiselect) {
        // In multiselect keep menu open; Enter just toggles the highlighted item
        if (!_isMenuVisible) showMenu();
      } else if (_selectedOption) {
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
          onSelect(option);
        }
        if (!_multiselect) {
          hideMenu();
        }
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
  class:compact={size === "compact"}
  class:v2={version === "2"}
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
            size={size === "compact" ? "small" : "medium"}
            type={leadingicon}
          />
        {/if}

        <input
          style={`cursor: ${_inputCursor};`}
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
          placeholder={placeholder || (version === "2" ? "—Select—" : "")}
          {name}
          on:keydown={onInputKeyDown}
          on:keyup={onInputKeyUp}
          on:change={onInputChange}
          on:focus={onFocus}
        />

        {#if (_inputEl?.value && _filterable && !_multiselect) || (_multiselect && _selectedValues.length > 0)}
          <goa-icon-button
            id={name}
            data-testid="clear-icon"
            tabindex={_disabled ? -1 : 0}
            arialabel={`clear ${arialabel || name}`}
            on:click={onClearIconClick}
            on:keydown={onClearIconKeyDown}
            class="dropdown-icon--clear"
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
            id={name}
            class="dropdown-icon--arrow"
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
        aria-multiselectable={_multiselect ? "true" : undefined}
        on:focus={onFocus}
        on:mousedown={(e) => e.preventDefault()}
        style={`
          outline: none;
          overflow-y: auto;
          max-height: ${maxheight};
        `}
      >
        {#if _multiselect && !_isFiltering}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            aria-selected={_allSelected}
            class="dropdown-item dropdown-item--multiselect"
            class:selected={_allSelected}
            data-testid="dropdown-item-select-all"
            role="option"
            style="display: flex"
            on:click={() => {
              onSelectAll();
              _inputEl?.focus();
            }}
          >
            <span class="dropdown-item-checkbox" aria-hidden="true"></span>
            Select All
          </li>
        {/if}
        {#each _filteredOptions as option, index (index)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            id={option.value}
            aria-selected={_multiselect ? _selectedValues.includes(option.value) : _selectedOption?.value === option.value}
            class:selected={_multiselect ? _selectedValues.includes(option.value) : _selectedOption?.value === option.value}
            class="dropdown-item dropdown-item--option"
            class:dropdown-item--multiselect={_multiselect}
            class:dropdown-item--highlighted={index === _highlightedIndex}
            data-index={index}
            data-testid={`dropdown-item-${option.value}`}
            data-value={option.value}
            role="option"
            style={_multiselect ? "display: flex" : "display: block"}
            on:click={(e) => {
              onFilteredOptionClick(option);
              _inputEl?.focus();
            }}
          >
            {#if _multiselect}
              <span class="dropdown-item-checkbox" aria-hidden="true"></span>
            {/if}
            {option.label || option.value}
          </li>
        {:else}
          {#if _filterable || _multiselect}
            <li class="dropdown-item" data-testid="dropdown-item-not-found">
              No matches found
            </li>
          {/if}
        {/each}
      </ul>
    </goa-popover>

    {#if _showChips && _selectedValues.length > 0}
      <div class="dropdown-chips" data-testid="selected-chips">
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

  .dropdown-input-group:has(input:focus-visible),
  .dropdown-input-group.error:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border), var(--goa-dropdown-border-focus);
  }

  /* V2: Focus state has a single border */
  .v2 .dropdown-input-group:has(input:focus-visible),
  .v2 .dropdown-input-group.error:has(:focus-visible) {
    box-shadow: var(--goa-dropdown-border-focus);
  }

  .dropdown-input-group.error,
  .dropdown-input-group.error:hover {
    box-shadow: var(--goa-dropdown-border-error);
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
    border-radius: var(
      --goa-dropdown-menu-border-radius,
      var(--goa-dropdown-border-radius)
    );
    padding: 0;
    margin: var(--goa-dropdown-menu-margin, 0);
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
    border-radius: var(--goa-dropdown-item-border-radius, 0);
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
    right: var(--goa-dropdown-space-icon-text);
    top: 50%;
    transform: translateY(-50%);
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

  input:disabled::placeholder {
    color: var(--goa-dropdown-color-text-disabled);
  }

  /* Compact Size */
  .compact input,
  .compact select {
    padding: var(--goa-dropdown-compact-padding);
    height: var(--goa-dropdown-compact-height);
    font: var(--goa-dropdown-compact-typography);
  }

  .compact .dropdown-item {
    font: var(--goa-dropdown-compact-item-typography);
  }

  /* Multiselect item layout */
  .dropdown-item--multiselect {
    align-items: center;
    gap: var(--goa-space-xs);
  }

  .dropdown-item-checkbox {
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

  .dropdown-item[aria-selected="true"] .dropdown-item-checkbox {
    background-color: var(--goa-checkbox-color-bg-checked);
    border-color: var(--goa-checkbox-color-bg-checked);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M2 6l3 3 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.875rem;
  }

  /* In multiselect mode, selection is shown by the checkbox — no blue row background */
  .dropdown-item--multiselect[aria-selected="true"] {
    background: transparent;
    color: var(--goa-dropdown-item-color-text);
  }

  .dropdown-item--multiselect[aria-selected="true"]:hover,
  .dropdown-item--multiselect[aria-selected="true"].dropdown-item--highlighted {
    background: var(--goa-dropdown-item-color-bg-hover);
    color: var(--goa-dropdown-item-color-text-hover);
  }

  .dropdown-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-2xs);
    margin-top: var(--goa-space-2xs);
  }
</style>
