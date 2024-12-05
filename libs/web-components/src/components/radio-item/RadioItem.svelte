<svelte:options customElement={{
  tag: "goa-radio-item",
  props: {
    value: { reflect: true },
    description: { reflect: true },
    checked: { reflect: true },
    arialabel: { reflect: true },
    error: { reflect: true },
  }
}}/>

<script lang="ts" context="module">
  export type GoARadioItemProps = {
    el: HTMLElement;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    error: boolean;
    name: string;
    checked: boolean;
    ariaLabel: string;
    maxWidth: string;
  };

  export type RadioItemSelectProps = {
    checked: boolean;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fromBoolean, toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  export let value: string;
  export let name: string = "";
  export let label: string = "";
  export let description: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let checked: string = "false";
  export let arialabel: string = "";
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

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
  });

  // Functions
  function dispatchInit() {
    setTimeout(() => {
      _radioItemEl?.dispatchEvent(
        new CustomEvent<GoARadioItemProps>("radio-item:mounted", {
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
            maxWidth: maxwidth,
          },
        }),
      );
    }, 10);
  }

  function addInitListener() {
    _radioItemEl.addEventListener("radio-group:init", (e: Event) => {
      const data = (e as CustomEvent<GoARadioItemProps>).detail;
      isDisabled = data.disabled;
      error = fromBoolean(data.error);
      checked = fromBoolean(data.checked);
      description = data.description;
      name = data.name;
    });
  }

  function addSelectListener() {
    _radioItemEl.addEventListener("radio-group:select", (e: Event) => {
      isChecked = (e as CustomEvent<RadioItemSelectProps>).detail.checked;
    });
  }

  function onChange() {
    if (isDisabled) return;
    if (isChecked) return;

    const event = new CustomEvent("_radioItemChange", {
      detail: value,
      composed: true,
      bubbles: true,
    });
    _radioItemEl.dispatchEvent(event);
  }
</script>

<div
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  class="goa-radio-container"
>
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
      {value}
      disabled={isDisabled}
      checked={isChecked}
      aria-label={arialabel}
      aria-describedby={$$slots.description || description
        ? `${name}-${value}-description`
        : undefined}
      aria-checked={isChecked}
      on:click={onChange}
    />
    <div class="goa-radio-icon" />
    <span class="goa-radio-label">
      {label || value}
    </span>
  </label>
  {#if $$slots.description || description}
    <div class="goa-radio-description" id={`${name}-${value}-description`}>
      <slot name="description" />
      {description}
    </div>
  {/if}
</div>

<style>

:host {
    /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-radio-size: var(--goa-space-l);
    --goa-radio-border-radius: 50%;

    --goa-radio-label: var(--goa-typography-body-m);
    --goa-radio-label-color-disabled: var(--goa-color-greyscale-500);
    --goa-radio-description: var(--goa-typography-body-xs);

    --goa-radio-border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    --goa-radio-border-hover: var(--goa-border-width-m) solid var(--goa-color-interactive-hover);
    --goa-radio-border-error: var(--goa-border-width-m) solid var(--goa-color-interactive-error);
    --goa-radio-border-error-hover: var(--goa-border-width-m) solid #ba0000;
    --goa-radio-border-error-disabled: var(--goa-border-width-m) solid #f58185;
    --goa-radio-border-disabled: var(--goa-border-width-s) solid var(--goa-color-greyscale-400);

    --goa-radio-border-checked: 7px solid var(--goa-color-interactive-default);
    --goa-radio-border-checked-hover: 7px solid var(--goa-color-interactive-hover);
    --goa-radio-border-checked-error: 7px solid var(--goa-color-interactive-error);
    --goa-radio-border-checked-error-hover: 7px solid #ba0000;
    --goa-radio-border-checked-error-disabled: 7px solid #f58185;
    --goa-radio-border-checked-disabled: 7px solid var(--goa-color-interactive-disabled);

    --goa-radio-border-focus: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);

    --goa-radio-color-bg: var(--goa-color-greyscale-white);
    --goa-radio-: var(--goa-color-greyscale-100);

}

  .goa-radio {
    display: inline-flex;
  }

  label.goa-radio {
    box-sizing: border-box;
    display: inline-flex;
  }

  .goa-radio-container {
    display: flex;
    flex-direction: column;
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
    min-height: 28px;
    margin: 0;
    opacity: 0;
  }

  .goa-radio-label {
    padding: 0 var(--goa-space-xs);
    font: var(--goa-radio-label);
  }

  .goa-radio-description {
    font: var(--goa-radio-description);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
    color: var(--goa-color-text-default);
  }

  .goa-radio-icon {
    display: inline-block;
    height: var(--goa-radio-size);
    width: var(--goa-radio-size);
    border-radius: var(--goa-radio-border-radius);
    background-color: var(--goa-radio-color-bg);
    transition: box-shadow 100ms ease-in-out;

    /* prevent squishing of radio button */
    flex: 0 0 auto;
    margin-top: var(--font-valign-fix);
  }

  .goa-radio--disabled .goa-radio-label,
  .goa-radio--disabled ~ .goa-radio-description {
    color: var(--goa-radio-label-color-disabled);
  }
  .goa-radio--disabled:hover {
    cursor: default;
  }

  /* States --------------------------------------------- */

  /* Default */
  input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: var(--goa-radio-border);
    margin-top: 3px;
  }
  /* Default:hover */
  input[type="radio"]:hover ~ .goa-radio-icon {
    border: var(--goa-radio-border-hover);
  }
  /* Default:focus */
  input[type="radio"]:focus-visible ~ .goa-radio-icon,
  input[type="radio"]:hover:focus-visible ~ .goa-radio-icon {
    outline: var(--goa-radio-border-focus);
  }
  /* Default:hover+focus */
  input[type="radio"]:hover:focus-visible ~ .goa-radio-icon {
    border: var(--goa-radio-border);
  }

  /* Checked */
  input[type="radio"]:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked);
    margin-top: 3px;
  }
  /* Checked:hover */
  input[type="radio"]:checked:hover ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked-hover);
  }
  /* Checked:hover+focus */
  input[type="radio"]:checked:hover:focus-visible ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .goa-radio-icon,
  input[type="radio"]:disabled:focus-visible ~ .goa-radio-icon {
    border: var(--goa-radio-border-disabled);
  }
  input[type="radio"]:disabled:checked ~ .goa-radio-icon,
  input[type="radio"]:disabled:checked:focus-visible ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked-disabled);
  }

  /* Error */
  .goa-radio--error input[type="radio"] ~ .goa-radio-icon {
    border: var(--goa-radio-border-error);
  }
  .goa-radio--error input[type="radio"]:hover ~ .goa-radio-icon {
    border: var(--goa-radio-border-error-hover);
  }
  .goa-radio--error input[type="radio"]:hover:focus-visible ~ .goa-radio-icon {
    outline: var(--goa-radio-border-focus);
    border: var(--goa-radio-border-error);
  }
  .goa-radio--error input[type="radio"]:checked ~ .goa-radio-icon{
    border: var(--goa-radio-border-checked-error);
  }
  .goa-radio--error input[type="radio"]:checked:hover ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked-error-hover);
  }
  .goa-radio--error input[type="radio"]:checked:hover:focus-visible ~ .goa-radio-icon {
    outline: var(--goa-radio-border-focus);
     border: var(--goa-radio-border-checked-error);
  }
  .goa-radio--error input[type="radio"]:disabled ~ .goa-radio-icon {
    border: var(--goa-radio-border-error-disabled);
  }
  .goa-radio--error input[type="radio"]:disabled:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-checked-error-disabled);
  }
</style>


