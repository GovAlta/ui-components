<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { onMount } from "svelte";
  import { getContext, ContextStore } from '../../common/context-store';
  import type { RadioMessage } from "./types";

  export let value: string;
  export let label: string;
  export let name: string;

  // private
  let disabled = false;
  let checked = false;
  let error = false;
  let ctx: ContextStore;

  // Hooks

  onMount(() => {
    ctx = getContext(name);
    ctx.subscribe<RadioMessage>("propChange", (state) => {
      checked = state.value === value;
      disabled = state.disabled;
      error = state.error;
    });
  });

  // Events

  function onChange(e) {
    checked = !checked;
    if (checked) {
      ctx.notify("optionChange", {
        checked,
        disabled,
        value,
      });
    }
  }
</script>

<!-- HTML -->

<label
  data-testid="radio-item-{value}"
  class="goa-radio"
  class:goa-radio--disabled={disabled}
  class:goa-radio--error={error}
>
  <input type="radio" {name} {value} {checked} {disabled} on:change={onChange} />
  <div class="goa-radio-icon" />
  <span class="goa-radio-label">
    <slot>
      {label || value}
    </slot>
  </span>
</label>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  label.goa-radio {
    --goa-radio-outline-width: 3px;
    --goa-radio-diameter: 1.5rem;
    --goa-radio-border-width: 1px;
    --goa-radio-border-width--checked: 7px;

    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    min-height: 3rem;
  }

  .goa-radio:hover {
    cursor: pointer;
  }

  .goa-radio *,
  .goa-radio *:before,
  .goa-radio *:after {
    box-sizing: border-box;
  }

  .goa-radio input[type="radio"] {
    width: 0;
    height: 0;
  }

  .goa-radio input[type="radio"]:hover ~ .goa-radio-icon {
    border-color: var(--goa-color-interactive--hover);
  }

  .goa-radio input[type="radio"]:focus ~ .goa-radio-icon  {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive--highlight);
  }

  .goa-radio-label {
    padding: 0.5rem;
    font-weight: var(--fw-regular);
  }

  .goa-radio-icon {
    display: inline-block;
    height: var(--goa-radio-diameter);
    width: var(--goa-radio-diameter);
    border-radius: 50%;
    background-color: #fff;
    transition: box-shadow 100ms ease-in-out;
  }

  .goa-radio:focus > input:not(:disabled) ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive--highlight);
  }

  .goa-radio--disabled {
    opacity: 0.4;
  }
  .goa-radio--disabled:hover {
    cursor: default;
  }

  /* States */

  /* Checked */
  input[type="radio"]:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid var(--goa-color-interactive--active);
  }

  /* Not checked */
  input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--color-gray-600);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--color-gray-600);
  }

  /* Disabled and checked */
  input[type="radio"]:disabled:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid var(--goa-color-interactive--active);
  }

  /* Error */
  .goa-radio--error input[type="radio"]:checked ~ .goa-radio-icon {
    border: 7px solid var(--goa-color-status-emergency);
  }
  .goa-radio--error input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: 2px solid var(--goa-color-status-emergency);
  }
</style>
