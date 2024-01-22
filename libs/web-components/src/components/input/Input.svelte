<svelte:options customElement="goa-input" />

<script lang="ts" context="module">
  export type GoAInputVariant = "goa" | "bare";
</script>

<script lang="ts">
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount, tick } from "svelte";

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

  //
  let _leadingContentSlot = false;
  let _trailingContentSlot = false;
  let _debounceId: any;

  let inputEl: HTMLElement;
  let _rootEl: HTMLElement;

  $: handlesTrailingIconClick = toBoolean(handletrailingiconclick);
  $: isFocused = toBoolean(focused);
  $: isReadonly = toBoolean(readonly);
  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);

  $: if (isFocused && inputEl) {
    setTimeout(() => inputEl.focus(), 1);
  }

  $: if (inputEl && type === "search") {
    inputEl.addEventListener("search", (e) => {
      onKeyUp(e);
    });
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
          bubbles: false,
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
    input.dispatchEvent(
      new CustomEvent("_focus", {
        composed: true,
        detail: { name, value: input.value },
      }),
    );
  }

  function onBlur(e: Event) {
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

  onMount(async () => {
    await tick();

    validateType(type);
    validateAutoCapitalize(autocapitalize);

    if (prefix != "" || suffix != "") {
      console.warn(
        "GoAInput [prefix] and [suffix] properties are deprecated. Instead use leadingContent and trailingContent.",
      );
    }

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
  });
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
    class:input-leading-content={_leadingContentSlot}
    class:input-trailing-content={_trailingContentSlot}
    class:error={isError}
  >
    {#if prefix}
      <div class="prefix">
        {prefix}
      </div>
    {/if}

    <div class="leading-content">
      <slot name="leadingContent" />
    </div>

    {#if leadingicon}
      <goa-icon
        class="leading-icon"
        data-testid="leading-icon"
        type={leadingicon}
      />
    {/if}

    <input
      bind:this={inputEl}
      class="input--{variant}"
      class:input-leading-content={_leadingContentSlot && !isDisabled}
      class:input-trailing-content={_trailingContentSlot && !isDisabled}
      style={`--search-icon-offset: ${trailingicon ? "-0.5rem" : "0"}`}
      readonly={isReadonly}
      disabled={isDisabled}
      data-testid={testid}
      {autocapitalize}
      {name}
      {type}
      {value}
      {placeholder}
      {min}
      {max}
      {step}
      {maxlength}
      id={id || name}
      role="textbox"
      aria-label={arialabel || name}
      aria-labelledby={arialabelledby}
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
        variant="nocolor"
        size="medium"
        icon={trailingicon}
        data-testid="trailing-icon-button"
        class="trailing-icon-button"
      />
    {/if}

    {#if suffix}
      <span class="suffix">{suffix}</span>
    {/if}
    <div class="trailing-content">
      <slot name="trailingContent" />
    </div>
  </div>
</div>

<!-- Styles -->
<style>
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
    box-sizing: border-box;
    line-height: normal;
  }

  .goa-input {
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);
    display: inline-flex;
    align-items: stretch;
    /* The vertical align fixes inputs with a leading icon to not be vertically offset */
    vertical-align: middle;
    min-width: 100%;
    background-color: var(--goa-color-greyscale-white);
  }

  .goa-input:hover:not(.leading-content):not(.trailing-content) {
    border-color: var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
  }
  .goa-input:active:not(.leading-content):not(.trailing-content),
  .goa-input:focus:not(.leading-content):not(.trailing-content),
  .goa-input:focus-within:not(.leading-content):not(.trailing-content) {
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  /* type=range does not have an outline/box-shadow */
  .goa-input.type--range {
    border: none;
  }

  .goa-input.type--range:active,
  .goa-input.type--range:focus,
  .goa-input.type--range:focus-within {
    box-shadow: none;
  }

  .leading-icon {
    margin-left: 0.75rem;
  }

  .trailing-icon {
    margin-right: var(--goa-space-s);
  }

  .trailing-icon-button {
    margin-right: var(--goa-space-xs);
  }

  input {
    display: inline-block;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    padding: var(--goa-space-xs) var(--goa-space-s);
    line-height: calc(40px - calc(var(--goa-space-xs) * 2));
    background-color: transparent;
    width: 100%;
    flex: 1 1 auto;
    font-family: var(--goa-font-family-sans);
    z-index: 1;
  }

  input[readonly] {
    cursor: pointer;
  }

  .leading-icon + input {
    padding-left: 0.5rem;
  }

  input,
  input:focus,
  input:hover,
  input:active {
    outline: none;
    border: none;
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
  .leading-content :global(::slotted(div)),
  .trailing-content :global(::slotted(div)) {
    background-color: var(--goa-color-greyscale-100);
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
  }

  .leading-content :global(::slotted(div)),
  .trailing-content :global(::slotted(div)) {
    padding: 0.5rem 0.75rem;
  }

  .prefix,
  .leading-content :global(::slotted(div)) {
    /* background-clip doesn't want to work */
    border-top-left-radius: var(--goa-border-radius-m);
    border-bottom-left-radius: var(--goa-border-radius-m);
    border-right: 1px solid var(--goa-color-greyscale-700);
  }

  .suffix,
  .trailing-content :global(::slotted(div)) {
    /* background-clip doesn't want to work */
    border-top-right-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
    border-left: 1px solid var(--goa-color-greyscale-700);
  }

  .input--disabled .prefix,
  .input--disabled .leading-content :global(::slotted(div)) {
    border-right: 1px solid var(--goa-color-greyscale-200);
  }

  .input--disabled .suffix,
  .input--disabled .trailing-content :global(::slotted(div)) {
    border-left: 1px solid var(--goa-color-greyscale-200);
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

  .error:not(.leading-content):not(.trailing-content),
  .error:hover:not(.leading-content):not(.trailing-content) {
    border: 2px solid var(--goa-color-interactive-error);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-error);
  }

  .error:focus-within:hover:not(.leading-content):not(.trailing-content) {
    border: 2px solid var(--goa-color-interactive-error);
    box-shadow: 0 0 0 3px var(--goa-color-interactive-focus);
  }

  .error .input-leading-content,
  .error .input-leading-content:hover,
  .error .input-trailing-content,
  .error .input-trailing-content:hover {
    outline: var(--goa-border-width-s) solid var(--goa-color-interactive-error);
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-error);
  }

  .error .input-leading-content:focus,
  .error .input-trailing-content:focus,
  .error .input-leading-content:active,
  .error .input-trailing-content:active {
    outline: var(--goa-border-width-s) solid var(--goa-color-interactive-error);
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  .input-leading-content:hover,
  .input-trailing-content:hover {
    box-shadow: inset 0 0 0 var(--goa-border-width-m)
      var(--goa-color-interactive-hover);
    outline: var(--goa-border-width-s) solid var(--goa-color-interactive-hover);
  }

  .input-leading-content:active,
  .input-leading-content:focus,
  .input-leading-content:focus-within,
  .input-trailing-content:active,
  .input-trailing-content:focus,
  .input-trailing-content:focus-within {
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
    outline: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
  }

  .error .input-trailing-content,
  .input-trailing-content:hover,
  .input-trailing-content:active,
  .input-trailing-content:focus,
  .input-trailing-content:focus-within {
    border-top-left-radius: var(--goa-border-radius-m);
    border-bottom-left-radius: var(--goa-border-radius-m);
  }

  .error .input-leading-content,
  .input-leading-content:hover,
  .input-leading-content:active,
  .input-leading-content:focus,
  .input-leading-content:focus-within {
    border-top-right-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
  }

  .input-leading-content.input-trailing-content,
  .input-leading-content.input-trailing-content:hover,
  .input-leading-content.input-trailing-content:active,
  .input-leading-content.input-trailing-content:focus,
  .input-leading-content.input-trailing-content:focus-within {
    border-radius: 0;
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
