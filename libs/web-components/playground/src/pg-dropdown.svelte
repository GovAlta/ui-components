<svelte:options tag="pg-dropdown" />

<script lang="ts">
  let open: boolean = true;
  let value: string = "blue"
  let native: boolean = false;

  function onCheckboxChange({detail}: CustomEvent) {
    console.log(detail.checked)
    native = detail.checked
  }
</script>

<goa-modal {open} closable="true" on:_close={() => open = false}>
  <goa-checkbox on:_change={onCheckboxChange}>Native</goa-checkbox>
  <goa-dropdown on:_change={() => {}} value={value} native={native}>
    <goa-dropdown-item value="" label="Red"></goa-dropdown-item>
    <goa-dropdown-item value="green" label="Green"></goa-dropdown-item>
    <goa-dropdown-item value="blue" label="Blue"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
  </goa-dropdown>
</goa-modal>

<button on:click={() => open = !open}>
  Show
</button>
