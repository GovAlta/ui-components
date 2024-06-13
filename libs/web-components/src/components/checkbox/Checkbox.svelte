<svelte:options customElement="goa-checkbox" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick } from "svelte";
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
  let _descriptionId: string;
  let _bindingType: "value" | "check";

  // Binding
  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);
  $: isIndeterminate = false; // Design review. To be built with TreeView Later

  onMount(async () => {
    await tick()
    // defining the binding type allows the wrappers to emit events with the desired value
    _bindingType = value ? "value" : "check";
    _descriptionId = `description_${name}`;
  });

  function onChange(e: Event) {
    const el = (e.target as HTMLInputElement);
    // Manually set the focus back to the checkbox after the state change
    // An empty string is required as setting the second value to `null` caused the data to get
    // out of sync with the events.
    // TODO: is this needed?
    // el.focus();
    const newCheckStatus = el.checked;
    const newValue = newCheckStatus ? value : undefined;

    // set the local state
    checked = fromBoolean(newCheckStatus);

    e.target?.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, checked: newCheckStatus, value: newValue, binding: _bindingType },
      }),
    );
  }
</script>

<!-- View -->

<div style={calculateMargin(mt, mr, mb, ml)} class="root">
  <label
    data-testid={testid}
    for={name}
    class:disabled={isDisabled}
    class:error={isError}
  >
    <div
      class="container"
      class:selected={isChecked}
    >
      <input
        id={name}
        {value}
        {name}
        checked={isChecked}
        disabled={isDisabled}
        type="checkbox"
        aria-label={arialabel || text || name}
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
    <div class="text" data-testid="text">
      <slot>
        {text}
      </slot>
    </div>
  </label>
  {#if $$slots.description || description}
    <div class="description" id={_descriptionId} data-testid="description">
      <slot name="description"/>
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
    padding-bottom: var(--goa-space-m);
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
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-hover);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
  }
  .container:focus-visible,
  .container:active {
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    outline: none;
  }
  .container:focus-within:has(:focus-visible) {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
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
  .error .container:hover,
  .error .container:focus-within {
    background-color: var(--goa-color-greyscale-white);
    border: var(--goa-border-width-s) solid var(--goa-color-emergency-default);
    box-shadow: inset 0 0 0 1px var(--goa-color-emergency-default);
  }
  .error .container:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }
  .error .container svg {
    fill: var(--goa-color-emergency-default);
  }

  /* Disabled */
  .disabled {
    cursor: default;
  }
  .disabled .text {
    opacity: 40%;
  }
  /* override base settings */
  .disabled .container,
  .disabled .container:hover {
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-400);
    box-shadow: none;
    opacity: 40%;
  }
  .disabled .container.selected,
  .disabled .container.selected:hover {
    border: none;
    background-color: var(--goa-color-interactive-default);
  }
  .disabled.error .container.selected {
    border: var(--goa-border-width-s) solid var(--goa-color-emergency-default);
    box-shadow: inset 0 0 0 1px var(--goa-color-emergency-default);
  }
</style>
