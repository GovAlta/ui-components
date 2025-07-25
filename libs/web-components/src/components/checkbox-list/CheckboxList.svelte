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
  export let value: string = "[]"; // JSON string array of selected values
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
          break;
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: "[]" });
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
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
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

  // function onChildMounted(detail: CheckboxListItemMountedRelayDetail) {
  //   switch (detail.mountType) {
  //     case "append":
  //       _options = [..._options, detail];
  //       break;
  //     case "prepend":
  //       _options = [detail, ..._options];
  //       break;
  //     case "reset":
  //       _options = [..._options, detail];
  //       break;
  //   }

  //   // Send message back to child that contains a reference to this component
  //   relay(detail.el, "checkbox-list:bind", { el: _rootEl });

  //   // Ensure bind only runs once for all children
  //   if (_bindTimeoutId) {
  //     clearTimeout(_bindTimeoutId);
  //   }
  //   _bindTimeoutId = setTimeout(() => {
  //     // Force reactivity update
  //     _options = _options;
  //   }, 1);
  // }

  function onChildMounted(detail: CheckboxListItemMountedRelayDetail) {
    console.log("Child mounted with detail:", detail);

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

    console.log("Updated options:", _options);

    // Send message back to child that contains a reference to this component
    relay(detail.el, "checkbox-list:bind", { el: _rootEl });

    // Ensure bind only runs once for all children
    if (_bindTimeoutId) {
      clearTimeout(_bindTimeoutId);
    }
    _bindTimeoutId = setTimeout(() => {
      // Force reactivity update
      _options = _options;
      console.log("Final options after timeout:", _options);
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

<!-- View -->

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

<!-- This is angular playground code calling svlete web component directly, no wrapper -->
<!--
<h1>Checkbox List - Direct Svelte Test</h1>

<h2>Direct Svelte Components</h2>
<goa-checkbox-list
  name="contact_prefs"
  orientation="vertical"
  value="[]"
  (_change)="onDirectSvelteChange($event)">

  <goa-checkbox-list-item value="email" text="Email"></goa-checkbox-list-item>
  <goa-checkbox-list-item value="phone" text="Phone"></goa-checkbox-list-item>
  <goa-checkbox-list-item value="text" text="Text message"></goa-checkbox-list-item>
  <goa-checkbox-list-item value="mail" text="Mail" disabled="true"></goa-checkbox-list-item>
</goa-checkbox-list>

<p>Direct result: {{ directResult | json }}</p>


import {
  GoabCheckboxList,
  GoabCheckboxListItem,
  GoabFormItem,
} from "@abgov/angular-components";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "abgov-checkbox-list",
  templateUrl: "./checkbox-list.component.html",
  imports: [
    GoabCheckboxList,
    GoabCheckboxListItem,
    GoabFormItem,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class CheckboxListComponent {
  directResult: any = null;
  optionsCount = 0;

  onDirectSvelteChange(event: any) {
    console.log("Direct Svelte change:", event);
    this.directResult = event.detail;
  }
} -->

<!-- Styles -->
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
    gap: var(--goa-space-s); /* 8px spacing between items */
  }

  /* Horizontal orientation - for 2 or fewer options */
  .checkbox-list.orientation-horizontal {
    flex-direction: row;
    gap: var(--goa-space-l); /* 20px spacing between items */
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
    /* hide the input, but still make it tabbable */
    position: absolute;
    opacity: 0;
    transform: scale(0);
    margin: 0;
    cursor: pointer;
  }

  input[type="checkbox"][disabled]:hover {
    cursor: default;
  }

  /* Hover style when the user hovers over the label */
  .checkbox-item:hover .container {
    border: var(--goa-checkbox-border-hover);
  }

  .checkbox-item:hover .container.selected {
    background-color: var(--goa-checkbox-color-bg-checked-hover);
    border: none;
  }

  .text {
    padding-left: var(
      --goa-checkbox-gap
    ); /* 8px space between checkbox and text */
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
    margin-top: 3px; /* aligns the checkbox with the text */
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto; /* prevent squishing of checkbox */
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
