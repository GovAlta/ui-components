<!-- Script -->
<script lang="ts">
  import type { GoAIconType } from '../icon/Icon.svelte';
  import GoADropdown from './Dropdown.svelte';
  import GoADropdownItem from './DropdownItem.svelte';

  export let name: string;
  export let value: string;
  export let leadingicon: GoAIconType;
  export let maxheight: number;
  export let placeholder: string;
  export let disabled: boolean;
  export let error: boolean;
  export let testid: string;
  export let items: string[];
</script>

<!-- HTML -->
<GoADropdown {name} {value} {testid} {error} {leadingicon} {maxheight} {placeholder} {disabled}>
  {#each items as item (item) }
    <GoADropdownItem {name} value={item} label={item} />
  {/each}
</GoADropdown>
