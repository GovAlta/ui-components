<svelte:options tag="goa-input" />

<script lang="ts" context="module">
  export type GoAInputVariant = "goa" | "bare";
</script>

<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week" = "text";
  export let name: string = "";
  export let value: string = "";
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

  // character counter
  export let showcounter: string = "false";
  export let maxcharcount: number = 0;

  $: handlesTrailingIconClick = toBoolean(handletrailingiconclick);
  $: isFocused = toBoolean(focused);
  $: isReadonly = toBoolean(readonly);
  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);
  $: showCounter = toBoolean(showcounter);

  let inputEl: HTMLElement;
  $: if (isFocused && inputEl) {
    setTimeout(() => inputEl.focus(), 1);
  }

  $: if (inputEl && type === "search") {
    inputEl.addEventListener("search", e => {
      onKeyUp(e);
    });
  }

  function onKeyUp(e) {
    e.target.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { name, value: e.target.value },
      }),
    );
    value = e.target.value;
  }

  function doClick() {
    this.dispatchEvent(new CustomEvent("_trailingIconClick", { composed: true }));
  }
</script>

<!-- HTML -->

<div
  class="container"
  style={`
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
      {name}
      {type}
      {value}
      {placeholder}
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
      <goa-icon-button
        class="goa-input-trailing-icon"
        on:click={doClick}
        disabled={isDisabled}
        variant="nocolor"
        size="medium"
        type={trailingicon}
        data-testid="trailing-icon-button"
      />
    {/if}
  </div>

  <!-- Counter -->
  {#if showCounter}
    {#if maxcharcount > 0}
      <div class="counter" class:counter-error={value.length > maxcharcount}>
        {value.length}{`/${maxcharcount}`}
      </div>
    {:else if value.length > 0}
      <div class="counter">
        {value.length}
      </div>
    {/if}
  {/if}
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .container {
    position: relative;
    width: 100%;
  }

  @media (min-width: 640px) {
    .container {
      max-width: var(--width);
    }
  }

  .goa-input,
  .goa-input * {
    box-sizing: border-box;
  }

  .goa-input {
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--color-gray-600);
    border-radius: var(--input-border-radius);
    background: white;

    display: inline-flex;
    align-items: center;

    /* The vertical align fixes inputs with a leading icon to not be vertically offset */
    vertical-align: middle;

    min-width: 100%;
  }

  .goa-input:hover {
    border-color: var(--goa-color-interactive--hover);
  }
  .goa-input:active,
  .goa-input:focus,
  .goa-input:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
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
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }

  .goa-input-trailing-icon {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }

  .goa-input-trailing-icon > .goa-icon-button {
    margin-right: -0.5rem;
  }

  input {
    display: inline-block;
    color: var(--goa-color-text);
    font-size: var(--input-font-size);
    padding: var(--input-padding);
    line-height: calc(40px - calc(var(--input-padding) * 2));
    background-color: transparent;

    width: 0;
    flex: 1 1 auto;
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
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-200);
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

  .counter {
    position: absolute;
    padding-top: 0.25rem;
    right: 0;
    font-size: var(--fs-sm);
  }

  .counter-error {
    color: var(--goa-color-interactive--error);
  }

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--goa-color-interactive--error);
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
