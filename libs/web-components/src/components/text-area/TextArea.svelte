<svelte:options tag="goa-textarea" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

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

  // export let showcounter: string = "false";
  export let maxcharcount: number = 0;

  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);
  $: isReadonly = toBoolean(readonly);

  let showCounter = false;
  // $: showCounter = toBoolean(showcounter);

  function onChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    if (isDisabled) return;

    e.target.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: false,
        cancelable: true,
        detail: { event: e, name, value },
      }),
    );
    e.stopPropagation();
  }
</script>

<!-- HTML -->
<div
  class="container"
  style={`
    --width: ${width};
  `}
>
  <textarea
    {name}
    {placeholder}
    {value}
    {rows}
    aria-label={arialabel || name}
    class="goa-textarea"
    class:error={isError}
    disabled={isDisabled}
    readonly={isReadonly}
    data-testid={testid}
    on:keyup={onChange}
  />
  {#if showCounter}
    {#if maxcharcount > 0}
      <div
        class="counter"
        class:counter-error={value.length > maxcharcount}>
        {value.length}{`/${maxcharcount}`}
      </div>
    {:else if value.length > 0}
      <div class="counter">
        {value.length}
      </div>
    {/if}
  {/if}
</div>

<!-- Style -->
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

  .goa-textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;

    outline: none;
    transition: box-shadow 0.1s ease-in;
    border: 1px solid var(--color-gray-600);
    border-radius: 3px;
    background: var(--color-white);
    color: var(--color-black, #ccc);
    padding: var(--textarea-padding-vertical, 0.5rem) var(--textarea-padding-horizontal, 0.5rem);
    font-size: var(--input-font-size);
    font-family: var(--font-family);

    min-width: 100%;
  }

  @media (min-width: 640px) {
    .goa-textarea {
      min-width: 0;
      width: var(--width);
    }
  }

  .goa-textarea[readonly] {
    cursor: pointer;
  }

  .goa-textarea:hover {
    border-color: var(--goa-color-interactive--hover);
  }
  .goa-textarea:active,
  .goa-textarea:focus,
  .goa-textarea:focus-within {
    box-shadow: 0 0 0 3px var(--goa-color-interactive--focus);
  }
  .goa-textarea:disabled {
    border-color: var(--color-gray-200);
  }
  .goa-textarea:disabled:hover {
    border-color: var(--color-gray-200);
  }
  .goa-textarea:disabled:focus,
  .goa-textarea:disabled:active {
    box-shadow: none;
  }

  .counter {
    position: absolute;
    right: 0;
    padding-top: 0.25rem;
    font-size: var(--fs-sm);
  }

  .counter-error {
    color: var(--goa-color-interactive--error)
  }

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--goa-color-interactive--error);
  }
</style>
