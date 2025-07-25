<svelte:options customElement="test-checkbox-list-wrapper" />

<script lang="ts">
  import GoACheckboxList from "./CheckboxList.svelte";
  import GoACheckboxListItem from "./CheckboxListItem.svelte";
  import type { Spacing } from "../../common/styling";

  export let name: string = "";
  export let value: string = "[]"; // JSON string array
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let orientation: "vertical" | "horizontal" = "vertical";
  export let maxwidth: string = "none";

  // margin props
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Items for testing - array of objects with value, text, disabled properties
  export let items: Array<{ value: string; text: string; disabled?: boolean }> =
    [];

  function onChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    value = JSON.stringify(detail.values);
  }

  function setValue(newValue: string[]) {
    value = JSON.stringify(newValue);
  }

  function resetValue() {
    value = "[]";
  }

  // Expose methods for testing
  export { setValue, resetValue };
</script>

<button data-testid="set-value-button" on:click={() => setValue(["test-value"])}
  >Set Value</button
>
<button data-testid="reset-value-button" on:click={resetValue}
  >Reset Value</button
>

<GoACheckboxList
  {name}
  {value}
  {disabled}
  {error}
  {testid}
  {arialabel}
  {orientation}
  {maxwidth}
  {mt}
  {mr}
  {mb}
  {ml}
  on:_change={onChange}
>
  {#each items as item (item.value)}
    <GoACheckboxListItem
      value={item.value}
      text={item.text}
      disabled={item.disabled ? "true" : "false"}
    />
  {/each}
</GoACheckboxList>

<div data-testid="current-value">{value}</div>
