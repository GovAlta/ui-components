<svelte:options tag="goa-checkbox" />

<!-- Script -->
<script lang="ts">

import { toBoolean } from "../../common/utils";
  // Required
  export let name: string;

  // Optional values
  export let id: string = "";
  export let text: string = "";
  export let value: string = "";
  export let checked: string;
  export let disabled: string;
  export let error: string;
  export let testid: string = "";

  $: id = id ? id : `id-${name}`;
  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);
  $: isIndeterminate = false; // Desighn review. To be built with TreeView Later

  function onChange(e: Event) {
    // An empty string is required as setting the second value to `null` caused the data to get
    // out of sync with the events.
    const newCheckStatus = !isChecked;
    const _value = newCheckStatus ? `${value || "checked"}` : "";

    e.target.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, checked: newCheckStatus, value: _value },
      }),
    );
  }
</script>

<!-- View -->

<label
  for={id}
  class="goa-checkbox"
  class:goa-checkbox--disabled={isDisabled}
  class:goa-checkbox--error={isError}
>
  <div class="goa-checkbox-container" class:goa-checkbox--selected={isChecked}>
    <input
      {id}
      data-testid={testid}
      {name}
      checked={isChecked}
      disabled={isDisabled}
      type="checkbox"
      value={`${value}`}
      on:change={onChange}
    />
    {#if isIndeterminate}
      <svg id="dashmark" data-testid='dashmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 2">
        <rect width="15" height="2" />
      </svg>
    {:else if isChecked}
      <svg id="checkmark" data-testid='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.18">
        <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
      </svg>
    {/if}
  </div>
  <div
    class="goa-checkbox-text"
    data-testid='text'>
    <slot name="main">
      {text}
    </slot>
  </div>
</label>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .goa-checkbox {
    display: inline-flex;
    align-items: center;
    min-height: calc(3rem - 4px);
    cursor: pointer;
  }
  .goa-checkbox input[type="checkbox"] {
    /* hide the input, but still make it tab-able */
    opacity: 0;
    position: absolute;
  }

  /* disabled state */
  .goa-checkbox--disabled {
    opacity: 30%;
  }

  label.goa-checkbox--disabled {
    cursor: default;
  }

  .goa-checkbox-container {
    box-sizing: border-box;
    border: 1px solid var(--color-gray-600);
    border-radius: 2px;
    background-color: var(--color-white);
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    justify-content: center;
    padding: 3px;
  }
  .goa-checkbox-container svg {
    fill: var(--color-white);
  }

  .goa-checkbox-container.goa-checkbox--selected {
    background-color: var(--goa-color-interactive);
  }

  .goa-checkbox-container:hover:not(.goa-checkbox--selected) {
    background-color: var(--color-gray-100);
  }

  .goa-checkbox-container:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--highlight);
    outline: none;
  }

  .goa-checkbox-text {
    padding-left: 0.5rem;
    user-select: none;
    font-weight: var(--fw-regular);
  }

  /* Error state */
  .goa-checkbox--error .goa-checkbox-container {
    border: 2px solid var(--goa-color-status-emergency);
  }
</style>
