<svelte:options customElement="goa-radio-group" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import {
    typeValidator,
    toBoolean,
    dispatch,
    receive,
    relay,
  } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import {
    GoARadioItemProps,
    RadioItemSelectProps,
  } from "../radio-item/RadioItem.svelte";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountRelayDetail,
    FormFieldMountMsg,
    FieldsetErrorRelayDetail, FieldsetResetFieldsMsg,
  } from "../../types/relay-types";

  // Validator
  const [Orientations, validateOrientation] = typeValidator("Radio group orientation", [
    "vertical",
    "horizontal",
  ]);

  // Type
  type Orientation = (typeof Orientations)[number];

  // Public

  export let name: string;
  export let value: string;
  export let orientation: Orientation = "vertical";
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private
  let _error = toBoolean(error);
  let _prevError = _error;

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: {
    isDisabled;
    bindOptions();
  }

  // call the method when 'value' is null, except when undefined.
  $: value !== undefined && setCurrentSelectedOption(value);

  $: {
    _error = toBoolean(error);
    if (_error !== _prevError) {
      dispatch(
        _rootEl,
        "error::change",
        { isError: _error },
        { bubbles: true },
      );
      _prevError = _error;
    }
    bindOptions();
  }

  // Private

  let _rootEl: HTMLElement;
  let _radioItems: GoARadioItemProps[] = [];
  let _bindTimeoutId: any;

  // Hooks

  onMount(async () => {
    _rootEl.addEventListener("_radioItemChange", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      onChange(detail.value, detail.label);
    });

    await tick(); // for angular to register public form name
    validateOrientation(orientation);
    addRelayListener();
    sendMountedMessage();
    getChildren();

  });

  // Functions

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: ""})
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatch(_rootEl, "_change", { name, value }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function getChildren() {
    _rootEl.addEventListener("radio-item:mounted", (e: Event) => {
      const radioItemProps = (e as CustomEvent<GoARadioItemProps>).detail;
      _radioItems = [..._radioItems, radioItemProps];

      // call bindOptions once all children are attained
      if (_bindTimeoutId) {
        clearTimeout(_bindTimeoutId);
      }
      _bindTimeoutId = setTimeout(() => {
        bindOptions();
      }, 1);
    });
  }

  function bindOptions() {
    _radioItems.forEach((props) => {
      props.el.dispatchEvent(
        new CustomEvent<Partial<GoARadioItemProps>>("radio-group:init", {
          composed: true,
          detail: {
            disabled: isDisabled,
            error: _error,
            description: props.description,
            name,
            checked: props.value === value,
            revealAriaLabel: props.revealAriaLabel,
          },
        }),
      );
    });
  }

  /**
   * Handles changing of the radio items
   * @param newValue Selected value
   * @param newLabel Selected label
   */
  function onChange(newValue: string, newLabel: string) {
    if (newValue === value) return;

    value = newValue;
    _rootEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { name, value: value, optionLabel: newLabel },
      }),
    );

    setCurrentSelectedOption(value);
  }

  function setCurrentSelectedOption(value: string) {
    _radioItems.forEach((item) => {
      item.el.dispatchEvent(
        new CustomEvent<RadioItemSelectProps>("radio-group:select", {
          composed: true,
          detail: {
            checked: item.value === value,
          },
        }),
      );
    });
  }

  function onFocus(e: Event) {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }
</script>

<!-- Html -->
<div
  bind:this={_rootEl}
  style={calculateMargin(mt, mr, mb, ml)}
  class={`goa-radio-group--${orientation}`}
  data-testid={testid}
  role="radiogroup"
  aria-label={arialabel}
  aria-invalid={_error ? "true" : "false"}
  on:focusin={onFocus}
>
  <slot />
</div>

<style>

:host {
    font-family: var(--goa-font-family-sans);
  }

  .goa-radio-group--horizontal {
    display: flex;
    flex-direction: row;
    gap: var(--goa-radio-group-gap-horizontal);
  }

  .goa-radio-group--vertical {
    display: flex;
    flex-direction: column;  /* Vertical stacking */
    gap: var(--goa-radio-group-gap-vertical);  /* Adds spacing */
    width: 100%;
  }

  /* Focus styles */
  .goa-radio-group--horizontal:focus,
  .goa-radio-group--vertical:focus {
    outline: none;
  }
</style>
