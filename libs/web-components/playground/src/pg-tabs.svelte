<svelte:options tag="pg-tabs" />

<script lang="ts">
  function handleClick() {
    console.log("clicked");
  }
</script>

<goa-tabs initialtab="2">
  <goa-tab>
    <div slot="heading">Tab Slot 1<goa-badge type="important" content="3"></goa-badge></div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, natus rerum.
    <goa-button on:_click={handleClick}>Click Me</goa-button>
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
