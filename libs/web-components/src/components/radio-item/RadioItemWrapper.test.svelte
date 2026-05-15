<svelte:options customElement="test-goa-radio-item"/>

<script lang="ts">

  export let description = "";
  export let label = "test label";
  export let value = "test value"
  export let name = "test name";
</script>
<!-- HTML -->
<goa-radio-item {label} {value} {name}>
  {#if description.length}
    <div slot="description">
      <p>
        {description}
      </p>
    </div>
  {/if}
</goa-radio-item>
