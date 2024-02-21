<svelte:options customElement="goa-checkbox" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  import { fromBoolean, toBoolean } from "../../common/utils";
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

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private
  let _value: string;
  let _checkboxRef: HTMLElement;
  let _descriptionId: string;

  // Binding
  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);
  $: isIndeterminate = false; // Design review. To be built with TreeView Later

  onMount(() => {
    // hold on to the initial value to prevent losing it on check changes
    _value = value;
    _descriptionId = `description_${name}`;
  });

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
      }),
    );
  }
</script>

<!-- View -->

<div style={calculateMargin(mt, mr, mb, ml)} class="goa-checkbox">
  <label
    class="goa-checkbox-label"
    data-testid={testid}
    for={name}
    class:goa-checkbox--disabled={isDisabled}
    class:goa-checkbox--error={isError}
  >
    <div
      class="goa-checkbox-container"
      class:goa-checkbox--selected={isChecked}
    >
      <input
        bind:this={_checkboxRef}
        id={name}
        {name}
        checked={isChecked}
        disabled={isDisabled}
        type="checkbox"
        value={`${value}`}
        aria-label={arialabel || name}
        aria-describedby={description ? _descriptionId : null}
        on:change={onChange}
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
    <div class="goa-checkbox-text">
      <div class="label-text" data-testid="text">
        <slot>
          {text}
        </slot>
      </div>
    </div>
  </label>
  {#if description}
    <div class="description-text" id={_descriptionId} data-testid="description">
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
  .goa-checkbox-label {
    display: flex;
    cursor: pointer;
  }

  .goa-checkbox {
    min-height: calc(3rem - 0.25rem);
  }
  .goa-checkbox input[type="checkbox"] {
    /* hide the input, but still make it tab-able */
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }

  .goa-checkbox-container {
    box-sizing: border-box;
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    border-radius: 2px;
    background-color: var(--goa-color-greyscale-white);
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    justify-content: center;
    padding: 3px;

    /* prevent squishing of checkbox */
    flex: 0 0 auto;
  }
  .goa-checkbox-container svg {
    fill: var(--goa-color-greyscale-white);
  }

  .goa-checkbox-container.goa-checkbox--selected {
    background-color: var(--goa-color-interactive-default);
    border: none;
  }

  .goa-checkbox-container.goa-checkbox--selected:hover {
    background-color: var(--goa-color-interactive-hover);
  }

  .goa-checkbox-container:hover {
    box-shadow: 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
    border: none;
  }

  .goa-checkbox-container:focus-within,
  .goa-checkbox-container:focus,
  .goa-checkbox-container:active {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    outline: none;
  }

  .goa-checkbox-container.goa-checkbox--selected:focus-within {
    background-color: var(--goa-color-interactive-default);
    border: none;
  }

  .goa-checkbox-text {
    padding-left: 0.5rem;
    user-select: none;
    font-weight: var(--goa-font-weight-regular);
  }

  /* Error state */
  .goa-checkbox--error .goa-checkbox-container,
  .goa-checkbox--error .goa-checkbox-container:hover {
    border: var(--goa-border-width-s) solid var(--goa-color-emergency-default);
    box-shadow: inset 0 0 0 1px var(--goa-color-emergency-default);
    background-color: var(--goa-color-greyscale-white);
  }

  .goa-checkbox--error .goa-checkbox-container:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
    background-color: var(--goa-color-greyscale-white);
    border: var(--goa-border-width-s) solid var(--goa-color-emergency-default);
  }

  .goa-checkbox--error .goa-checkbox-container svg {
    fill: var(--goa-color-emergency-default);
  }

  /* disabled state */
  .goa-checkbox--disabled .goa-checkbox-text {
    opacity: 40%;
  }

  .goa-checkbox--disabled .goa-checkbox-container,
  .goa-checkbox--disabled .goa-checkbox-container:hover {
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-400);
    box-shadow: none;
    opacity: 40%;
  }

  .goa-checkbox--disabled .goa-checkbox-container.goa-checkbox--selected,
  .goa-checkbox--disabled .goa-checkbox-container.goa-checkbox--selected:hover {
    border: none;
    background-color: var(--goa-color-interactive-default);
  }

  .goa-checkbox--disabled.goa-checkbox--error
    .goa-checkbox-container.goa-checkbox--selected {
    border: var(--goa-border-width-s) solid var(--goa-color-emergency-default);
    box-shadow: inset 0 0 0 1px var(--goa-color-emergency-default);
  }

  .goa-checkbox--disabled,
  input[type="checkbox"][disabled]:hover {
    cursor: default;
  }

  .description-text {
    font: var(--goa-typography-body-xs);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
  }
</style>
