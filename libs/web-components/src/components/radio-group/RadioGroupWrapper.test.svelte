<!-- Script -->
<script lang="ts">
  export let name: string = '';
  export let value: string = '';
  export let orientation = 'vertical';
  export let disabled: string = 'false';
  export let error: string = 'false';
  export let testid: string = '';

  export let items: string[] = [];
</script>

<!-- HTML -->
<goa-radio-group
  name={name}
  value={value}
  orientation={orientation}
  disabled={disabled}
  error={error}
  data-testid={testid}>

  {#each items as item (item) }
    <goa-radio-item data-testid={`radio-item-${item}`} name={name} value={item} label={item} />
  {/each}

</goa-radio-group>
