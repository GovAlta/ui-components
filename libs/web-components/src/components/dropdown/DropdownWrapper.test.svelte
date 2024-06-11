<svelte:options customElement="test-dropdown-wrapper" />

<!-- Script -->
<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";
  import GoADropdown from "./Dropdown.svelte";
  import GoADropdownItem from "./DropdownItem.svelte";

  export let name: string = "";
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let value: string = "";
  export let leadingicon: GoAIconType | null = null;
  export let maxheight: string = "276px";
  export let placeholder: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let width: string = "";
  export let native: string = "false";
  export let items: string[];
  export let filterable: string = "false";

  export let resetValue = "orange";

  function setValue() {
    value = resetValue;
  }

  function onChange(e: Event) {
    value = (e as CustomEvent).detail.value;
  }
</script>

<!-- HTML -->
<button on:click={setValue}>Set value</button>
<GoADropdown
  {name}
  {arialabel}
  {arialabelledby}
  {native}
  {value}
  {error}
  {leadingicon}
  {maxheight}
  {placeholder}
  {disabled}
  {width}
  {filterable}
  on:_change={onChange}
>
  {#each items as item (item)}
    <GoADropdownItem value={item} label={item} />
  {/each}
</GoADropdown>
