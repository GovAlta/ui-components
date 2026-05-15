<svelte:options customElement="test-goa-tabs" />

<script>
  import GoATabs from "./Tabs.svelte";

  export let initialtab = 1;
</script>

<GoATabs {initialtab}>
  <goa-tab heading="Tab1">
    Tab  content
  </goa-tab>
  <goa-tab>
    <div slot="heading">Tab2</div>
    Tab 2 content
  </goa-tab>
</GoATabs>
