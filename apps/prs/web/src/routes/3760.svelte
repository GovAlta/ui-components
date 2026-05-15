<script lang="ts">
  let clickCount = 0;
  let lastEvent = "Waiting for _click from onDelete. Click the close icon once on the v1 filter chip.";
  let eventLog: string[] = [];

  function handleChipClick() {
    const timestamp = new Date().toLocaleTimeString();
    clickCount += 1;
    lastEvent = `_click received from onDelete at ${timestamp}`;
    eventLog = [lastEvent, ...eventLog].slice(0, 6);
  }

  function resetLog() {
    clickCount = 0;
    lastEvent = "Waiting for _click from onDelete. Click the close icon once on the v1 filter chip.";
    eventLog = [];
  }
</script>

<svelte:head>
  <title>Issue 3760</title>
</svelte:head>

<div class="page">
    <goa-text as="h5" mb="xs" color="secondary" class="eyebrow">Issue 3760</goa-text>
    <goa-text as="h1" mt="0" mb="0">Version 1 Filter Chip Icon Click</goa-text>
    <goa-text mb="0">
      Use this page to verify that clicking the v1 close icon runs the component's
      <code>onDelete</code> handler and emits one <code>_click</code> event.
    </goa-text>

  <div class="chip-area">
    <goa-filter-chip
      content="Status: Active filter"
      version="1"
      testid="filter-chip-v1"
      on:_click={handleChipClick}
    />
  </div>

  <goa-button size="compact" type="primary" on:click={resetLog}>Reset</goa-button>

  <goa-text mb="0">
    Click count <strong>{clickCount}</strong>
  </goa-text>

  <goa-text  mb="0">{lastEvent}</goa-text>

  <goa-text as="h4" mt="s" mb="0">Recent Events</goa-text>
  {#if eventLog.length > 0}
    <ul>
      {#each eventLog as entry}
        <li>{entry}</li>
      {/each}
    </ul>
  {:else}
    <goa-text class="empty">No events captured yet.</goa-text>
  {/if}
</div>

<style>
  .page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>