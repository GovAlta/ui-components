<svelte:options tag="pg-dropdown" />

<script lang="ts">
  let open: boolean = true;
  let value: string = "blue"
  let native: boolean = false;

  function onCheckboxChange({detail}: CustomEvent) {
    console.log(detail.checked)
    native = detail.checked
  }

  function setValue(e: CustomEvent) {
    console.log("app dropdown handler", e.detail)
    value = e.detail.value;
  }
</script>

  <goa-container type="information">

    <goa-dropdown on:_change={(e) => setValue(e)} value={value} disabled={false} leadingicon="airplane" width="100%">
      <goa-dropdown-item value="red" label="red"></goa-dropdown-item>
      <goa-dropdown-item value="blue" label="blue"></goa-dropdown-item>
    </goa-dropdown>

    <goa-dropdown on:_change={(e) => setValue(e)} value={value} disabled={false} leadingicon="airplane" width="80%">
      <goa-dropdown-item value="red" label="red"></goa-dropdown-item>
      <goa-dropdown-item value="blue" label="blue"></goa-dropdown-item>
    </goa-dropdown>

    <goa-dropdown on:_change={(e) => setValue(e)} value={value} disabled={false} leadingicon="airplane">
      <goa-dropdown-item value="red" label="red"></goa-dropdown-item>
      <goa-dropdown-item value="blue" label="blue"></goa-dropdown-item>
    </goa-dropdown>

  </goa-container>
  
<button on:click={() => open = !open}>
  Show
</button>
