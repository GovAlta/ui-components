<svelte:options tag="goa-input" />

<script lang="ts" context="module">
  export type GoAInputVariant = "goa" | "bare";
</script>

<script lang="ts">
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";

  // Validators
  const [Types, validateType] = typeValidator(
    "Input type",
    ["text", "number", "password", "email", "date", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"]
  );

  const [AutoCapitalize, validateAutoCapitalize] = typeValidator(
    "Input auto capitalize",
    ["on", "off", "none", "sentences", "words", "characters"]
  );

  // Types
  type Type = typeof Types[number];
  type AutoCapitalize = typeof AutoCapitalize[number];

  export let type: Type = "text";
  export let name: string = "";
  export let value: string = "";

  export let autocapitalize: AutoCapitalize = "off";
  export let placeholder: string = "";
  export let leadingicon: GoAIconType = null;
  export let trailingicon: GoAIconType = null;
  export let variant: GoAInputVariant = "goa";
  export let disabled: string = "false";
  export let handletrailingiconclick: string = "false";
  export let focused: string = "false";
  export let readonly: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let width: string = "30ch";
  export let arialabel: string = null;
  export let min: string = "";
  export let max: string = "";
  export let step: number = 1;
  export let prefix: string = "";
  export let suffix: string = "";
  export let debounce: number = 0;

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  $: handlesTrailingIconClick = toBoolean(handletrailingiconclick);
  $: isFocused = toBoolean(focused);
  $: isReadonly = toBoolean(readonly);
  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);

  let inputEl: HTMLElement;
  $: if (isFocused && inputEl) {
    setTimeout(() => inputEl.focus(), 1);
  }

  $: if (inputEl && type === "search") {
    inputEl.addEventListener("search", e => {
      onKeyUp(e);
    });
  }

  let _debounceId = null;
  function onKeyUp(e: Event) {
    const input = e.target as HTMLInputElement;

    if (!input) return;

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
    
    value = input.value;
  }

  function doClick() {
    this.dispatchEvent(new CustomEvent("_trailingIconClick", { composed: true }));
  }

  onMount(() => {
    validateType(type);
    validateAutoCapitalize(autocapitalize);
    if (prefix != "" || suffix != "") {
      console.warn("GoAInput [prefix] and [suffix] properties are deprecated. Instead use leadingContent and trailingContent.");
    }
  });

</script>

<!-- HTML -->

<div
  class="container"
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    --width: ${width};
  `}
>
  <div
    class={`
      goa-input
      ${isDisabled ? "goa-input--disabled" : ""}
      variant--${variant}
      type--${type}
    `}
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
        class="goa-input-leading-icon"
        data-testid="leading-icon"
        type={leadingicon}
      />
    {/if}

    <input
      bind:this={inputEl}
      class={`input--${variant}`}
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
      role="textbox"
      aria-label={arialabel || name}
      on:keyup={onKeyUp}
      on:change={onKeyUp}
    />

    <!-- Trailing Icon -->
    {#if trailingicon && !handlesTrailingIconClick}
      <goa-icon
        class="goa-input-trailing-icon"
        data-testid="trailing-icon"
        size="medium"
        type={trailingicon}
      />
    {/if}

    <!-- Trailing Icon Button -->
    {#if trailingicon && handlesTrailingIconClick}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <goa-icon-button
        on:click={doClick}
        disabled={isDisabled}
        variant="nocolor"
        size="medium"
        icon={trailingicon}
        data-testid="trailing-icon-button"
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

  @media (min-width: 640px) {
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
    background-color: var(--color-white);
  }

  .goa-input:hover {
    border-color: var(--goa-color-interactive-hover);
  }
  .goa-input:active,
  .goa-input:focus,
  .goa-input:focus-within {
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

  .goa-input-leading-icon {
    margin-left: 0.5rem;
  }

  .goa-input-trailing-icon {
    margin-right: 0.5rem;
  }

  input {
    display: inline-block;
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    padding: var(--goa-space-xs);
    line-height: calc(40px - calc(var(--goa-space-xs) * 2));
    background-color: transparent;
    width: 100%;
    flex: 1 1 auto;
    font-family: var(--goa-font-family-sans);
  }

  input[readonly] {
    cursor: pointer;
  }

  .goa-input-leading-icon + input {
    padding-left: 0.5rem;
  }

  input,
  input:focus,
  input:hover,
  input:active {
    outline: none;
    border: none;
  }

  .goa-input--disabled,
  .goa-input--disabled:hover,
  .goa-input--disabled:active,
  .goa-input--disabled:focus {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200);
    cursor: default;
    box-shadow: none;
  }

  .goa-input--disabled input,
  .goa-input--disabled input:hover,
  .goa-input--disabled input:active,
  .goa-input--disabled input:focus {
    color: var(--goa-color-text-secondary);
  }

  .goa-input--disabled input:hover {
    cursor: default !important;
  }

  .prefix,
  .suffix,
  .leading-content ::slotted(div), .trailing-content ::slotted(div) {
    background-color: var(--goa-color-greyscale-100);
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
  }

  .leading-content ::slotted(div), .trailing-content ::slotted(div) {
    padding: 0.5rem 0.75rem;
  }

  .prefix, .leading-content ::slotted(div) {
    /* background-clip doesn't want to work */
    border-top-left-radius: var(--goa-border-radius-m);
    border-bottom-left-radius: var(--goa-border-radius-m);
    border-right: 1px solid var(--goa-color-greyscale-700);
  }
  .suffix, .trailing-content ::slotted(div) {
    /* background-clip doesn't want to work */
    border-top-right-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
    border-left: 1px solid var(--goa-color-greyscale-700);
  }
  .goa-input--disabled .prefix, .goa-input--disabled .leading-content ::slotted(div) {
    border-right: 1px solid var(--goa-color-greyscale-200);
  }
  .goa-input--disabled .suffix, .goa-input--disabled .trailing-content ::slotted(div) {
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

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--goa-color-interactive-error);
  }

  input[type="search" i]:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-search-cancel-button {
    position: relative;
    right: var(--search-icon-offset);
    cursor: pointer;
    -webkit-appearance: none;
    height: 1.2rem;
    width: 1.2rem;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23333" d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"/></svg>')
      center center no-repeat;
  }
</style>
