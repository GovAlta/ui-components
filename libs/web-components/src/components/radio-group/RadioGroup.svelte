<svelte:options customElement="goa-radio-group" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";
  import { onMount, tick } from "svelte";

  // Validator
  const [Orientations, validateOrientation] = typeValidator(
    "Radio group orientation",
    ["vertical", "horizontal"],
  );

  // Type
  type Orientation = (typeof Orientations)[number];

  interface RadioOption {
    label: string;
    value: string;
    description?: string;
  }

  // Public

  export let name: string;
  export let value: string;
  export let orientation: Orientation = "vertical";
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Reactive

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);

  // Private

  let el: HTMLElement;
  let options: RadioOption[] = [];

  // Hooks

  onMount(async () => {
    await tick();
    validateOrientation(orientation);
    options = getOptions();
  });

  // Functions

  /**
   * Allows the child elements to be obtainable within unit tests
   * @returns List of child elements
   */
  function getChildren(): Element[] {
    const slot = el.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      // default
      return [...slot.assignedElements()];
    } else {
      // unit tests
      // @ts-expect-error
      return [...el.children] as Element[];
    }
  }

  /**
   * Maps the child elements to a list of RadioOptions
   */
  function getOptions(): RadioOption[] {
    const children = getChildren();

    return children.map((el: Element) => {
      const option = el as unknown as RadioOption & { innerText: string };
      const value = el.getAttribute("value") || option.value;
      const label =
        el.getAttribute("label") ||
        option.innerText ||
        option.label ||
        option.innerText;
      const description = el.getAttribute("description") || option.description;
      return { value, label, description };
    });
  }

  /**
   * Handles changing of the radio items
   * @param newValue Selected value
   */
  function onChange(newValue: string) {
    if (newValue === value) return;

    value = newValue;
    el.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { name, value: value },
      }),
    );
  }
</script>

<!-- Html -->
<div
  bind:this={el}
  style={calculateMargin(mt, mr, mb, ml)}
  class={`goa-radio-group--${orientation}`}
  data-testid={testid}
>
  <slot />
  {#each options as option, index (option.value)}
    <div class="goa-radio-container">
      <label
        data-testid="radio-option-{option.value}"
        class="goa-radio"
        class:goa-radio--disabled={isDisabled}
        class:goa-radio--error={isError}
      >
        <input
          type="radio"
          {name}
          value={option.value}
          disabled={isDisabled}
          checked={option.value === value}
          aria-label={arialabel || name}
          aria-describedby={`description-${name}-${index}`}
          on:change={() => onChange(option.value)}
        />
        <div class="goa-radio-icon" />
        <span class="goa-radio-label">
          {option.label || option.value}
        </span>
      </label>
      {#if option.description}
        <div class="goa-radio-description" id={`description-${name}-${index}`}>
          {option.description}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
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
  }

  .goa-radio-container {
    padding-bottom: 1rem;
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

  .goa-radio-label {
    padding: 0 0.5rem;
    font-weight: var(--goa-font-weight-regular);
  }

  .goa-radio-description {
    font: var(--goa-typography-body-xs);
    margin-left: var(--goa-space-xl);
    margin-top: var(--goa-space-2xs);
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
    margin-top: var(--font-valign-fix);
  }

  /* What is this? */
  .goa-radio:focus > input:not(:disabled) ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width)
      var(--goa-color-interactive-focus);
  }

  .goa-radio--disabled .goa-radio-label {
    opacity: 0.4;
  }
  .goa-radio--disabled:hover {
    cursor: default;
  }

  /* States */

  /* Default */
  input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-color-greyscale-700);
  }

  /* Default:hover */
  input[type="radio"]:hover ~ .goa-radio-icon {
    border: 1px solid var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-hover);
  }

  /* Checked:hover */
  input[type="radio"]:checked:hover ~ .goa-radio-icon {
    border: 7px solid var(--goa-color-interactive-hover);
    box-shadow: 0 0 0 1px var(--goa-color-interactive-hover);
  }

  /* Default:focus */
  input[type="radio"]:focus ~ .goa-radio-icon,
  input[type="radio"]:hover:active ~ .goa-radio-icon,
  input[type="radio"]:hover:focus ~ .goa-radio-icon,
  input[type="radio"]:active ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width)
      var(--goa-color-interactive-focus);
  }

  /* Checked */
  input[type="radio"]:checked ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid
      var(--goa-color-interactive-default);
  }

  /* Disabled */
  input[type="radio"]:disabled ~ .goa-radio-icon,
  input[type="radio"]:disabled:focus ~ .goa-radio-icon,
  input[type="radio"]:disabled:active ~ .goa-radio-icon {
    border: var(--goa-radio-border-width) solid var(--goa-color-greyscale-700);
    box-shadow: none;
    opacity: 40%;
  }

  /* Disabled and checked */
  input[type="radio"]:disabled:checked ~ .goa-radio-icon,
  input[type="radio"]:disabled:checked:focus ~ .goa-radio-icon,
  input[type="radio"]:disabled:checked:active ~ .goa-radio-icon {
    border: var(--goa-radio-border-width--checked) solid
      var(--goa-color-interactive-hover);
    box-shadow: none;
  }

  /* Error */
  .goa-radio--error input[type="radio"]:checked ~ .goa-radio-icon,
  .goa-radio--error input[type="radio"]:disabled:checked ~ .goa-radio-icon {
    border: 7px solid var(--goa-color-emergency-default);
  }
  .goa-radio--error input[type="radio"]:hover ~ .goa-radio-icon {
    box-shadow: 0 0 0 1px var(--goa-color-emergency-default);
  }
  .goa-radio--error input[type="radio"]:hover:active ~ .goa-radio-icon,
  .goa-radio--error input[type="radio"]:hover:focus ~ .goa-radio-icon {
    box-shadow: 0 0 0 var(--goa-radio-outline-width)
      var(--goa-color-interactive-focus);
  }
  .goa-radio--error input[type="radio"]:disabled:hover ~ .goa-radio-icon {
    box-shadow: none;
  }
  .goa-radio--error input[type="radio"]:not(:checked) ~ .goa-radio-icon {
    border: 2px solid var(--goa-color-emergency-default);
  }
</style>
