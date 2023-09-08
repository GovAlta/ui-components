<svelte:options tag="goa-dropdown"/>

<script lang="ts">
  import type {GoAIconType} from "../icon/Icon.svelte";
  import type {Spacing} from "../../common/styling";
  import {afterUpdate, onMount, tick} from "svelte";
  import {cssVar, toBoolean} from "../../common/utils";
  import {calculateMargin} from "../../common/styling";

  interface Option {
    label: string;
    value: string;
    filter: string; // filter keyword to search
  }
  // Props
  export let name: string;
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let value: string = ""; // if not found option (filterable), value falls back to empty string
  export let filterable: string = "false";
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
  export let id: string = ""; // for accessibility to control the menu

  $: _disabled = toBoolean(disabled);
  $: _error = toBoolean(error);
  $: _multiselect = toBoolean(multiselect);
  $: _native = toBoolean(native);
  $: _filterable = toBoolean(filterable) && !_native; // Will replace datalist for filterable true
  $: _filteredOptions = _filterable ? _options.filter(option => isMatched(option, _inputValue)) : _options;

  // Accessibility
  $: _activeDescendantId = _filteredOptions[_highlightedIndex] ? _filteredOptions[_highlightedIndex].value : undefined; //To keep track of active descendant for the accessibility

  // Private
  let _values: string[] = [];
  let _options: Option[] = [];
  let _inputValue: string = "";
  let _isMenuVisible = false;
  let _highlightedIndex: number = -1; // keep track highlighted option, for arrow up/down
  let _computedWidth: string;
  let _selectedOption = undefined; // to keep track if value is matched to combobox option
  let _previousSelectedValue = ""; // to keep track if value is changed from previously selected value - for clear button
  let _inputWidth: string;

  let _el: HTMLElement;
  let _menuEl: HTMLElement;
  let _selectEl: HTMLSelectElement;
  let _popOverEl: HTMLElement;
  let _inputEl: HTMLInputElement;

  // Reactive statement

  $: if (_el) {
      _values = parseValues(value);
      _options = getOptions();
      if (!_native) {
        _computedWidth = getCustomDropdownWidth(_options);
      }
      if (_options.length) {
        // Keep track of initialized value
        updateSelectedValue(value);
      }
  }

  $: if(_inputEl && _options.length) {
    _inputWidth = `${_inputEl.getBoundingClientRect().width}px`;
  }


  afterUpdate(() => {
    if (_options.length === 0) return;
    _isMenuVisible ? _inputEl.focus() : updateInputValue(_selectedOption);
  });

  onMount(async () => {
    // watch for DOM changes within the slot => dynamic binding
    const slot = _el.querySelector("slot");
    slot?.addEventListener("slotchange", _e => {
      _values = parseValues(value);
      _options = getOptions();
    });
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
        const label = el.getAttribute("label") || option.label || el.innerHTML || value;
        const filter = el.getAttribute("filter") || label || value || "";
        return {value, label, filter};
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

  function isOptionInView(node: HTMLLIElement): boolean {
    const liOptionRect = node.getBoundingClientRect();
    const ulRect = _menuEl.getBoundingClientRect();
    return liOptionRect.top >= 0 &&
      liOptionRect.left >= 0 &&
      liOptionRect.bottom <= ulRect.height &&
      liOptionRect.right <= ulRect.width;
  }

  /**
   * Change the direction of highlighted options for Arrow up and down
   * @param position: -1 for previous option, +1 for next option
   */
  function changeHighlightedOption(position: number) {
    let index = _highlightedIndex + position;
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
    const liNode = _menuEl.querySelector(`li[data-index='${index}']`) as HTMLLIElement;

    if (!liNode) return;

    if (isOptionInView(liNode)) return;

    liNode.scrollIntoView({behavior: "smooth", block: "nearest"});
  }

  function isPrintableCharacter(inputChar: string): boolean {
    return inputChar.length === 1 && inputChar.match(/\S| /) != null;
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

  /**
   * Update the dropdown selected style/attribute based on new value
   * @param selectedValue
   */
  function setSelectedOption(selectedValue: string) {
    return _filterable ? setSelectedOptionByInputValue() :
      _selectedOption = _options.find(item => item.value === selectedValue);
  }

  /**
   * Update according to input's value (for filterable dropdown)
   */
  function setSelectedOptionByInputValue() {
    const filteredItems = _options.filter(item => isMatched(item, _inputValue));
    const isTypingInputMatchedOption = filteredItems.length === 1 && _isMenuVisible;

    if (!isTypingInputMatchedOption) {
      // follow local value
      _selectedOption = _options.find(item => item.value === value);
      return;
    }
    _selectedOption = filteredItems[0];
    updateInputValue(_selectedOption);
    _activeDescendantId = undefined;
  }

  /**
   * Update input's value according to selected dropdown option
   * @param option
   */
  function updateInputValue(option?: Option) {
    _highlightedIndex = -1;
    _inputValue = option ? option.label : "";
    value = option ? option.value : "";
    if (!option) {
      _activeDescendantId = undefined;
    }
  }

  /**
   * Keep track the component's local value based on new selected value
   * @param newSelectedValue
   */
  function updateSelectedValue(newSelectedValue: string) {
    if (_previousSelectedValue !== newSelectedValue) {
      _previousSelectedValue = newSelectedValue;
      setSelectedOption(newSelectedValue);
      _values = [value]; // Keep track _values, for multiSelect later
      dispatchValue(value);
    }
  }

  function showMenu() {
    if (_disabled) {
      return;
    }
    _isMenuVisible = true;
  }

  function closeMenu() {
    _isMenuVisible = false;
  }

  function isMatched(option: Option, query: string) {
    if (query.length === 0) return true;

    // in case query is "white whale", "b c"
    const queryWords = query.toLowerCase().split(/\s+/);
    //In case option is "white whale", "american samoa"
    const filterWords = option.filter.toLowerCase().split(/\s+/);

    /**
     * "b c" should not match "bc", "red " should not match "red"
     * but "american sa" should match "american samoa"
     */
    if (query.endsWith(" ") || queryWords.length > 1) {
      if (queryWords.length !== filterWords.length) return false;
      const isLastWord = (word: string, index: number, array: string[]) => index === array.length - 1;
      return queryWords.every((word, index) =>
        isLastWord(word, index, queryWords)
          ? filterWords[index].startsWith(word) // last word should be prefix match: american sa ==> american samoa
          : filterWords[index] === word // other words should be exact match: b c should not match bc
      );
    }

    // Single-word query "al" for "Alabama"
    return filterWords.some(word => word.startsWith(queryWords[0]));
  }

  function dispatchValue(optionValue: string) {
    const option = _options.find(item => item.value === optionValue);
    const newValue = option ? option.value : "";

    let detail: Record<string, unknown>;
    if (_multiselect) {
      _values.push(newValue);
      detail = {name, values: _values};
    } else {
      _values = [newValue];
      detail = {name, value: newValue};
    }
    _el.dispatchEvent(new CustomEvent("_change", {composed: true, detail}));
  }

  // Event handlers
  function onSelect(option: Option) {
    if (_disabled) return;
    value = option.value;
    _selectedOption = option;
    if (!_native) {
      closeMenu();
      _inputValue = option.label;
      _inputEl.focus();
    }
  }

  function ComboboxKeyDownHandler() {

    const handle = (e: KeyboardEvent) => {
      let stopPropagation = false;
      switch (e.key) {
        case "Enter":
          onEnter();
          stopPropagation = true;
          break;
        case "Escape":
        case 'Esc':
          closeMenu();
          removeSelectedValue();
          stopPropagation = true;
          break;
        case 'Up':
        case "ArrowUp":
          onArrowUp();
          stopPropagation = true;
          break;
        case "Down":
        case "ArrowDown":
          onArrowDown();
          stopPropagation = true;
          break;
        case "Tab":
          closeMenu();
          break;
        case 'Home':
          _inputEl.setSelectionRange(0, 0);
          stopPropagation = true;
          break;
        case 'End':
          _inputEl.setSelectionRange(_inputValue.length, _inputValue.length);
          stopPropagation = true;
          break;
        case 'Backspace':
          if (_inputValue.length === 0) {
            // backspace should not open the filterable dropdown if input has no words
            stopPropagation = true;
            return;
          }
          onBackspace();
          break;
        case ' ':
          if (_inputValue.length === 0) {
            // space should not open the filterable dropdown if input has no words
           stopPropagation = true;
          }
          break;
        default:
          if (isPrintableCharacter(e.key)) {
            if (!_isMenuVisible) {
              showMenu();
            }
            if (!_inputValue.length) {
              removeSelectedValue();
            }
          }
          break;
      }

      if (stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    const onEnter = () => {
      _isMenuVisible = !_isMenuVisible;
      if (_highlightedIndex < 0) {
        const matchedOption = _filteredOptions.find(option => option.label.toLowerCase() === _inputValue?.toLowerCase());
        selectOption(matchedOption);
        return;
      }
      const highlightedOption = _filteredOptions[_highlightedIndex];
      selectOption(highlightedOption);
      _highlightedIndex = -1; // reset highlighted option
    };

    const onArrowUp = () => {
      showMenu();
      changeHighlightedOption(-1);
    };

    const onArrowDown = () => {
      showMenu();
      changeHighlightedOption(1);
    };

    const onBackspace = () => {
      showMenu();
      if (_inputValue.length === 1) {
        removeSelectedValue();
      }
    }

    const selectOption = (option: Option) => {
      closeMenu();
      if (option) {
        _inputValue = option.label;
        _selectedOption = option;
        value = option.value;
      }
    }

    return {
      handle,
    };
  }
  function DropdownKeyDownHandler() {
    const handle = (e: KeyboardEvent) => {
      let stopPropagation = false;
      switch (e.key) {
        case " ":
          onSpace();
          stopPropagation = true;
          break;
        case "Enter":
          onEnter();
          stopPropagation = true;
          break;
        case "Escape":
          closeMenu();
          break;
        case "Up":
        case "ArrowUp":
          onArrowUp();
          stopPropagation = true;
          break;
        case "Down":
        case "ArrowDown":
          onArrowDown();
          stopPropagation = true;
          break;
        case "Tab":
          closeMenu();
          break;
        default:
          break;
      }

      if (stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onSpace = () => {
      _isMenuVisible = !_isMenuVisible; // toggle menu
      if (_highlightedIndex > -1 && _filteredOptions[_highlightedIndex].value !== value)
        value = _filteredOptions[_highlightedIndex].value;
    };

    const onEnter = () => {
      _isMenuVisible = !_isMenuVisible;
      if (_highlightedIndex > -1 && _filteredOptions[_highlightedIndex].value !== value) {
        value = _filteredOptions[_highlightedIndex].value;
        closeMenu();
      }
    };

    const onArrowUp = () => {
      if (!_isMenuVisible) showMenu();
      changeHighlightedOption(-1);
    };

    const onArrowDown = () => {
      if (!_isMenuVisible) showMenu();
      changeHighlightedOption(1);
    };

    return {
      handle
    };
  }

  const comboboxHandler = ComboboxKeyDownHandler();
  const dropdownHandler = DropdownKeyDownHandler();

  const onInputKeyDown = (e: KeyboardEvent) => {
    if (_disabled) return;

    if (_filterable) {
      comboboxHandler.handle(e);
    } else {
      dropdownHandler.handle(e);
    }
  }

  function onNativeSelect(e: Event) {
    const target = e.currentTarget as HTMLSelectElement;
    const option = _options[target.selectedIndex];
    onSelect(option);
  }

  function removeSelectedValue() {
    if (_disabled) return;
    _previousSelectedValue = null;
    _selectedOption = undefined;
    updateInputValue(_selectedOption);
  }

  async function onClick() {
    if (_disabled) return;
    showMenu();
    if (_filterable) {
      await tick();
      _inputEl.focus();
    }
  }

  function onClear() {
    removeSelectedValue();
    _inputEl.focus();
    onClick();
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
      aria-labelledby={arialabelledby}
      aria-label={arialabel || name}
      id={id || name}
      name="{name}"
    >
      <slot/>
      {#each _options as option}
        <option
          selected={value === option.value}
          value={option.value}>
          {option.label}
        </option>
      {/each}
    </select>
  {:else}
    <!-- list and filter -->
    <slot/>
    <goa-popover
      {disabled}
      {relative}
      open={_isMenuVisible}
      padded="false"
      width={width || _computedWidth}
      bind:this={_popOverEl}
      tabindex="-1"
      on:_open={showMenu}
      on:_close={closeMenu}
      maxwidth={_inputWidth}
    >
      <div
        slot="target"
        style={`
          ${cssVar("width", width)}
        `}
        class="dropdown-input-group"
        class:dropdown-input-group--disabled={_disabled}
        class:error={_error}>
        {#if leadingicon}
          <goa-icon
            class="dropdown-input--leading-icon"
            data-testid="leading-icon"
            type={leadingicon}
          />
        {/if}
        <input
          style={`cursor: ${!_disabled ? (_filterable ? "auto" : "pointer") : 'default'}`}
          bind:this={_inputEl}
          bind:value={_inputValue}
          tabindex="1"
          type="text"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          aria-controls="{`menu-${id||name}`}"
          aria-expanded={_isMenuVisible}
          aria-label={arialabel || name}
          aria-labelledby={arialabelledby}
          id={`${id || name}`}
          aria-activedescendant="{_activeDescendantId}"
          aria-disabled="{_disabled}"
          aria-owns="{_isMenuVisible ? `menu-${id||name}` : undefined}"
          aria-haspopup="listbox"
          disabled="{_disabled}"
          readonly="{!_filterable}"
          placeholder="{placeholder}"
          name="{name}"
          on:keydown={onInputKeyDown}
          />
        {#if _inputValue && _filterable}
          <goa-icon
            tabindex="{_disabled ? -1 : 0}"
            role="button"
            arialabel="clear {arialabel || name}"
            on:click|stopPropagation="{onClear}"
            on:keydown="{(e) => {
            if (e.key === 'Enter') {
              // for keyboard accessibility to press the clear icon
              onClear();
            }
          }}"
            class="dropdown-icon--clear"
            class:disabled={_disabled}
            size="medium"
            type="close"
          />
        {/if}
        {#if (_filterable && _inputValue.length === 0) || !_filterable}
          <goa-icon
            role="button"
            id={`${id||name}`}
            arialabel={arialabel || name}
            ariacontrols="{`menu-${id||name}`}"
            ariaexpanded={_isMenuVisible ? "true" : "false"}
            class="dropdown-icon--arrow"
            size="medium"
            type={_isMenuVisible ? 'chevron-up' : 'chevron-down'}
            on:click={onClick}
          />
        {/if}
      </div>
      <!--Menu-->
      <ul
        id={`menu-${id||name}`}
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
        {#if _filteredOptions.length > 0}
          {#each _filteredOptions as option, index (index)}
            <li
              id={option.value}
              role="option"
              style="display: block"
              aria-selected={value === option.value}
              class="dropdown-item"
              class:dropdown-item--highlighted={index === _highlightedIndex}
              data-testid={`dropdown-item-${option.value}`}
              data-index={index}
              data-value={option.value}
              on:click={() => onSelect(option)}
            >
              {option.label || option.value}
            </li>
          {/each}
        {:else}
          <li class="dropdown-item" data-testid="dropdown-item-not-found">
            No matches found
          </li>
        {/if}
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

  /** input **/
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
    width: 100%;
  }
  .dropdown-input-group:hover{
    border-color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-hover);
  }
  .dropdown-input-group:focus,
  .dropdown-input-group:focus-within
  {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }
  @media (min-width: 640px) {
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
  .dropdown-icon--clear:active:not(.disabled){
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
  .dropdown-input-group--disabled:focus
  {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200) !important;
    cursor: default;
    box-shadow: none !important;
  }

  /** menu **/
  ul[role="listbox"] {
    border-radius: var(--goa-border-radius-m);
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
