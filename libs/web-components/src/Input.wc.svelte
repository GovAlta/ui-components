<svelte:options tag="goa-input" />

<script lang="ts" context="module">
  export type GoAButtonVariant = "goa" | "bare";
</script>

<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { GoAIconType } from "./Icon.wc.svelte";

  export let type: string = "text";
  export let name: string = "";
  export let value: string = "";
  export let id: string = "";
  export let disabled: boolean = false;
  export let placeholder: string = "";
  export let leadingicon: GoAIconType = null;
  export let trailingicon: GoAIconType = null;
  export let variant: GoAButtonVariant = "goa";
  export let focused: boolean = false;
  export let readonly: boolean = false;
  export let handletrailingiconclick: boolean = false;
  export let error: boolean = false;

  let inputEl: HTMLElement;
  $: if (focused) {
    inputEl?.focus();
  }

  onMount(async () => {
    await tick();
  });

  function onKeyUp(e) {
    e.target.dispatchEvent(
      new CustomEvent("on:change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { event: e, data: { name, value: e.target.value } },
      })
    );
    e.stopPropagation();
  }

  function doClick() {
    this.dispatchEvent(new CustomEvent("on:trailingIconClick", { composed: true }));
  }
</script>

<!-- HTML -->

<div
  class={`goa-input ${disabled ? "goa-input--disabled" : ""}`}
  class:error={error}
  >
  {#if leadingicon}
    <div class="goa-input-leading-icon">
      <goa-icon type={leadingicon} />
    </div>
  {/if}

  <input
    {id}
    bind:this={inputEl}
    class={`input--${variant}`}
    {readonly}
    {disabled}
    {type}
    {value}
    {placeholder}
    on:keyup={onKeyUp}
  />

  {#if trailingicon && !handletrailingiconclick}
    <div class="goa-input-trailing-icon">
      <goa-icon size="medium" type={trailingicon} />
    </div>
  {/if}

  {#if trailingicon && handletrailingiconclick}
    <div class="goa-input-trailing-icon">
      <goa-icon-button
        on:click={doClick}
        {disabled}
        variant="tertiary"
        size="medium"
        type={trailingicon}
        testId={`${name}-input-trailing-button`}
      />
    </div>
  {/if}
</div>

<!-- Styles -->
<style>
  .goa-input {
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--color-gray-700);
    border-radius: 3px;
    background: white;
    color: var(--color-gray-900, #ccc);
    padding: var(--input-padding, 0.5rem) 0;

    display: flex;
    align-items: center;
    max-height: var(--input-height);
  }

  .goa-input input[readonly] {
    cursor: pointer;
  }

  .goa-input:hover {
    border-color: var(--color-blue-600);
  }
  .goa-input:active,
  .goa-input:focus,
  .goa-input:focus-within {
    box-shadow: 0 0 0 3px var(--color-orange);
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

  .goa-input-leading-icon {
    line-height: 18px;
    padding: 0.5rem;
  }

  .goa-input-trailing-icon {
    line-height: 18px;
    padding: 0.5rem;
  }

  .goa-input-trailing-icon > .goa-icon-button {
    margin-right: -0.5rem;
  }

  input.input--goa::-webkit-calendar-picker-indicator {
    display: none;
  }

  input {
    display: block;
    width: 100%;
    font-size: var(--input-font-size);
    padding: var(--input-padding);
  }

  .goa-input-leading-icon ~ input {
    padding-left: 0;
  }
  .goa-input-trailing-icon ~ input {
    padding-right: 0;
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

  .goa-input .input--bare {
    border: none;
  }

  .goa-state--error .goa-input {
    border: 2px solid var(--color-red);
  }

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--color-red-500);
  }
</style>
