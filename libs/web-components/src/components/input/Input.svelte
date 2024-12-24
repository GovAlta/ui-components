<svelte:options customElement="goa-input" />

<script lang="ts" context="module">
  export type GoAInputVariant = "goa" | "bare";
</script>

<script lang="ts">
  import {
    typeValidator,
    toBoolean,
    relay,
    receive,
    dispatch,
  } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import {
    FieldsetResetErrorsMsg,
    FieldsetResetFieldsMsg,
    FieldsetSetErrorMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FormSetValueMsg,
    FormSetValueRelayDetail,
  } from "../../types/relay-types";

  // Validators
  const [Types, validateType] = typeValidator("Input type", [
    "text",
    "number",
    "password",
    "email",
    "date",
    "datetime-local",
    "month",
    "range",
    "search",
    "tel",
    "time",
    "url",
    "week",
  ]);

  const [AutoCapitalize, validateAutoCapitalize] = typeValidator(
    "Input auto capitalize",
    ["on", "off", "none", "sentences", "words", "characters"],
  );

  // Types
  type Type = (typeof Types)[number];
  type AutoCapitalize = (typeof AutoCapitalize)[number];

  export let type: Type = "text";
  export let name: string = "";
  export let value: string = "";
  export let autocapitalize: AutoCapitalize = "off";
  export let placeholder: string = "";
  export let leadingicon: GoAIconType | null = null;
  export let trailingicon: GoAIconType | null = null;
  export let variant: GoAInputVariant = "goa";
  export let disabled: string = "false";
  export let handletrailingiconclick: string = "false";
  export let focused: string = "false";
  export let readonly: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let width: string = "30ch";
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let min: string = "";
  export let max: string = "";
  export let step: number = 1;
  export let prefix: string = "";
  export let suffix: string = "";
  export let debounce: number = 0;
  export let maxlength: number | null = null;
  export let id: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _leadingContentSlot = false;
  let _innerContentSlot = false;
  let _trailingContentSlot = false;
  let _debounceId: any;
  let inputEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _error: boolean;
  let _prevError = _error;

  // ========
  // Reactive
  // ========

  $: handlesTrailingIconClick = toBoolean(handletrailingiconclick);
  $: isFocused = toBoolean(focused);
  $: isReadonly = toBoolean(readonly);
  $: isDisabled = toBoolean(disabled);
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
  }

  // TODO: determine if this and the next reactive statement need to be reactive, as they are both
  // things that should only be run once
  $: if (isFocused && inputEl) {
    setTimeout(() => inputEl.focus(), 2);
  }

  $: if (inputEl && type === "search") {
    inputEl.addEventListener("search", (e) => {
      onKeyUp(e);
    });
  }

  // =====
  // Hooks
  // =====

  onMount(async () => {
    await tick();

    validateType(type);
    validateAutoCapitalize(autocapitalize);
    addRelayListener();

    showDeprecationWarnings();
    checkSlots();
    sendMountedMessage();
  });

  // =========
  // Functions
  // =========

  function addRelayListener() {
    receive(inputEl, (action, data) => {
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
        case FieldsetResetFieldsMsg:
          value = "";
          break;
      }
    });
  }

  function onSetValue(detail: FormSetValueRelayDetail) {
    value = detail.value;
    dispatch(
      inputEl,
      "_change",
      { name, value: detail.value },
      { bubbles: true },
    );
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: inputEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onKeyUp(e: Event) {
    const input = e.target as HTMLInputElement;

    if (!input) return;
    if (isReadonly) return;

    if (_debounceId != null) {
      clearTimeout(_debounceId);
    }

    _debounceId = setTimeout(() => {
      input.dispatchEvent(
        new CustomEvent("_change", {
          composed: true,
          bubbles: true,
          cancelable: true,
          detail: { name, value: input.value },
        }),
      );
    }, debounce);

    input.dispatchEvent(
      new CustomEvent("_keyPress", {
        composed: true,
        detail: { name, value: input.value, key: (e as KeyboardEvent).key },
      }),
    );
    value = input.value;
  }

  function onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    // TODO: create `dispatch` util function
    input.dispatchEvent(
      new CustomEvent("_focus", {
        composed: true,
        detail: { name, value: input.value },
      }),
    );

    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }

  function onBlur(e: Event) {
    focused = "false";
    const input = e.target as HTMLInputElement;
    input.dispatchEvent(
      new CustomEvent("_blur", {
        composed: true,
        detail: { name, value: input.value },
      }),
    );
  }

  function doClick() {
    // @ts-ignore
    this.dispatchEvent(
      new CustomEvent("_trailingIconClick", { composed: true }),
    );
  }

  function checkSlots() {
    const leadingContentSlot = _rootEl.querySelector(
      "slot[name=leadingContent]",
    ) as HTMLSlotElement;

    if (leadingContentSlot && leadingContentSlot.assignedNodes().length > 0) {
      _leadingContentSlot = true;
    }

    const innerContentSlot = _rootEl.querySelector(
      "slot[name=innerContentSlot]",
    ) as HTMLSlotElement;

    if (innerContentSlot && innerContentSlot.assignedNodes().length > 0) {
      _innerContentSlot = true;
    }

    const trailingContentSlot = _rootEl.querySelector(
      "slot[name=trailingContent]",
    ) as HTMLSlotElement;

    if (trailingContentSlot && trailingContentSlot.assignedNodes().length > 0) {
      _trailingContentSlot = true;
    }
  }

  function showDeprecationWarnings() {
    if (prefix != "" || suffix != "") {
      console.warn(
        "GoAInput [prefix] and [suffix] properties are deprecated. Instead use leadingContent and trailingContent.",
      );
    }
  }
</script>

<!-- HTML -->

<div
  class="container"
  style={`--width: ${width};${calculateMargin(mt, mr, mb, ml)}`}
  bind:this={_rootEl}
>
  <div
    class="goa-input variant--{variant} type--{type}"
    class:input--disabled={isDisabled}
    class:leading-content={_leadingContentSlot}
    class:inner-content={_innerContentSlot}
    class:trailing-content={_trailingContentSlot}
    class:error={_error}
  >
    {#if prefix}
      <div class="prefix">
        {prefix}
      </div>
    {/if}

    <div class="leading-content-slot">
      <slot name="leadingContent" />
    </div>

    {#if leadingicon}
      <goa-icon
        class="leading-icon"
        data-testid="leading-icon"
        type={leadingicon}
      />
    {/if}

    <div class="inner-content-slot">
      <slot name="innerContent" />
    </div>

    <input
      bind:this={inputEl}
      class="input--{variant}"
      class:input-leading-content={_leadingContentSlot && !isDisabled}
      class:input-inner-content={_innerContentSlot && !isDisabled}
      class:input-trailing-content={_trailingContentSlot && !isDisabled}
      style={`--search-icon-offset: ${trailingicon ? "-0.5rem" : "0"}`}
      readonly={isReadonly}
      disabled={isDisabled}
      data-testid={testid}
      {autocapitalize}
      {name}
      {type}
      value={value || ""}
      {placeholder}
      {min}
      {max}
      {step}
      {maxlength}
      id={id || name}
      role="textbox"
      aria-label={arialabel}
      aria-labelledby={arialabelledby}
      aria-invalid={_error ? "true" : "false"}
      on:keyup={onKeyUp}
      on:change={onKeyUp}
      on:focus={onFocus}
      on:blur={onBlur}
    />

    <!-- Trailing Icon -->
    {#if trailingicon && !handlesTrailingIconClick}
      <goa-icon
        class="trailing-icon"
        data-testid="trailing-icon"
        size="medium"
        type={trailingicon}
      />
    {/if}

    <!-- Trailing Icon Button -->
    {#if trailingicon && handlesTrailingIconClick}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <goa-icon-button
        on:click={doClick}
        disabled={isDisabled}
        variant="dark"
        size="medium"
        icon={trailingicon}
        data-testid="trailing-icon-button"
        class="trailing-icon-button"
      />
    {/if}

    {#if suffix}
      <span class="suffix">{suffix}</span>
    {/if}
    <div class="trailing-content-slot">
      <slot name="trailingContent" />
    </div>
  </div>
</div>

<!-- Styles -->
<style>
  /* border box: the element's specified width and height include the content, padding, and border. The margin is still added */
  :host {
    box-sizing: border-box;
  }

  .container {
    position: relative;
    width: 100%;
    display: inline-block;
  }

  @media not (--mobile) {
    .container {
      width: var(--width);
    }
  }

  .goa-input,
  .goa-input * {
    line-height: normal;
  }
  .goa-input {
    outline: none;
    transition: box-shadow 0.05s ease-in;
    background-clip: padding-box;
    display: inline-flex;
    align-items: stretch;
    min-width: 100%;
    background-color: var(--goa-color-greyscale-white);
    overflow: hidden;

    /* default border */
    box-shadow: inset 0 0 0 var(--goa-border-width-s)
      var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);

    /* The vertical align fixes inputs with a leading icon to not be vertically offset */
    vertical-align: middle;
    background-color: var(--goa-color-greyscale-white);
  }

  .goa-input:not(.error):not(.leading-content):not(.trailing-content):hover:not(
      :has(input:focus-visible)
    ) {
    /* hover border */
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }
  .goa-input:not(.error):has(input:focus-visible) {
    /* focus border(s) */
    box-shadow:
      inset 0 0 0 var(--goa-border-width-s) var(--goa-color-greyscale-700),
      0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  /* Error state */
  .goa-input.error input.input--goa:not(input:focus-visible) {
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-error);
  }

  .goa-input.leading-content.error input.input--goa:not(input:focus-visible) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .goa-input.trailing-content.error input.input--goa:not(input:focus-visible) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Focus state (including when in error state) */
  .goa-input:has(input:focus-visible) {
    box-shadow:
      inset 0 0 0 var(--goa-border-width-s) var(--goa-color-greyscale-700),
      0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  /* type=range does not have an outline/box-shadow */
  .goa-input.type--range {
    border: none;

    &.type--range:active,
    &.type--range:focus,
    &.type--range:focus-within {
      box-shadow: none;
    }
  }

  .leading-icon {
    margin-left: var(--goa-space-s);
  }

  .trailing-icon {
    margin-right: var(--goa-space-s);
  }

  .trailing-icon-button {
    margin-right: var(--goa-space-s);
  }

  input {
    display: inline-block;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);

    padding: calc(var(--goa-space-xs) - 1px) calc(var(--goa-space-s) - 1px);
    line-height: calc(40px - calc(var(--goa-space-xs) * 2));

    background-color: transparent;
    width: 100%;
    flex: 1 1 auto;
    font-family: var(--goa-font-family-sans);
    z-index: 1;
    border-radius: var(--goa-border-radius-m);
  }
  input,
  input:focus,
  input:hover,
  input:active {
    outline: none;
    border: none;
  }
  input[readonly] {
    cursor: pointer;
  }

  .leading-icon + input {
    padding-left: var(--goa-space-xs);
  }

  .input--disabled,
  .input--disabled:hover,
  .input--disabled:active,
  .input--disabled:focus {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200) !important;
    cursor: default;
    box-shadow: none !important;
  }
  .input--disabled input,
  .input--disabled input:hover,
  .input--disabled input:active,
  .input--disabled input:focus {
    color: var(--goa-color-text-secondary);
  }
  .input--disabled input:hover {
    cursor: default !important;
  }

  .prefix,
  .suffix,
  .leading-content-slot :global(::slotted(div)),
  .trailing-content-slot :global(::slotted(div)) {
    background-color: var(--goa-color-greyscale-100);
    box-shadow: inset 0 0 0 var(--goa-border-width-s)
      var(--goa-color-greyscale-700);
    display: flex;
    align-items: center;
    white-space: normal;
  }

  .inner-content-slot :global(::slotted(div)) {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    flex-flow: wrap;
  }
  .inner-content-slot {
    flex: none;
  }

  .leading-content-slot :global(::slotted(div)),
  .trailing-content-slot :global(::slotted(div)) {
    padding: var(--goa-space-xs) var(--goa-space-s);
  }

  .prefix,
  .leading-content-slot :global(::slotted(div)) {
    /* background-clip doesn't want to work */
    border-top-left-radius: var(--goa-border-radius-m);
    border-bottom-left-radius: var(--goa-border-radius-m);
  }

  .suffix,
  .trailing-content-slot :global(::slotted(div)) {
    /* background-clip doesn't want to work */
    border-top-right-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
  }

  .input-leading-content {
    border-top-left-radius: var(--goa-border-radius-none);
    border-bottom-left-radius: var(--goa-border-radius-none);
  }

  .input-trailing-content {
    border-top-right-radius: var(--goa-border-radius-none);
    border-bottom-right-radius: var(--goa-border-radius-none);
  }

  /* this is the hover style for the leading and trailing content
  without error */
  .input-leading-content:not(.error):not(input:focus-visible):hover {
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }

  .input-trailing-content:not(.error):not(input:focus-visible):hover {
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }

  /* this is the interior focus border */

  .input-leading-content:active,
  .input-leading-content:focus,
  .input-leading-content:focus-within {
    box-shadow:
      inset 0 0 0 var(--goa-border-width-s) var(--goa-color-greyscale-700),
      0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }
  .input-trailing-content:active,
  .input-trailing-content:focus,
  .input-trailing-content:focus-within {
    box-shadow:
      inset 0 0 0 var(--goa-border-width-s) var(--goa-color-greyscale-700),
      0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
    border-top-right-radius: var(--goa-border-radius-none);
    border-bottom-right-radius: var(--goa-border-radius-none);
  }

  /* Hide main focus border for inputs with leading content */
  .goa-input.leading-content:has(input:focus-visible) {
    box-shadow: inset 0 0 0 var(--goa-border-width-s)
      var(--goa-color-greyscale-700);
  }

  /* Hide main focus border for inputs with trailing content */
  .goa-input.trailing-content:has(input:focus-visible) {
    box-shadow: inset 0 0 0 var(--goa-border-width-s)
      var(--goa-color-greyscale-700);
  }

  /* Themes */
  input.input--goa {
    display: block;
    border: none;
    flex: 1 1 auto;
  }

  .variant--bare {
    border: none;
  }

  .variant--bare:focus,
  .variant--bare:active,
  .variant--bare:focus-within {
    box-shadow: none;
  }

  input[type="search"]:enabled:read-write:-webkit-any(
      :focus,
      :hover
    )::-webkit-search-cancel-button {
    position: relative;
    right: var(--search-icon-offset);
    cursor: pointer;
    -webkit-appearance: none;
    height: 1.2rem;
    width: 1.2rem;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23333" d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"/></svg>')
      center center no-repeat;
  }

  ::-ms-reveal {
    display: none;
  }
</style>
