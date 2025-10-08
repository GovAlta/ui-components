<svelte:options
  customElement={{
    tag: "goa-radio-item",
    props: {
      value: { reflect: true },
      description: { reflect: true },
      checked: { reflect: true },
      arialabel: { reflect: true },
      error: { reflect: true },
      revealarialabel: { reflect: true },
    },
  }}
/>

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
    revealAriaLabel?: string;
  };

  export type RadioItemSelectProps = {
    checked: boolean;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import {
    dispatch,
    fromBoolean,
    receive,
    relay,
    toBoolean,
    announceToScreenReader,
  } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import {
    FieldsetResetFieldsMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
  } from "../../types/relay-types";

  export let value: string;
  export let name: string = "";
  export let label: string = "";
  export let description: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let checked: string = "false";
  export let arialabel: string = "";
  export let revealarialabel: string = ""; // screen reader will announce this when reveal slot is displayed
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // private

  let _radioItemEl: HTMLElement;
  let _revealSlotEl: HTMLElement;
  let _formFields: HTMLElement[] = [];
  let _revealSlotHeight: number = 0;

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);
  $: revealSlotHasContent = _revealSlotHeight > 0;

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
    if (_revealSlotEl) {
      onRevealSlotCustomEventListener();
    }
  }

  /**
   * Stop propagate the _click,_change to checkbox (so it won't toggle the value)
   */
  function onRevealSlotCustomEventListener() {
    _revealSlotEl.addEventListener("_click", (e: Event) => {
      // when we click a button/accordion... inside the reveal slot, it will reset the parent radio's value (event UI shows as checked). stopPropagation (_click) will fix it
      e.stopPropagation();
    });
    _revealSlotEl.addEventListener("_change", handleFormFieldChange);
    _revealSlotEl.addEventListener("_radioItemChange", handleFormFieldChange);
  }

  function handleFormFieldChange(e: Event) {
    const customEvent = e as CustomEvent;
    const eventDetail = customEvent.detail;
    // when we check/change a checkbox/input... inside the reveal slot, it will reset the parent radio's value(though UI shown as checked) whenever _change is fired. stopPropagation (_change) will fix it
    e.stopPropagation();

    // If this is a form field value change (public form)
    // relay it so the Fieldset initialize the reveal slot form field to public form state
    if (
      eventDetail &&
      eventDetail.name &&
      typeof eventDetail.value !== "undefined"
    ) {
      dispatch(_radioItemEl, "_revealChange", eventDetail, { bubbles: true });
    }
  }

  function onFormFieldMount(detail: FormFieldMountRelayDetail) {
    if (!detail.name) return;
    if (!$$slots.reveal) return;
    _formFields = [..._formFields, detail.el];
  }

  function setCheckStatusByChildState(detail: FormFieldMountRelayDetail) {
    // @ts-expect-error
    checked = !checked && !!detail.el.value;
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
            revealAriaLabel: revealarialabel,
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
      revealarialabel = data.revealAriaLabel;
    });
  }

  function addSelectListener() {
    _radioItemEl.addEventListener("radio-group:select", (e: Event) => {
      isChecked = (e as CustomEvent<RadioItemSelectProps>).detail.checked;
    });
  }

  function onChange() {
    if (isDisabled) return;
    // if (isChecked) return;  FIXME: does having this uncommented break something?

    dispatch(
      _radioItemEl,
      "_radioItemChange",
      { value, label },
      { bubbles: true },
    );

    // Announce the reveal content change to screen readers if radio is checked and reveal content exists
    if (
      $$slots.reveal &&
      isChecked &&
      revealarialabel &&
      revealarialabel !== ""
    ) {
      announceToScreenReader(revealarialabel);
    }

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
  class="container"
>
  <label
    class="radio"
    class:radio--disabled={isDisabled}
    class:radio--error={isError}
  >
    <input
      type="radio"
      {name}
      {value}
      data-testid="radio-option-{value}"
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
  <div
    class="reveal"
    class:visible={$$slots.reveal && isChecked}
    class:has-content={revealSlotHasContent}
    bind:this={_revealSlotEl}
    bind:clientHeight={_revealSlotHeight}
  >
    <slot name="reveal" />
  </div>
</div>

<style>
  .radio {
    display: inline-flex;
  }

  label.radio {
    box-sizing: border-box;
    display: inline-flex;
  }

  .container {
    display: flex;
    flex-direction: column;
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
    min-height: 28px;
    margin: 0;
    opacity: 0;
  }

  .label {
    padding: 0 var(--goa-space-xs);
    font: var(--goa-radio-label);
  }

  .description {
    font: var(--goa-radio-description);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
    color: var(--goa-color-text-default);
  }

  .reveal {
    display: none;
    height: 0;
  }
  .reveal.visible {
    height: fit-content;
    display: block;
  }
  .reveal.visible.has-content {
    padding: var(--goa-space-m);
    margin: var(--goa-space-2xs) 0 0 calc(var(--goa-space-s) - 2px);
    border-left: 4px solid var(--goa-color-greyscale-200);
  }

  .icon {
    position: relative;
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

  .icon::before {
    content: '';
    position: absolute;
    width: 44px;
    height: 44px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .radio--disabled .label,
  .radio--disabled ~ .description {
    color: var(--goa-radio-label-color-disabled);
  }
  .radio--disabled:hover {
    cursor: default;
  }

  /* States --------------------------------------------- */

  /* Unchecked */
  input[type="radio"]:not(:checked) ~ .icon {
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    margin-top: 3px;
  }
  /* Unchecked:hover */
  input[type="radio"]:hover ~ .icon {
    border: var(--goa-radio-border-hover);
  }
  /* Unchecked:focus */
  input[type="radio"]:focus-visible ~ .icon,
  input[type="radio"]:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
  }
  /* Unchecked:hover+focus */
  input[type="radio"]:hover:focus-visible ~ .icon {
    border: var(--goa-radio-border);
  }

  /* Checked */
  input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked);
    margin-top: 3px;
  }
  /* Checked:hover */
  input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-hover);
  }
  /* Checked:hover+focus */
  input[type="radio"]:checked:hover:focus-visible ~ .icon {
    border: var(--goa-radio-border-checked);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .icon,
  input[type="radio"]:disabled:focus-visible ~ .icon {
    border: var(--goa-radio-border-disabled);
  }
  input[type="radio"]:disabled:checked ~ .icon,
  input[type="radio"]:disabled:checked:focus-visible ~ .icon {
    border: var(--goa-radio-border-checked-disabled);
  }

  /* Error */
  .radio--error input[type="radio"] ~ .icon {
    border: var(--goa-radio-border-error);
  }
  .radio--error input[type="radio"]:hover ~ .icon {
    border: var(--goa-radio-border-error-hover);
  }
  .radio--error input[type="radio"]:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    border: var(--goa-radio-border-error);
  }
  .radio--error input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked-error);
  }
  .radio--error input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-error-hover);
  }
  .radio--error input[type="radio"]:checked:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    border: var(--goa-radio-border-checked-error);
  }
  .radio--error input[type="radio"]:disabled ~ .icon {
    border: var(--goa-radio-border-error-disabled);
  }
  .radio--error input[type="radio"]:disabled:checked ~ .icon {
    border: var(--goa-radio-border-checked-error-disabled);
  }
</style>
