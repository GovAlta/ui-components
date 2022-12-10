<svelte:options tag="test-dropdown-wrapper" />

<!-- Script -->
<script lang="ts">
  import type { GoAIconType } from '../icon/Icon.svelte';
  import GoADropdown from './Dropdown.svelte';

  export let name: string = "";
  export let arialabel: string = "";
  export let value: string = "";
  export let leadingicon: GoAIconType = null;
  export let maxheight: string = "276px";
  export let placeholder: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let width: string = "";
	export let native: boolean = false;
  export let items: string[];
</script>

<!-- HTML -->
<GoADropdown {name} {arialabel} {native} {value} {error} {leadingicon} {maxheight} {placeholder} {disabled} {width}>
  {#each items as item (item) }
    <div {name} value={item} label={item} />
  {/each}
</GoADropdown>
