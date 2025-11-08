<svelte:options customElement="test-tabs-input-integration" />

<script>
  import GoATabs from "./Tabs.svelte";
</script>

<GoATabs initialtab={1}>
  <goa-tab heading="Tab1">
    <h2>Tab 1 Content</h2>
    <!-- Input inside tab - this is the scenario from issue #2977 -->
    <goa-input name="test-input" testid="tab1-input"></goa-input>
    <p>Text content in tab 1</p>
  </goa-tab>

  <goa-tab heading="Tab2">
    <h2>Tab 2 Content</h2>
    <p>Text content in tab 2</p>
  </goa-tab>
</GoATabs>
