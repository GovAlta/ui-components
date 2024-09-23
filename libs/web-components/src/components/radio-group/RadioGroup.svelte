<svelte:options customElement="goa-radio-group" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { typeValidator, toBoolean, dispatch, receive, relay } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { GoARadioItemProps, RadioItemSelectProps } from "../radio-item/RadioItem.svelte";
  import { FormSetValueMsg, FormSetValueRelayDetail, FieldsetSetErrorMsg, FieldsetResetErrorsMsg, FormFieldMountRelayDetail, FormFieldMountMsg } from "../../types/relay-types";

  // Validator
  const [Orientations, validateOrientation] = typeValidator(
    "Radio group orientation",
    ["vertical", "horizontal"],
  );

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
  let isError: boolean;

  // Reactive

  $: isDisabled = toBoolean(disabled);

  // call the method when 'value' is null, except when undefined.
  $: value !== undefined && setCurrentSelectedOption(value);

  $: {
    isError = toBoolean(error);
    bindOptions();
  }

  // Private

  let _rootEl: HTMLElement;
  let _radioItems: GoARadioItemProps[] = [];
  let _bindTimeoutId: any;

  // Hooks

  onMount(async () => {
    validateOrientation(orientation);
    addRelayListener();
    sendMountedMessage();
    getChildren();

    _rootEl.addEventListener("_radioItemChange", (e: Event) => {
      onChange((e as CustomEvent).detail);
    });
  });

  // Functions

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FormSetValueMsg:
          onSetValue(data as FormSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          error = "true";
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
      }
    });
  }

  function onSetValue(detail: FormSetValueRelayDetail) {
    value = detail.value;
    dispatch(_rootEl, "_change", { name, value }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl},
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
            error: isError,
            description: props.description,
            name,
            checked: props.value === value,
          },
        }),
      );
    });
  }

  /**
   * Handles changing of the radio items
   * @param newValue Selected value
   */
  function onChange(newValue: string) {
    if (newValue === value) return;

    value = newValue;
    _rootEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { name, value: value },
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
</script>

<!-- Html -->
<div
  bind:this={_rootEl}
  style={calculateMargin(mt, mr, mb, ml)}
  class={`goa-radio-group--${orientation}`}
  data-testid={testid}
  role="radiogroup"
  aria-label={arialabel}
>
  <slot />
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .goa-radio-group--horizontal {
    display: flex;
    flex-direction: row;
  }

  .goa-radio-group--vertical {
    display: inline-block;
  }
</style>
