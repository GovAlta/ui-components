<svelte:options customElement="goa-checkbox-list" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import {
    dispatch,
    receive,
    relay,
    toBoolean,
    typeValidator,
  } from "../../common/utils";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountRelayDetail,
    FormFieldMountMsg,
    FieldsetResetFieldsMsg,
    FieldsetErrorRelayDetail,
    CheckboxListItemMountedRelayDetail,
    CheckboxListItemDestroyRelayDetail,
    CheckboxListItemMountedMsg,
    CheckboxListItemDestroyMsg,
    CheckboxListItemSetValueMsg,
    CheckboxListItemSetErrorMsg,
    CheckboxListItemResetErrorsMsg,
    CheckboxListItemResetFieldsMsg,
    CheckboxListItemSetValueRelayDetail,
    CheckboxListItemSetErrorRelayDetail,
  } from "../../types/relay-types";

  // Validators
  const [ORIENTATIONS, validateOrientation] = typeValidator(
    "Orientation",
    ["vertical", "horizontal"],
    false,
  );

  type Orientation = (typeof ORIENTATIONS)[number];

  // Required
  export let name: string;

  // Optional values
  export let value: string = "[]";
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let orientation: Orientation = "vertical";
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private
  let _rootEl: HTMLElement;
  let _checkboxGroupRef: HTMLElement;
  let _error: boolean;
  let _prevError: boolean;
  let _selectedValues: string[] = [];

  // Option interface
  interface CheckboxOption {
    value: string;
    text: string;
    disabled: boolean;
    el: HTMLElement;
  }

  let _options: CheckboxOption[] = [];
  let _bindTimeoutId: any;

  // Binding
  $: isDisabled = toBoolean(disabled);
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
  $: {
    try {
      _selectedValues = JSON.parse(value || "[]");
    } catch (e) {
      _selectedValues = [];
    }
  }

  onMount(() => {
    validateOrientation(orientation);
    addRelayListener();
    sendMountedMessage();
  });

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          _options.forEach((option) => {
            relay<CheckboxListItemSetErrorRelayDetail>(
              option.el,
              CheckboxListItemResetErrorsMsg,
              null,
            );
          });
          break;
        case FieldsetResetFieldsMsg:
          onResetFields();
          break;
        case CheckboxListItemMountedMsg:
          onChildMounted(data as CheckboxListItemMountedRelayDetail);
          break;
        case CheckboxListItemDestroyMsg:
          onChildDestroyed(data as CheckboxListItemDestroyRelayDetail);
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";

    _options.forEach((option) => {
      relay<CheckboxListItemSetErrorRelayDetail>(
        option.el,
        CheckboxListItemSetErrorMsg,
        {
          error: detail.error,
        },
      );
    });
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;

    let newSelectedValues: string[] = [];
    try {
      newSelectedValues = JSON.parse(value || "[]");
    } catch (e) {
      newSelectedValues = [];
    }

    _selectedValues = newSelectedValues;

    _options.forEach((option) => {
      const isChecked = newSelectedValues.includes(option.value);
      relay<CheckboxListItemSetValueRelayDetail>(
        option.el,
        CheckboxListItemSetValueMsg,
        {
          value: option.value,
          checked: isChecked,
        },
      );
    });

    dispatchChange();
  }

  function onResetFields() {
    value = "[]";
    _selectedValues = [];

    _options.forEach((option) => {
      relay<CheckboxListItemSetValueRelayDetail>(
        option.el,
        CheckboxListItemSetValueMsg,
        {
          value: option.value,
          checked: false,
        },
      );
    });

    dispatchChange();
  }

  function sendMountedMessage() {
    if (!name) return;

    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onChildMounted(detail: CheckboxListItemMountedRelayDetail) {
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

    relay(detail.el, "checkbox-list:bind", { el: _rootEl });

    if (_bindTimeoutId) {
      clearTimeout(_bindTimeoutId);
    }
    _bindTimeoutId = setTimeout(() => {
      _options = _options;
    }, 1);
  }

  function onChildDestroyed(detail: CheckboxListItemDestroyRelayDetail) {
    _options = _options.filter((option) => option.value !== detail.value);
  }

  function onCheckboxChange(optionValue: string, checked: boolean) {
    let newSelectedValues = [..._selectedValues];

    if (checked) {
      if (!newSelectedValues.includes(optionValue)) {
        newSelectedValues.push(optionValue);
      }
    } else {
      newSelectedValues = newSelectedValues.filter(
        (val) => val !== optionValue,
      );
    }

    _selectedValues = newSelectedValues;
    value = JSON.stringify(newSelectedValues);
    dispatchChange();
  }

  function dispatchChange() {
    dispatch(
      _rootEl,
      "_change",
      { name, value, values: _selectedValues },
      { bubbles: true },
    );
  }

  function onFocus() {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }
</script>

<div
  bind:this={_rootEl}
  class="root"
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
>
  <div
    bind:this={_checkboxGroupRef}
    class="checkbox-list"
    class:orientation-horizontal={orientation === "horizontal"}
    class:orientation-vertical={orientation === "vertical"}
    class:disabled={isDisabled}
    class:error={_error}
    role="group"
    aria-label={arialabel || name}
    aria-invalid={_error ? "true" : "false"}
    data-testid={testid}
    on:focus={onFocus}
  >
    <!-- Render checkboxes for each option -->
    {#each _options as option (option.value)}
      <label
        class="checkbox-item"
        class:disabled={isDisabled || option.disabled}
        class:error={_error}
      >
        <div
          class="container"
          class:selected={_selectedValues.includes(option.value)}
        >
          <input
            type="checkbox"
            name={`${name}_${option.value}`}
            value={option.value}
            checked={_selectedValues.includes(option.value)}
            disabled={isDisabled || option.disabled}
            aria-invalid={_error ? "true" : "false"}
            on:change={(e) =>
              onCheckboxChange(option.value, e.currentTarget.checked)}
            on:focus={onFocus}
          />
          {#if _selectedValues.includes(option.value)}
            <svg
              class="checkmark"
              data-testid="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 12.18"
            >
              <path
                d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z"
              />
            </svg>
          {/if}
        </div>
        <div class="text" data-testid="text">
          {option.text}
        </div>
      </label>
    {/each}

    <!-- Slot for checkbox list items -->
    <slot />
  </div>
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: block;
  }

  .root {
    display: block;
    height: auto;
    min-height: 0;
    padding: 0;
  }

  .checkbox-list {
    display: flex;
  }

  /* Vertical orientation - default */
  .checkbox-list.orientation-vertical {
    flex-direction: column;
    gap: var(--goa-space-s);
  }

  /* Horizontal orientation - for 2 or fewer options */
  .checkbox-list.orientation-horizontal {
    flex-direction: row;
    gap: var(--goa-space-l);
    flex-wrap: wrap;
  }

  .checkbox-item {
    display: flex;
    cursor: pointer;
    align-items: flex-start;
  }

  .checkbox-item.disabled {
    cursor: default;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    transform: scale(0);
    margin: 0;
    cursor: pointer;
  }

  input[type="checkbox"][disabled]:hover {
    cursor: default;
  }

  .checkbox-item:hover .container {
    border: var(--goa-checkbox-border-hover);
  }

  .checkbox-item:hover .container.selected {
    background-color: var(--goa-checkbox-color-bg-checked-hover);
    border: none;
  }

  .text {
    padding-left: var(--goa-checkbox-gap);
    user-select: none;
    font: var(--goa-checkbox-label-font-size);
    color: var(--goa-checkbox-color-label);
  }

  /* Container */
  .container {
    box-sizing: border-box;
    border: var(--goa-checkbox-border);
    border-radius: var(--goa-checkbox-border-radius);
    background-color: var(--goa-checkbox-color-bg);
    height: var(--goa-checkbox-size);
    width: var(--goa-checkbox-size);
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
  }

  .container:hover {
    border: var(--goa-checkbox-border-hover);
  }

  .container.selected {
    background-color: var(--goa-checkbox-color-bg-checked);
    border: none;
  }

  .container.selected:hover {
    background-color: var(--goa-checkbox-color-bg-checked-hover);
  }

  .container svg {
    fill: var(--goa-checkbox-color-bg);
    margin: 3px;
  }

  /* Error Container */
  .error .container,
  .error .container:hover {
    border: var(--goa-checkbox-border-error);
    background-color: var(--goa-checkbox-color-bg);
    box-shadow: none;
  }

  .error .container.selected,
  .error .container.selected:hover {
    border: var(--goa-checkbox-border-error);
    background-color: var(--goa-checkbox-color-bg);
  }

  .checkbox-item:hover.error .container {
    border: var(--goa-checkbox-border-error);
  }

  .checkbox-item:hover.error .container.selected {
    border: var(--goa-checkbox-border-error);
    background-color: var(--goa-checkbox-color-bg);
  }

  .error .container svg {
    fill: var(--goa-checkbox-color-bg-checked-error);
    margin: 1px;
  }

  /* Focus + Error Container */
  .error .container:has(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  .error .container:has(:focus-visible):hover {
    outline: none;
    border: var(--goa-checkbox-border-error);
  }

  .error .container.selected:has(:focus-visible):hover {
    outline: none;
    border: none;
    background-color: var(--goa-checkbox-color-bg);
  }

  .checkbox-item:hover.error .container.selected:has(:focus-visible) {
    outline: none;
    border: var(--goa-checkbox-border-error);
    background-color: var(--goa-checkbox-color-bg);
  }

  .checkbox-item:hover.error .container:has(:focus-visible) {
    outline: none;
    border: var(--goa-checkbox-border-error);
  }

  /* Focus Container */
  .container:has(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  .container:has(:focus-visible):hover {
    outline: none;
    border: var(--goa-checkbox-border);
  }

  .container.selected:has(:focus-visible):hover {
    outline: none;
    border: none;
    background-color: var(--goa-checkbox-color-bg-checked);
  }

  .checkbox-item:hover .container.selected:has(:focus-visible) {
    outline: none;
    border: none;
    background-color: var(--goa-checkbox-color-bg-checked);
  }

  .checkbox-item:hover .container:has(:focus-visible) {
    outline: none;
    border: var(--goa-checkbox-border);
  }

  /* Disabled */
  .disabled {
    cursor: default;
  }

  .disabled .text {
    color: var(--goa-checkbox-color-label-disabled);
  }

  .disabled:not(.error) .container {
    border: var(--goa-checkbox-border-disabled);
    box-shadow: none;
  }

  .disabled:not(.error) .container.selected {
    border: none;
    background-color: var(--goa-checkbox-color-bg-checked-disabled);
  }

  .disabled.error .container.selected {
    border: var(--goa-checkbox-border-disabled-error);
  }

  .disabled.error .container {
    border: var(--goa-checkbox-border-disabled-error);
  }

  .checkbox-item:hover.disabled.error .container {
    border: var(--goa-checkbox-border-disabled-error);
  }

  .disabled.error .container svg {
    fill: #f58185;
  }
</style>
