<svelte:options customElement="goa-input-chip" />

<script lang="ts">
  export let value: string = "";
  export let chipValues: string[] = [];
  export let validValues: string[] | null = null;
  export let temporarydemo1: boolean = false;
  export let temporarydemo2: boolean = false;

  let _rootEl: HTMLElement;
  let inputValue = value || "";

  function handleInputChange(e: Event) {
    inputValue = (e.currentTarget as HTMLInputElement).value;
  }

  function handleInputKeyDown(e: Event) {
    const keyboardEvent = e as KeyboardEvent;
    const newInputValue = (keyboardEvent.currentTarget as HTMLInputElement).value.trim();
    const key = keyboardEvent.key;
    if (key === "Enter" && newInputValue !== "") {
      chipValues = [...chipValues, newInputValue];
      inputValue = "";
    }
  }

  const removeTypedChip = (chip: string) => {
    chipValues = chipValues.filter((c) => c !== chip);
  };
</script>

<!-- HTML -->

<div bind:this={_rootEl} class="goa-input-chip">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <goa-input
    temporarydemo1={temporarydemo1}
    temporarydemo2={temporarydemo2}
    error={validValues && chipValues.some(chip => !validValues.includes(chip))}
    on:_change={handleInputChange}
    on:keydown={handleInputKeyDown}
    value={inputValue}
    {...$$restProps}>
    <div slot="innerContent" class="innerContent">
      {#each chipValues as typedChip, index}
        <goa-filter-chip
          key={index}
          content={typedChip}
          error={!validValues || validValues.includes(typedChip) ? "false" : "true"}
          on:_click={() => removeTypedChip(typedChip)}
          ml="xs"
          mt="xs"
          mb={temporarydemo2 ? "" : "xs"} />
      {/each}
    </div>
  </goa-input>
</div>

<!-- Styles -->
<style>
  /* border box: the element's specified width and height include the content, padding, and border. The margin is still added */
  :host {
    box-sizing: border-box;
  }
</style>
