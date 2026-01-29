<svelte:options customElement="test-goa-tabs-with-slug" />

<script>
  import GoATabs from "./Tabs.svelte";

  export let initialtab = 1;
</script>

<GoATabs {initialtab}>
  <goa-tab heading="Review Pending" slug="review-pending">
    Tab content with slug
  </goa-tab>
  <goa-tab heading="Complete">
    Tab content without slug
  </goa-tab>
</GoATabs>
