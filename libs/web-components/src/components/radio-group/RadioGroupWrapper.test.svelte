<!-- Script -->
<script lang="ts">
  import GoARadioGroup from "./RadioGroup.svelte";
  import GoARadioItem from "./RadioItem.svelte";

  export let name: string = '';
  export let value: string = '';
  export let orientation = 'vertical';
  export let disabled: string = 'false';
  export let error: string = 'false';
  export let testid: string = '';

  export let items: string[] = [];
</script>

<!-- HTML -->
<GoARadioGroup
  name={name}
  value={value}
  orientation={orientation}
  disabled={disabled}
  error={error}
  testid={testid}>

  {#each items as item (item) }
    <GoARadioItem name={name} value={item} label={item} />
  {/each}

</GoARadioGroup>
