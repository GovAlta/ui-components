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
      disabled: { reflect: true },
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
    version?: string;
    compact?: boolean;
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
  let _version: string = "1";
  let _compact: boolean = false;

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
      // Item is disabled if EITHER the group is disabled OR the item itself is disabled
      isDisabled = data.disabled || toBoolean(disabled);
      error = fromBoolean(data.error);
      checked = fromBoolean(data.checked);
      description = data.description;
      name = data.name;
      revealarialabel = data.revealAriaLabel;
      _version = data.version || "1";
      _compact = data.compact || false;
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
    class:v2={_version === "2"}
    class:compact={_compact}
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
    align-items: flex-start;
    gap: var(--goa-radio-gap-label, var(--goa-space-xs));
  }

  /* V2 compact: Use smaller gap */
  .radio.v2.compact {
    gap: var(--goa-space-xs);
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
    font: var(--goa-radio-label);
    margin-top: -3px; /* V1: Optical centering - move text up */
  }

  /* V2: Adjust for different line-height */
  .radio.v2 .label {
    margin-top: 1px; /* V2: Optical centering - slight downward adjustment */
  }

  /* Compact mode - V2 only */
  .radio.compact .label {
    font: var(--goa-radio-label-compact);
  }

  .description {
    font: var(--goa-radio-description);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
    color: var(--goa-input-color-text-helper, var(--goa-color-text-default));
  }

  /* V2 default: Description aligns with label (icon width + gap) */
  .radio.v2:not(.compact) ~ .description {
    margin-left: calc(var(--goa-radio-size) + var(--goa-radio-gap-label));
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
    transition: all 100ms ease-in-out;
    /* prevent squishing of radio button */
    flex: 0 0 auto;
  }

  /* V2: Inner dot for checked state */
  .v2 .icon::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--goa-radio-inner-size);
    height: var(--goa-radio-inner-size);
    border-radius: 50%;
    transition: background-color 100ms ease-in-out;
  }

  .radio--disabled .label,
  .radio--disabled ~ .description {
    color: var(--goa-radio-label-color-disabled);
  }
  .radio--disabled:hover {
    cursor: default;
  }

  /* States --------------------------------------------- */

  /* Unchecked - Default */
  input[type="radio"]:not(:checked) ~ .icon {
    border: var(--goa-radio-border);
  }

  /* Unchecked - Hover */
  input[type="radio"]:not(:checked):hover ~ .icon {
    border: var(--goa-radio-border-hover);
  }

  /* Unchecked - Focus */
  input[type="radio"]:not(:checked):focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Unchecked - Hover+Focus */
  input[type="radio"]:not(:checked):hover:focus-visible ~ .icon {
    border: var(--goa-radio-border);
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Unchecked - Disabled */
  input[type="radio"]:not(:checked):disabled ~ .icon {
    border: var(--goa-radio-border-disabled);
  }

  /* V2: Unchecked - Disabled background */
  .radio.v2 input[type="radio"]:not(:checked):disabled ~ .icon {
    background-color: var(--goa-radio-color-bg-disabled);
  }

  /* Checked - Default */
  input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked);
  }
  /* V2 only: Inner dot */
  .radio.v2 input[type="radio"]:checked ~ .icon::after {
    background-color: var(--goa-radio-inner-color);
  }

  /* Checked - Hover */
  input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-hover);
  }
  /* V2 only: Inner dot hover */
  .radio.v2 input[type="radio"]:checked:hover ~ .icon::after {
    background-color: var(--goa-radio-inner-color-hover);
  }

  /* Checked - Focus */
  input[type="radio"]:checked:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Checked - Hover+Focus */
  input[type="radio"]:checked:hover:focus-visible ~ .icon {
    border: var(--goa-radio-border-checked);
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Checked - Disabled */
  input[type="radio"]:checked:disabled ~ .icon {
    border: var(--goa-radio-border-checked-disabled);
  }
  /* V2 only: Inner dot disabled */
  .radio.v2 input[type="radio"]:checked:disabled ~ .icon::after {
    background-color: var(--goa-radio-inner-color-disabled);
  }

  /* V2: Checked - Disabled background */
  .radio.v2 input[type="radio"]:checked:disabled ~ .icon {
    background-color: var(--goa-radio-color-bg-disabled);
  }

  /* Unchecked - Error */
  .radio--error input[type="radio"]:not(:checked) ~ .icon.icon {
    border: var(--goa-radio-border-error);
  }

  /* V2: Unchecked - Error background */
  .radio.v2.radio--error input[type="radio"]:not(:checked) ~ .icon {
    background-color: var(--goa-radio-color-bg-error);
  }

  /* Unchecked - Error+Hover */
  .radio--error input[type="radio"]:not(:checked):hover ~ .icon {
    border: var(--goa-radio-border-error-hover);
  }

  /* V2: Unchecked - Error+Hover background */
  .radio.v2.radio--error input[type="radio"]:not(:checked):hover ~ .icon {
    background-color: var(--goa-radio-color-bg-error-hover);
  }

  /* Unchecked - Error+Focus */
  .radio--error input[type="radio"]:not(:checked):focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Unchecked - Error+Disabled */
  .radio--error input[type="radio"]:not(:checked):disabled ~ .icon {
    border: var(--goa-radio-border-error-disabled);
  }

  /* V2: Unchecked - Error+Disabled background */
  .radio.v2.radio--error input[type="radio"]:not(:checked):disabled ~ .icon {
    background-color: var(--goa-radio-color-bg-disabled);
  }

  /* Checked - Error */
  .radio--error input[type="radio"]:checked ~ .icon,
  .radio--error.v2 input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked-error);
  }
  /* V2 only: Inner dot error */
  .radio--error.v2 input[type="radio"]:checked ~ .icon::after {
    background-color: var(--goa-radio-inner-color-error);
  }

  /* V2: Checked - Error background */
  .radio.v2.radio--error input[type="radio"]:checked ~ .icon {
    background-color: var(--goa-radio-color-bg-error);
  }

  /* Checked - Error+Hover */
  .radio--error input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-error-hover);
  }
  /* V2 only: Inner dot error hover */
  .radio--error.v2 input[type="radio"]:checked:hover ~ .icon::after {
    background-color: var(--goa-radio-inner-color-error-hover);
  }

  /* V2: Checked - Error+Hover background */
  .radio.v2.radio--error input[type="radio"]:checked:hover ~ .icon {
    background-color: var(--goa-radio-color-bg-error-hover);
  }

  /* Checked - Error+Focus */
  .radio--error input[type="radio"]:checked:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    outline-offset: 2px;
  }

  /* Checked - Error+Disabled */
  .radio--error input[type="radio"]:checked:disabled ~ .icon {
    border: var(--goa-radio-border-checked-error-disabled);
  }
  /* V2 only: Inner dot error disabled */
  .radio--error.v2 input[type="radio"]:checked:disabled ~ .icon::after {
    background-color: var(--goa-radio-inner-color-disabled);
  }

  /* V2: Checked - Error+Disabled background */
  .radio.v2.radio--error input[type="radio"]:checked:disabled ~ .icon {
    background-color: var(--goa-radio-color-bg-disabled);
  }
</style>
