<svelte:options tag="test-goa-tabs" />

<script>
  import GoATabs from "./Tabs.svelte";

</script>

<GoATabs>
  <goa-tab open="true" heading="Tab1">
    Tab 1 content
  </goa-tab>
  <goa-tab heading="Tab2">
    Tab 2 content
  </goa-tab>
</GoATabs>
