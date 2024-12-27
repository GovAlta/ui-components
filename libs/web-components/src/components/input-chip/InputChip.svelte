<svelte:options customElement="goa-input-chip" />

<script lang="ts">
  export let value: string = "";
  export let chipValues = <string[]>[];

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

<div bind:this={_rootEl}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <goa-input
    on:_change={handleInputChange}
    on:keydown={handleInputKeyDown}
    value={inputValue}
    {...$$restProps}>
    <div slot="innerContent" class="innerContent">
      {#each chipValues as typedChip, index}
        <goa-filter-chip
          key={index}
          content={typedChip}
          on:_click={() => removeTypedChip(typedChip)}
          ml="xs"
          mt="xs"
          mb="xs" />
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
