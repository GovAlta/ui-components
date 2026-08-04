<svelte:options customElement="test-dropdown-slot-wrapper" />

<!-- Script -->
<script lang="ts">
  import GoADropdown from "./Dropdown.svelte";
  import GoADropdownItem from "./DropdownItem.svelte";

  type Item = {
    value: string;
    label?: string;
    filter?: string;
    text?: string;
    meta?: string;
  };

  export let name: string = "";
  export let value: string = "";
  export let filterable: string = "false";
  export let items: Item[] = [];

  function onChange(e: Event) {
    value = (e as CustomEvent).detail.value;
  }
</script>

<!-- HTML -->
<GoADropdown {name} {value} {filterable} on:_change={onChange}>
  {#each items as item (item.value)}
    <GoADropdownItem
      value={item.value}
      label={item.label ?? ""}
      filter={item.filter ?? ""}
    >
      {#if item.text || item.meta}
        <!-- prettier-ignore: elements are kept adjacent (no whitespace) to match framework-rendered markup -->
        <div data-testid={`rich-content-${item.value}`}><strong>{item.text}</strong>{#if item.meta}<span>{item.meta}</span>{/if}</div>
      {/if}
    </GoADropdownItem>
  {/each}
</GoADropdown>
