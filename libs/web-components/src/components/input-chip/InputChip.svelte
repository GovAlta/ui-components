<svelte:options customElement="goa-input-chip" />

<script lang="ts">
  import { dispatch } from "../../common/utils";

  export let value: string = "";
  export let prefix: string = ""; // input component child prop that needed to be defined
  export let chipValues: string[] = [];
  export let validValues: string[] | null = null;
  export let temporarydemo1: boolean = false;
  export let temporarydemo2: boolean = false;
  export let temporarydemo3: boolean = false;

  let _rootEl: HTMLElement;
  let inputValue = value || "";

  // returns all chips values
  $: value = JSON.stringify(chipValues);

  // delegate functionality to the input element
  export function checkValidity() {
    return !(_rootEl as any).error;
  }

  function handleInputKeyDown(e: Event) {
    const keyboardEvent = e as KeyboardEvent;
    const inputEl = keyboardEvent.currentTarget as HTMLInputElement;
    const newInputValue = inputEl.value?.trim();
    const key = keyboardEvent.key;
    if (key === "Enter" && newInputValue && newInputValue !== "") {
      chipValues = [...chipValues, newInputValue];
      // Clear input value:
      inputValue = "";
      inputEl.value = "";
    }
  }

  const removeTypedChip = (chip: string) => {
    chipValues = chipValues.filter((c) => c !== chip);

    // Let listeners know that an update was made
    setTimeout(() => {
      dispatch(_rootEl, "_change", { value: "" }, { bubbles: true });
    }, 0);
  };
</script>

<!-- HTML -->

<div class="goa-input-chip">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <goa-input
    {temporarydemo1}
    {temporarydemo2}
    {temporarydemo3}
    bind:this={_rootEl}
    on:keydown={handleInputKeyDown}
    value={inputValue}
    error={validValues &&
      chipValues.some((chip) => !validValues.includes(chip))}
    {prefix}
    {...$$restProps}
  >
    {#if $$slots.leadingContent}
      <div slot="leadingContent">
        <slot name="leadingContent" />
      </div>
    {/if}
    <div slot="innerContent" class="innerContent">
      {#each chipValues as typedChip, index}
        <goa-filter-chip
          key={index}
          content={typedChip}
          error={!validValues || validValues.includes(typedChip)
            ? "false"
            : "true"}
          on:_click={() => removeTypedChip(typedChip)}
          ml="xs"
          mt="xs"
          mb={temporarydemo2 ? "" : "xs"}
        />
      {/each}
    </div>
    {#if $$slots.trailingContent}
      <div slot="trailingContent">
        <slot name="trailingContent" />
      </div>
    {/if}
  </goa-input>
</div>

<!-- Styles -->
<style>
  /* border box: the element's specified width and height include the content, padding, and border. The margin is still added */
  :host {
    box-sizing: border-box;
  }
</style>
