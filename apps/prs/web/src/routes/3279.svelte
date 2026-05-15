<script lang="ts">
  // Route component for /issues/3279
  let v1Clicks = 0;
  let v2Clicks = 0;

  function incV1() {
    v1Clicks += 1;
  }

  function incV2() {
    v2Clicks += 1;
  }
</script>

<div class="page">
  <h1>Issue 3279</h1>
  <p>Two filter chips (v1 + v2) with click counts.</p>

  <div class="row">
    <goa-filter-chip content={`v1 clicks: ${v1Clicks}`} version="1" on:_click={incV1} />
  </div>

  <div class="row">
    <goa-filter-chip content={`v2 clicks: ${v2Clicks}`} version="2" on:_click={incV2} />
  </div>
</div>

<style>
  .page {
    padding: 2rem;
  }

  .row {
    margin-top: 1rem;
  }
</style>
