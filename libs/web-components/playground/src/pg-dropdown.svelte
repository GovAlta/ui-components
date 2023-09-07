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
  <goa-dropdown on:_change={() => {}} value={value} disabled={false} leadingicon="airplane">
    <goa-dropdown-item value="1" label="1"></goa-dropdown-item>
    <goa-dropdown-item value="2" label="2"></goa-dropdown-item>
  </goa-dropdown>

  <goa-dropdown on:_change={() => {}} value={value} disabled={false} leadingicon="airplane">
    <goa-dropdown-item value="1" label="Red"></goa-dropdown-item>
    <goa-dropdown-item value="2" label="Green"></goa-dropdown-item>
  </goa-dropdown>
  <goa-dropdown on:_change={() => {}} value={value} disabled={false}>
    <goa-dropdown-item value="1" label="Red"></goa-dropdown-item>
    <goa-dropdown-item value="2" label="Green"></goa-dropdown-item>
  </goa-dropdown>
  <goa-dropdown on:_change={() => {}} value={value} disabled={false}>
    <goa-dropdown-item value="1" label="1"></goa-dropdown-item>
    <goa-dropdown-item value="2" label="2"></goa-dropdown-item>
  </goa-dropdown>

  <goa-dropdown native="true" on:_change={() => {}} value={value} disabled={false}>
    <goa-dropdown-item value="red" label="Red"></goa-dropdown-item>
    <goa-dropdown-item value="green" label="Green"></goa-dropdown-item>
    <goa-dropdown-item value="blue" label="Blue"></goa-dropdown-item>
    <goa-dropdown-item value="white" label="White"></goa-dropdown-item>
    <goa-dropdown-item value="grey" label="Grey"></goa-dropdown-item>
    <goa-dropdown-item value="teal" label="Teal"></goa-dropdown-item>
    <goa-dropdown-item value="yellow" label="Yellow"></goa-dropdown-item>
    <goa-dropdown-item value="orange" label="Orange"></goa-dropdown-item>
    <goa-dropdown-item value="gold" label="Gold"></goa-dropdown-item>
    <goa-dropdown-item value="silver" label="Silver"></goa-dropdown-item>
    <goa-dropdown-item value="ping" label="Pink"></goa-dropdown-item>
  </goa-dropdown>
  
<div style="height: 200vh">

</div>

<button on:click={() => open = !open}>
  Show
</button>
