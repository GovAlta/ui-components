<svelte:options tag="goa-input" />

<script lang="ts" context="module">
  export type GoAInputVariant = "goa" | "bare";
</script>

<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";

  export let type: "text" | "number" | "password" | "email" | "date" | "datetime-local" | "month" | "search" | "tel" | "time" | "url" | "week" = "text";
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
  export let width: string = "100%";

  $: handlesTrailingIconClick = toBoolean(handletrailingiconclick);
  $: isFocused = toBoolean(focused);
  $: isReadonly = toBoolean(readonly);
  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);

  let inputEl: HTMLElement;
  $: if (isFocused && inputEl) {
    setTimeout(() => inputEl.focus(), 1)
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
    e.stopPropagation();
  }

  function doClick() {
    this.dispatchEvent(new CustomEvent("_trailingIconClick", { composed: true }));
  }
</script>

<!-- HTML -->

<div
  style={`width: ${width};`}
  class={`
    goa-input ${isDisabled ? "goa-input--disabled" : ""}
    variant--${variant}
    type--${type}
  `}
  class:error={isError}>
  {#if leadingicon}
    <div class="goa-input-leading-icon">
      <goa-icon data-testid="leading-icon" type={leadingicon} />
    </div>
  {/if}

  <input
    bind:this={inputEl}
    class={`input--${variant}`}
    readonly={isReadonly}
    disabled={isDisabled}
    data-testid={testid}
    {name}
    {type}
    {value}
    {placeholder}
    on:keyup={onKeyUp}
  />

  {#if trailingicon && !handlesTrailingIconClick}
    <div class="goa-input-trailing-icon">
      <goa-icon data-testid="trailing-icon" size="medium" type={trailingicon} />
    </div>
  {/if}

  {#if trailingicon && handlesTrailingIconClick}
    <div class="goa-input-trailing-icon">
      <goa-icon-button
        on:click={doClick}
        disabled={isDisabled}
        variant="nocolor"
        size="medium"
        type={trailingicon}
        data-testid="trailing-icon-button"
      />
    </div>
  {/if}
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
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
    border-radius: 3px;
    background: white;
    color: var(--color-black, #ccc);
    padding: var(--input-padding, 0.5rem) 0.5rem;

    display: inline-flex;
    align-items: center;
  }

  .goa-input:hover {
    border-color: var(--goa-color-interactive--hover);
  }
  .goa-input:active,
  .goa-input:focus,
  .goa-input:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--highlight);
  }

  .goa-input:disabled {
    border-color: var(--color-gray-500);
  }
  .goa-input:disabled:hover {
    border-color: var(--color-gray-500);
  }
  .goa-input:disabled:focus {
    box-shadow: none;
  }

  .goa-input input[readonly] {
    cursor: pointer;
  }

  /* type=range does not have an outline/box-shsdow */
  .goa-input.type--range {
    border: none;
  }

  .goa-input.type--range:active,
  .goa-input.type--range:focus,
  .goa-input.type--range:focus-within {
    box-shadow: none;
  }

  .goa-input-leading-icon {
    line-height: 18px;
  }

  .goa-input-trailing-icon {
    display: flex;
    align-items: center;
  }

  .goa-input-trailing-icon > .goa-icon-button {
    margin-right: -0.5rem;
  }

  input {
    display: block;
    width: 100%;
    font-size: var(--input-font-size);
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

  .goa-input--disabled {
    opacity: 0.5;
    cursor: default;
    border-color: var(--color-black);
  }

  .goa-input--disabled:hover,
  .goa-input--disabled:active,
  .goa-input--disabled:focus {
    border-color: var(--color-black);
    cursor: default;
    box-shadow: none;
  }

  .goa-input--disabled input:hover {
    cursor: default !important;
  }

  input.input--goa {
    display: block;
    border: none;
    flex: 1 1 auto;
  }

  .variant--bare {
    border: none;
  }

  .variant--bare:focus, .variant--bare:active, .variant--bare:focus-within {
    box-shadow: none;
  }

  .goa-state--error .goa-input {
    border: 2px solid var(--goa-color-status-emergency);
  }

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--goa-color-status-emergency-dark);
  }
</style>
