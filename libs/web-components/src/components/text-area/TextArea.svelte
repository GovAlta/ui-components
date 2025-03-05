<svelte:options customElement="goa-textarea" />

<!-- Script -->
<script lang="ts">
  import {
    dispatch,
    pluralize,
    receive,
    relay,
    toBoolean,
  } from "../../common/utils";
  import {
    calculateMargin,
    injectCss,
    type Spacing,
  } from "../../common/styling";
  import { onMount } from "svelte";
  import {
    FieldsetErrorRelayDetail,
    FieldsetResetErrorsMsg,
    FieldsetSetErrorMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
  } from "../../types/relay-types";

  export let name: string;
  export let value: string = "";
  export let placeholder: string = "";
  export let rows: number = 3;
  export let testid: string = "";
  export let width: string = "60ch";
  export let error: string = "false";
  export let readonly: string = "false";
  export let disabled: string = "false";
  export let arialabel: string = "";
  export let countby: "character" | "word" | "" = "";
  export let maxcount: number = -1;

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _error = false;
  let _prevError = false;

  // reactive

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
  $: isDisabled = toBoolean(disabled);
  $: isReadonly = toBoolean(readonly);
  $: count =
    countby === "character"
      ? value?.length
      : value?.split(" ").filter((word) => word.trim().length > 0).length;

  // privates

  let _textareaEl: HTMLTextAreaElement;
  let _rootEl: HTMLElement;

  // Hooks

  onMount(() => {
    addRelayListener();
    sendMountedMessage();
    injectCss(_rootEl, ":host", {
      width: width.includes("%") ? width : `min(${width}, 100%)`,
    });
  });

  // functions
  function addRelayListener() {
    receive(_textareaEl, (action, data) => {
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
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatch(_textareaEl, "_change", { name, value }, { bubbles: true });
  }

  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _textareaEl,
      FormFieldMountMsg,
      { name, el: _textareaEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onChange(e: Event) {
    if (isDisabled) return;
    dispatchChange(e);
  }

  function onKeyPress(e: KeyboardEvent) {
    if (isDisabled) return;
    dispatchKeyPress(e);
    dispatchChange(e);
  }

  function dispatchChange(_: Event) {
    _textareaEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, value: _textareaEl.value },
        bubbles: true,
      }),
    );
  }

  function dispatchKeyPress(e: KeyboardEvent) {
    _textareaEl.dispatchEvent(
      new CustomEvent("_keyPress", {
        composed: true,
        detail: { name, value, key: e.key },
      }),
    );
  }

  function onFocus(_e: Event) {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }
</script>

<!-- HTML -->
<div id="container">
  <div
    data-testid="root"
    class="root"
    class:error={_error || (maxcount > 0 && count > maxcount)}
    class:disabled={isDisabled}
    style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --width: ${width};
      --char-count-padding: ${countby ? "2rem" : "0"};
    `}
    bind:this={_rootEl}
  >
    <textarea
      bind:this={_textareaEl}
      {name}
      {placeholder}
      {rows}
      aria-label={arialabel || name}
      aria-invalid={_error ? "true" : "false"}
      disabled={isDisabled}
      readonly={isReadonly}
      data-testid={testid}
      bind:value
      on:keyup={onKeyPress}
      on:change={onChange}
      on:focus={onFocus}
    />

    {#if maxcount > 0 && !isDisabled}
      <div class="counter" class:counter-error={count > maxcount}>
        {#if countby && count > maxcount}
          {count - maxcount} {pluralize(countby, count - maxcount)} too many
        {:else if countby && count <= maxcount}
          {maxcount - count} {pluralize(countby, maxcount - count)} remaining
        {/if}
      </div>
    {/if}

    {#if countby && maxcount < 0 && count > 0 && !isDisabled}
      <div class="counter">
        {count}
        {pluralize(countby, count)}
      </div>
    {/if}
  </div>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: inline-block;
  }

  #container {
    container: self / inline-size;
    box-sizing: border-box;
  }

  /* Default state */
  .root {
    transition: box-shadow 0.05s ease-in;
    position: relative;
    max-width: var(--width, 100%);
    padding-bottom: var(--char-count-padding); /*if count by is true = 2rem, else 0*/
    box-shadow: var(--goa-text-area-border);
    border-radius: var(--goa-text-area-border-radius);
  }
  /* Hover state */
  .root:hover {
    box-shadow: var(--goa-text-area-border-hover);
  }
  /* Focus state */
  .root:focus-within{
    box-shadow:
      var(--goa-text-area-border),
      var(--goa-text-area-border-focus);
  }
  /* Error state */
  .error, .error:hover {
    box-shadow: var(--goa-text-area-border-error);
  }
  .error:focus {
    box-shadow:
    var(--goa-text-area-border),
    var(--goa-text-area-border-focus);
  }
  .error:focus-within:hover {
    box-shadow:
    var(--goa-text-area-border),
    var(--goa-text-area-border-focus);;
  }
  /* Disabled state */
  .disabled, .disabled:hover {
    background-color: var(--goa-text-area-color-bg-disabled);
    cursor: default;
    box-shadow: var(--goa-text-area-border-disabled);
    resize: none;
  }
  textarea:disabled {
    resize: none;
    color: var(--goa-text-area-color-text-disabled);
  }

  textarea[readonly] {
    cursor: pointer;
  }

  textarea {
    display: block;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: var(--goa-text-area-border-radius);
    color: var(--goa-text-area-color-text);
    padding: var(--goa-text-area-padding);
    font: var(--goa-text-area-typography);
    min-width: 100%;
    max-width: 100%;
    resize: none;
    height: auto;
    background: none;
  }

  /* Counter */
  .counter {
    position: absolute;
    right: var(--goa-space-m);
    bottom: var(--goa-space-s);
    font: var(--goa-text-area-typography-counter);
  }
  .counter-error {
    color: var(--goa-text-area-color-text-counter-error);
  }

  /* Scrollbar */
  textarea {
    resize: none;
    scroll-behavior: smooth;
    max-height: calc(100vh * var(--max-height, 100) / 100);
    scrollbar-gutter: stable;
  }
  textarea::-webkit-scrollbar {
    width: var(--goa-space-xs);
  }
  textarea::-webkit-scrollbar-track {
    border-radius: var(--goa-border-radius-m);
  }
  textarea::-webkit-scrollbar-thumb {
    background: var(--goa-color-greyscale-400);
    border-radius: var(--goa-border-radius-m);
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background: var(--goa-color-greyscale-600);
  }

  ::placeholder {
    color: var(--goa-text-area-color-text-placeholder);
    opacity: 1;
  }

  @container self (--mobile) {
    textarea {
      width: 100%;
      min-width: 100%;
    }
  }

  @container self (--not-mobile) {
    textarea {
      min-width: 0;
      width: 100%;
    }
  }
</style>
