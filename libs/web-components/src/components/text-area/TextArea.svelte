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

  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);
  $: isReadonly = toBoolean(readonly);

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
<textarea
  {name}
  {placeholder}
  {value}
  {rows}
  style={`
    --width: ${width};
  `}
  class="goa-textarea"
  class:error={isError}
  disabled={isDisabled}
  readonly={isReadonly}
  data-testid={testid}
  on:keyup={onChange}
/>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
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
    padding: var(--input-padding, 0.5rem);
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

  .error:hover,
  .error:focus,
  .error {
    border: 2px solid var(--goa-color-status-emergency-dark);
  }
</style>
