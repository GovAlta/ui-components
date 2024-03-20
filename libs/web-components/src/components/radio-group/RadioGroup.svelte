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
  let _options: Element[] = [];

  // Hooks

  onMount(async () => {
    await tick();
    validateOrientation(orientation);

    if (!el) return;

    _options = getChildren();
    bindOptions(_options);

    el.addEventListener("_click",(e: Event) => {
      onChange((e as CustomEvent).detail);
    });
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
  function bindOptions(children: Element[]) {
    children.forEach((el, index) => {
      const option = el as unknown as RadioOption & { innerText: string };
      const optionValue = el.getAttribute("value") || option.value;
      option.setAttribute("disabled", isDisabled);
      option.setAttribute("error", isError);
      option.setAttribute("name", name);
      option.setAttribute("checked", optionValue === value);
      option.setAttribute("arialabel", arialabel || name);
      option.setAttribute("ariadescribedby", `description-${name}-${index}`);
      option.setAttribute("data-testid", `radio-option-${index}`);
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
    setCurrentSelectedOption();
  }

  function setCurrentSelectedOption() {
    _options.forEach((el) => {
      const option = el as unknown as RadioOption & { innerText: string };
      const optionValue = el.getAttribute("value") || option.value;
      option.setAttribute("checked", optionValue === value);
    });
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
</style>
