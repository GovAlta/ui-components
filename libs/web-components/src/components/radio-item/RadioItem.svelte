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
    size?: string;
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
  let _size: string = "normal";

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
      _size = data.size || "normal";
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
  class="container container--{_size}"
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
  /* TEMP: Issue #2936 design token overrides - remove when tokens published to npm */
  :host {
    /* Border widths: 1px → 1.5px default, 3px → 2px focus */
    --goa-radio-border: 1.5px solid #797676; /* Updated: 1px → 1.5px, color updated */
    --goa-radio-border-focus: 2px solid #006dcc; /* Updated: 3px → 2px, focus color updated */
    --goa-radio-focus-offset: 2px; /* New: 2px gap between border and focus ring */
    
    /* Label spacing: 8px → 12px normal, 8px compact */
    --goa-radio-gap: var(--goa-space-s); /* New: 12px label padding */
    --goa-radio-gap-compact: var(--goa-space-xs); /* New: 8px compact label padding */
    
    /* Updated color palette - Normal states */
    --goa-radio-border-hover: 1.5px solid #000000; /* Updated hover color, consistent 1.5px border */
    --goa-radio-border-checked: 1.5px solid #006dcc; /* Updated: thin blue border when checked */
    --goa-radio-border-checked-hover: 1.5px solid #045092; /* Updated: thin blue border when checked+hover */
    --goa-radio-border-checked-focus: 2px solid #006dcc; /* New: checked+focus outline */
    --goa-radio-label-color-disabled: #bab7b7; /* Updated disabled text color */
    
    /* Error states - all combinations */
    --goa-radio-border-error: 1.5px solid #da291c; /* Updated error color, consistent 1.5px border */
    --goa-radio-border-error-hover: 1.5px solid #a91a10; /* Updated error+hover color, consistent 1.5px border */
    --goa-radio-border-checked-error: 1.5px solid #da291c; /* Updated: thin red border when checked+error */
    --goa-radio-border-checked-error-hover: 1.5px solid #a91a10; /* Updated: thin red border when checked+error+hover */
    --goa-radio-border-error-disabled: 1.5px solid #f58185; /* Error+disabled, consistent 1.5px border */
    --goa-radio-border-checked-error-disabled: 1.5px solid #f58185; /* Checked+error+disabled, consistent 1.5px border */
    --goa-radio-color-bg-error: #FDDED9; /* New: error state background color */
    --goa-radio-color-bg-error-hover: #F4C8C5; /* New: error state background color on hover */
    
    /* Disabled states */
    --goa-radio-border-disabled: 1.5px solid #BAB7B7; /* Updated: disabled border color */
    --goa-radio-border-checked-disabled: 1.5px solid #BAB7B7; /* Updated: disabled checked border color */
    --goa-radio-color-bg-disabled: #F2F0F0; /* New: disabled background color */
    --goa-radio-reveal-border: 1px solid #E1DEDD; /* New: reveal left border color and width */
    --goa-radio-reveal-padding: var(--goa-space-m) var(--goa-space-m) var(--goa-space-m) 25px; /* New: reveal padding with 25px left spacing */
  }

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
    padding: 0 var(--goa-radio-gap, 12px);
    font: var(--goa-radio-label);
  }

  /* Compact size variant */
  .container--compact .label {
    padding: 0 var(--goa-radio-gap-compact, 8px);
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
    padding: var(--goa-radio-reveal-padding, var(--goa-space-m) var(--goa-space-m) var(--goa-space-m) 25px);
    margin: var(--goa-space-2xs) 0 0 calc(var(--goa-space-s) - 1px);
    border-left: var(--goa-radio-reveal-border, 1px solid #E1DEDD);
  }

  .icon {
    display: inline-block;
    position: relative; /* TEMP: Added for new checked state inner circle */
    height: var(--goa-radio-size);
    width: var(--goa-radio-size);
    border-radius: var(--goa-radio-border-radius);
    background-color: var(--goa-radio-color-bg);
    transition: box-shadow 100ms ease-in-out;

    /* prevent squishing of radio button */
    flex: 0 0 auto;
    margin-top: var(--font-valign-fix);
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
    border: var(--goa-radio-border, 1.5px solid var(--goa-color-greyscale-700));
    margin-top: 3px;
  }
  /* Unchecked:hover */
  input[type="radio"]:hover ~ .icon {
    border: var(--goa-radio-border-hover, 2px solid var(--goa-color-interactive-hover));
  }
  /* Unchecked:focus */
  input[type="radio"]:focus-visible ~ .icon,
  input[type="radio"]:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus, 2px solid var(--goa-color-interactive-focus));
    outline-offset: var(--goa-radio-focus-offset, 2px);
  }
  /* Unchecked:hover+focus */
  input[type="radio"]:hover:focus-visible ~ .icon {
    border: var(--goa-radio-border, 1.5px solid var(--goa-color-greyscale-700));
  }

  /* Checked */
  input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked, 7px solid var(--goa-color-interactive-default));
    margin-top: 3px;
  }
  /* Checked:hover */
  input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-hover, 7px solid var(--goa-color-interactive-hover));
  }
  /* Checked:focus */
  input[type="radio"]:checked:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus, 2px solid var(--goa-color-interactive-focus));
    outline-offset: var(--goa-radio-focus-offset, 2px);
  }
  /* Checked:hover+focus */
  input[type="radio"]:checked:hover:focus-visible ~ .icon {
    border: var(--goa-radio-border-checked);
    outline: var(--goa-radio-border-focus, 2px solid var(--goa-color-interactive-focus));
    outline-offset: var(--goa-radio-focus-offset, 2px);
  }

  /* Inner blue circle for checked state - NEW DESIGN */
  input[type="radio"]:checked ~ .icon::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #006dcc;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  /* Inner circle hover state */
  input[type="radio"]:checked:hover ~ .icon::after {
    background-color: #045092;
  }

  /* Inner circle error states */
  .radio--error input[type="radio"]:checked ~ .icon::after {
    background-color: #da291c;
  }
  
  .radio--error input[type="radio"]:checked:hover ~ .icon::after {
    background-color: #a91a10;
  }

  /* Inner circle disabled state */
  input[type="radio"]:disabled:checked ~ .icon::after {
    background-color: #BAB7B7;
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .icon,
  input[type="radio"]:disabled:focus-visible ~ .icon {
    border: var(--goa-radio-border-disabled);
    background-color: var(--goa-radio-color-bg-disabled, #F2F0F0);
  }
  input[type="radio"]:disabled:checked ~ .icon,
  input[type="radio"]:disabled:checked:focus-visible ~ .icon {
    border: var(--goa-radio-border-checked-disabled);
    background-color: var(--goa-radio-color-bg-disabled, #F2F0F0);
  }

  /* Error */
  .radio--error input[type="radio"] ~ .icon {
    border: var(--goa-radio-border-error);
    background-color: var(--goa-radio-color-bg-error, #FDDED9);
  }
  .radio--error input[type="radio"]:hover ~ .icon {
    border: var(--goa-radio-border-error-hover);
    background-color: var(--goa-radio-color-bg-error-hover, #F4C8C5);
  }
  .radio--error input[type="radio"]:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    border: var(--goa-radio-border-error);
    background-color: var(--goa-radio-color-bg-error-hover, #F4C8C5);
  }
  .radio--error input[type="radio"]:checked ~ .icon {
    border: var(--goa-radio-border-checked-error);
  }
  .radio--error input[type="radio"]:checked:hover ~ .icon {
    border: var(--goa-radio-border-checked-error-hover);
    background-color: var(--goa-radio-color-bg-error-hover, #F4C8C5);
  }
  .radio--error input[type="radio"]:checked:hover:focus-visible ~ .icon {
    outline: var(--goa-radio-border-focus);
    border: var(--goa-radio-border-checked-error);
    background-color: var(--goa-radio-color-bg-error-hover, #F4C8C5);
  }
  .radio--error input[type="radio"]:disabled ~ .icon {
    border: var(--goa-radio-border-error-disabled);
  }
  .radio--error input[type="radio"]:disabled:checked ~ .icon {
    border: var(--goa-radio-border-checked-error-disabled);
  }
</style>
