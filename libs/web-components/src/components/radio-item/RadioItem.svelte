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
  import { dispatch, fromBoolean, receive, relay, toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { FieldsetResetFieldsMsg, FormFieldMountMsg, FormFieldMountRelayDetail } from "../../types/relay-types";

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
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // private

  let _radioItemEl: HTMLElement;
  let _revealSlotEl: HTMLElement;
  let _formFields: HTMLElement[] = [];

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);

  // Hooks

  onMount(() => {
    dispatchInit();
    addInitListener();
    addSelectListener();
    addRelayListener();
    addRevealSlotListener();
  });

  // Functions

  function addRelayListener() {
    receive(_radioItemEl, (action, data) => {
      switch (action) {
        case FormFieldMountMsg:
          onFormFieldMount(data as FormFieldMountRelayDetail);
          break;
      }
    });
  }

  // allow for the listening of messages sent by form-fields specific to the "reveal" slot
  function addRevealSlotListener() {
    receive(_revealSlotEl, (action, data) => {
      switch (action) {
        case FormFieldMountMsg:
          setCheckStatusByChildState(data as FormFieldMountRelayDetail);
          break;
      }
    });
  }

  function onFormFieldMount(detail: FormFieldMountRelayDetail) {
    if (!detail.name) return;
    if (!$$slots.reveal) return;
    _formFields = [..._formFields, detail.el];
  }

  function setCheckStatusByChildState(detail: FormFieldMountRelayDetail) {
    setTimeout(() => {
      // @ts-expect-error
      checked = !checked && !!detail.el.value;
    }, 1000);
  }
  
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

    dispatch(_radioItemEl, "_radioItemChange", value, { bubbles: true })

    if (!isChecked && !!$$slots.reveal) {
      resetChildFormFields();
    }
  }

  function resetChildFormFields() {
    for (const el of _formFields) {
      // send reset message ot child form fields
      relay(el, FieldsetResetFieldsMsg);
    }
  }
</script>

<div
  bind:this={_radioItemEl}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  data-testid="root"
>
  <label
    data-testid="radio-option-{value}"
    class="radio"
    class:radio--disabled={isDisabled}
    class:radio--error={isError}
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
    <div class="icon" />
    <span class="label">
      {label || value}
    </span>
  </label>
  {#if $$slots.description || description}
    <div class="description" id={`${name}-${value}-description`}>
      <slot name="description" />
      {description}
    </div>
  {/if}
  <div class="reveal" class:visible={$$slots.reveal && isChecked}>
    <slot name="reveal" />
  </div>
</div>

<style>
  .radio {
    --outline-width: 3px;
    --diameter: 1.5rem;
    --border-width: 1px;
    --border-width--checked: 7px;
    --border-width--hover: 2px;
    --border-width--error: 2px;
    box-sizing: border-box;
    display: flex;
  }

  .radio:hover {
    cursor: pointer;
  }

  .radio *,
  .radio *:before,
  .radio *:after {
    box-sizing: border-box;
  }

  .radio input[type="radio"] {
    width: 0;
    height: 0;
    margin: 0;
    opacity: 0;
  }

  .label {
    padding: 0 var(--goa-space-xl) 0 var(--goa-space-xs);
    font-weight: var(--goa-font-weight-regular);
  }

  .description {
    font: var(--goa-typography-body-xs);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
  }

  .reveal {
    display: none;
    height: 0;
  }
  .reveal.visible {
    border-left: 4px solid var(--goa-color-greyscale-200);
    padding: var(--goa-space-m);
    margin: var(--goa-space-2xs) 0 0 calc(var(--goa-space-s) - 2px);
    display: block;
    height: fit-content;
  }

  .icon {
    display: inline-block;
    height: var(--diameter);
    width: var(--diameter);
    border-radius: 50%;
    background-color: var(--goa-color-text-light, #fff);
    transition: box-shadow 100ms ease-in-out;

    /* prevent squishing of radio button */
    flex: 0 0 auto;
    margin-top: var(--font-valign-fix);
  }

  .radio--disabled .label {
    color: var(--goa-color-greyscale-500);
  }

  .radio--disabled:hover {
    cursor: default;
  }

  /* States */

  /* Unchecked */
  input[type="radio"]:not(:checked) ~ .icon {
    border: var(--border-width) solid
      var(--goa-color-greyscale-700);
    margin-top: 3px;
  }

  /* Hover */
  input[type="radio"]:hover ~ .icon {
    border: var(--border-width--hover) solid
      var(--goa-color-interactive-hover);
  }

  /* Checked */
  input[type="radio"]:checked ~ .icon {
    border: var(--border-width--checked) solid
      var(--goa-color-interactive-default);
    margin-top: 3px;
  }

  /* Hover & checked */
      input[type="radio"]:checked:hover ~ .icon {
    border-color: var(--goa-color-interactive-hover);
  }

  /* Focus */
  input[type="radio"]:focus ~ .icon,
  input[type="radio"]:hover:active ~ .icon,
  input[type="radio"]:hover:focus ~ .icon,
  input[type="radio"]:active ~ .icon {
    box-shadow: 0 0 0 var(--outline-width)
      var(--goa-color-interactive-focus);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .icon,
  input[type="radio"]:disabled:focus ~ .icon,
  input[type="radio"]:disabled:active ~ .icon {
    border: var(--border-width) solid
      var(--goa-color-greyscale-400);
    box-shadow: none;
  }

  /* Disabled & checked */
  input[type="radio"]:disabled:checked ~ .icon,
  input[type="radio"]:disabled:checked:focus ~ .icon,
  input[type="radio"]:disabled:checked:active ~ .icon {
    border: var(--border-width--checked) solid
      var(--goa-color-interactive-disabled);
    box-shadow: none;
  }

  /* Error & unchecked */
  .radio--error input[type="radio"]:not(:checked) ~ .icon {
    border: var(--border-width--error) solid
      var(--goa-color-interactive-error);
  }

  /* Error & checked */
  .radio--error input[type="radio"]:checked ~ .icon {
    border-color: var(--goa-color-interactive-error);
  }

  /* Error & hover */
  .radio--error input[type="radio"]:hover ~ .icon {
    border-color: var(--goa-color-interactive-error-hover, #BA0000);
  }

  /* Error & disabled */
  .radio--error input[type="radio"]:disabled ~ .icon,
  .radio--error input[type="radio"]:disabled:focus ~ .icon,
  .radio--error input[type="radio"]:disabled:active ~ .icon {
    border-color: var(--goa-color-interactive-error-disabled, #F58185);
    box-shadow: none;
  }
</style>
