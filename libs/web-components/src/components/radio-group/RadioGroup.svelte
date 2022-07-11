<svelte:options tag="goa-radio-group" />

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { deleteContext, ContextStore, createContext } from '../../common/context-store';
  import type { RadioMessage } from "./types";
  import { toBoolean } from '../../common/utils';
  import { BIND } from './types';

  export let name: string;
  export let value: string;
  export let orientation = 'vertical';
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";

  let options: RadioMessage[] = [];

  // private
  let isError: boolean
  let ctx: ContextStore;

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);

  let el: HTMLElement;

  onMount(() => {
    ctx = createContext(name);
    ctx.subscribe((msg) => {
      switch (msg?.type) {
        case BIND: {
          options = [...options, msg as RadioMessage];
        }
      }
    });

  });

  function onChange(newValue: string) {
    if (newValue === value) return;

    value = newValue;
    el.dispatchEvent(new CustomEvent('_change', {
      composed: true,
      detail: { name, value: value}
    }))
  }

  onDestroy(() => {
    deleteContext(name);
  });

</script>

<!-- Html -->
<div
  bind:this={el}
  class={`goa-radio-group--${orientation}`}
  data-testid={testid}
>
  <slot />
  {#each options as option (option.value) }
    <label
      data-testid="radio-option-{option.value}"
      class="goa-radio"
      class:goa-radio--disabled={isDisabled}
      class:goa-radio--error={isError}
    >
      <input type="radio" {name} value={option.value} disabled={isDisabled} checked={option.value === value} on:change={() => onChange(option.value)} />
      <div class="goa-radio-icon" />
      <span class="goa-radio-label">
        {option.label || option.value}
      </span>
    </label>
  {/each}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .goa-radio-group--horizontal {
    display: flex;
    flex-direction: row;
  }

  .goa-radio-group--vertical {
    display: inline-block;
  }

  /* Radio Items */
  label.goa-radio {
    --goa-radio-outline-width: 3px;
    --goa-radio-diameter: 1.5rem;
    --goa-radio-border-width: 1px;
    --goa-radio-border-width--checked: 7px;

    display: inline-block;
    box-sizing: border-box;
    display: flex;
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
    margin: 0;
    opacity: 0;
  }

  input[type="radio"]:hover ~ .goa-radio-icon {
    border-color: var(--goa-color-interactive--hover);
  }

  input[type="radio"]:focus ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive--focus);
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

    /* prevent squishing of radio button */
    flex: 0 0 auto; 
  }

  .goa-radio:focus > input:not(:disabled) ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width) var(--goa-color-interactive--focus);
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
