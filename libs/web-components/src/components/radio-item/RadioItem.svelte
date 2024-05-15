<svelte:options customElement={{
  tag: "goa-radio-item",
  props: {
    value: { reflect: true },
    label: { reflect: true },
    description: { reflect: true },
    checked: { reflect: true },
    error: { reflect: true },
    disabled: { reflect: true },
    ariadescribedby: { reflect: true },
    arialabel: { reflect: true },
  }
}}/>

<script lang="ts" context="module">
  export type GoARadioItemProps = {
    el: HTMLElement,
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    error: boolean;
    name: string;
    checked: boolean;
    ariaLabel: string;
    ariaDescribedBy: string;
  }

  export type RadioItemSelectProps = {
    checked: boolean;
  }

</script>

<script lang="ts">
  import { onMount } from "svelte";
  import {fromBoolean, toBoolean} from "../../common/utils";

  export let value: string;
  export let label: string;
  export let description: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let name: string;
  export let checked: string = "false";
  export let arialabel: string;
  export let ariadescribedby: string;

  let _radioItemEl: HTMLElement;

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);

  // Hooks

  onMount(() => {
    dispatchInit();
    addInitListener();
    addSelectListener();
  })

  // Functions

  function dispatchInit() {
    setTimeout(() => {
      _radioItemEl?.dispatchEvent(new CustomEvent<GoARadioItemProps>("radio-item:mounted", {
        composed: true,
        bubbles: true,
        detail: {
          el: _radioItemEl,
          name,
          value,
          label,
          description,
          disabled: isDisabled,
          error: isError,
          checked: isChecked,
          ariaLabel: arialabel,
          ariaDescribedBy: ariadescribedby,
        }
      }))
    }, 10)
  }

  function addInitListener() {
    _radioItemEl.addEventListener("radio-group:init", (e: Event) => {
      const data = (e as CustomEvent<GoARadioItemProps>).detail;
      isDisabled = data.disabled;
      error = fromBoolean(data.error);
      checked = fromBoolean(data.checked);
      description = data.description;
      name = data.name;
      arialabel = data.ariaLabel;
      ariadescribedby = data.ariaDescribedBy;
    })  
  }

  function addSelectListener() {
    _radioItemEl.addEventListener("radio-group:select", (e: Event) => {
      isChecked = (e as CustomEvent<RadioItemSelectProps>).detail.checked;
    })
  }

  function onChange() {
    if (isDisabled) return;
    if (isChecked) return;

    const event = new CustomEvent('_click', {
      detail: value,
      composed: true,
      bubbles: true
    });
    _radioItemEl.dispatchEvent(event);
  }
</script>

<div class="goa-radio-container">
  <label
    bind:this={_radioItemEl}
    data-testid="radio-option-{value}"
    class="goa-radio"
    class:goa-radio--disabled={isDisabled}
    class:goa-radio--error={isError}
  >
    <input
      type="radio"
      {name}
      value={value}
      disabled={isDisabled}
      checked={isChecked}
      aria-label={arialabel}
      aria-describedby={ariadescribedby}
      on:click={onChange}
    />
    <div class="goa-radio-icon"/>
    <span class="goa-radio-label">
          {label || value}
        </span>
  </label>
  {#if $$slots.description || description}
    <div class="goa-radio-description">
      <slot name="description"/>
      {description}
    </div>
  {/if}
</div>

<style>
  label.goa-radio {
    --goa-radio-outline-width: 3px;
    --goa-radio-diameter: 1.5rem;
    --goa-radio-border-width: 1px;
    --goa-radio-border-width--checked: 7px;
    box-sizing: border-box;
    display: flex;
  }

  .goa-radio-container {
    padding-bottom: 1rem;
  }

  .goa-radio:hover {
    cursor: pointer;
  }

  .goa-radio *,
  .goa-radio *:before,
  .goa-radio *:after {
    box-sizing: border-box;
  }

  .goa-radio input[type="radio"] {
    width: 0;
    height: 0;
    margin: 0;
    opacity: 0;
  }

  .goa-radio-label {
    padding: 0 var(--goa-space-xs);
    font-weight: var(--goa-font-weight-regular);
  }

  .goa-radio-group--horizontal .goa-radio-label {
    padding-right: var(--goa-space-xl);
  }

  .goa-radio-label {
    padding-right: var(--goa-space-xl);
  }

  .goa-radio-description {
    font: var(--goa-typography-body-xs);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
  }

  .goa-radio-icon {
    display: inline-block;
    height: var(--goa-radio-diameter);
    width: var(--goa-radio-diameter);
    border-radius: 50%;
    background-color: #fff;
    transition: box-shadow 100ms ease-in-out;

    /* prevent squishing of radio button */
    flex: 0 0 auto;
    margin-top: var(--font-valign-fix);
  }

  /* What is this? */
  .goa-radio:focus > input:not(:disabled) ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive-focus);
  }

  .goa-radio--disabled .goa-radio-label {
    opacity: 0.4;
  }

  .goa-radio--disabled:hover {
    cursor: default;
  }

  /* States */

  /* Default */
  input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-color-greyscale-700);
  }

  /* Default:hover */
  input[type="radio"]:hover ~ .goa-radio-icon {
    border: 1px solid var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-hover);
  }

  /* Checked:hover */
  input[type="radio"]:checked:hover ~ .goa-radio-icon {
    border: 7px solid var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-hover);
  }

  /* Default:focus */
  input[type="radio"]:focus ~ .goa-radio-icon,
  input[type="radio"]:hover:active ~ .goa-radio-icon,
  input[type="radio"]:hover:focus ~ .goa-radio-icon,
  input[type="radio"]:active ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive-focus);
  }

  /* Checked */
  input[type="radio"]:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid var(--goa-color-interactive-default);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .goa-radio-icon,
  input[type="radio"]:disabled:focus ~ .goa-radio-icon,
  input[type="radio"]:disabled:active ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-color-greyscale-700);
    box-shadow: none;
    opacity: 40%;
  }

  /* Disabled and checked */
  input[type="radio"]:disabled:checked ~ .goa-radio-icon,
  input[type="radio"]:disabled:checked:focus ~ .goa-radio-icon,
  input[type="radio"]:disabled:checked:active ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid var(--goa-color-interactive-hover);
    box-shadow: none;
  }

  /* Error */
  .goa-radio--error input[type="radio"]:checked ~ .goa-radio-icon,
  .goa-radio--error input[type="radio"]:disabled:checked ~ .goa-radio-icon {
    border: 7px solid var(--goa-color-emergency-default);
  }

  .goa-radio--error input[type="radio"]:hover ~ .goa-radio-icon {
    box-shadow: 0 0 0 1px var(--goa-color-emergency-default);
  }

  .goa-radio--error input[type="radio"]:hover:active ~ .goa-radio-icon,
  .goa-radio--error input[type="radio"]:hover:focus ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive-focus);
  }

  .goa-radio--error input[type="radio"]:disabled:hover ~ .goa-radio-icon {
    box-shadow: none;
  }

  .goa-radio--error input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: 2px solid var(--goa-color-emergency-default);
  }
</style>
