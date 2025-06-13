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
    styles,
  } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount, tick } from "svelte";
  import {
    FieldsetErrorRelayDetail,
    FieldsetResetErrorsMsg,
    FieldsetResetFieldsMsg,
    FieldsetSetErrorMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
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

  const [TextAlign, validateTextAlign] = typeValidator("Input text align", [
    "left",
    "right",
  ]);

  // Types
  type Type = (typeof Types)[number];
  type AutoCapitalize = (typeof AutoCapitalize)[number];
  type TextAlign = (typeof TextAlign)[number];

  export let type: Type = "text";
  export let name: string = "";
  export let value: string = "";
  export let autocapitalize: AutoCapitalize = "off";
  export let autocomplete: string = "on";
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
  export let trailingiconarialabel: string = "";
  export let textalign: TextAlign = "left";

  let _leadingContentSlot = false;
  let _trailingContentSlot = false;
  let _debounceId: any;
  let _inputEl: HTMLInputElement;
  let _rootEl: HTMLElement;
  let _error = false;
  let _prevError = false;
  // separate styles for input and input's container
  let _containerStyle = "";
  let _inputWidth = "";

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
  $: if (isFocused && _inputEl) {
    setTimeout(() => _inputEl.focus(), 2);
  }

  $: if (_inputEl && type === "search") {
    _inputEl.addEventListener("search", (e) => {
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
    validateTextAlign(textalign);
    addRelayListener();
    showDeprecationWarnings();
    checkSlots();
    sendMountedMessage();

    if (width.includes("%") || width.includes("px")) {
      _containerStyle = `width: ${width}; `;
      _inputWidth = "";
    } else if (type === "number" && width.includes("ch")) {
      _inputWidth = `${parseInt(width) + 2}ch`;
    } else if (width.includes("ch") || width.trim() === "") {
      _containerStyle = "";
      _inputWidth = `${parseInt(width) + 1}ch`;
    } else {
      _containerStyle = `--width: ${width};`;
      _inputWidth = "";
    }
  });

  // =========
  // Functions
  // =========

  function addRelayListener() {
    receive(_inputEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          setValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
        case FieldsetResetFieldsMsg:
          setValue({ name, value: "" });
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function setValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatchOnChange(value);
  }

  function dispatchOnChange(value: string) {
    dispatch(_rootEl, "_change", { name, value }, { bubbles: true });
  }

  // Relay message up the chain to allow any parent element to have a reference to the input element
  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _inputEl },
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
  style={`${_containerStyle}${calculateMargin(mt, mr, mb, ml)}`}
  bind:this={_rootEl}
>
  {#if $$slots.leadingContent}
    <div class="leading-content-slot">
      <slot name="leadingContent" />
    </div>
  {/if}

  <div
    class="goa-input variant--{variant} type--{type}"
    class:input--disabled={isDisabled}
    class:leading-content={_leadingContentSlot}
    class:trailing-content={_trailingContentSlot}
    class:error={_error}
    class:has-icon={leadingicon || trailingicon}
  >
    {#if prefix}
      <div class="prefix">
        {prefix}
      </div>
    {/if}

    {#if leadingicon}
      <goa-icon
        class="leading-icon"
        data-testid="leading-icon"
        type={leadingicon}
        tabindex="-1"
      />
    {/if}

    <input
      bind:this={_inputEl}
      class="input--{variant}"
      style={styles(
        `--search-icon-offset: ${trailingicon ? "-0.5rem" : "0"}`,
        _inputWidth && `width: ${_inputWidth}`,
        textalign === "right" && `text-align: right`,
      )}
      readonly={isReadonly}
      disabled={isDisabled}
      data-testid={testid}
      {autocapitalize}
      {autocomplete}
      {name}
      {type}
      value={value ?? ""}
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
        arialabel={trailingiconarialabel}
        tabindex="-1"
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
        arialabel={trailingiconarialabel}
      />
    {/if}

    {#if suffix}
      <span class="suffix">{suffix}</span>
    {/if}
  </div>

  {#if $$slots.trailingContent}
    <div class="trailing-content-slot">
      <slot name="trailingContent" />
    </div>
  {/if}
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box; /* border box: the element's specified width and height include the content, padding, and border. The margin is still added */
  }

  .container {
    position: relative;
    display: inline-flex;
    vertical-align: top;
    max-width: 100%;
  }

  .leading-content-slot :global(::slotted(div)),
  .trailing-content-slot :global(::slotted(div)),
  .goa-input,
  .goa-input * {
    line-height: normal;
  }

  .goa-input {
    outline: none;
    transition: var(--goa-text-input-transition);
    background-clip: padding-box;
    display: inline-flex;
    align-items: stretch;
    width: 100%;
    height: 42px;
    z-index: 1;
    background-color: var(--goa-text-input-color-bg);
    /* default border */
    box-shadow: var(--goa-text-input-border);
    border-radius: var(--goa-text-input-border-radius);
    /* The vertical align fixes inputs with a leading icon to not be vertically offset */
    vertical-align: middle;
    min-width: 0;
  }

  .goa-input:not(.error):hover:not(:has(input:focus-visible)) {
    /* hover border */
    box-shadow: var(--goa-text-input-border-hover);
  }

  .goa-input:not(.error):has(input:focus-visible) {
    /* focus border(s) */
    box-shadow:
      var(--goa-text-input-border), var(--goa-text-input-border-focus);
  }

  /* Error state */
  .goa-input.error:not(input:focus-visible) {
    box-shadow: var(--goa-text-input-border-error);
  }

  /* Focus state (including when in error state) */
  .goa-input:has(input:focus-visible),
  .goa-input.error:has(input:focus-visible) {
    box-shadow:
      var(--goa-text-input-border), var(--goa-text-input-border-focus);
  }

  /* type=range does not have an outline/box-shadow */
  .goa-input.type--range {
    border: none;

    &.type--range:active,
    &.type--range:focus-visible,
    &.type--range:focus-within {
      box-shadow: none;
    }
  }

  .leading-icon {
    margin-left: var(--goa-text-input-padding-lr);
  }

  .trailing-icon {
    margin-right: var(--goa-text-input-padding-lr);
  }

  .trailing-icon-button {
    margin-right: var(--goa-text-input-padding-lr);
  }

  input {
    color: var(--goa-text-input-color-text);
    font: var(--goa-text-input-typography);
    padding: var(--goa-text-input-padding);
    background-color: transparent;
    max-width: 100%;
    flex: 1 1 auto;
    z-index: 1;
    border-radius: var(--goa-text-input-border-radius);
    min-width: 0;
  }

  input,
  input:focus-visible,
  input:hover,
  input:active {
    outline: none;
    border: none;
  }

  input[readonly] {
    cursor: pointer;
  }

  input[type="number"] {
    text-overflow: initial;
  }

  .leading-icon + input {
    padding-left: var(--goa-text-input-space-btw-icon-text);
  }

  /* Disabled state */
  .goa-input.input--disabled,
  .goa-input.input--disabled:hover,
  .goa-input.input--disabled:active,
  .goa-input.input--disabled:focus {
    background-color: var(--goa-text-input-color-bg-disabled);
    cursor: default;
    box-shadow: var(--goa-text-input-border-disabled);
    border: none;
    z-index: -1;
  }

  .goa-input.input--disabled input,
  .goa-input.input--disabled input:hover,
  .goa-input.input--disabled input:active,
  .goa-input.input--disabled input:focus {
    color: var(--goa-color-text-secondary);
  }

  .goa-input.input--disabled input:hover {
    cursor: default !important;
  }

  /* Adjust the leading icon style when input is disabled */
  .input--disabled .leading-icon,
  .input--disabled .trailing-icon {
    color: var(--goa-text-input-color-icon-disabled);
    cursor: default;
  }

  .prefix,
  .suffix,
  .leading-content-slot :global(::slotted(div)),
  .trailing-content-slot :global(::slotted(div)) {
    background-color: var(--goa-text-input-lt-content-color-bg);
    box-shadow: var(--goa-text-input-border);
    display: flex;
    align-items: center;
    white-space: normal;
    height: 42px;
  }

  .leading-content-slot :global(::slotted(div)),
  .trailing-content-slot :global(::slotted(div)) {
    padding: var(--goa-text-input-padding);
  }

  .prefix,
  .leading-content-slot :global(::slotted(div)) {
    margin-right: calc(var(--goa-border-width-s) * -1);
    /* background-clip doesn't want to work */
    border-top-left-radius: var(--goa-text-input-border-radius);
    border-bottom-left-radius: var(--goa-text-input-border-radius);
  }

  .suffix,
  .trailing-content-slot :global(::slotted(div)) {
    margin-left: calc(var(--goa-border-width-s) * -1);
    /* background-clip doesn't want to work */
    border-top-right-radius: var(--goa-text-input-border-radius);
    border-bottom-right-radius: var(--goa-text-input-border-radius);
  }

  .goa-input:has(.prefix) .leading-icon,
  .leading-content .leading-icon {
    margin-right: calc(var(--goa-border-width-s) * -1);
    margin-left: calc(
      var(--goa-text-input-padding-lr) + var(--goa-border-width-s)
    );
  }

  .goa-input:has(.suffix) .trailing-icon,
  .trailing-content .trailing-icon {
    margin-left: calc(var(--goa-border-width-s) * -1);
    margin-right: calc(
      var(--goa-text-input-padding-lr) + var(--goa-border-width-s)
    );
  }

  .goa-input:not(.input--disabled):has(.prefix) input,
  .leading-content:not(.input--disabled) input {
    margin-left: var(--goa-border-width-s);
  }

  .goa-input:not(.input--disabled):has(.suffix) input,
  .trailing-content:not(.input--disabled) input {
    margin-right: var(--goa-border-width-s);
  }

  .leading-content {
    border-top-left-radius: var(--goa-border-radius-none);
    border-bottom-left-radius: var(--goa-border-radius-none);
  }

  .trailing-content {
    border-top-right-radius: var(--goa-border-radius-none);
    border-bottom-right-radius: var(--goa-border-radius-none);
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

  .variant--bare:focus-visible,
  .variant--bare:active,
  .variant--bare:focus-within {
    box-shadow: none;
  }

  input[type="search"]:enabled:read-write:-webkit-any(
      :focus-visible,
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

  ::placeholder {
    color: var(--goa-text-input-color-text-placeholder);
    opacity: 1;
  }

  /* TODO add styling for autofill
  input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #E0F0FC inset !important;
  } */
</style>
