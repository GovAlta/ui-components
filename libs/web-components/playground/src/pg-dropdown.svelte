<svelte:options tag="pg-dropdown" />

<script lang="ts">

  let value: string = "blue";

  function onChange({detail}: CustomEvent) {
    value = detail.value;
  }

</script>

<goa-dropdown on:_change={onChange} value={value}>
  <goa-dropdown-item value="" label="Red"></goa-dropdown-item>
  <goa-dropdown-item value="green" label="Green"></goa-dropdown-item>
  <goa-dropdown-item value="blue" label="Blue"></goa-dropdown-item>
  <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
</goa-dropdown>

<goa-dropdown native="true" on:_change={onChange} value={value}>
  <goa-dropdown-item value="" label="Red"></goa-dropdown-item>
  <goa-dropdown-item value="green" label="Green"></goa-dropdown-item>
  <goa-dropdown-item value="blue" label="Blue"></goa-dropdown-item>
  <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
</goa-dropdown>

<goa-button on:_click={() => value = ""}>Reset</goa-button>