<svelte:options tag="pg-tabs" />

<script lang="ts">
  let value: string = "blue"
  function handleClick() {
    console.log("clicked");
  }
  function setValue(e: CustomEvent) {
    console.log("app dropdown handler", e.detail)
    value = e.detail.value;
  }
</script>

<goa-tabs>
  <goa-tab>
    <div slot="heading">Tab Slot 1<goa-badge type="important" content="3"></goa-badge></div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, natus rerum.
    <goa-dropdown on:_change={(e) => setValue(e)} value={value} leadingicon="airplane">
      <goa-dropdown-item value="red" label="red"></goa-dropdown-item>
      <goa-dropdown-item value="blue" label="blue"></goa-dropdown-item>
    </goa-dropdown>
  </goa-tab>

  <goa-tab>
    <div slot="heading">Tab 2 Slot</div>
    A et porro reiciendis pariatur, blanditiis aperiam dolor explicabo fuga, cum mollitia hic, nemo optio magnam dignissimos quisquam voluptate.
  </goa-tab>
  <goa-tab>
    <div slot="heading">Tab 3 Slot Apple Tree is good green bad red</div>
    Tab 3 stuff
  </goa-tab>
</goa-tabs>
