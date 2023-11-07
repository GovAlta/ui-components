<svelte:options tag="goa-textarea" />

<!-- Script -->
<script lang="ts">
  import { pluralize, toBoolean } from "../../common/utils";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

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
  export let countby: "character" | "word";
  export let maxcount: number = -1;

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // reactive

  $: isError = toBoolean(error);
  $: isDisabled = toBoolean(disabled);
  $: isReadonly = toBoolean(readonly);
  $: count = countby === "character" 
    ? value.length
    : value.split(" ").filter(word => word.trim().length > 0).length;

  // privates

  let _textareaEl: HTMLTextAreaElement;

  // functions
  
  function onChange(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement } ) {
    if (isDisabled) return;

    const el = e.currentTarget;
    _textareaEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: { name, value: el.value },
      }),
    );
  }

  function onKeyPress(e: KeyboardEvent) {
    if (isDisabled) return;

    _textareaEl.dispatchEvent(
      new CustomEvent("_keyPress", {
        composed: true,
        detail: { name, value, key: e.key }
      }),
    );
  }
</script>

<!-- HTML -->
<div id="container">
  <div
    class="root"
    style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --width: ${width};
    `}
  >
    <textarea
      {name}
      {placeholder}
      {rows}
      aria-label={arialabel || name}
      class="goa-textarea"
      class:error={isError}
      disabled={isDisabled}
      readonly={isReadonly}
      data-testid={testid}
      bind:this={_textAreaEl}
      bind:value={value}
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
</div>

<!-- Style -->
<style>
  :host {
    --textarea-padding-vertical: 0.625rem;
    --textarea-padding-horizontal: var(--goa-space-s);

    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  #container {
    container: self / inline-size;
  }

  .root {
    position: relative;
    width: 100%;
    padding-bottom: var(--char-count-padding);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-700);
    border-radius: 3px;
  }

  textarea {
    display: block;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 3px;
    color: var(--goa-color-greyscale-black, #ccc);
    padding: var(--textarea-padding-vertical) var(--textarea-padding-horizontal);
    font-size: var(--goa-font-size-4);
    font-family: var(--goa-font-family-sans);
    resize: vertical;
  }

  @container self (--container-mobile) {
    .goa-textarea {
      width: 100%;
      min-width: 100%;
    }
  }

  @container self (--container-not-mobile) {
    .root {
      max-width: var(--width);
    }
    .goa-textarea {
      min-width: 0;
      width: var(--width);
    }
  }



  .goa-textarea[readonly] {
    cursor: pointer;
  }

  .root:hover {
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-hover);
  }

  .root:focus-within {
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  .counter-error {
    color: var(--goa-color-interactive-error)
  }

  .counter {
    position: absolute;
    right: 0.75rem;
    font-size: var(--goa-font-size-2);
  }

  textarea {
    resize: none;
    scroll-behavior: smooth;
    max-height: calc(100vh * var(--max-height, 100) / 100);
  }

  textarea::-webkit-scrollbar {
    width: 6px;
  }

  textarea::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  textarea::-webkit-scrollbar-thumb {
    background: #888;
  }

  textarea::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  .error {
    border-color: var(--goa-color-interactive-error);
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-error);
  }
  .error:hover {
    box-shadow: 0 0 0 var(--goa-border-width-m) var(--goa-color-interactive-error);
  }
  .error:active,
  .error:focus {
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }
</style>
