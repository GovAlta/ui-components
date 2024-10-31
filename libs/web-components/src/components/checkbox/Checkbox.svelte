<svelte:options customElement="goa-checkbox" />

<!-- Script -->
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
    FormSetValueMsg,
    FormSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountRelayDetail,
    FormFieldMountMsg,
  } from "../../types/relay-types";

  // Required
  export let name: string;

  // Optional values
  export let checked: string = "false";
  export let text: string = "";
  export let value: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let description: string = "";
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private
  let _value: string;
  let _checkboxRef: HTMLElement;
  let _descriptionId: string;
  let _rootEl: HTMLElement;
  let _error: boolean;
  let _prevError = _error;

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
  $: isChecked = toBoolean(checked);
  $: isIndeterminate = false; // Design review. To be built with TreeView Later

  onMount(() => {
    // hold on to the initial value to prevent losing it on check changes
    _value = value;
    _descriptionId = `description_${name}`;

    addRelayListener();
    sendMountedMessage();
  });

  function addRelayListener() {
    receive(_checkboxRef, (action, data) => {
      switch (action) {
        case FormSetValueMsg:
          onSetValue(data as FormSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          error = "true";
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
      }
    });
  }

  function onSetValue(detail: FormSetValueRelayDetail) {
    value = detail.value;
    checked = detail.value ? "true" : "false";
    dispatch(_checkboxRef, "_change", { name, value }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _checkboxRef,
      FormFieldMountMsg,
      { name, el: _checkboxRef },
      { bubbles: true, timeout: 10 },
    );
  }

  function onChange(e: Event) {
    // Manually set the focus back to the checkbox after the state change
    _checkboxRef.focus();
    // An empty string is required as setting the second value to `null` caused the data to get
    // out of sync with the events.
    const newCheckStatus = !isChecked;
    const newValue = newCheckStatus ? `${_value || "checked"}` : "";

    // set the local state
    checked = fromBoolean(newCheckStatus);

    e.target?.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, checked: newCheckStatus, value: newValue },
        bubbles: true,
      }),
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
  <label
    data-testid={testid}
    for={name}
    class:disabled={isDisabled}
    class:error={_error}
  >
    <div class="container" class:selected={isChecked}>
      <input
        bind:this={_checkboxRef}
        id={name}
        {name}
        checked={isChecked}
        disabled={isDisabled}
        type="checkbox"
        value={`${value}`}
        aria-label={arialabel || text || name}
        aria-describedby={description ? _descriptionId : null}
        aria-invalid={_error ? "true" : "false"}
        on:change={onChange}
        on:focus={onFocus}
      />
      {#if isIndeterminate}
        <svg
          id="dashmark"
          data-testid="dashmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 2"
        >
          <rect width="15" height="2" />
        </svg>
      {:else if isChecked}
        <svg
          id="checkmark"
          data-testid="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 12.18"
        >
          <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
        </svg>
      {/if}
    </div>
    <div class="text" data-testid="text">
      <slot></slot>
        {text}
    </div>
  </label>
  {#if $$slots.description || description}
    <div class="description" id={_descriptionId} data-testid="description">
      <slot name="description" />
      {description}
    </div>
  {/if}
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: block;
  }

  .root {
    display: inline-block;
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

  label {
    display: flex;
    cursor: pointer;
  }

  .text {
    padding-left: var(--goa-space-xs);
    user-select: none;
    font-weight: var(--goa-font-weight-regular);
    line-height: var(--goa-line-height-3);
  }

  .description {
    font: var(--goa-typography-body-xs);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
  }

  /* Container */
  .container {
    box-sizing: border-box;
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    border-radius: 2px;
    background-color: var(--goa-color-greyscale-white);
    height: var(--goa-space-l);
    width: var(--goa-space-l);
    margin-top: var(--goa-space-3xs);
    display: flex;
    justify-content: center;

    /* prevent squishing of checkbox */
    flex: 0 0 auto;
  }
  .container:hover {
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }
  .container svg {
    fill: var(--goa-color-greyscale-white);
    margin: 3px;
  }
  .container.selected {
    background-color: var(--goa-color-interactive-default);
    border: none;
  }
  .container.selected:hover {
    background-color: var(--goa-color-interactive-hover);
  }

  /* Error Container */
  .error .container,
  .error .container:hover {
    border: var(--goa-border-width-m) solid var(--goa-color-interactive-error);
    background-color: var(--goa-color-greyscale-white);
    box-shadow: none;
  }
  .error .container svg {
    fill: var(--goa-color-interactive-error);
  }

  /* Focus Container */
  .container:has(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  /* Disabled */
  .disabled {
    cursor: default;
  }
  .disabled .text {
    color: var(--goa-color-greyscale-500);
  }
  /* override base settings */
  .disabled:not(.error) .container {
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-400);
    box-shadow: none;
  }
  .disabled:not(.error) .container.selected {
    border: none;
    background-color: var(--goa-color-interactive-disabled);
  }
  .disabled.error .container.selected {
    border: var(--goa-border-width-s) solid var(--goa-color-interactive-error);
    box-shadow: inset 0 0 0 1px var(--goa-color-interactive-error);
  }
</style>
