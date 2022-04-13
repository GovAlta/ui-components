<!-- Script -->
<script lang="ts">
  import type { GoAIconType } from '../icon/Icon.svelte';
  import GoADropdown from './Dropdown.svelte';
  import GoADropdownItem from './DropdownItem.svelte';

  export let name: string;
  export let values: string = "[]";
  export let leadingicon: GoAIconType;
  export let maxheight: number;
  export let placeholder: string;

  export let multiselect: boolean;
  export let disabled: boolean;
  export let filterable: boolean;
  export let error: boolean;

  export let testid: string;

  export let items: string[];
</script>

<!-- HTML -->
<GoADropdown {name} {values} {testid} {error} {leadingicon} {maxheight} {placeholder} {multiselect} {disabled} {filterable}>
  {#each items as item (item) }
    <GoADropdownItem
      testid={`dropdown-item-${item}`}
      name={name}
      value={item}
      label={item}
    />
  {/each}
</GoADropdown>
