<svelte:options tag="goa-service-level-header" />

<!-- Script -->
<script lang="ts">
  export let level: "live" | "alpha" | "beta";
</script>

<!-- HTML -->
<header class="goa-official-site-header">
  {#if level === 'live'}
    <div class="site-text service-level--live">
      An official site of the <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
    </div>
  {/if}

  {#if level !== 'live'}
    <div class="service-level service-level--{level?.toLowerCase()}">
      {level}
    </div>
    <div class="site-text">
      This is a new <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a> service
    </div>
  {/if}
</header>

<!-- Style -->
<style>
  .goa-official-site-header {
    display: flex;
    font-size: var(--fs-xs);
    background-color: var(--color-gray-100);
    align-items: center;
  }

  .service-level {
    font-weight: bold;
    padding: 0 0.5rem;
  }

  .service-level--alpha {
    background-color: var(--color-orange);
    color: var(--color-black);
  }

  .service-level--beta {
    background-color: var(--color-blue-600);
    color: var(--color-white);
  }

  .site-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--color-black);
    padding-left: 0.5rem;
  }
</style>
