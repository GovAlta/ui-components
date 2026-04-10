<script lang="ts">
  import GoAMultiSelect from "./MultiSelect.svelte";
  import GoAMultiSelectOption from "./MultiSelectOption.svelte";

  export let name: string = "";
  export let value: string = "";
  export let placeholder: string = "";
  export let disabled: string = "false";
  export let error: string = "false";
  export let width: string = "";
  export let maxwidth: string = "";
  export let maxheight: string = "276px";
  export let arialabel: string = "";
  export let arialabelledby: string = "";
  export let size: "default" | "compact" = "default";
  export let testid: string = "";
  export let items: Array<{ value: string; label: string }> = [];

  function onChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    value = detail.values?.length ? JSON.stringify(detail.values) : "";
  }
</script>

<GoAMultiSelect
  {name}
  {value}
  {placeholder}
  {disabled}
  {error}
  {width}
  {maxwidth}
  {maxheight}
  {arialabel}
  {arialabelledby}
  {size}
  {testid}
  on:_change={onChange}
>
  {#each items as item (item.value)}
    <GoAMultiSelectOption value={item.value} label={item.label} />
  {/each}
</GoAMultiSelect>
