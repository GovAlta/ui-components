<svelte:options
  customElement={{
    tag: "goa-dropdown-multiselect",
    props: {
      labelFormat: {
        type: "String",
        attribute: "label-format",
        reflect: true,
      },
      showSelectAll: {
        type: "String",
        attribute: "show-select-all",
        reflect: true,
      },
      leadingIcon: {
        type: "String",
        attribute: "leading-icon",
        reflect: true,
      },
      ariaLabel: {
        type: "String",
        attribute: "aria-label",
        reflect: true,
      },
      ariaLabelledBy: {
        type: "String",
        attribute: "aria-labelledby",
        reflect: true,
      },
      maxHeight: {
        type: "String",
        attribute: "max-height",
        reflect: true,
      },
    },
  }}
/>

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import {
    dispatch,
    ensureSlotExists,
    findFirstFocusableNode,
    fromBoolean,
    generateRandomId,
    receive,
    relay,
    style,
    styles,
    toBoolean,
    typeValidator,
    validateRequired,
  } from "../../common/utils";
  import type {
    DropdownItemMountedRelayDetail,
    DropdownItemDestroyRelayDetail,
    Option,
  } from "../dropdown/DropdownItem.svelte";
  import {
    DropdownItemMountedMsg,
    DropdownItemDestroyMsg,
  } from "../dropdown/DropdownItem.svelte";
  import { GoAIconType } from "../icon/Icon.svelte";
  import { __classPrivateFieldGet } from "tslib";
  import { GoabDropdownMultiselectLabelFormatOptions } from "@abgov/ui-components-common";

  const [Size, validateSize] = typeValidator("Size", ["default", "compact"]);

  /** @required Identifier for the group. Used in change events. */
  export let name: string;
  /** Array of currently selected checkbox values. */
  export let value: string[] = [];
  /** Text shown when nothing is selected. */
  export let placeholder: string = "";
  /** Enables filtering of options by typing in the trigger. */
  export let filterable: boolean = false;
  /** Icon shown to the left of the dropdown input. */
  export let leadingIcon: GoAIconType | null = null;
  /** Disables the component. @default false */
  export let disabled: string = "false";
  /** Shows an error state. @default false */
  export let error: string = "false";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Provides an accessible label when no visible label is associated. */
  export let ariaLabel: string = "";
  /** References an external element that labels this component. */
  export let ariaLabelledBy: string = "";
  /** Sets the maximum height of the dropdown content area. @default "276px" */
  export let maxHeight: string = "276px";
  /** Sets a fixed width for the component and popover panel. */
  export let width: string = "";
  /** Sets the size variant. */
  export let size: "default" | "compact" = "default";
  /** The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. @default "list" */
  export let labelFormat: GoabDropdownMultiselectLabelFormatOptions = "list";
  /** Shows a "Select All" checkbox at the top of the options list. @default false */
  export let showSelectAll: boolean = false;
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Private state
  let _rootEl: HTMLElement;
  let _triggerEl: HTMLElement;
  let _popoverEl: HTMLElement;
  let _checkboxListEl: HTMLElement;
  let _isOpen = false;
  let _options: Option[] = [];
  let _popoverWidth = "";
  let _resizeObserver: ResizeObserver | null = null;
  const _contentId = `goa-dropdown-multiselect-content-${generateRandomId()}`;
  let _filterText = "";
  let _filterInputEl: HTMLInputElement | undefined;
  let _selectAllEl: HTMLElement | undefined;
  let _focusedIndex = -1;

  // Reactive
  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: Array.isArray(value) ? value : [];
  $: _hasValue = value.length > 0;
  $: _allSelected = _options.length > 0 && value.length === _options.length;
  $: _someSelected = value.length > 0 && value.length < _options.length;
  $: _labelMap = Object.fromEntries(
    _options.map((o) => [o.value, o.label || o.value]),
  );
  $: _displayText = calculateDisplayText(value, _labelMap);
  $: _visibleOptions =
    filterable && _filterText.trim()
      ? _options.filter((o) => isFilterMatch(o, _filterText))
      : _options;

  onMount(async () => {
    await tick();
    validateSize(size);
    validateRequired("DropdownMultiselect", { name });

    ensureSlotExists(_rootEl);
    addRelayListener();
    updatePopoverWidth();

    if (_rootEl && typeof ResizeObserver !== "undefined") {
      _resizeObserver = new ResizeObserver(updatePopoverWidth);
      _resizeObserver.observe(_rootEl);
    }

    _popoverEl?.addEventListener("_open", handlePopoverOpen);
    _popoverEl?.addEventListener("_close", handlePopoverClose);
  });

  onDestroy(() => {
    _resizeObserver?.disconnect();
  });

  function calculateDisplayText(
    values: string[],
    labelMap: Record<string, string>,
  ) {
    if (labelFormat === "count" && values.length > 1) {
      return `${values.length} items`;
    }

    return values.map((v) => labelMap[v] || v).join(", ");
  }

  function updatePopoverWidth() {
    if (_rootEl) {
      _popoverWidth = `${_rootEl.offsetWidth}px`;
    }
  }

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case DropdownItemMountedMsg:
          onChildMounted(data as DropdownItemMountedRelayDetail);
          break;
        case DropdownItemDestroyMsg:
          onChildDestroyed(data as DropdownItemDestroyRelayDetail);
          break;
      }
    });
  }

  function onChildMounted(detail: DropdownItemMountedRelayDetail) {
    switch (detail.mountType) {
      case "prepend":
        _options = [detail, ..._options];
        break;
      case "append":
      case "reset":
        _options = [..._options, detail];
        break;
    }
    relay(detail.el, "dropdown:bind", { el: _rootEl });
  }

  function onChildDestroyed(detail: DropdownItemDestroyRelayDetail) {
    _options = _options.filter((o) => o.value !== detail.value);

    // If the value was selected, remove it from the value array and dispatch a change event
    if (value.includes(detail.value)) {
      value = value.filter((v) => v !== detail.value);
      dispatch(
        _rootEl,
        "_change",
        { name, value, labels: value.map((v) => _labelMap[v] || v) },
        { bubbles: true },
      );
    }
  }

  function handlePopoverOpen() {
    _isOpen = true;
    if (filterable) {
      requestAnimationFrame(focusFilterTextbox);
    } else {
      requestAnimationFrame(focusFirstCheckbox);
    }
  }

  function handlePopoverClose() {
    _isOpen = false;
    if (filterable) {
      _filterText = "";
    }
    _triggerEl?.focus();
  }

  function getCheckboxList(): HTMLElement[] {
    const listItems = Array.from(
      _checkboxListEl?.querySelectorAll("goa-checkbox") || [],
    ) as HTMLElement[];
    return showSelectAll && _selectAllEl
      ? [_selectAllEl, ...listItems]
      : listItems;
  }

  function focusCheckboxAt(index: number) {
    const checkboxes = getCheckboxList();
    if (checkboxes.length === 0) return;
    const checkbox = checkboxes[index];
    const input = findFirstFocusableNode([checkbox]) as HTMLElement | null;

    input?.focus();

    _focusedIndex = index;
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

  function focusFirstCheckbox() {
    const checkboxes = getCheckboxList();
    if (checkboxes.length === 0) return;

    focusCheckboxAt(0);
  }

  function focusLastCheckbox() {
    const checkboxes = getCheckboxList();
    if (checkboxes.length === 0) return;

    focusCheckboxAt(checkboxes.length - 1);
  }

  function focusNextCheckbox() {
    const checkboxes = getCheckboxList();
    if (checkboxes.length === 0) return;

    const index = Math.min(_focusedIndex + 1, checkboxes.length - 1);
    focusCheckboxAt(index);
  }

  function focusPreviousCheckbox() {
    const checkboxes = getCheckboxList();
    if (checkboxes.length === 0) return;

    // If filterable and focus is on the first checkbox, move focus to the filter input
    if (filterable && _focusedIndex === 0) {
      focusFilterTextbox();
      return;
    }

    // Otherwise focus the previous checkbox or keep focus at the first checkbox
    const index = Math.max(_focusedIndex - 1, 0);
    focusCheckboxAt(index);
  }

  function focusFilterTextbox() {
    if (!filterable) return;

    _filterInputEl?.focus();
  }

  function handleFilterKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      focusFirstCheckbox();
    }
  }

  function handleSelectAllChange(e: Event) {
    e.stopPropagation();
    const detail = (e as CustomEvent<{ checked: boolean }>).detail;
    if (!detail) return;
    if (detail.checked) {
      // Use visible options in the case of a filter
      const allValues = _visibleOptions.map((o) => o.value);
      const allLabels = _visibleOptions.map((o) => o.label || o.value);
      value = allValues;
      dispatch(
        _rootEl,
        "_change",
        { name, value: allValues, labels: allLabels },
        { bubbles: true },
      );
    } else {
      value = [];
      dispatch(
        _rootEl,
        "_change",
        { name, value: [], labels: [] },
        { bubbles: true },
      );
    }
  }

  function handleCheckboxListChange(e: Event) {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    if (!detail) return;
    const newValues: string[] = detail.value || [];
    const labels: string[] = detail.labels || [];
    value = newValues;
    dispatch(
      _rootEl,
      "_change",
      { name, value: newValues, labels },
      { bubbles: true },
    );
  }

  function handleKeydown(e: KeyboardEvent) {
    if (isDisabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        if (!_isOpen) {
          e.preventDefault();
          _isOpen = true;
        }
        break;
      case "Escape":
        if (_isOpen) {
          e.preventDefault();
          e.stopPropagation();
          _isOpen = false;
          _triggerEl?.focus();
        }
        break;

      case "Tab":
        if (_isOpen) {
          _isOpen = false;
        }
        break;

      case "ArrowDown":
        if (!_isOpen) {
          e.preventDefault();
          focusFirstCheckbox();
          _isOpen = true;
        } else {
          e.preventDefault();
          focusNextCheckbox();
        }
        break;

      case "ArrowUp":
        if (_isOpen) {
          e.preventDefault();
          focusPreviousCheckbox();
        }
        break;

      case "End":
        if (_isOpen) {
          e.preventDefault();
          focusLastCheckbox();
        }
        break;
      case "Home":
        if (_isOpen) {
          e.preventDefault();
          focusFirstCheckbox();
        }
        break;
    }
  }

  function handleClearIconClick() {
    if (isDisabled) return;
    value = [];
    dispatch(
      _rootEl,
      "_change",
      { name, value: [], labels: [] },
      { bubbles: true },
    );
    if (filterable) {
      requestAnimationFrame(focusFilterTextbox);
    }
    _isOpen = true;
  }

  function handleClearIconKeyDown(e: KeyboardEvent) {
    if (isDisabled) return;
    value = [];
    dispatch(
      _rootEl,
      "_change",
      { name, value: [], labels: [] },
      { bubbles: true },
    );
    if (filterable) {
      requestAnimationFrame(focusFilterTextbox);
    }
    _isOpen = true;
  }
</script>

<div
  bind:this={_rootEl}
  class="root"
  style={styles(calculateMargin(mt, mr, mb, ml), style("width", width))}
  data-testid={testid}
>
  <slot />
  <goa-popover
    bind:this={_popoverEl}
    padded="false"
    tabindex="-1"
    filterablecontext="true"
    open={fromBoolean(_isOpen)}
    width={_popoverWidth}
    disabled={fromBoolean(isDisabled)}
  >
    <div slot="target">
      <div
        bind:this={_triggerEl}
        class="trigger"
        class:compact={size === "compact"}
        class:disabled={isDisabled}
        class:error={isError}
        role="combobox"
        tabindex={isDisabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={_isOpen}
        aria-controls={_contentId}
        aria-label={ariaLabel || undefined}
        aria-labelledby={ariaLabelledBy || undefined}
        aria-disabled={isDisabled || undefined}
        on:keydown={handleKeydown}
      >
        {#if leadingIcon || filterable}
          <goa-icon
            class="dropdown-input--leading-icon"
            data-testid={testid ? `${testid}-leading-icon` : undefined}
            size={size === "compact" ? "small" : "medium"}
            type={filterable ? "search" : leadingIcon}
          />
        {/if}
        {#if _isOpen && filterable}
          <input
            bind:this={_filterInputEl}
            bind:value={_filterText}
            class="filter-input"
            type="text"
            placeholder="Filter..."
            aria-label="Filter options"
            autocomplete="off"
            data-testid={testid ? `${testid}-filter-input` : undefined}
            on:click|stopPropagation
            on:keydown={handleFilterKeydown}
          />
        {:else}
          <span class="value-display" class:placeholder={!_hasValue}>
            {_hasValue ? _displayText : placeholder || "—Select—"}
          </span>
        {/if}
        {#if _isOpen && filterable && _filterText.length > 0}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <goa-icon-button
            id={name}
            data-testid="clear-icon"
            tabindex={isDisabled ? undefined : 0}
            arialabel={`clear ${ariaLabel || name}`}
            on:click={handleClearIconClick}
            on:keydown={handleClearIconKeyDown}
            class="dropdown-icon--clear"
            class:disabled={isDisabled}
            disabled={isDisabled ? "true" : "false"}
            size={size === "compact" ? "xsmall" : "medium"}
            theme="filled"
            variant="dark"
            icon="close"
          />
        {:else}
          <goa-icon
            type={_isOpen ? "chevron-up" : "chevron-down"}
            size="medium"
            aria-hidden="true"
          />
        {/if}
      </div>
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      id={_contentId}
      role="dialog"
      aria-label={placeholder || "Options"}
      class="content"
      style="max-height: {maxHeight}; "
      on:keydown={handleKeydown}
    >
      {#if showSelectAll && _options.length > 0}
        <goa-checkbox
          bind:this={_selectAllEl}
          name="select-all"
          value="select-all"
          text="Select all"
          data-testid={testid ? `${testid}-select-all` : undefined}
          version="2"
          checked={fromBoolean(_allSelected)}
          indeterminate={fromBoolean(_someSelected)}
          disabled={fromBoolean(isDisabled)}
          {size}
          on:_change={handleSelectAllChange}
        />
        <hr class="select-all-divider" />
      {/if}
      {#if _options.length > 0}
        <goa-checkbox-list
          bind:this={_checkboxListEl}
          {name}
          {value}
          disabled={fromBoolean(isDisabled)}
          version="2"
          {size}
          testid={testid ? `${testid}-checkbox-list` : undefined}
          on:_change={handleCheckboxListChange}
        >
          {#each _visibleOptions as option (option.value)}
            <goa-checkbox
              name={option.value}
              value={option.value}
              text={option.label || option.value}
              version="2"
              checked={fromBoolean(value.includes(option.value))}
              {size}
            />
          {/each}
        </goa-checkbox-list>
      {/if}
    </div>
  </goa-popover>
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: block;
  }

  .root {
    width: 100%;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--goa-space-xs);
    width: 100%;
    min-height: var(--goa-dropdown-multiselect-height, 56px);
    padding: 0 var(--goa-dropdown-multiselect-padding-lr, var(--goa-space-s));
    box-shadow: var(
      --goa-dropdown-multiselect-border,
      inset 0 0 0 var(--goa-input-border-width-default)
        var(--goa-input-color-border-default)
    );
    border-radius: var(
      --goa-dropdown-multiselect-border-radius,
      var(--goa-input-border-radius-input)
    );
    background: var(
      --goa-dropdown-multiselect-color-bg,
      var(--goa-input-color-background-default)
    );
    transition: var(
      --goa-dropdown-multiselect-transition,
      box-shadow 0.05s ease-in
    );
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .trigger:hover {
    box-shadow: var(
      --goa-dropdown-multiselect-border-hover,
      inset 0 0 0 var(--goa-input-border-width-focus)
        var(--goa-input-color-border-hover)
    );
  }

  .trigger.compact {
    min-height: var(--goa-dropdown-multiselect-compact-height, 40px);
    padding: var(
      --goa-dropdown-multiselect-compact-padding,
      0 var(--goa-space-s)
    );
  }

  .trigger:focus-visible {
    box-shadow: var(
      --goa-dropdown-multiselect-border-focus,
      inset 0 0 0 var(--goa-input-border-width-focus)
        var(--goa-input-color-border-focus)
    );
  }

  .trigger.error {
    box-shadow: var(
      --goa-dropdown-multiselect-border-error,
      inset 0 0 0 var(--goa-input-border-width-focus)
        var(--goa-input-color-border-error)
    );
  }

  .trigger.error:hover {
    box-shadow: var(
      --goa-dropdown-multiselect-border-error-hover,
      inset 0 0 0 var(--goa-input-border-width-focus)
        var(--goa-input-color-border-error-hover)
    );
  }

  .trigger.disabled {
    box-shadow: var(
      --goa-dropdown-multiselect-border-disabled,
      inset 0 0 0 var(--goa-input-border-width-default)
        var(--goa-input-color-border-disabled)
    );
    background: var(
      --goa-dropdown-multiselect-color-bg-disabled,
      var(--goa-input-color-background-disabled)
    );
    cursor: default;
  }

  .value-display {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    font: var(
      --goa-dropdown-multiselect-typography,
      var(--goa-typography-body-m)
    );
    color: var(
      --goa-dropdown-multiselect-color-text,
      var(--goa-input-color-text-default)
    );
  }

  .disabled .value-display {
    color: var(
      --goa-dropdown-multiselect-color-text-disabled,
      var(--goa-input-color-text-disabled)
    );
  }

  .value-display.placeholder {
    color: var(
      --goa-dropdown-multiselect-color-text-placeholder,
      var(--goa-input-color-text-default)
    );
  }

  .filter-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font: var(
      --goa-dropdown-multiselect-typography,
      var(--goa-typography-body-m)
    );
    color: var(
      --goa-dropdown-multiselect-color-text,
      var(--goa-input-color-text-default)
    );
    min-width: 0;
    padding: 0;
  }

  .filter-input::placeholder {
    color: var(
      --goa-dropdown-multiselect-color-text-placeholder,
      var(--goa-input-color-text-default)
    );
  }

  .content {
    overflow-y: auto;
    padding: var(
      --goa-dropdown-multiselect-padding,
      var(--goa-space-m) var(--goa-space-s)
    );
  }

  .select-all-divider {
    border: none;
    border-top: var(
      --goa-dropdown-multiselect-divider,
      var(--goa-border-width-s) solid var(--goa-color-greyscale-200)
    );
    margin: var(--goa-space-m) 0;
  }
</style>
