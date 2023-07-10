<svelte:options tag="pg-modal" />

<script lang="ts">

  let open: boolean = false;
  let value: string = "blue"
</script>


<goa-modal {open} closable="true" on:_close={() => open = false}>
  <goa-dropdown on:_change={() => {}} value={value} disabled={false}>
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
