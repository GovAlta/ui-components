<svelte:options
  customElement={{
    shadow: "open",
    tag: "goa-radio-item",
    props: {
      name: { reflect: true },
      value: { reflect: true },
      description: { reflect: true },
      checked: { reflect: true },
      arialabel: { reflect: true },
      error: { reflect: true },
      revealarialabel: { reflect: true },
      disabled: { reflect: true },
    },
    extend: (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;
        constructor() {
          super();
          this.attachedInternals = this.attachInternals();
        }
      };
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
    toBoolean,
    announceToScreenReader,
  } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";

  /** The value of this radio option. Will be emitted when selected. */
  export let value: string;
  /** The name of the radio group. Inherited from the parent RadioGroup if not set. */
  export let name: string = "";
  /** The display label for this radio option. Falls back to value if not provided. */
  export let label: string = "";
  /** Additional description text displayed below the label. */
  export let description: string = "";
  /** Disables this radio option. Also disabled if the parent RadioGroup is disabled. */
  export let disabled: string = "false";
  /** Shows an error state on this radio option. */
  export let error: string = "false";
  /** Sets this radio option as checked/selected. */
  export let checked: string = "false";
  /** Defines how this option will be announced by screen readers. */
  export let arialabel: string = "";
  /** Text announced by screen readers when the reveal slot content is displayed. */
  export let revealarialabel: string = "";
  /** Sets the maximum width of this radio item. */
  export let maxwidth: string = "none";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // private

  let _rootEl: HTMLElement;
  let _revealSlotEl: HTMLElement;
  let _revealSlotHeight: number = 0;
  let _version: string = "1";
  let _compact: boolean = false;
  let _revealSlotEls: HTMLElement[] = [];

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);
  $: isChecked = toBoolean(checked);
  $: revealSlotHasContent = _revealSlotHeight > 0;

  // Hooks

  onMount(() => {
    dispatchMountedMsg();
    addInitListener();
    addParentChangeListener();
    addRevealSlotListeners();
    addBindListener();
  });

  // Functions

  /**
   * Obtain list of all the form field element within the reveal slot
   */
  function addBindListener() {
    // collect bindable goa fields to allow for later resetting
    _revealSlotEl.addEventListener("goa:bind", (e: Event) => {
      const el = (e as CustomEvent).detail;
      _revealSlotEls.push(el);
    });
  }

  /**
   * Stop propagate the _click,_change to checkbox (so it won't toggle the value)
   */
  function addRevealSlotListeners() {
    if (!_revealSlotEl) {
      return;
    }

    _revealSlotEl.addEventListener("_click", (e: Event) => {
      // when we click a button/accordion... inside the reveal slot, it will reset the parent radio's value (event UI shows as checked). stopPropagation (_click) will fix it
      e.stopPropagation();
    });
  }

  /**
   * Send message up to parent to allow for mounting
   */
  function dispatchMountedMsg() {
    setTimeout(() => {
      _rootEl?.dispatchEvent(
        new CustomEvent<GoARadioItemProps>("radio-item:mounted", {
          composed: true,
          bubbles: true,
          detail: {
            el: _rootEl,
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

  /**
   * Add the listener that will receive a response from the parent after this component is mounted
   */
  function addInitListener() {
    _rootEl.addEventListener("radio-group:init", (e: Event) => {
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

  /**
   * Receive message from parent when a radio item has been selected
   */
  function addParentChangeListener() {
    _rootEl.addEventListener("radio-group:change", (e: Event) => {
      // update element's check state
      isChecked = (e as CustomEvent<RadioItemSelectProps>).detail.checked;

      // reset slot components if un-checked
      if (!isChecked && !!$$slots.reveal) {
        resetChildFormFields();
      }
    });
  }

  // Dispatch change event up to RadioGroup parent element
  function onChange() {
    if (isDisabled) return;

    // notify radio group of the change
    dispatch(_rootEl, "_radioItemChange", { value, label }, { bubbles: true });

    // Announce the reveal content change to screen readers if radio is checked and reveal content exists
    if (
      $$slots.reveal &&
      isChecked &&
      revealarialabel &&
      revealarialabel !== ""
    ) {
      announceToScreenReader(revealarialabel);
    }
  }

  // Send reset messages to all the elements within the reveal slot
  function resetChildFormFields() {
    for (const el of _revealSlotEls) {
      // send reset message ot child form fields
      dispatch(el, "goa:reset");
    }
  }
</script>

<div
  bind:this={_rootEl}
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
      aria-label={arialabel || value}
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

  .icon::before {
    content: "";
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
