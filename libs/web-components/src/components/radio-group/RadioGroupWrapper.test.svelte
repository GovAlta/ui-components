<svelte:options customElement="test-radiogroup-wrapper" />

<!-- Script -->
<script lang="ts">
  import GoARadioGroup from "./RadioGroup.svelte";

  export let name: string = "";
  export let value: string = "";
  export let orientation: "vertical" | "horizontal" = "vertical";
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let items: string[] = [];
</script>

<!-- HTML -->

<button data-testid="set-value" on:click={() => (value = "red")}>Set Value</button>

<GoARadioGroup {name} {value} {orientation} {disabled} {error} {testid}>
  {#each items as item (item)}
    <goa-radio-item value="{item}" label="{item}" />
  {/each}
</GoARadioGroup>
